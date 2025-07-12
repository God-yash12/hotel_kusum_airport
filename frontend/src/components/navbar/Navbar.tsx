import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import Logo from "../../assets/hotel_logo.jpg"
import { useEffect, useState, useRef } from "react"

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    interface ClickOutsideEvent extends Event {
      target: EventTarget | null;
    }

    const handleClickOutside = (event: ClickOutsideEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roomTypes = [
    { name: "Deluxe Room", path: "/rooms/deluxe", description: "Luxury comfort" },
    { name: "Premium Suite", path: "/rooms/suite", description: "Spacious living" },
    { name: "Executive Suite", path: "/rooms/executive-suite", description: "Business elegance" },
    { name: "Standard Room", path: "/rooms/normal", description: "Comfortable stay" }
  ];

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Facilities", path: "/facilities" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileRoomsOpen(false);
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-500 ${scrolled
      ? 'backdrop-blur-lg bg-gray-100/95 border-b border-gray-200/20'
      : 'bg-transparent backdrop-blur-none ))'
      }`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center transition-all duration-500 ${scrolled ? 'max-w-6xl' : 'w-full'}`}>

        {/* Logo - Will move left when scrolled */}
        <div className={`transition-all duration-500 ${scrolled ? 'translate-x-0' : 'translate-x-[-20px]'}`}>
          <Link to="/" className="flex items-center group">
            <img
              src={Logo}
              alt="Hotel Kusum"
              className="h-12 w-auto object-contain rounded-lg transition-transform group-hover:scale-105 shadow-md"
            />
            <span className={`ml-3 text-md font-display font-bold font-display transition-colors duration-300 ${scrolled ? 'text-[#C3A165] hidden' : 'text-white '
              }`}>
              Hotel Kusum
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Stays centered */}
        <div className="hidden lg:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium text-md ${location.pathname === item.path
                ? scrolled
                  ? 'text-[#C3A165]'
                  : 'text-[#C3A165]'
                : scrolled
                  ? 'text-gray-700 hover:text-[#C3A165] hover:bg-[#C3A165]/5'
                  : 'text-white hover:text-[#C3A165] hover:bg-white/10'
                }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Custom Rooms Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xl font-medium transition-all duration-300 ${location.pathname.includes('/rooms')
                ? scrolled
                  ? 'text-[#C3A165] bg-[#C3A165]/10'
                  : 'text-[#C3A165] bg-white/10'
                : scrolled
                  ? 'text-gray-700 hover:text-[#C3A165] hover:bg-[#C3A165]/5'
                  : 'text-white hover:text-[#C3A165] hover:bg-white/10'
                }`}
            >
              Rooms & Suites
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Content */}
            {dropdownOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[9999]"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="bg-gradient-to-r from-[#C3A165] to-[#B0905B] h-1"></div>
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-display font-semibold text-[#C3A165] text-lg">Our Accommodations</h3>
                    <p className="text-xs text-gray-500 mt-1">Choose from our premium room collection</p>
                  </div>
                  <div className="grid gap-1">
                    {roomTypes.map((room) => (
                      <Link
                        key={room.path}
                        to={room.path}
                        onClick={handleDropdownItemClick}
                        className={`block py-3 px-3 rounded-lg transition-all duration-300 group ${location.pathname === room.path
                          ? 'bg-[#C3A165]/10 text-[#C3A165]'
                          : 'hover:bg-[#C3A165]/5 text-gray-700 hover:text-[#C3A165]'
                          }`}
                      >
                        <div className="font-medium text-sm">{room.name}</div>
                        <div className="text-xs text-gray-500 mt-1 group-hover:text-[#C3A165]/70">
                          {room.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Book Now Button - Will move right when scrolled */}
        <div className={`transition-all duration-500 ${scrolled ? 'translate-x-0 ' : 'translate-x-[20px]'}`}>
          <Button
            asChild
            className={`hidden sm:flex px-5 py-4 font-display font-medium text-white text-md text-center bg-[#C3A165] rounded-sm hover:rounded-4xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${scrolled
              ? 'bg-[#C3A165] hover:bg-[#B0905B] shadow-lg hover:shadow-xl'
              : 'bg-[#C3A165]/90 hover:bg-[#C3A165]'
              }`}
          >
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 lg:hidden">
          <Button
            asChild
            className={`sm:hidden px-4 py-2 font-display font-medium text-white text-md bg-[#C3A165] rounded-lg transition-all duration-300 hover:shadow-lg ${scrolled
              ? 'bg-[#C3A165] hover:bg-[#B0905B]'
              : 'bg-[#C3A165]/90 hover:bg-[#C3A165]'
              }`}
          >
            <Link to="/booking">Book Now</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`p-2 rounded-lg transition-colors duration-300 ${scrolled
                  ? 'text-gray-700 hover:bg-[#C3A165]/10 hover:text-[#C3A165]'
                  : 'text-white hover:bg-white/10'
                  }`}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 bg-white">
              <SheetHeader className="p-6 border-b border-[#C3A165]/20 bg-gradient-to-r from-[#C3A165]/5 to-[#C3A165]/10">
                <SheetTitle className="flex items-center text-left">
                  <img
                    src={Logo}
                    alt="Hotel Kusum"
                    className="h-10 w-auto object-contain rounded-lg shadow-sm"
                  />
                  <span className="ml-3 text-lg font-display font-bold text-[#C3A165]">
                    Hotel Kusum
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu for Hotel Kusum website
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full">

                {/* Navigation Items */}
                <div className="flex-1 p-6">
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${location.pathname === item.path
                          ? 'text-[#C3A165] bg-[#C3A165]/10 border-l-4 border-[#C3A165]'
                          : 'text-gray-700 hover:text-[#C3A165] hover:bg-[#C3A165]/5'
                          }`}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Mobile Rooms Section */}
                    <div className="mt-6 border-t border-[#C3A165]/20 pt-4">
                      <button
                        onClick={() => setMobileRoomsOpen(!mobileRoomsOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:text-[#C3A165] hover:bg-[#C3A165]/5 transition-all duration-300 font-medium"
                      >
                        <span>Rooms & Suites</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileRoomsOpen ? 'rotate-180' : ''
                          }`} />
                      </button>

                      {mobileRoomsOpen && (
                        <div className="mt-2 ml-4 space-y-1 border-l-2 border-[#C3A165]/20 pl-4">
                          {roomTypes.map((room) => (
                            <Link
                              key={room.path}
                              to={room.path}
                              onClick={closeMobileMenu}
                              className={`block px-4 py-3 rounded-lg transition-all duration-300 ${location.pathname === room.path
                                ? 'text-[#C3A165] bg-[#C3A165]/10'
                                : 'text-gray-600 hover:text-[#C3A165] hover:bg-[#C3A165]/5'
                                }`}
                            >
                              <div className="font-medium text-sm">{room.name}</div>
                              <div className="text-xs text-gray-500 mt-1">{room.description}</div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#C3A165]/20 bg-gradient-to-r from-[#C3A165]/5 to-[#C3A165]/10">
                  <Button
                    asChild
                    className="w-full bg-[#C3A165] hover:bg-[#B0905B] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Link to="/booking" onClick={closeMobileMenu}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar