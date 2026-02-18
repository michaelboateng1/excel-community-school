import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Ticket, Globe, Bot, Zap, Sparkles, GraduationCap, Cpu, Radical, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { SchooImages } from "../types";

import schoolLogo from "../assets/images/schoolLogo.jpg";

const navigations = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Admissions", href: "/admissions" },
  { name: "News & Events", href: "/news" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact us", href: "/contact" },
];

const NavBar = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6  bg-[#011c4f]">
        <div className="w-10 h-10 md:w-20 md:h-20 relative">
          <img src={schoolLogo} className="w-full h-full object-cover" width="200" height="200" alt="School Logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {navigations.map((nav) => (
            <a key={nav.name} href={nav.href} className="hover:text-[#c1d7ff] transition-colors text-white cursor-pointer bg-transparent border-none" data-hover="true">
              {nav.name}
            </a>
          ))}
        </div>

        <a href="/admissions">
          <button onClick={() => scrollToSection("programs")} className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent" data-hover="true">
            Apply Now
          </button>
        </a>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {/* <AnimatePresence> */}
      {mobileMenuOpen && (
        <div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-30 bg-[#31326f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden">
          {["Home", "About us", "Admissions", "News & Events", "Gallery", "Contact us"].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-2xl font-heading font-bold text-white hover:text-[#c1d7ff] transition-colors uppercase bg-transparent border-none">
              {item}
            </button>
          ))}
          <button onClick={() => scrollToSection("programs")} className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black">
            Apply Now
          </button>

          <div className="absolute bottom-10 flex gap-6">
            <a href="https://www.youtube.com/@ExcelCommunitySchool1" className="text-white/50 hover:text-white transition-colors">
              YouTube
            </a>
          </div>
        </div>
      )}
      {/* </AnimatePresence> */}
    </>
  );
};

export default NavBar;
