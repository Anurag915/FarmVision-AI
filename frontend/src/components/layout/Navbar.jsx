import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">

      {/* Left */}

      <div>

        <h2 className="text-xl font-semibold">
          AI Agriculture Platform
        </h2>

        <p className="text-sm text-gray-500">
          {today}
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm"
          />

        </div>

        {/* Notification */}

        <button className="text-gray-600 hover:text-green-600 text-xl">

          <FaBell />

        </button>

        {/* User */}

        <div className="flex items-center gap-2">

          <FaUserCircle className="text-3xl text-green-700" />

          <span className="font-medium">
            Anurag
          </span>

        </div>

      </div>

    </header>
  );
}

export default Navbar;