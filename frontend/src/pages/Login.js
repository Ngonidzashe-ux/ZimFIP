function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold text-zimfip-green mb-6 text-center">
          Login
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zimfip-green text-white p-3 rounded-lg hover:bg-zimfip-teal transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
