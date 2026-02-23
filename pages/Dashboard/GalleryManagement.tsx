import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Trash2, Eye, Download, X, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  uploadDate: string;
  views: number;
  thumbnail: string;
}

const GalleryManagement: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([
    {
      id: 1,
      title: "Opening Ceremony",
      category: "Events",
      uploadDate: "2026-02-15",
      views: 342,
      thumbnail: "https://cdn.pixabay.com/photo/2023/04/11/00/59/desert-7915039_960_720.jpg",
      description: "something",
    },
    {
      id: 2,
      title: "Student Performance",
      category: "Activities",
      uploadDate: "2026-02-10",
      views: 218,
      thumbnail: "https://via.placeholder.com/300x200?text=Student+Performance",
      description: "something",
    },
    {
      id: 3,
      title: "Campus Tour",
      category: "Facilities",
      uploadDate: "2026-02-08",
      views: 156,
      thumbnail: "https://via.placeholder.com/300x200?text=Campus+Tour",
      description: "something",
    },
    {
      id: 4,
      title: "Workshop Session",
      category: "Learning",
      uploadDate: "2026-02-05",
      views: 129,
      thumbnail: "https://via.placeholder.com/300x200?text=Workshop+Session",
      description: "somethig",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    category: "",
  });

  const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleUpload = () => {
    if (uploadData.title && uploadData.category) {
      setItems([
        ...items,
        {
          id: Math.max(...items.map((i) => i.id), 0) + 1,
          title: uploadData.title,
          category: uploadData.category,
          uploadDate: new Date().toISOString().split("T")[0],
          views: 0,
          thumbnail: "https://via.placeholder.com/300x200?text=" + uploadData.title.replace(/ /g, "+"),
          description: uploadData.description,
        },
      ]);
      setUploadData({ title: "", category: "" });
      setShowUploadForm(false);
    }
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const categories = ["Events", "Activities", "Facilities", "Learning", "Performances", "Achievements"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-gray-400 mt-1">Manage photos and media content</p>
        </div> */}

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search gallery items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full text-[#333] placeholder:text-[#9a999b] pl-12 pr-4 py-3  border border-gray-600/20 rounded-lg focus:outline-none focus:border-gray-500 transition" />
        </motion.div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowUploadForm(true)} className="flex items-center gap-2 px-6 py-3 bg-[#011c4f] rounded-lg font-semibold hover:shadow-lg transition-all">
          <Plus size={20} />
          Add Image
        </motion.button>
      </motion.div>

      {/* Upload Form Modal */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowUploadForm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-[#011c4f] border border-green-500/20 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upload Image</h2>
                <button onClick={() => setShowUploadForm(false)} className="p-2 hover:bg-white/10 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Drag and Drop Area */}
                <div className="relative border-2 border-dashed border-green-500/50 rounded-lg p-8 text-center hover:border-green-500 transition cursor-pointer group">
                  <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
                    <ImageIcon size={32} className="text-green-400" />
                    <div>
                      <p className="font-semibold">Drop image here</p>
                      <p className="text-sm text-gray-400">or click to upload</p>
                    </div>
                  </div>
                  <input type="file" accept="image/*" className=" absolute top-0 left-0 w-full h-full object-cover opacity-0 cursor-pointer" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image Title</label>
                  <input type="text" value={uploadData.title} onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition" placeholder="Image title" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={uploadData.category}
                    onChange={(e) =>
                      setUploadData({
                        ...uploadData,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image Description</label>
                  <textarea value={uploadData.description} onChange={(e) => setUploadData({ ...uploadData, body: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition resize-none" placeholder="Image Description" rows={4} />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleUpload} className="flex-1 px-4 py-2 bg-white text-[#011c4f] rounded-lg font-semibold hover:shadow-md transition-all">
                    Upload
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowUploadForm(false)} className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all">
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 px-4">
            <p className="text-gray-400 text-lg">No gallery items found</p>
            <p className="text-gray-500 text-sm mt-2">Upload your first image to get started</p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className="group relative rounded-xl overflow-hidden bg-white drop-shadow-md backdrop-blur-xl border border-gray-500/20 hover:border-gray-500/40 transition-all">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-white/5">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-blue-500/50 hover:bg-blue-500/70 rounded-lg transition" title="View">
                    <Eye size={18} />
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-purple-500/50 hover:bg-purple-500/70 rounded-lg transition" title="Download">
                    <Download size={18} />
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-lg transition" title="Delete">
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm truncate text-[#011c4f]">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{item.category}</p>

                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    {item.views}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default GalleryManagement;
