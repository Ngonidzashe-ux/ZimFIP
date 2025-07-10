import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function Purchase() {
  const { state } = useLocation();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!state) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <p className="text-zimfip-gray text-center">
          No purchase details available.
        </p>
      </div>
    );
  }

  const {
    listingId,
    name,
    price,
    priceUnit,
    quantity: maxQuantity,
    sellerId,
    farmerName,
  } = state;
  const total = price * quantity;

  const handleConfirmPurchase = () => {
    if (quantity > maxQuantity) {
      alert("Quantity exceeds available stock!");
      return;
    }
    alert(
      `Purchase confirmed for ${quantity} ${priceUnit} of ${name} at $${total}! Contact ${farmerName} via chat to finalize.`
    );
    navigate("/chat", {
      state: {
        listingId,
        sellerId,
        listingName: name,
        purchase: true,
        quantity,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto bg-zimfip-light p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-zimfip-green mb-4 text-center">
          Purchase Details
        </h1>
        <p className="text-zimfip-gray mb-2">
          <strong>Product:</strong> {name}
        </p>
        <p className="text-zimfip-gray mb-2">
          <strong>Price per {priceUnit}:</strong> ${price}
        </p>
        <p className="text-zimfip-gray mb-2">
          <strong>Available Quantity:</strong> {maxQuantity} {priceUnit}
        </p>
        <p className="text-zimfip-gray mb-2">
          <strong>Seller:</strong> {farmerName}
        </p>
        <div className="mb-4">
          <label className="text-zimfip-gray mb-2 block">
            Select Quantity:
          </label>
          <input
            type="number"
            min="1"
            max={maxQuantity}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.min(maxQuantity, Math.max(1, e.target.value)))
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <p className="text-zimfip-gray mt-2">
            <strong>Total:</strong> ${total}
          </p>
        </div>
        {user?.role === "buyer" && (
          <button
            onClick={handleConfirmPurchase}
            className="w-full bg-zimfip-green text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Confirm Purchase
          </button>
        )}
      </div>
    </div>
  );
}

export default Purchase;
