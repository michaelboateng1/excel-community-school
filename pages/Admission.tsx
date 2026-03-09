import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Globe, Zap, Users, Heart, GraduationCap, Menu, X, Calendar, ChevronLeft, ChevronRight, Award, ShieldCheck } from "lucide-react";
import BackgroundSlider from "../components/BackgroundSlider";
import GradientText from "../components/GlitchText";
import CustomCursor from "../components/CustomCursor";

import TawkChat from "@/components/TawkChat";

import AdmissionsIntro from "../components/Admissions/Intro";
import AdmissionsTimeline from "../components/Admissions/AdmissionProcess";
import RequirementsSection from "@/components/Admissions/Requirements";
import CampusVisitComponent from "@/components/Admissions/Visit";

import assemblyImage from "../assets/images/assembly2.jpg";

import studentImage9 from "../assets/images/studentImage9.jpg";
import studentImage10 from "../assets/images/studentImage10.jpg";
import studentImage11 from "../assets/images/studentImage11.jpg";
import studentImage12 from "../assets/images/studentImage12.jpg";
import studentImage13 from "../assets/images/studentImage13.jpg";
import schoolQuiz from "../assets/images/smartibeQuiz.jpg";

import Leadership from "@/components/Leadership";

// School Data
const HIGHLIGHTS = [
  {
    id: "1",
    name: "Focused Scholars",
    category: "Academics",
    tag: "Determined",
    image: studentImage9,
    description: "A dedicated learner who approaches every lesson with curiosity, discipline, and a strong desire to succeed.",
  },
  {
    id: "2",
    name: "Creative Minds",
    category: "Creativity",
    tag: "Expression",
    image: studentImage10,
    description: "Expressing imagination with confidence, this student brings fresh ideas and creativity into every activity.",
  },
  {
    id: "3",
    name: "Curious Explorers",
    category: "Discovery",
    tag: "Inquisitive",
    image: schoolQuiz,
    description: "Always asking questions and seeking understanding, this learner embraces every opportunity to grow and improve.",
  },
  {
    id: "4",
    name: "Future Achievers",
    category: "Ambition",
    tag: "Goal-Driven",
    image: studentImage11,
    description: "With big dreams and steady effort, this student is building a strong foundation for a bright future.",
  },
  {
    id: "5",
    name: "Active Champions",
    category: "Wellness",
    tag: "Energetic",
    image: studentImage12,
    description: "Balanced and disciplined, this student values both academic growth and physical development.",
  },
  {
    id: "6",
    name: "Team Players",
    category: "Community",
    tag: "Unity",
    image: studentImage13,
    description: "We nurture respect, cooperation, and empathy, helping students grow together in a supportive and inspiring environment.",
  },
];

const Admission: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const [applied, setApplied] = useState<boolean>(false);
  const [applying, setApplying] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedHighlight) return;
      if (e.key === "ArrowLeft") navigateHighlight("prev");
      if (e.key === "ArrowRight") navigateHighlight("next");
      if (e.key === "Escape") setSelectedHighlight(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedHighlight]);

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
    }, 2000);
  };

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

  const navigateHighlight = (direction: "next" | "prev") => {
    if (!selectedHighlight) return;
    const currentIndex = HIGHLIGHTS.findIndex((h) => h.id === selectedHighlight.id);
    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % HIGHLIGHTS.length;
    } else {
      nextIndex = (currentIndex - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length;
    }
    setSelectedHighlight(HIGHLIGHTS[nextIndex]);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
      <CustomCursor />
      <BackgroundSlider />

      {/* Navigation */}
      {/* <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference"> */}
      {/* <div className="font-heading text-xl md:text-2xl font-bold tracking-tight text-white cursor-default z-50">AETHER ACADEMY</div> */}

      {/* Desktop Menu */}
      {/* <div className="hidden md:flex gap-12 text-sm font-bold tracking-widest uppercase">
          {["Campus", "Faculty", "Admissions"].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-[#ccdcf9] transition-colors text-white cursor-pointer bg-transparent border-none" data-hover="true">
              {item}
            </button>
          ))}
        </div>
        <button onClick={() => scrollToSection("admissions")} className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent" data-hover="true">
          Enroll Now
        </button> */}

      {/* Mobile Menu Toggle */}
      {/* <button className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button> */}
      {/* </nav> */}

      {/* Mobile Menu Overlay */}
      {/* <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-30 bg-[#1a1c4b]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
            {["Campus", "Faculty", "Admissions"].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-4xl font-heading font-bold text-white hover:text-[#ccdcf9] transition-colors uppercase bg-transparent border-none">
                {item}
              </button>
            ))}
            <button onClick={() => scrollToSection("admissions")} className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black">
              Start Application
            </button>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden px-4 lg:pt-32">
        <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl">
          {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="flex items-center gap-4 text-xs md:text-sm font-mono text-[#ccdcf9] tracking-[0.4em] uppercase mb-6 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <span>Est. 2025</span>
            <span className="w-1.5 h-1.5 bg-[#4fb7b3] rounded-full animate-pulse" />
            <span>Tokyo Campus</span>
          </motion.div> */}

          <div className="relative w-full">
            <GradientText text="YOUR JOURNEY" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter" />
            <GradientText text="STARTS HERE" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter block mt-2" />
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }} className="w-full max-w-lg h-px bg-gradient-to-r from-[#4376d3] via-[#d6e3f9]/50 to-transparent mt-12 mb-8" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="text-lg md:text-2xl font-light max-w-xl mx-auto text-white/80 leading-relaxed drop-shadow-2xl">
            Secure your child's future at Excell Community School. We inspire excellence and shape the innovative leaders of tomorrow.
          </motion.p>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} onClick={() => scrollToSection("campus")} className="mt-12 group flex flex-col items-center gap-4 cursor-pointer bg-transparent border-none text-white/50 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-[0.3em] font-bold">How To Apply</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-16 bg-gradient-to-b from-[#d6e3f9] to-transparent" />
          </motion.button>
        </motion.div>
      </header>

      <AdmissionsIntro />

      <RequirementsSection />

      <AdmissionsTimeline />
      <CampusVisitComponent />

      <TawkChat />
    </div>
  );
};

export default Admission;
