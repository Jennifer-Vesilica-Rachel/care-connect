import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Calendar, Menu, X, User, LogOut } from 'lucide-react';
import { CareConnectLogo } from '../common/CareConnectLogo';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Find a Doctor', to: '/doctors' },
    { label: 'Departments', to: '/departments' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#172B46]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link to="/" className="group flex items-center shrink-0">
          <CareConnectLogo size="md" />
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#172B46]/80">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap py-1 transition-colors relative hover:text-[#172B46] ${
                  isActive
                    ? 'text-[#172B46] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#56B7AD]'
                    : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Auth & Action Button */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 text-xs font-medium text-[#172B46] hover:text-[#56B7AD] transition-colors py-1.5 px-2 rounded-lg hover:bg-white/60"
                aria-expanded={userDropdownOpen}
              >
                <div className="w-7 h-7 rounded-full bg-[#172B46] text-white flex items-center justify-center font-semibold text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="max-w-[120px] truncate">{user.name}</span>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-xs"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/appointments?tab=my-appointments"
                    className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#56B7AD]" />
                    My Appointments
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs font-semibold text-[#172B46] hover:text-[#56B7AD] transition-colors px-3 py-2 rounded-lg whitespace-nowrap"
            >
              Login
            </Link>
          )}

          <Link
            to="/appointments"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#172B46] hover:bg-[#203a5e] shadow-sm hover:shadow transition-all whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#56B7AD]" />
            Book Appointment
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/appointments"
            className="inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold text-white bg-[#172B46]"
          >
            Book
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#172B46] hover:bg-white/60 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F4ED] border-b border-slate-200 px-5 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-white text-[#172B46] font-semibold shadow-xs'
                      : 'text-[#172B46]/80 hover:bg-white/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-7 h-7 rounded-full bg-[#172B46] text-white flex items-center justify-center font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <Link
                      to="/appointments?tab=my-appointments"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[11px] text-[#56B7AD] hover:underline"
                    >
                      View Bookings
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-3 rounded-lg border border-[#172B46]/30 text-xs font-semibold text-[#172B46] bg-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#56B7AD]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
