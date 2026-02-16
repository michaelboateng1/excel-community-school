import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Globe, Zap, Users, Heart, GraduationCap, Menu, X, Calendar, ChevronLeft, ChevronRight, Award, ShieldCheck } from "lucide-react";
import BackgroundSlider from "../components/BackgroundSlider";
import GradientText from "../components/GlitchText";
import CustomCursor from "../components/CustomCursor";
import CTA from "../components/CTA";

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
      <header className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl">
          {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="flex items-center gap-4 text-xs md:text-sm font-mono text-[#ccdcf9] tracking-[0.4em] uppercase mb-6 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <span>Est. 2025</span>
            <span className="w-1.5 h-1.5 bg-[#4fb7b3] rounded-full animate-pulse" />
            <span>Tokyo Campus</span>
          </motion.div> */}

          <div className="relative w-full">
            <GradientText text="THE FUTURE" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter" />
            <GradientText text="OF LEARNING" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter block mt-2" />
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }} className="w-full max-w-lg h-px bg-gradient-to-r from-[#4376d3] via-[#d6e3f9]/50 to-transparent mt-12 mb-8" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="text-lg md:text-2xl font-light max-w-xl mx-auto text-white/80 leading-relaxed drop-shadow-2xl">
            Excel Community School: Inspiring excellence and shaping confident, innovative leaders for tomorrow.
          </motion.p>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} onClick={() => scrollToSection("campus")} className="mt-12 group flex flex-col items-center gap-4 cursor-pointer bg-transparent border-none text-white/50 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-[0.3em] font-bold">Discover More About us</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-16 bg-gradient-to-b from-[#d6e3f9] to-transparent" />
          </motion.button>
        </motion.div>
      </header>

      {/* FACULTY / PHILOSOPHY SECTION */}
      <section id="faculty" className="relative z-10 py-24 md:py-40 border-t border-white/10 bg-[#011c4f]/20">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-8 leading-tight">
                Our <br /> <GradientText text="STORY" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed">At Excel Community School, we are committed to inspiring excellence in every learner. Our journey is rooted in strong academic foundations, character development, and a vibrant community spirit that empowers children to grow with confidence and purpose.</p>

              <div className="space-y-10">
                {[
                  { icon: BookOpen, title: "Academic Excellence", desc: "A strong and structured curriculum designed to build confident readers, critical thinkers, and problem solvers." },
                  { icon: Heart, title: "Character & Values", desc: "We nurture integrity, respect, responsibility, and compassion to shape well-rounded individuals." },
                  { icon: Users, title: "Community & Growth", desc: "A supportive environment where students, teachers, and families work together to help every child thrive." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[#ccdcf9]">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 font-heading">{item.title}</h4>
                      <p className="text-base text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[500px] md:h-[800px] w-full">
              <div className="absolute inset-0 bg-[#ccdcf9]/10 blur-[100px] -z-10 rounded-full" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                <img src={assemblyImage} alt="Students collaborating" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="text-sm font-mono text-[#ccdcf9] mb-2 uppercase tracking-widest">Campus Life</div>
                  <div className="text-3xl font-heading font-bold text-white uppercase"> Learning. Growing. Excelling.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS / CAMPUS SECTION */}
      <section id="campus" className="relative z-10 py-24 md:py-40 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
            <h2 className="text-5xl md:text-6xl font-heading font-bold uppercase leading-none">
              Meet Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#abc7fc] to-[#6383bf]">Bright Students</span>
            </h2>
            <p className="max-w-md text-white/50 text-right hidden md:block pb-2">Our students are the heart of our community. From creativity to leadership, each learner brings unique talents, curiosity, and passion that make our school vibrant and inspiring every day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10">
            {HIGHLIGHTS.map((h) => (
              <motion.div key={h.id} onClick={() => setSelectedHighlight(h)} className="group relative h-[450px] md:h-[550px] border border-white/10 overflow-hidden cursor-pointer" whileHover="hover" data-hover="true">
                <motion.img
                  src={h.image}
                  alt={h.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  variants={{
                    hover: { scale: 1.1, filter: "brightness(0.6)" },
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ccdcf9] bg-black/40 self-start px-3 py-1 rounded-full border border-white/10">{h.tag}</span>
                  <div>
                    <h3 className="text-3xl font-heading font-bold uppercase mb-2 group-hover:text-[#ccdcf9] transition-colors">{h.name}</h3>
                    <p className="text-sm text-white/60 line-clamp-2">{h.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />

      {/* LeaderSHip SECTION */}
      <section id="leadship" className="relative z-10 py-24 md:py-40 px-6 bg-black/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-[10rem] font-heading font-bold opacity-10 text-white leading-none">Leadership</h2>
            <p className="text-[#ccdcf9] font-mono uppercase tracking-[0.5em] -mt-8 md:-mt-16 relative z-10 text-sm md:text-xl">Meet Our School Leaders</p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Undergraduate", focus: "Foundation & Mastery", duration: "4 Years", accent: "bg-white/5" },
              { name: "Masters/PhD", focus: "Specialized Innovation", duration: "2-5 Years", accent: "bg-[#4fb7b3]/10 border-[#4fb7b3]/30" },
              { name: "Exec Scholar", focus: "Rapid Digital Leap", duration: "6 Months", accent: "bg-[#637ab9]/10 border-[#637ab9]/30" },
            ].map((program, i) => (
              <motion.div key={i} whileHover={{ y: -15, borderColor: "rgba(255,255,255,0.4)" }} className={`p-12 border border-white/10 backdrop-blur-md flex flex-col transition-all duration-500 ${program.accent}`}>
                <h3 className="text-3xl font-heading font-bold mb-6">{program.name}</h3>
                <div className="mb-12">
                  <div className="text-sm text-white/50 uppercase tracking-widest mb-1">Focus</div>
                  <div className="text-xl font-medium">{program.focus}</div>
                </div>
                <div className="mb-12">
                  <div className="text-sm text-white/50 uppercase tracking-widest mb-1">Duration</div>
                  <div className="text-xl font-medium">{program.duration}</div>
                </div>

                <ul className="space-y-4 text-sm text-white/60 mb-12">
                  <li className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#ccdcf9]" /> Global Accreditation
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#ccdcf9]" /> Peer-to-Peer Labs
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-[#ccdcf9]" /> Industry Fast-Track
                  </li>
                </ul>

                <button
                  onClick={handleApply}
                  disabled={applying || applied}
                  className={`w-full py-5 text-sm font-bold uppercase tracking-[0.3em] border border-white/20 transition-all duration-500 group relative overflow-hidden
                    ${applied ? "bg-[#ccdcf9] text-black border-[#ccdcf9]" : "hover:bg-white hover:text-black"}
                  `}
                >
                  <span className="relative z-10">{applying ? "Processing..." : applied ? "Request Sent" : "Request Info"}</span>
                  {!applied && !applying && <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 -z-0" />}
                </button>
              </motion.div>
            ))}
          </div> */}
          <Leadership />
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedHighlight && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedHighlight(null)} className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <button onClick={() => setSelectedHighlight(null)} className="absolute top-6 right-6 z-20 p-2 text-white/50 hover:text-white transition-colors" data-hover="true">
                <X className="w-8 h-8" />
              </button>

              <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative">
                <AnimatePresence mode="wait">
                  <motion.img key={selectedHighlight.id} src={selectedHighlight.image} alt={selectedHighlight.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 w-full h-full object-cover" />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-[#ccdcf9] mb-6">
                  <div className="w-10 h-px bg-[#ccdcf9]/50" />
                  <span className="font-mono text-sm uppercase tracking-widest">{selectedHighlight.category}</span>
                </div>

                <h3 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-6">{selectedHighlight.name}</h3>
                <p className="text-xl text-white/60 leading-relaxed font-light mb-12">{selectedHighlight.description}</p>

                <div className="flex gap-4">
                  <button onClick={() => navigateHighlight("prev")} className="p-4 border border-white/10 hover:bg-white/5 transition-colors" data-hover="true">
                    <ChevronLeft />
                  </button>
                  <button onClick={() => navigateHighlight("next")} className="p-4 border border-white/10 hover:bg-white/5 transition-colors" data-hover="true">
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admission;
