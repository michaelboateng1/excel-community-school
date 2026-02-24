import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Trash2, Edit2, X, Image as ImageIcon, AlertCircle, CheckCircle } from "lucide-react";
import { uploadImageToSupabase } from "../../libs/imageUpload";
import { createGalleryItem, fetchAllGalleryItems, updateGalleryItem, deleteGalleryItem, GalleryFormData } from "../../libs/galleryCrudService";
import { GalleryItem } from "../../services/databaseService";

const GalleryManagement: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [crudError, setCrudError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  // Fetch all gallery items on mount
  useEffect(() => {
    const loadGalleryItems = async () => {
      setLoading(true);
      const result = await fetchAllGalleryItems();
      if (result.success && result.data) {
        setItems(result.data);
      } else {
        setCrudError(result.error || "Failed to load gallery items");
      }
      setLoading(false);
    };

    loadGalleryItems();
  }, []);

  // Filter items based on search
  const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()));

  // Handle image file selection
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setUploadingImage(true);
    setCrudError("");

    const uploadResult = await uploadImageToSupabase(file, {
      bucket: "news-images",
      folder: "gallery",
    });

    if (uploadResult) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: uploadResult,
      }));
    } else {
      setCrudError("Failed to upload image");
      setImagePreview("");
    }

    setUploadingImage(false);
  };

  // Handle add or update gallery item
  const handleAddGalleryItem = async () => {
    if (!formData.title.trim() || !formData.category || !formData.imageUrl) {
      setCrudError("Title, category, and image are required");
      return;
    }

    setLoading(true);
    setCrudError("");
    setSuccessMessage("");

    let result;
    if (editingId) {
      // Update existing item
      const existingItem = items.find((item) => item.id === editingId);
      result = await updateGalleryItem(editingId, formData, existingItem?.thumbnail);
    } else {
      // Create new item
      result = await createGalleryItem(formData);
    }

    if (result.success) {
      setSuccessMessage(editingId ? "Gallery item updated successfully!" : "Gallery item created successfully!");

      // Refresh items list
      const fetchResult = await fetchAllGalleryItems();
      if (fetchResult.success && fetchResult.data) {
        setItems(fetchResult.data);
      }

      // Reset form
      resetForm();
      setShowUploadForm(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setCrudError(result.error || "Failed to save gallery item");
    }

    setLoading(false);
  };

  // Handle edit gallery item
  const handleEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || "",
      imageUrl: item.thumbnail,
    });
    setImagePreview(item.thumbnail);
    setEditingId(item.id);
    setShowUploadForm(true);
  };

  // Handle delete gallery item
  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) {
      return;
    }

    setLoading(true);
    setCrudError("");

    const result = await deleteGalleryItem(id, imageUrl);

    if (result.success) {
      setSuccessMessage("Gallery item deleted successfully!");
      setItems(items.filter((item) => item.id !== id));

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setCrudError(result.error || "Failed to delete gallery item");
    }

    setLoading(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      imageUrl: "",
    });
    setImagePreview("");
    setEditingId(null);
  };

  const categories = ["Events", "Activities", "Facilities", "Learning", "Performances", "Achievements"];

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {crudError && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-400" />
          <p className="text-red-200">{crudError}</p>
        </motion.div>
      )}

      {/* Success Message */}
      {successMessage && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-green-900/50 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle size={20} className="text-green-400" />
          <p className="text-green-200">{successMessage}</p>
        </motion.div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Search Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full sm:w-64">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search gallery items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full text-[#333] placeholder:text-[#9a999b] pl-12 pr-4 py-3 border border-gray-600/20 rounded-lg focus:outline-none focus:border-gray-500 transition" />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetForm();
            setShowUploadForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#011c4f] rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          disabled={loading}
        >
          <Plus size={20} />
          Add Image
        </motion.button>
      </motion.div>

      {/* Upload Form Modal */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => !loading && setShowUploadForm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-[#011c4f] border border-green-500/20 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingId ? "Edit Gallery Item" : "Upload Image"}</h2>
                <button onClick={() => !loading && setShowUploadForm(false)} className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-50" disabled={loading}>
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Drag and Drop Area */}
                <label className="block relative border-2 border-dashed border-green-500/50 rounded-lg p-8 text-center hover:border-green-500 transition cursor-pointer group">
                  {imagePreview && <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-lg" />}
                  <div className={`flex flex-col items-center gap-2 transition-transform ${imagePreview ? "opacity-0 group-hover:opacity-100" : "group-hover:scale-110"}`}>
                    <ImageIcon size={32} className="text-green-400" />
                    <div>
                      <p className="font-semibold">{uploadingImage ? "Uploading..." : "Drop image here"}</p>
                      <p className="text-sm text-gray-400">or click to upload</p>
                    </div>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploadingImage || loading} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                </label>

                <div>
                  <label className="block text-sm font-medium mb-2">Image Title *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} disabled={loading} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition disabled:opacity-50" placeholder="Image title" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} disabled={loading} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition disabled:opacity-50">
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} disabled={loading} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition resize-none disabled:opacity-50" placeholder="Image description" rows={4} />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddGalleryItem} disabled={loading || uploadingImage || !formData.imageUrl} className="flex-1 px-4 py-2 bg-white text-[#011c4f] rounded-lg font-semibold hover:shadow-md transition-all disabled:opacity-50">
                    {loading ? "Saving..." : editingId ? "Update" : "Upload"}
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowUploadForm(false)} disabled={loading} className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all disabled:opacity-50">
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      {loading && items.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-400 mt-4">Loading gallery items...</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12 px-4">
              <p className="text-gray-400 text-lg">{items.length === 0 ? "No gallery items found" : "No matching gallery items"}</p>
              <p className="text-gray-500 text-sm mt-2">{items.length === 0 ? "Upload your first image to get started" : "Try adjusting your search"}</p>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className="group relative rounded-xl overflow-hidden bg-white drop-shadow-md backdrop-blur-xl border border-gray-500/20 hover:border-gray-500/40 transition-all">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-white/5">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(item)} disabled={loading} className="p-2 bg-blue-500/50 hover:bg-blue-500/70 rounded-lg transition disabled:opacity-50" title="Edit">
                      <Edit2 size={18} />
                    </motion.button>

                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(item.id, item.thumbnail)} disabled={loading} className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-lg transition disabled:opacity-50" title="Delete">
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-sm truncate text-[#011c4f]">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{item.category}</p>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>{new Date(item.upload_date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      {/* Optional: Add view count display */}
                      {item.views && `${item.views} views`}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default GalleryManagement;
