import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Ticket, Globe, Bot, Zap, Sparkles, GraduationCap, Cpu, Radical, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight } from "lucide-react";
import FluidBackground from "../components/FluidBackground";
import GradientText from "../components/GlitchText";
import CustomCursor from "../components/CustomCursor";
import ArtistCard from "../components/ArtistCard";

import TawkChat from "@/components/TawkChat";

import CTA from "@/components/CTA";

import { SchooImages } from "../types";

import schoolLogo from "../assets/images/schoolLogo.jpg";

import classRoomImage1 from "../assets/images/studentsImage3.jpg";
import schoolZoo from "../assets/images/studentsImage2.jpg";
import graduation from "../assets/images/graduation.jpg";
import studentsDancing from "../assets/images/studentsDance.jpg";
import playGround from "../assets/images/showcase.jpg";
import studentsImage from "../assets/images/studentsImage.jpg";

import SchoolQuiz from "../assets/images/smartibeQuiz.jpg";

import abacusTool from "../assets/images/abacusTool.jpg";
import computerLab from "../assets/images/computerLab.png";
import aduinoImage from "../assets/images/aduinoImage.png";

const ScoolImages: SchooImages[] = [
  {
    id: "1",
    title: "Graduation 2025",
    category: "Academic Event",
    day: "AUG 15",
    image: graduation,
    description: "A grand celebration of academic milestones. Witness our students transition to the next phase of their journey with excellence and integrity.",
  },
  {
    id: "2",
    title: "Smart Learning Environments",
    category: "Event",
    day: "DAILY",
    image: classRoomImage1,
    description: "Our classrooms are equipped with smartboards, projectors, and air conditioning to provide a comfortable and technologically advanced space for student growth.",
  },
  {
    id: "3",
    title: "The Campus Mini Zoo",
    category: "Learning",
    day: "MON-FRI",
    image: studentsImage,
    description: "A unique interactive space where students learn about wildlife and conservation. Our mini zoo features both domestic and non-domestic animals for practical biology lessons.",
  },
  {
    id: "4",
    title: "Cultural Dance Performance",
    category: "Ceremony",
    day: "SPECIAL EVENT",
    image: studentsDancing,
    description: "Students showcase vibrant cultural dances during school ceremonies, celebrating creativity, teamwork, and Ghanaian heritage in a joyful atmosphere.",
  },
  {
    id: "5",
    title: "Injury-Free Playground",
    category: "Sports",
    day: "WEEKLY",
    image: playGround,
    description: "Equipped with trampolines, basketball hoops, and safety surfacing, our compound ensures students stay active and safe during physical education.",
  },
  {
    id: "6",
    title: "ICT & Digital Skills",
    category: "Innovation",
    day: "WEEKLY",
    image: schoolZoo,
    description: "From coding to digital literacy, our smart classrooms and ICT labs provide hands-on experience with the latest technology in a fully air-conditioned environment.",
  },
];

