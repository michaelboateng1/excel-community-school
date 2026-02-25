import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Globe, Zap, Users, Heart, GraduationCap, Menu, X, Calendar, ChevronLeft, ChevronRight, Award, ShieldCheck } from "lucide-react";
import BackgroundSlider from "../components/BackgroundSlider";
import GradientText from "../components/GlitchText";
import CustomCursor from "../components/CustomCursor";

import TawkChat from "@/components/TawkChat";

import schoolLogo from "../assets/images/schoolLogo.jpg";

import studentImage1 from "../assets/images/studentImage1.jpg";
import studentImage2 from "../assets/images/studentImage2.jpg";
import studentImage3 from "../assets/images/studentImage3.jpg";
import studentImage4 from "../assets/images/studentImage4.jpg";
import studentImage5 from "../assets/images/studentImage5.jpg";
import studentImage6 from "../assets/images/studentImage6.jpg";
import studentImage7 from "../assets/images/studentImage7.jpg";
import studentImage8 from "../assets/images/studentImage8.jpg";
import studentImage9 from "../assets/images/studentImage9.jpg";
import studentImage10 from "../assets/images/studentImage10.jpg";
import studentImage11 from "../assets/images/studentImage11.jpg";
import studentImage12 from "../assets/images/studentImage12.jpg";
import studentImage13 from "../assets/images/studentImage13.jpg";
import schoolQuiz from "../assets/images/smartibeQuiz.jpg";

import assemblyImage from "../assets/images/assembly2.jpg";
import schoolCompund from "../assets/images/schoolCompound.jpg";
import welcomeBack from "../assets/images/welcome_back_to_school.jpg";
import studentsGraduationImage from "../assets/images/studentsGraduationImage.jpg";
import studentsDance from "../assets/images/studentsDance.jpg";
import studentsDance2 from "../assets/images/studentsDance2.jpg";

const featured = [
  {
    id: "1",
    name: "Dedicated Scholars",
    category: "Academics",
    tag: "Excellence",
    image: schoolLogo,
    description: "Focused and disciplined, our scholars embrace every lesson with determination, curiosity, and a commitment to academic excellence.",
  },
  {
    id: "2",
    name: "Creative Innovators",
    category: "Creativity",
    tag: "Imagination",
    image: studentImage1,
    description: "Through art, ideas, and bold thinking, our students confidently express themselves and transform imagination into meaningful impact.",
  },
  {
    id: "3",
    name: "Curious Thinkers",
    category: "Discovery",
    tag: "Exploration",
    image: schoolQuiz,
    description: "Driven by inquiry and a passion to understand more, our learners explore new concepts and grow through every challenge.",
  },
  {
    id: "4",
    name: "Aspiring Leaders",
    category: "Leadership",
    tag: "Vision",
    image: studentImage2,
    description: "With confidence and purpose, students develop leadership qualities that prepare them to inspire and guide others in the future.",
  },
  {
    id: "5",
    name: "Active Achievers",
    category: "Wellness",
    tag: "Energy",
    image: studentImage3,
    description: "Balancing academics and physical activity, our students build resilience, teamwork, and a strong foundation for lifelong wellness.",
  },
  {
    id: "6",
    name: "Collaborative Learners",
    category: "Community",
    tag: "Unity",
    image: studentImage5,
    description: "We cultivate respect and cooperation, encouraging students to support one another and thrive in a united school community.",
  },
  {
    id: "7",
    name: "Future Trailblazers",
    category: "Ambition",
    tag: "Purpose",
    image: studentImage6,
    description: "Motivated by big dreams and strong values, our students are building pathways toward a successful and impactful future.",
  },
  {
    id: "8",
    name: "Confident Performers",
    category: "Expression",
    tag: "Confidence",
    image: studentImage4,
    description: "Whether on stage or in the classroom, our students shine with confidence, courage, and the ability to share their talents boldly.",
  },
];

