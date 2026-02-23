import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Calendar, Clock, MapPin, Users, X } from "lucide-react";

import TextEditor from "@/components/TextEditor";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  status: "upcoming" | "past" | "cancelled";
  category: string;
}

const EventsManagement: React.FC = () => {
  const [content, setContent] = useState("");

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Opening Ceremony",
      description: "Grand opening celebration of Lumina Festival 2026",
      date: "2026-03-15",
      time: "18:00",
      location: "Main Auditorium",
      capacity: 500,
      registered: 342,
      status: "upcoming",
      category: "Ceremony",
    },
    {
      id: 2,
      title: "Workshop: Digital Innovation",
      description: "Learn about cutting-edge digital technologies",
      date: "2026-03-20",
      time: "14:00",
      location: "Tech Building",
      capacity: 100,
      registered: 87,
      status: "upcoming",
      category: "Workshop",
    },
    {
      id: 3,
      title: "Networking Dinner",
      description: "Connect with industry leaders and fellow participants",
      date: "2026-03-22",
      time: "19:00",
      location: "Grand Hall",
      capacity: 200,
      registered: 156,
      status: "upcoming",
      category: "Networking",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    category: "",
  });

  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.location.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddEvent = () => {
    if (formData.title && formData.date && formData.time && formData.location && formData.capacity) {
      if (editingId) {
        setEvents(
          events.map((e) =>
            e.id === editingId
              ? {
                  ...e,
                  ...formData,
                  capacity: parseInt(formData.capacity),
                }
              : e,
          ),
        );
        setEditingId(null);
      } else {
        setEvents([
          ...events,
          {
            id: Math.max(...events.map((e) => e.id), 0) + 1,
            ...formData,
            capacity: parseInt(formData.capacity),
            registered: 0,
            status: "upcoming",
          },
        ]);
      }
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        capacity: "",
        category: "",
      });
      setShowForm(false);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: event.capacity.toString(),
      category: event.category,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Search Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full text-[#333] placeholder:text-[#9a999b] pl-12 pr-4 py-3  border border-gray-600/20 rounded-lg focus:outline-none focus:border-gray-500 transition" />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: "",
              description: "",
              date: "",
              time: "",
              location: "",
              capacity: "",
              category: "",
            });
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#011c4f] rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          New Event
        </motion.button>
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-[#011c4f] border border-gray-500/20 rounded-xl p-8 my-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingId ? "Edit Event" : "New Event"}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition" placeholder="Event title" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  {/* <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition resize-none" placeholder="Event description" rows={3} /> */}
                  <TextEditor value={formData.description} onChange={(content) => setFormData({ ...formData, description: content })} placeholder="Write your article post..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* <div>
                    <label className="block text-sm font-medium mb-2">Capacity</label>
                    <input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white/15 transition" placeholder="Max participants" />
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition" placeholder="Event location" />
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

                <div className="flex gap-4 pt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddEvent} className="flex-1 px-4 py-2 bg-white text-[#011c4f] rounded-lg font-semibold hover:shadow-lg transition-all">
                    {editingId ? "Update Event" : "Create Event"}
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

      {/* Events Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-400 text-lg">No events found</p>
            <p className="text-gray-500 text-sm mt-2">Create your first event to get started</p>
          </div>
        ) : (
          filteredEvents.map((event, index) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-6 rounded-xl bg-white backdrop-blur-xl border border-slate-500/20 hover:border-slate-500/40 drop-shadow-md transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-[#011c4f]">{event.title}</h3>
                    {/* <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === "upcoming" ? "bg-blue-500/20 text-blue-400 border border-blue-500/50" : event.status === "past" ? "bg-gray-500/20 text-gray-400 border border-gray-500/50" : "bg-red-500/20 text-red-400 border border-red-500/50"}`}>{event.status}</span> */}
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{event.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} className="text-[#afcbff]" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock size={16} className="text-[#afcbff]" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin size={16} className="text-[#afcbff]" />
                      {event.location}
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Registration</span>
                      <span className="text-xs font-semibold">{Math.round((event.registered / event.capacity) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(event.registered / event.capacity) * 100}%`,
                        }}
                        className="h-full bg-gradient-to-r from-[#0a0a0a] via-[#011c4f] to-[#afcbff]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 lg:flex-col">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleEdit(event)} className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition" title="Edit">
                    <Edit2 size={18} />
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(event.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition" title="Delete">
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
