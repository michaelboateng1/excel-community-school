import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import BackgroundSlider from "../components/BackgroundSlider";
import GradientText from "../components/GlitchText";
import CustomCursor from "../components/CustomCursor";
import TawkChat from "@/components/TawkChat";
import assemblyImage from "../assets/images/assembly2.jpg";
import { getAllNews } from "../services/databaseService";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [article, setArticle] = useState<any>(null);
  const [allNews, setAllNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const [newsData, error, newsLoading] = await getAllNews();
    setAllNews(newsData || []);

    if (newsData && id) {
      const foundArticle = newsData.find((item: any) => item.id === id);
      setArticle(foundArticle || null);
    }

    setLoading(newsLoading);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
        <CustomCursor />
        <BackgroundSlider />
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-300 text-2xl">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
        <CustomCursor />
        <BackgroundSlider />
        <div className="h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-gray-300 text-2xl">Article not found</p>
          <button onClick={() => navigate("/all-news")} className="bg-white text-[#011c4f] font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Back to News
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = allNews.findIndex((item: any) => item.id === id);
  const previousArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null;
  const nextArticle = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;

  // Get the HTML content from available fields
  const getHtmlContent = () => {
    const htmlContent = article.body || article.content || article.description || article.excerpt || null;
    console.log("Article fields:", { body: article.body, content: article.content, description: article.description, excerpt: article.excerpt });
    return htmlContent;
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
      <CustomCursor />
      <BackgroundSlider />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button onClick={() => navigate("/all-news")} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
          <ChevronLeft width={20} height={20} />
          Back
        </button>
      </div>

      {/* Article Header */}
      <header className="relative pt-32 pb-16 px-4 lg:pt-32">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">{article.title}</h1>
            <p className="text-lg text-gray-300 mb-4">{article.date}</p>
          </motion.div>
        </div>
      </header>

      {/* Article Image */}
      <div className="relative h-96 md:h-[500px] w-full mb-12 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-4xl mx-auto h-full">
          <img src={article.image_url || assemblyImage} alt={article.title} className="w-full h-full object-cover rounded-xl shadow-2xl" />
        </motion.div>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-invert max-w-none">
          {/* Full Content - Quill HTML Body */}
          <div className="ql-editor text-gray-300 text-lg leading-relaxed">{getHtmlContent() ? <div dangerouslySetInnerHTML={{ __html: getHtmlContent() }} /> : <p className="text-gray-200">{article.excerpt}</p>}</div>
        </motion.article>

        {/* Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previousArticle ? (
              <button onClick={() => navigate(`/news/${previousArticle.id}`)} className="group text-left bg-white/5 border border-white/20 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <p className="text-sm text-gray-400 mb-2">← Previous Article</p>
                <p className="text-white font-semibold group-hover:text-gray-200 transition-colors">{previousArticle.title}</p>
              </button>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <button onClick={() => navigate(`/news/${nextArticle.id}`)} className="group text-right bg-white/5 border border-white/20 rounded-lg p-6 hover:bg-white/10 transition-colors md:col-start-2">
                <p className="text-sm text-gray-400 mb-2">Next Article →</p>
                <p className="text-white font-semibold group-hover:text-gray-200 transition-colors">{nextArticle.title}</p>
              </button>
            ) : (
              <div />
            )}
          </div>
        </motion.div>

        {/* Related Articles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allNews
              .filter((item: any) => item.id !== id)
              .slice(0, 3)
              .map((relatedArticle: any) => (
                <button key={relatedArticle.id} onClick={() => navigate(`/news/${relatedArticle.id}`)} className="group text-left bg-[#011c4f]/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="h-40 bg-black w-full mb-4 rounded-lg overflow-hidden">
                    <img src={relatedArticle.image_url || assemblyImage} alt={relatedArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">{relatedArticle.title}</h3>
                  <p className="text-sm text-gray-400">{relatedArticle.date}</p>
                </button>
              ))}
          </div>
        </motion.div>
      </main>

      <TawkChat />
    </div>
  );
};

export default NewsDetail;