const navigations = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Admissions", href: "#admissions" },
  { name: "News & Events", href: "#news" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact us", href: "#contact" },
];

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<SchooImages | null>(null);

  const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
  const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);

  // Handle keyboard navigation for artist modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedArtist) return;
      if (e.key === "ArrowLeft") navigateArtist("prev");
      if (e.key === "ArrowRight") navigateArtist("next");
      if (e.key === "Escape") setSelectedArtist(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArtist]);

  const handlePurchase = (index: number) => {
    setPurchasingIndex(index);
    setTimeout(() => {
      setPurchasingIndex(null);
      setPurchasedIndex(index);
    }, 3500);
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

  const navigateArtist = (direction: "next" | "prev") => {
    if (!selectedArtist) return;
    const currentIndex = ScoolImages.findIndex((a) => a.id === selectedArtist.id);
    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % ScoolImages.length;
    } else {
      nextIndex = (currentIndex - 1 + ScoolImages.length) % ScoolImages.length;
    }
    setSelectedArtist(ScoolImages[nextIndex]);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-auto md:cursor-default overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20">
          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center">
            <GradientText text="Excel Community School" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.9] font-black tracking-tighter text-center" />
            {/* Optimized Orb - Reduced Blur for Performance */}
            <motion.div className="absolute -z-20 w-[50vw] h-[50vw] bg-white/5 blur-[40px] rounded-full pointer-events-none will-change-transform" animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity }} style={{ transform: "translateZ(0)" }} />
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }} className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} className="text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4">
            Empowering the Next Generation of Global Leaders.
          </motion.p>
        </motion.div>

        {/* MARQUEE - SLOWED DOWN for Performance & Aesthetics */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.4)]">
          <motion.div className="flex w-fit will-change-transform" animate={{ x: "-30%" }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-5xl font-heading font-black px-8 flex items-center gap-4">
                    Centre of Excellence <span className="text-black text-2xl md:text-4xl">●</span>
                    Strive to Excel <span className="text-black text-2xl md:text-4xl">●</span>
                    Integrated Learning <span className="text-black text-2xl md:text-4xl">●</span>
                    Excel COmmunity School <span className="text-black text-2xl md:text-4xl">●</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* SchoolImages SECTION */}
      <section id="lineup" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
            <h2 className="text-5xl md:text-6xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              Beyound <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bb9657] to-[#ccc]">Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {ScoolImages.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} onClick={() => setSelectedArtist(artist)} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Decorative blurred circle - Optimized */}
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#ccc]/20 rounded-full blur-[40px] pointer-events-none will-change-transform" style={{ transform: "translateZ(0)" }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                School <br /> <GradientText text="Quiz" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md">The Excel Community School Quiz, powered by SmartTribe, is a fun and competitive academic activity that helps students think critically, work as a team, and build confidence while learning.</p>

              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Bot, title: "Robotics", desc: "Promotes academic excellence." },
                  { icon: Cpu, title: "Coding", desc: "Builds confidence and teamwork." },
                  { icon: Radical, title: "Abacus", desc: "Encourages quick thinking." },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[400px] md:h-[700px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#637ab9] to-[#ccc] rounded-3xl rotate-3 opacity-30 blur-xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img src={SchoolQuiz} alt="Students in the class room" className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 will-change-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="text-5xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 opacity-50">04</div>
                  <div className="text-lg md:text-xl font-bold tracking-widest uppercase mt-2 text-white">Interactive School Quize</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs SECTION */}
      <section id="programs" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-9xl font-heading font-bold opacity-20 text-white">Curricular</h2>
            <p className="text-[#c1d7ff] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">Our other interactive programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Abacus Training", image: abacusTool, color: "white", accent: "bg-white/5" },
              { name: "Coding Training", image: computerLab, color: "teal", accent: "bg-[#ccc]/10 border-[#ccc]/50" },
              { name: "Robotics", image: aduinoImage, color: "periwinkle", accent: "bg-[#637ab9]/10 border-[#637ab9]/50" },
            ].map((program, i) => {
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className={`relative rounded-3xl flex flex-col items-start border ${program.accent} backdrop-blur-sm cursor-pointer group overflow-hidden border-white/10`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <div className={`text-5xl h-40 md:h-60 w-full font-bold mb-8 md:mb-10 tracking-tighter ${program.color === "white" ? "text-white" : program.color === "teal" ? "text-[#ccc]" : "text-[#637ab9]"}`}>
                    <img src={program.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 px-8 pb-8">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">{program.name}</h3>
                    <ul className="space-y-4 md:space-y-6 text-sm text-gray-200">
                      <li className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400" /> Interactive Learning
                      </li>

                      {i <= 1 && (
                        <li className="flex items-center gap-3">
                          <Ticket className="w-5 h-5 text-gray-400" /> All Grades
                        </li>
                      )}
                      {i > 1 && (
                        <li className="flex items-center gap-3 text-white">
                          <Globe className={`w-5 h-5 text-[#ccc]`} /> Grade 1 - Grade 9
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* <button
                    onClick={() => handlePurchase(i)}
                    disabled={isDisabled}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] border border-white/20 transition-all duration-300 mt-8 group overflow-hidden relative 
                      ${isPurchased ? "bg-[#c1d7ff] text-black border-[#c1d7ff] cursor-default" : isPurchasing ? "bg-white/20 text-white cursor-wait" : isDisabled ? "cursor-not-allowed opacity-50" : "text-white cursor-pointer hover:bg-white hover:text-black"}`}
                  >
                    <span className="relative z-10">{isPurchasing ? "Purchasing..." : isPurchased ? "Purchased" : "Purchase"}</span>
                    {!isDisabled && !isPurchased && !isPurchasing && <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />}
                  </button> */}

                  {/* {isPurchased && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-center mt-3 text-white/40 font-mono">
                      Demo site: no purchase was made
                    </motion.p>
                  )} */}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">LUMINA</div>
            <div className="flex gap-2 text-xs font-mono text-gray-400">
              <span>created by @chanelluuh</span>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="https://x.com/GoogleAIStudio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Twitter
            </a>
          </div>
        </div>
      </footer> */}

      {/* CALL TO ACTION SECTION */}
      <CTA />

      {/* Artist Detail Modal */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArtist(null)} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md cursor-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl bg-[#1a1b3b] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#ccc]/10 group/modal">
              {/* Close Button */}
              <button onClick={() => setSelectedArtist(null)} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors" data-hover="true">
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateArtist("prev");
                }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
                aria-label="Previous Artist"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateArtist("next");
                }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
                aria-label="Next Artist"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img key={selectedArtist.id} src={selectedArtist.image} alt={selectedArtist.title} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 w-full h-full object-cover" />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3b] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div key={selectedArtist.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <div className="flex items-center gap-3 text-[#ccc] mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono text-sm tracking-widest uppercase">{selectedArtist.day}</span>
                  </div>

                  <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-none mb-2 text-white">{selectedArtist.title}</h3>

                  <p className="text-lg text-[#c1d7ff] font-medium tracking-widest uppercase mb-6">{selectedArtist.category}</p>

                  <div className="h-px w-20 bg-white/20 mb-6" />

                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">{selectedArtist.description}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TawkChat />
    </div>
  );
};

export default Home;
