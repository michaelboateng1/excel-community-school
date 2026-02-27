import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Calendar, Clock, MapPin, Users, X, Upload, AlertCircle } from "lucide-react";
import TextEditor from "@/components/TextEditor";
import { uploadImageToSupabase, deleteImageByUrl } from "@/libs/imageUpload";
import { createEvent, updateEvent, deleteEvent, fetchAllEvents, EventFormData } from "@/libs/eventsCrudService";
import { Event } from "@/services/databaseService";

const EventsManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
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
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: 0,
    category: "",
    imageUrl: "",
    status: "upcoming",
  });

  // Fetch events on component mount
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        const response = await fetchAllEvents();
        if (response.success && response.data) {
          setEvents(response.data);
        } else {
          setCrudError(response.error || "Failed to fetch events");
        }
      } catch (error) {
        setCrudError(error instanceof Error ? error.message : "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
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
        bucket: "news-images",
        folder: "events",
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

  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.location.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddEvent = async () => {
    if (!formData.title || !formData.description) {
      setCrudError("Title and description are required");
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
        response = await updateEvent(editingId, formData);
      } else {
        response = await createEvent(formData);
      }

      if (response.success && response.data) {
        // Refresh events from database
        const fetchResponse = await fetchAllEvents();
        if (fetchResponse.success && fetchResponse.data) {
          setEvents(fetchResponse.data);
        }

        setSuccessMessage(editingId ? "Event updated successfully!" : "Event created successfully!");
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          capacity: 0,
          category: "",
          imageUrl: "",
          status: "upcoming",
        });
        setImagePreview(null);
        setUploadError(null);
        setEditingId(null);
        setShowForm(false);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setCrudError(response.error || "Failed to save event");
      }
    } catch (error) {
      setCrudError(error instanceof Error ? error.message : "Failed to save event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: event.capacity,
      category: event.category || "",
      imageUrl: event.image_url || "",
      status: (event.status as "upcoming" | "past" | "cancelled") || "upcoming",
    });
    if (event.image_url) {
      setImagePreview(event.image_url);
    } else {
      setImagePreview(null);
    }
    setUploadError(null);
    setCrudError(null);
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      setCrudError(null);
      // Find the event to get its image_url
      const event = events.find((a) => a.id === id);
      console.log(`Deleting event ${id}, image_url:`, event?.image_url);
      const response = await deleteEvent(id, event?.image_url);

      if (response.success) {
        setEvents(events.filter((a) => a.id !== id));
        setSuccessMessage("Event deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setCrudError(response.error || "Failed to delete event");
      }
    } catch (error) {
      setCrudError(error instanceof Error ? error.message : "Failed to delete event");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      capacity: 0,
      category: "",
      imageUrl: "",
      status: "upcoming",
    });
    setImagePreview(null);
    setUploadError(null);
    setCrudError(null);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {crudError && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 flex-1">{crudError}</p>
          <button onClick={() => setCrudError(null)} className="text-red-400 hover:text-red-300 flex-shrink-0">
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
          <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full text-[#333] placeholder:text-[#9a999b] pl-12 pr-4 py-3 border border-gray-600/20 rounded-lg focus:outline-none focus:border-gray-500 transition" />
        </motion.div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowForm(true)} className="flex items-center gap-2 px-6 py-3 bg-[#011c4f] text-white rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap">
          <Plus size={20} />
          New Event
        </motion.button>
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={resetForm}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-[#011c4f] border border-purple-500/20 rounded-xl p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingId ? "Edit Event" : "New Event"}</h2>
                <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Event Image</label>
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

                {/* <div className="grid grid-cols-2 gap-4"> */}
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-white/15 transition" placeholder="Event title" />
                </div>

                {/* <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input type="text" value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-white/15 transition" placeholder="Category" />
                  </div> */}
                {/* </div> */}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-white/15 transition" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input type="time" value={formData.time} onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-white/15 transition" />
                  </div>
                </div>

                {/* <div className="grid grid-cols-2 gap-4"> */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-white/15 transition" placeholder="Event location" />
                </div>

                {/* <div>
                    <label className="block text-sm font-medium mb-2">Capacity</label>
                    <input type="number" value={formData.capacity} onChange={(e) => setFormData((prev) => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-white/15 transition" placeholder="Max participants" />
                  </div> */}
                {/* </div> */}

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as "upcoming" | "past" | "cancelled",
                      }))
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white/15 transition"
                  >
                    <option value="upcoming" className="bg-slate-900">
                      Upcoming
                    </option>
                    <option value="past" className="bg-slate-900">
                      Past
                    </option>
                    <option value="cancelled" className="bg-slate-900">
                      Cancelled
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <TextEditor value={formData.description} onChange={(content) => setFormData((prev) => ({ ...prev, description: content }))} placeholder="Write your event description..." />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }} onClick={handleAddEvent} disabled={isSubmitting || uploadingImage} className="flex-1 px-4 py-2 bg-white text-[#011c4f] rounded-lg font-semibold hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#011c4f] border-t-transparent rounded-full animate-spin" />
                        {editingId ? "Updating..." : "Creating..."}
                      </>
                    ) : editingId ? (
                      "Update Event"
                    ) : (
                      "Create Event"
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

      {/* Events List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        {loading ? (
          <div className="text-center py-12 px-4">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-400 text-lg">No events found</p>
            <p className="text-gray-500 text-sm mt-2">Create your first event to get started</p>
          </div>
        ) : (
          filteredEvents.map((event, index) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-4 rounded-xl bg-white drop-shadow-md border border-gray-500/20 hover:border-gray-500/40 transition-all group overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Image Thumbnail */}
                {event.image_url && (
                  <div className="sm:w-40 sm:h-40 w-full h-32 flex-shrink-0">
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[#011c4f] truncate">{event.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0 ${event.status === "upcoming" ? "bg-blue-100 text-blue-700" : event.status === "past" ? "bg-gray-100 text-gray-700" : "bg-red-100 text-red-700"}`}>{event.status}</span>
                  </div>

                  {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p> */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-[#011c4f]" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-[#011c4f]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} className="text-[#011c4f]" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    {/* <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} className="text-[#011c4f]" />
                      <span>
                        {event.registered}/{event.capacity}
                      </span>
                    </div> */}
                  </div>

                  {/* Capacity Bar */}
                  {/* <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Capacity</span>
                      <span className="text-xs font-semibold text-gray-700">{Math.round((event.registered / event.capacity) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                        style={{
                          width: `${Math.min((event.registered / event.capacity) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div> */}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleEdit(event)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition" title="Edit">
                    <Edit2 size={18} />
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(event.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition" title="Delete">
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

export default EventsManagement;
