import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function Chat() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { listingId, sellerId, listingName } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!listingId || !sellerId) {
      setError("Invalid chat details");
      return;
    }

    // Connect to Socket.IO
    const newSocket = io(process.env.REACT_APP_API_URL, {
      auth: { token: `Bearer ${localStorage.getItem("token")}` },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected");
      newSocket.emit("join", listingId);
    });

    newSocket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket error:", err);
      setError("Failed to connect to chat");
    });

    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/messages/${listingId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Fetch messages error:", err);
        setError("Failed to load messages");
      }
    };
    fetchMessages();

    return () => {
      newSocket.disconnect();
    };
  }, [listingId, sellerId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      listingId,
      senderId: user?.userId,
      recipientId: sellerId,
      content: newMessage,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/messages`,
        message,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      socket.emit("message", { ...message, senderName: user?.name });
      setNewMessage("");
    } catch (err) {
      console.error("Send message error:", err);
      setError("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="bg-zimfip-light p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-zimfip-green mb-6 text-center">
          Chat for {listingName || "Listing"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="bg-white p-4 rounded-lg border border-gray-300 max-h-96 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.senderId === user?.userId
                  ? "bg-zimfip-teal text-white ml-auto"
                  : "bg-gray-200 text-zimfip-gray"
              } max-w-xs`}
            >
              <p className="text-sm">
                {msg.senderName || "User"}: {msg.content}
              </p>
            </div>
          ))}
        </div>
        <form className="flex space-x-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none"
            placeholder="Type your message"
            disabled={user?.role !== "buyer"}
          />
          <button
            type="submit"
            className="bg-zimfip-teal text-white p-3 rounded-lg hover:bg-teal-300 transition-colors duration-200"
            disabled={user?.role !== "buyer"}
          >
            Send
          </button>
        </form>
        <button
          onClick={() => navigate("/marketplace")}
          className="mt-4 w-full bg-gray-300 text-zimfip-gray p-3 rounded-lg hover:bg-gray-400 transition-colors duration-200"
        >
          Back to Marketplace
        </button>
      </div>
    </div>
  );
}

export default Chat;
