const express = require("express"); // We need the express so we can use things like the Router.
const bcrypt = require("bcryptjs"); //We need the  bcrypt to hash the passwords
const User = require("../models/User"); //Importing the User JS Class or Model so we can interact with the Users collection

const router = express.Router(); //creates a router for all the endpoints in the auth.js file
//Signining up is an async operation becuase it happens independent to the running of the program
//You put async just before the callback function to indicate asnyc operation
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role, name, location, buyerType } = req.body; //Destructures JSON data into variables.
    /*post: Handles POST requests to /api/auth/signup.
    async: Allows await for async operations (e.g., database queries).
    req.body: JSON data (e.g., { email: "user@example.com" }).
    res: Sends response (e.g., res.json({ ... })). */

    //400 means server cannot and will not process the client request because of client error.
    if (
      !email ||
      !password ||
      !role ||
      !name ||
      !location?.province ||
      !location?.city
    ) {
      return res.status(400).json({ message: "Missing required fields" }); //If the required fields have not been filled
    }
    if (!["farmer", "buyer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" }); //Validates role is valid.
    }
    if (buyerType && !["individual", "business"].includes(buyerType)) {
      return res.status(400).json({ message: "Invalid buyerType" });
    }

    const existingUser = await User.findOne({ email }); //Checks if email exists in users collection.
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //Hashes password (10 is salt rounds for security).
    //Creates a user object matching the schema.
    const user = new User({
      email,
      password: hashedPassword,
      role,
      name,
      location,
      buyerType: buyerType || "individual",
      createdAt: new Date(),
    });

    await user.save(); //Saves user to MongoDB.
    //HTTP code for “created”.
    res.status(201).json({ userId: user._id, message: "User created" });
  } catch (error) {
    //try/catch: Handles errors (e.g., database failure).
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });

    /*res:
What: The response object in Express, used to send data back to the client (e.g., browser, Postman).
Role: Represents the HTTP response for the request (e.g., signup attempt).
.status(500):
What: Sets the HTTP status code to 500 (Internal Server Error).
Why: Indicates a server-side error (e.g., database failure, code crash).
Syntax: res.status(code) sets the status; 500 is a standard error code (FinTech: clear error signaling).
.json({ message: "Server error" }):
What: Sends a JSON response { message: "Server error" } to the client.
Details:
{ message: "Server error" }: A JavaScript object with a message property.
.json(): Converts the object to JSON and sets the Content-Type header to application/json.
Why: Informs the client what went wrong (FinTech: user-friendly error messages).
Overall Purpose:
Handles errors in the route (e.g., database connection failure during signup).
Returns a 500 status with a JSON error message, ending the request. */
  }
});

module.exports = router;
//module.exports: Shares code from a file.
// router: Contains Express routes (e.g., signup).
// module.exports = router;: Makes routes available to server.js.
