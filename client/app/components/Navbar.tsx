import React, { useState } from "react";
import {
  User,
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  Package,
  Home,
  Grid,
  Phone,
  Info,
} from "lucide-react";

export default function Navbar() {
  // Static variable to simulate login state
  const isLoggedIn = false;
  const [activeLink, setActiveLink] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", icon: Home, id: "home" },
    { name: "Categories", icon: Grid, id: "categories" },
    { name: "Track Order", icon: Package, id: "track" },
    { name: "About", icon: Info, id: "about" },
    { name: "Contact", icon: Phone, id: "contact" },
  ];

  const conditionalLinks = [
    { name: "Wishlist", icon: Heart, id: "wishlist", showWhen: isLoggedIn },
  ];

  return (
    <nav className="bg-black px-4 py-3 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 flex items-center justify-center rounded">
              <img src="" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-red-600 text-lg md:text-2xl font-bold tracking-wide">
              PARTSBIGBOSS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-2 text-red-600 font-medium transition-all px-4 py-2 rounded ${
                    activeLink === link.id
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </button>
              );
            })}

            {conditionalLinks.map((link) => {
              if (!link.showWhen) return null;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-2 text-red-600 font-medium transition-all px-4 py-2 rounded ${
                    activeLink === link.id
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Icon */}
            <button
              className="text-red-600 hover:bg-white hover:text-black transition-all p-2 rounded"
              onClick={() => handleLinkClick("search")}
            >
              <Search size={22} />
            </button>

            {/* Cart Icon */}
            <button
              className="text-red-600 hover:bg-white hover:text-black transition-all p-2 rounded relative"
              onClick={() => handleLinkClick("cart")}
            >
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile or Login/Signup - Desktop */}
            <div className="hidden lg:block">
              {isLoggedIn ? (
                <button
                  onClick={() => handleLinkClick("profile")}
                  className={`transition-all p-2 rounded ${
                    activeLink === "profile"
                      ? "bg-white text-black"
                      : "text-red-600 hover:bg-white hover:text-black"
                  }`}
                >
                  <User size={24} />
                </button>
              ) : (
                <button
                  onClick={() => handleLinkClick("login")}
                  className={`text-red-600 font-medium transition-all px-4 py-2 rounded ${
                    activeLink === "login"
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  Login/Signup
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-red-600 hover:bg-white hover:text-black transition-all p-2 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-red-900">
            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center gap-3 text-red-600 font-medium transition-all px-4 py-3 rounded ${
                      activeLink === link.id
                        ? "bg-white text-black"
                        : "hover:bg-white hover:text-black"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{link.name}</span>
                  </button>
                );
              })}

              {conditionalLinks.map((link) => {
                if (!link.showWhen) return null;
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center gap-3 text-red-600 font-medium transition-all px-4 py-3 rounded ${
                      activeLink === link.id
                        ? "bg-white text-black"
                        : "hover:bg-white hover:text-black"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{link.name}</span>
                  </button>
                );
              })}

              {/* Profile or Login in Mobile Menu */}
              {isLoggedIn ? (
                <button
                  onClick={() => handleLinkClick("profile")}
                  className={`flex items-center gap-3 text-red-600 font-medium transition-all px-4 py-3 rounded ${
                    activeLink === "profile"
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  <User size={20} />
                  <span>Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => handleLinkClick("login")}
                  className={`flex items-center gap-3 text-red-600 font-medium transition-all px-4 py-3 rounded ${
                    activeLink === "login"
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  <User size={20} />
                  <span>Login/Signup</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
