import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, Calendar, User, Clock, X } from "lucide-react";
import TextEditor from "@/components/TextEditor";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  views: number;
  category: string;
  body: string;
}

const NewsManagement: React.FC = () => {
  const [content, setContent] = useState("");

  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: 1,
      title: "Summer Festival 2026 Announced",
      excerpt: "Join us for the most exciting festival of the year...",
      date: "2026-02-15",
      views: 1234,
      category: "Announcements",
      body: "somthing",
    },
    {
      id: 2,
      title: "New Scholarship Program",
      excerpt: "We are proud to announce our new scholarship initiative...",
      date: "2026-02-10",
      views: 856,
      category: "Scholarships",
      body: "somthing",
    },
    {
      id: 3,
      title: "Campus Expansion Project",
      excerpt: "Work begins on our exciting new campus facilities...",
      author: "Sarah Smith",
      date: "2026-02-08",
      views: 432,
      status: "draft",
      category: "News",
      body: "somthing",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "",
    body: "",
  });

  const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.author.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddArticle = () => {
    if (formData.title && formData.excerpt) {
      if (editingId) {
        setArticles(
          articles.map((a) =>
            a.id === editingId
              ? {
                  ...a,
                  ...formData,
                }
              : a,
          ),
        );
        setEditingId(null);
      } else {
        setArticles([
          ...articles,
          {
            id: Math.max(...articles.map((a) => a.id), 0) + 1,
            ...formData,
            date: new Date().toISOString().split("T")[0],
            views: 0,
            status: "draft",
          },
        ]);
      }
      setFormData({ title: "", excerpt: "", author: "", category: "" });
      setShowForm(false);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      body: article.body,
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* <div>
          <h1 className="text-3xl font-bold">News Management</h1>
          <p className="text-gray-400 mt-1">Manage all news articles and announcements</p>
        </div> */}

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full text-[#333] placeholder:text-[#9a999b] pl-12 pr-4 py-3  border border-gray-600/20 rounded-lg focus:outline-none focus:border-gray-500 transition" />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingId(null);
            setFormData({ title: "", excerpt: "", author: "", category: "" });
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#011c4f] rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          New Article
        </motion.button>
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-[#011c4f] border border-purple-500/20 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingId ? "Edit Article" : "New Article"}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition" placeholder="Article title" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition"
                      placeholder="Category"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <input type="text" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition" placeholder="Article excerpt" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Article Body</label>
                  {/* <textarea value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition resize-none" placeholder="Article Body" rows={4} /> */}
                  <TextEditor value={formData.body} onChange={(content) => setFormData({ ...formData, body: content })} placeholder="Write your article post..." />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddArticle} className="flex-1 px-4 py-2 bg-white text-[#011c4f] rounded-lg font-semibold hover:shadow-sm transition-all">
                    {editingId ? "Update Article" : "Create Article"}
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all">
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Articles List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-400 text-lg">No articles found</p>
            <p className="text-gray-500 text-sm mt-2">Create your first article</p>
          </div>
        ) : (
          filteredArticles.map((article, index) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-6 rounded-xl bg-white drop-shadow-md border border-gray-500/20 hover:border-gray-500/40 transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#011c4f] transition-colors">{article.title}</h3>
                    {/* <span className={`px-3 py-1 rounded-full text-xs font-semibold ${article.status === "published" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"}`}>{article.status}</span> */}
                  </div>

                  <p className="text-gray-400 text-sm mb-3">{article.excerpt}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    {/* <div className="flex items-center gap-1">
                      <User size={14} />
                      {article.author}
                    </div> */}
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      {article.views} views
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 sm:flex-col">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleEdit(article)} className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition" title="Edit">
                    <Edit2 size={18} />
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(article.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition" title="Delete">
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default NewsManagement;
