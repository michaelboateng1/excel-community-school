import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { div } from "framer-motion/client";

const NavBar = () => {
  return (
    // <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
    //   <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">Excel Community School</div>

    //   {/* Desktop Menu */}
    //   <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
    //     {["Lineup", "Experience", "Tickets"].map((item) => (
    //       <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none" data-hover="true">
    //         {item}
    //       </button>
    //     ))}
    //   </div>
    //   <button onClick={() => scrollToSection("tickets")} className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent" data-hover="true">
    //     Get Tickets
    //   </button>

    //   {/* Mobile Menu Toggle */}
    //   <button className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
    //     {mobileMenuOpen ? <X /> : <Menu />}
    //   </button>
    // </nav>
    <></>
  );
};

export default NavBar;
