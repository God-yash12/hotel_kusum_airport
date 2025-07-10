import { useEffect, useRef, useState } from 'react';
import FooterImage from "../../assets/footer.png";
import Logo from '../../assets/hotel_logo.jpg';
import { MapPin, Phone, Mail, Instagram, Facebook, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Input } from "@/components/ui/input";

export const Footer = () => {
    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const contactItems = [
        { icon: MapPin, text: "Prakash Sanyas Ashram Marg, Airport-09", link: "/about" },
        { icon: Phone, text: "+977 984-3979884", link: "tel:+9779843979884" },
        { icon: Mail, text: "info@hotelkusum.com", link: "mailto:info@hotelkusum.com" },
        { icon: FaWhatsapp, text: "Whatsapp", link: "https://wa.me/9779843979884", special: true }
    ];

    const navigationItems = [
        { text: "Home", link: "/" },
        { text: "About", link: "/about" },
        { text: "Events", link: "/events" },
        { text: "Facilities", link: "/facilities" },
        { text: "Rooms & Suites", link: "/rooms" },
        { text: "Our Gallery", link: "/gallery" }
    ];

    const socialItems = [
        { icon: Instagram, link: "https://instagram.com", color: "hover:text-pink-400" },
        { icon: Facebook, link: "https://facebook.com", color: "hover:text-blue-400" },
        { icon: X, link: "https://twitter.com", color: "hover:text-gray-400" }
    ];

    return (
        <footer ref={footerRef} className="relative w-full mt-20 mb-0 overflow-hidden">
            {/* Background image container with parallax effect */}
            <div className="absolute inset-0">
                <img 
                    src={FooterImage} 
                    alt="Footer" 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105" 
                />
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                {/* Additional overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content grid with staggered animations */}
            <div className={`relative z-10 max-w-fit mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    
                    {/* Logo section with fade-in animation */}
                    <div className={`flex flex-col items-center lg:items-start transition-all duration-1000 delay-200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <div className="group mb-4">
                            <div className="h-20 w-20 lg:h-24 lg:w-24 transition-transform duration-300 group-hover:scale-110">
                                <img 
                                    src={Logo} 
                                    alt="Hotel Kusum Airport Logo" 
                                    className="w-full h-full object-cover rounded-lg shadow-lg" 
                                />
                            </div>
                        </div>
                        <div className="text-center lg:text-left">
                            <p className="text-white text-sm lg:text-base leading-relaxed font-light font-body">
                                <span className="font-bold text-yellow-400 block mb-2 tracking-widest">Hotel Kusum Airport</span>
                                A newly built sanctuary with innovative design, modern technology and eco-friendly practices. 
                                Experience international hospitality and luxury with conscience, making it your second home.
                            </p>
                        </div>
                    </div>

                    {/* Contact section */}
                    <div className={`transition-all duration-1000 delay-400 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h3 className="text-xl font-semibold mb-6 tracking-widest text-white border-b-2 border-yellow-400 pb-2 inline-block">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            {contactItems.map((item, index) => (
                                <li key={index} className="group">
                                    <Link 
                                        to={item.link}
                                        className={`flex items-center text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 ${
                                            item.special ? 'hover:text-green-400' : ''
                                        }`}
                                    >
                                        <item.icon className={`mr-3 transition-all duration-300 group-hover:scale-110 ${
                                            item.special ? 'text-2xl' : 'text-lg'
                                        }`} />
                                        <span className="text-sm lg:text-base ">{item.text}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation section */}
                    <div className={`transition-all duration-1000 delay-600 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h3 className="text-xl font-semibold mb-6 text-white border-b-2 tracking-widest border-yellow-400 pb-2 inline-block">
                            The Hotel
                        </h3>
                        <ul className="space-y-3">
                            {navigationItems.map((item, index) => (
                                <li key={index} className="group">
                                    <Link 
                                        to={item.link}
                                        className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 text-sm lg:text-base relative"
                                    >
                                        <span className="relative z-10 font-display leading-snug tracking-widest">{item.text}</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social media section */}
                    <div className={`transition-all duration-1000 delay-800 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h3 className="text-xl font-semibold mb-6 tracking-widest text-white border-b-2 border-yellow-400 pb-2 inline-block">
                            Follow Us
                        </h3>
                        <div className="flex flex-row space-x-6">
                            {socialItems.map((item, index) => (
                                <Link 
                                    key={index}
                                    to={item.link}
                                    className={`text-gray-300 ${item.color} transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 p-2 rounded-full hover:bg-white/10`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <item.icon className="text-2xl" />
                                </Link>
                            ))}
                        </div>
                        
                        {/* Newsletter signup */}
                        <div className="mt-8">
                            <h4 className="text-lg font-medium text-white mb-4 tracking-widest font-display">Stay Updated</h4>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 font-display bg-white/10 text-white placeholder-gray-400 rounded-sm border border-white/20 focus:outline-none focus:border-1 focus:ring-1 focus:ring-yellow-400 transition-all duration-300"
                                />
                                <button className="px-5 py-1 bg-[#C3A165] text-md text-white font-display cursor-pointer font-medium rounded-sm hover:bg-[#B0905B]transition-all duration-300 transform hover:scale-105">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section with copyright */}
                <div className={`mt-12 pt-8 border-t border-white/20 transition-all duration-1000 delay-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0 font-display">
                            © {new Date().getFullYear()} Hotel Kusum Airport. All rights reserved.
                        </p>
                        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                            <p className="text-gray-400 font-display hover:text-white transition-colors duration-300">Design and Develop by <span><Link to='https://ganeshthapa26.com.np/' target="_blank" rel="noopener noreferrer">Ganesh Thapa</Link></span></p>
                        </div>
                        <div className="flex space-x-6 font-display text-sm">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 rounded-4xl bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-400"></div>
        </footer>
    );
};