const mongoose = require("mongoose"); //import the mongoose library to interact with mongoDB
const Schema = mongoose.Schema; //import the mongoose Schema that allows us to set a schema

const UserSchema = new Schema( //UserSchema is a Schema Object that creates a schema with fields. const UserSchema = new Schema({})
  //The UserSchema defines fields (e.g., email, role) and their properties (e.g., type: String, required: true). It tells
  // MongoDB how to structure documents in the users collection.
  //It also enforces constraints (e.g., unique: true) and specifies the collection name (e.g., { collection: 'users' }).
  {
    email: {
      type: String,
      required: true, //cant save without it
      unique: true, //has to be unique in the collections
      lowercase: true, //convert to lowercase upon saving
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, //unique if available but if not available, its okay, accepts null
    },
    role: {
      type: String,
      enum: ["farmer", "buyer", "admin"], //The only possible selections
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      province: { type: String, required: true }, //There are subfields within location and some of them are required
      city: { type: String, required: true },
      town: { type: String },
      neighborhood: { type: String },
    },
    buyerType: {
      type: String,
      enum: ["individual", "business"],
      default: "individual", //If they don't choose then they are gonna be assinged individual by default.
    },
    createdAt: {
      type: Date,
      default: Date.now, //sets the time of creatin
    },
  },
  { collection: "users" } //stores the data in the users collection
);

UserSchema.index({ email: 1 }); //UserSchema.index({ email: 1 }) speeds up queries on the email field, like
//during login (User.findOne({ email })). it optimizes queries specifically for email. Without an index, MongoDB
// scans all documents (slow).
UserSchema.index({ googleId: 1 }, { sparse: true }); // Speeds up the queriers for login but can be null
/*{ sparse: true }: Only indexes documents where googleId exists (non-null). Since googleId is optional (only for OAuth users),
 this avoids indexing null values, saving space.
Without sparse, MongoDB would index nulls, which could cause conflicts with unique: true (multiple nulls aren’t unique). */

module.exports = mongoose.model("User", UserSchema); //Creates a model called User which acts as an interface for us to
// interact with the MongoDB Users collection.
//Its basically a class that represents the User Collections.
//To save, we instantiate a model object which would be a document that we want to instatall
/*The model is like a JavaScript class that represents the users collection. It provides methods (e.g., User.findOne, user.save)
// to query or modify data.
Instantiation: new User({ email, ... }) creates a document (a single user record) to save.
Example: const user = new User({ email: 'test@example.com' }); await user.save(); adds a user to users.
Use case: Simplifies database operations (FinTech: reliable data access). */
