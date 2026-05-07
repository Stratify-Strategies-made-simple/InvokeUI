import React from 'react';
import { Zap, Search, LogOut } from 'lucide-react';
import Avatar from '../ui/Avatar';

/**
 * Header Component
 * Provides global navigation, search functionality, and user authentication state.
 *
 * @param {Object} props
 * @param {Object} props.user - The current authenticated user.
 * @param {string} props.searchQuery - The global search query.
 * @param {Function} props.setSearchQuery - Function to update search query.
 * @param {string} props.currentView - The active routing view.
 * @param {Function} props.setCurrentView - Function to navigate views.
 * @param {Function} props.setSelectedSpace - Function to reset selected space.
 * @param {Function} props.handleLogin - Function to trigger authentication.
 * @param {Function} props.handleLogout - Function to trigger logout.
 * @param {Function} props.setNotification - Function to trigger global notifications.
 */
const Header = ({
  user,
  searchQuery,
  setSearchQuery,
  currentView,
  setCurrentView,
  setSelectedSpace,
  handleLogin,
  handleLogout,
  setNotification,
}) => {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-surface z-40">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 flex-1">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setCurrentView("home");
              setSelectedSpace(null);
            }}
          >
            <Zap className="w-5 h-5 text-orange-500 fill-current" />
            <span className="font-bold text-xl tracking-tight text-text-main">
              Invoke
            </span>
          </div>

          <div className="hidden md:flex relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spaces, authors..."
              className="w-full pl-9 pr-4 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary-500 transition-all bg-surface"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentView("home");
                setSelectedSpace(null);
              }}
              className={`flex items-center gap-1.5 text-sm font-bold ${currentView === "home" ? "text-text-main" : "text-text-muted hover:text-text-main"}`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView("spaces");
                setSelectedSpace(null);
              }}
              className={`flex items-center gap-1.5 text-sm font-bold ${currentView === "spaces" ? "text-text-main" : "text-text-muted hover:text-text-main"}`}
            >
              Spaces
            </button>
            <button
              onClick={() => {
                if (user) {
                  setCurrentView("library");
                  setSelectedSpace(null);
                } else {
                  setNotification({ message: "Please sign in to view your Library", type: "info" });
                }
              }}
              className={`flex items-center gap-1.5 text-sm font-bold ${currentView === "library" ? "text-text-main" : "text-text-muted hover:text-text-main"}`}
            >
              Library
            </button>
            <button
              onClick={() => {
                setCurrentView("agents");
                setSelectedSpace(null);
              }}
              className={`flex items-center gap-1.5 text-sm font-bold ${currentView === "agents" ? "text-text-main" : "text-text-muted hover:text-text-main"}`}
            >
              Agents
            </button>
            <button
              onClick={() => {
                setCurrentView("endpoints");
                setSelectedSpace(null);
              }}
              className={`flex items-center gap-1.5 text-sm font-bold ${currentView === "endpoints" ? "text-text-main" : "text-text-muted hover:text-text-main"}`}
            >
              Endpoints
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-text-main leading-none">
                  {user.displayName}
                </div>
              </div>
              <Avatar
                src={user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`}
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-200"
                fallbackName={user.displayName}
                size={32}
              />
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-full font-medium text-sm transition-transform active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
