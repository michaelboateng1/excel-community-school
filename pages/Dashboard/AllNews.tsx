import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BackgroundSlider from "../../components/BackgroundSlider";
import GradientText from "../../components/GlitchText";
import CustomCursor from "../../components/CustomCursor";
import TawkChat from "@/components/TawkChat";
import { useNavigate } from "react-router-dom";

import assemblyImage from "../../assets/images/assembly2.jpg";
import { getAllNews } from "../../services/databaseService";

const ITEMS_PER_PAGE = 9;

const AllNews: React.FC = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [newsItems, setNewsItems] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = async () => {
    const [newsData, error, loading] = await getAllNews();
    setNewsItems(newsData || []);
    setNewsLoading(loading);
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = newsItems.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
      <CustomCursor />
      <BackgroundSlider />

      {/* HERO SECTION */}
      <header className="relative h-[60svh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden px-4 lg:pt-32">
        <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl">
          <div className="relative w-full">
            <GradientText text="ALL NEWS" as="h1" className="text-[11vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter" />
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }} className="w-full max-w-lg h-px bg-gradient-to-r from-[#4376d3] via-[#d6e3f9]/50 to-transparent mt-12 mb-8" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="text-lg md:text-xl font-light max-w-xl mx-auto text-white/80 leading-relaxed drop-shadow-2xl">
            Explore all the latest news and updates from our school community
          </motion.p>
        </motion.div>
      </header>

      <div className="min-h-screen">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* News Section */}
          <section className="mb-20">
            {newsLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-300">Loading news articles...</p>
              </div>
            ) : newsItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No news articles available</p>
              </div>
            ) : (
              <>
                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {currentItems.map((item) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-[#011c4f]/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
                      <div className="h-40 md:h-60 bg-black w-full font-bold mb-8 md:mb-10 tracking-tighter text-white">
                        <img src={item.image_url || assemblyImage} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{item.date}</p>
                      <p className="text-gray-200 mb-4">{item.excerpt}</p>
                      <button onClick={() => navigate(`/news/${item.id}`)} className="inline-block bg-white text-[#011c4f] text-sm font-semibold px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                        View
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button onClick={handlePreviousPage} disabled={currentPage === 1} className="p-2 rounded-lg bg-white/10 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors" aria-label="Previous page">
                        <ChevronLeft width={20} height={20} />
                      </button>

                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button key={page} onClick={() => goToPage(page)} className={`w-10 h-10 rounded-lg font-semibold transition-all ${currentPage === page ? "bg-white text-[#011c4f]" : "bg-white/10 border border-white/20 text-white hover:bg-white/20"}`}>
                            {page}
                          </button>
                        ))}
                      </div>

                      <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-white/10 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors" aria-label="Next page">
                        <ChevronRight width={20} height={20} />
                      </button>
                    </div>

                    <p className="text-gray-300 text-sm">
                      Page {currentPage} of {totalPages} ({newsItems.length} total articles)
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>

      <TawkChat />
    </div>
  );
};

export default AllNews;
