import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Calendar, Image, Newspaper, LogOut, Settings, Menu, X, TrendingUp, Eye } from "lucide-react";
import NewsManagement from "./NewsManagement";
import EventsManagement from "./EventsManagement";
import GalleryManagement from "./GalleryManagement";
import DashboardOverview from "./DashboardOverview";

type ActiveSection = "overview" | "news" | "events" | "gallery";

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "news",
      label: "News",
      icon: Newspaper,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: Image,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "news":
        return <NewsManagement />;
      case "events":
        return <EventsManagement />;
      case "gallery":
        return <GalleryManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-white">
      {/* Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 bg-[#011c4f] h-20 backdrop-blur-xl border-b border-purple-500/20 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 hover:bg-purple-500/20 rounded-lg transition">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">E . C . S Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition">
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="w-72 bg-[#011c4f] backdrop-blur-xl border-r border-purple-500/20 p-6 fixed md:relative h-[calc(100vh-80px)] overflow-y-auto">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id as ActiveSection);
                        if (isMobile) setSidebarOpen(false);
                      }}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition relative overflow-hidden group ${isActive ? "bg-white text-[#011c4f] " : "hover:bg-purple-500/10 text-gray-300"}`}
                    >
                      {isActive && <motion.div layoutId="activeIndicator" className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent" />}
                      <Icon size={20} className="relative z-10" />
                      <span className="font-medium relative z-10">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div className="mt-8 pt-8 border-t border-purple-500/20 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {/* <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition text-gray-300">
                  <Settings size={18} />
                  <span className="text-sm">Settings</span>
                </button> */}
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-auto md:ml-0">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-6 md:p-8">
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
