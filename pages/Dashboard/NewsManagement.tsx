import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, Calendar, User, X, Upload, AlertCircle } from "lucide-react";
import TextEditor from "@/components/TextEditor";
import { uploadImageToSupabase, deleteImageByUrl } from "@/libs/imageUpload";
import { createNewsArticle, updateNewsArticle, deleteNewsArticle, fetchAllNewsArticles, NewsFormData } from "@/libs/newsCrudService";
import { NewsArticle } from "@/services/databaseService";

const NewsManagement: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [crudError, setCrudError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    excerpt: "",
    author: "",
    category: "",
    body: "",
    imageUrl: "",
    status: "draft",
  });

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetchAllNewsArticles();
        if (response.success && response.data) {
          setArticles(response.data);
        } else {
          setCrudError(response.error || "Failed to fetch articles");
        }
      } catch (error) {
        setCrudError(error instanceof Error ? error.message : "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Delete previous image if it exists
      if (formData.imageUrl && formData.imageUrl.trim() !== "") {
        deleteImageByUrl(formData.imageUrl, {
          bucket: "news-images",
          onDeleteError: (error) => console.warn("Failed to delete previous image:", error),
        });
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload immediately
      uploadImageToSupabase(file, {
        onUploadStart: () => setUploadingImage(true),
        onUploadSuccess: (url) => {
          setFormData((prev) => ({ ...prev, imageUrl: url }));
          setUploadError(null);
        },
        onUploadError: (error) => setUploadError(error),
        onUploadComplete: () => setUploadingImage(false),
      });
    }
  };

  const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()) || (article.author && article.author.toLowerCase().includes(searchTerm.toLowerCase())));

  const handleAddArticle = async () => {
    if (!formData.title || !formData.excerpt) {
      setCrudError("Title and excerpt are required");
      return;
    }

    if (uploadingImage) {
      setCrudError("Please wait for image upload to complete");
      return;
    }

    try {
      setIsSubmitting(true);
      setCrudError(null);
      setSuccessMessage(null);

      let response;
      if (editingId) {
        response = await updateNewsArticle(editingId, formData);
      } else {
        response = await createNewsArticle(formData);
      }

      if (response.success && response.data) {
        // Refresh articles from database
        const fetchResponse = await fetchAllNewsArticles();
        if (fetchResponse.success && fetchResponse.data) {
          setArticles(fetchResponse.data);
        }

        setSuccessMessage(editingId ? "Article updated successfully!" : "Article created successfully!");
        setFormData({ title: "", excerpt: "", author: "", category: "", body: "", imageUrl: "", status: "draft" });
        setImagePreview(null);
        setUploadError(null);
        setEditingId(null);
        setShowForm(false);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setCrudError(response.error || "Failed to save article");
      }
    } catch (error) {
      setCrudError(error instanceof Error ? error.message : "Failed to save article");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      author: article.author || "",
      category: article.category || "",
      body: article.content || "",
      imageUrl: article.image_url || "",
      status: (article.status as "draft" | "published") || "draft",
    });
    if (article.image_url) {
      setImagePreview(article.image_url);
    } else {
      setImagePreview(null);
    }
    setUploadError(null);
    setCrudError(null);
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      setCrudError(null);
      // Find the article to get its image_url
      const article = articles.find((a) => a.id === id);
      console.log(`Deleting article ${id}, image_url:`, article?.image_url);
      const response = await deleteNewsArticle(id, article?.image_url);

      if (response.success) {
        setArticles(articles.filter((a) => a.id !== id));
        setSuccessMessage("Article deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setCrudError(response.error || "Failed to delete article");
      }
    } catch (error) {
      setCrudError(error instanceof Error ? error.message : "Failed to delete article");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", excerpt: "", author: "", category: "", body: "", imageUrl: "", status: "draft" });
    setImagePreview(null);
    setUploadError(null);
    setCrudError(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {crudError && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-400 font-semibold">Error</p>
            <p className="text-red-300 text-sm">{crudError}</p>
          </div>
          <button onClick={() => setCrudError(null)} className="text-red-400 hover:text-red-300">
            <X size={18} />
          </button>
        </motion.div>
      )}

      {/* Success Message */}
      {successMessage && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-sm flex-shrink-0">✓</div>
          <p className="text-green-400 font-semibold">{successMessage}</p>
        </motion.div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Search Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full sm:w-auto">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full text-[#333] placeholder:text-[#9a999b] pl-12 pr-4 py-3 border border-gray-600/20 rounded-lg focus:outline-none focus:border-gray-500 transition" />
        </motion.div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowForm(true)} className="flex items-center gap-2 px-6 py-3 bg-[#011c4f] text-white rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap">
          <Plus size={20} />
          New Article
        </motion.button>
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={resetForm}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-[#011c4f] border border-purple-500/20 rounded-xl p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingId ? "Edit Article" : "New Article"}</h2>
                <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Article Image</label>
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploadingImage} className="hidden" id="image-upload" />
                    <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full px-4 py-6 bg-white/10 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-white/50 transition">
                      {imagePreview ? (
                        <div className="w-full">
                          <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-2" />
                          <p className="text-center text-sm text-gray-300">Click to change image</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-300">Click to upload image</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {uploadError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2">
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{uploadError}</p>
                  </motion.div>
                )}

                {uploadingImage && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-blue-400 text-sm">Uploading image...</p>
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white/15 transition" placeholder="Article title" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input type="text" value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white/15 transition" placeholder="Category" />
                  </div>
                </div>

                {/*<div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <input type="text" value={formData.author} onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-white/15 transition" placeholder="Author name" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as "draft" | "published" }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-white/15 transition">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>*/}

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt *</label>
                  <input type="text" value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white/15 transition" placeholder="Article excerpt" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Article Body</label>
                  <TextEditor value={formData.body} onChange={(content) => setFormData((prev) => ({ ...prev, body: content }))} placeholder="Write your article post..." />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }} onClick={handleAddArticle} disabled={isSubmitting || uploadingImage} className="flex-1 px-4 py-2 bg-white text-[#011c4f] rounded-lg font-semibold hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#011c4f] border-t-transparent rounded-full animate-spin" />
                        {editingId ? "Updating..." : "Creating..."}
                      </>
                    ) : editingId ? (
                      "Update Article"
                    ) : (
                      "Create Article"
                    )}
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={resetForm} disabled={isSubmitting} className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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
        {loading ? (
          <div className="text-center py-12 px-4">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-400 text-lg">No articles found</p>
            <p className="text-gray-500 text-sm mt-2">Create your first article to get started</p>
          </div>
        ) : (
          filteredArticles.map((article, index) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-4 rounded-xl bg-white drop-shadow-md border border-gray-500/20 hover:border-gray-500/40 transition-all group overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Image Thumbnail */}
                {article.image_url && (
                  <div className="sm:w-40 sm:h-40 w-full h-32 flex-shrink-0">
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#011c4f]">{article.title}</h3>
                    {/* {article.status && <span className={`px-3 py-1 rounded-full text-xs font-semibold ${article.status === "published" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"}`}>{article.status}</span>} */}
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    {article.author && (
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {article.author}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    {/* <div className="flex items-center gap-1">
                      <Eye size={14} />
                      {article.views} views
                    </div> */}
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
