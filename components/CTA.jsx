import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="relative z-10 py-24 md:py-40 px-6 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="max-w-4xl mx-auto relative z-10">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-16 rounded-[2rem] text-center relative group">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c1d7ff]/5 to-[#637ab9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />

          {/* <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 text-[#c1d7ff] text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-4 h-4" /> Newsletter Access
            </motion.div> */}

          <h2 className="text-2xl md:text-7xl font-heading font-bold mb-6 leading-none uppercase">Ready to Join Our Learning Community?</h2>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">Take the first step toward a brighter future for your child. At our school, we nurture talent, build confidence, and inspire excellence both in and out of the classroom.</p>

          <AnimatePresence mode="wait">
            {/* {!emailSubscribed ? (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                    <div className="flex-1 relative">
                    <input type="email" required placeholder="Enter your frequency (Email)" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white/5 border border-white/20 px-6 py-4 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#ccc] transition-colors text-lg" />
                    </div>
                    </motion.form>
                    ) : (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 border border-[#c1d7ff]/30 bg-[#c1d7ff]/10 rounded-2xl inline-block">
                <p className="text-[#c1d7ff] text-2xl font-bold uppercase tracking-widest mb-2">Transmission Received</p>
                <p className="text-white/60 text-sm font-mono">You are now part of the void.</p>
                </motion.div>
                )} */}
            <div className="flex justify-center items-center">
              <Link to="/admissions">
                <button type="submit" className="bg-[#ccc] hover:bg-[#c1d7ff] text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group/btn" data-hover="true">
                  Apply <GraduationCap className="w-6 h-6 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </Link>
            </div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Decorative Floating Blobs for CTA */}
      <motion.div className="absolute top-1/2 left-0 w-64 h-64 bg-[#c1d7ff]/10 rounded-full blur-[100px]" animate={{ x: [0, 50, 0], y: [0, -50, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute bottom-0 right-0 w-96 h-96 bg-[#637ab9]/10 rounded-full blur-[120px]" animate={{ x: [0, -70, 0], y: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} />
    </section>
  );
};

export default CTA;