// School Data
const gallery = [
  {
    id: "1",
    name: "Focused Scholars",
    category: "Academics",
    tag: "Determined",
    image: studentsGraduationImage,
    description: "A dedicated learner who approaches every lesson with curiosity, discipline, and a strong desire to succeed.",
  },
  {
    id: "2",
    name: "Creative Minds",
    category: "Creativity",
    tag: "Expression",
    image: assemblyImage,
    description: "Expressing imagination with confidence, this student brings fresh ideas and creativity into every activity.",
  },
  {
    id: "3",
    name: "Curious Explorers",
    category: "Discovery",
    tag: "Inquisitive",
    image: schoolCompund,
    description: "Always asking questions and seeking understanding, this learner embraces every opportunity to grow and improve.",
  },
  {
    id: "4",
    name: "Future Achievers",
    category: "Ambition",
    tag: "Goal-Driven",
    image: welcomeBack,
    description: "With big dreams and steady effort, this student is building a strong foundation for a bright future.",
  },
  {
    id: "5",
    name: "Active Champions",
    category: "Wellness",
    tag: "Energetic",
    image: studentsDance,
    description: "Balanced and disciplined, this student values both academic growth and physical development.",
  },
  {
    id: "6",
    name: "Team Players",
    category: "Community",
    tag: "Unity",
    image: studentsDance2,
    description: "We nurture respect, cooperation, and empathy, helping students grow together in a supportive and inspiring environment.",
  },
];

const Gallery: React.FC = () => {
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
    const currentIndex = gallery.findIndex((h) => h.id === selectedHighlight.id);
    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % gallery.length;
    } else {
      nextIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    }
    setSelectedHighlight(gallery[nextIndex]);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
      <CustomCursor />
      <BackgroundSlider />

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl">
          <div className="relative w-full">
            <GradientText text="OUR SCHOOL" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter" />
            <GradientText text="IN ACTION" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter block mt-2" />
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }} className="w-full max-w-lg h-px bg-gradient-to-r from-[#4376d3] via-[#d6e3f9]/50 to-transparent mt-12 mb-8" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="text-lg md:text-2xl font-light max-w-xl mx-auto text-white/80 leading-relaxed drop-shadow-2xl">
            Explore moments of learning, creativity, leadership, and celebration at Excel Community School. Our gallery captures the vibrant experiences that shape confident and successful students.
          </motion.p>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} onClick={() => scrollToSection("campus")} className="mt-12 group flex flex-col items-center gap-4 cursor-pointer bg-transparent border-none text-white/50 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-[0.3em] font-bold">View Our Moments</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-16 bg-gradient-to-b from-[#d6e3f9] to-transparent" />
          </motion.button>
        </motion.div>
      </header>

      {/* FEATURES SECTION */}
      <section className="relative z-10 py-24 md:py-40 px-4 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-none mb-4">
              Discover Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#abc7fc] to-[#6383bf]">Unique Experiences</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[350px]">
            {featured.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className={`relative overflow-hidden rounded-lg cursor-pointer group ${index === 0 ? "md:col-span-2 md:row-span-2" : index === 3 ? "md:col-span-2" : ""}`} whileHover={{ y: -8 }}>
                <motion.img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" whileHover={{ scale: 1.15 }} transition={{ duration: 0.6 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ccdcf9] mb-2">{item.tag}</span>
                  <h3 className="text-2xl font-heading font-bold uppercase mb-2">{item.name}</h3>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS / CAMPUS SECTION */}
      <section id="campus" className="relative z-10 py-24 md:py-40 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-none">
              Explore Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#abc7fc] to-[#6383bf]">School Moments</span>
            </h2>
            <p className="max-w-md text-white/50 text-right hidden md:block pb-2">Step into the vibrant life of Excel Community School. From academic achievements to creative showcases and community celebrations, our gallery captures the experiences that shape confident, inspired learners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10">
            {gallery.map((h) => (
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
              </motion.div>
            ))}
          </div>
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
                  <motion.img key={selectedHighlight.id} src={selectedHighlight.image} alt={selectedHighlight.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute w-full h-full object-cover" />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                {/* <div className="flex items-center gap-4 text-[#ccdcf9] mb-6">
                  <div className="w-10 h-px bg-[#ccdcf9]/50" />
                  <span className="font-mono text-sm uppercase tracking-widest">{selectedHighlight.category}</span>
                </div> */}

                <h3 className="text-5xl md:text-6xl font-heading font-bold uppercase mb-6">{selectedHighlight.name}</h3>
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

      <TawkChat />
    </div>
  );
};

export default Gallery;
