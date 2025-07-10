import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video Background */}
      <div className="relative h-[90vh] overflow-hidden">
        <video
          className="absolute opaque top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://cdn.pixabay.com/video/2020/04/30/37663-418005775_tiny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to ZimFIP</h1>
            <p className="text-xl mb-6">
              Connecting Farmers and Buyers Seamlessly
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Explore Marketplace
            </button>
          </div>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zimfip-light p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-zimfip-green mb-2">
            Our Mission
          </h2>
          <p className="text-zimfip-gray">
            Empowering rural farmers with fair market access.
          </p>
        </div>
        <div className="bg-zimfip-light p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-zimfip-green mb-2">
            How It Works
          </h2>
          <p className="text-zimfip-gray">
            List, connect, and trade with ease.
          </p>
        </div>
        <div className="bg-zimfip-light p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-zimfip-green mb-2">Join Us</h2>
          <p className="text-zimfip-gray">
            Sign up today to start your journey!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
