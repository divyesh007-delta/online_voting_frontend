import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0F3460] to-[#16213E] text-center px-6 w-full overflow-hidden">
      <div className="bg-opacity-90 backdrop-blur-lg p-16 md:p-20 lg:p-24 rounded-2xl shadow-2xl max-w-5xl w-full">
        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold mb-10 text-white">
          Welcome to the Online Voting System
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Exercise your right to vote securely and conveniently.
        </p>

        {/* Button Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Register Button */}
          <Link
            to="/register"
            className="bg-blue-500 text-white text-lg px-8 py-4 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105 hover:bg-blue-700"
          >
            Register to Vote
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-green-500 text-white text-lg px-8 py-4 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105 hover:bg-green-600"
          >
            Login to Vote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
