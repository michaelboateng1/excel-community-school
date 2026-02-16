/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import schoolCompound from "../assets/images/schoolCompound.jpg";
import showcase from "../assets/images/showcase.jpg";
import graduation from "../assets/images/graduation.jpg";
import showcase2 from "../assets/images/showcase2.jpg";
import schoolQuiz from "../assets/images/smartibeQuiz.jpg";

const IMAGES = [schoolCompound, schoolQuiz, showcase, graduation, showcase2];

const BackgroundSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 7000); // Slightly longer interval for a more relaxed feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#011c4f]">
      {/* 
        Removed mode="wait" to enable simultaneous cross-fading.
        This prevents the "black flash" gap between images.
      */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 0.7, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          transition={{
            duration: 2.5,
            ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier for high-end feel
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={IMAGES[index]} alt="School background" className="w-full h-full object-cover object-center will-change-transform" />
        </motion.div>
      </AnimatePresence>

      {/* Overlays for readability - adjusted for better contrast with the images */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e]/90 via-black/40 to-[#050505]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/90 pointer-events-none" />

      {/* Bottom vignette to help footer readability */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};

export default BackgroundSlider;
