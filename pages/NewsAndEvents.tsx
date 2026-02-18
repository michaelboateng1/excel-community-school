import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock2, LocateFixed } from "lucide-react";
import BackgroundSlider from "../components/BackgroundSlider";
import GradientText from "../components/GlitchText";
import CustomCursor from "../components/CustomCursor";

import assemblyImage from "../assets/images/assembly2.jpg";

import studentImage9 from "../assets/images/studentImage9.jpg";
import studentImage10 from "../assets/images/studentImage10.jpg";
import studentImage11 from "../assets/images/studentImage11.jpg";
import studentImage12 from "../assets/images/studentImage12.jpg";
import studentImage13 from "../assets/images/studentImage13.jpg";
import schoolQuiz from "../assets/images/smartibeQuiz.jpg";

import Leadership from "@/components/Leadership";
import { image } from "framer-motion/client";

const Admission: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const [applied, setApplied] = useState<boolean>(false);
  const [applying, setApplying] = useState<boolean>(false);

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

  const newsItems = [
    {
      id: 1,
      title: "Festival Dates Announced",
      date: "March 15, 2024",
      description: "Join us for an unforgettable celebration of music and culture.",
      category: "News",
      image: studentImage9,
    },
    {
      id: 2,
      title: "Early Bird Tickets Now Available",
      date: "March 10, 2024",
      description: "Get 20% off with our exclusive early bird discount.",
      category: "Event",
      image: assemblyImage,
    },
    {
      id: 3,
      title: "Headliner Lineup Revealed",
      date: "March 5, 2024",
      description: "Exciting international and local artists confirmed for 2024.",
      category: "News",
      image: schoolQuiz,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Pre-Festival Meetup",
      date: "April 20, 2024",
      time: "6:00 PM",
      location: "Downtown Square",
    },
    {
      id: 2,
      title: "Festival Main Event",
      date: "May 18-20, 2024",
      time: "All Day",
      location: "Central Park",
    },
    {
      id: 3,
      title: "Post-Festival Celebration",
      date: "May 25, 2024",
      time: "7:00 PM",
      location: "Riverside Venue",
    },
  ];

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
      <CustomCursor />
      <BackgroundSlider />

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl">
          <div className="relative w-full">
            <GradientText text="LATEST NEWS" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter" />
            <GradientText text="& EVENTS" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter block mt-2" />
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }} className="w-full max-w-lg h-px bg-gradient-to-r from-[#4376d3] via-[#d6e3f9]/50 to-transparent mt-12 mb-8" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="text-lg md:text-2xl font-light max-w-xl mx-auto text-white/80 leading-relaxed drop-shadow-2xl">
            Stay connected with everything happening at in our School. From academic achievements and special events to community initiatives and student highlights, discover the moments that shape our vibrant school life.
          </motion.p>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} onClick={() => scrollToSection("campus")} className="mt-12 group flex flex-col items-center gap-4 cursor-pointer bg-transparent border-none text-white/50 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-[0.3em] font-bold">Discover More</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-16 bg-gradient-to-b from-[#d6e3f9] to-transparent" />
          </motion.button>
        </motion.div>
      </header>

      <div className="min-h-screen">
        {/* Header */}
        {/* <div className="bg-black/40 backdrop-blur-sm py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">News & Events</h1>
            <p className="text-xl text-gray-200">Stay updated with the latest festival news and upcoming events</p>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* News Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-8">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newsItems.map((item) => (
                <div key={item.id} className="bg-[#011c4f]/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="h-40 md:h-60 bg-black w-full font-bold mb-8 md:mb-10 tracking-tighter text-white">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{item.date}</p>
                  <p className="text-gray-200">{item.description}</p>
                  <span className="inline-block bg-white text-[#011c4f] text-sm font-semibold px-3 py-1 rounded-full mt-3">View</span>
                </div>
              ))}
            </div>
          </section>

          {/* Events Section */}
          <section>
            <h2 className="text-4xl font-bold text-white mb-8">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-[#011c4f] backdrop-blur-md rounded-lg p-6 border border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-300 mb-2">
                        <CalendarDays className="inline mr-2 w-4 h-4" /> {event.date} • <Clock2 className="inline mx-2 w-4 h-4" /> {event.time}
                      </p>
                      <p className="text-gray-400">
                        <LocateFixed className="inline mr-2 w-4 h-4" /> {event.location}
                      </p>
                    </div>
                    <button className="mt-4 md:mt-0 bg-white text-[#011c4f] font-semibold px-6 py-2 rounded-lg ">Read More</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {/* 
      <AdmissionsIntro />

      <RequirementsSection />

      <AdmissionsTimeline />
      <CampusVisitComponent /> */}
    </div>
  );
};

export default Admission;
