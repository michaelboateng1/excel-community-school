import React, { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Calendar, Image, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCard {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const DashboardOverview: React.FC = () => {
  const [stats] = useState<StatCard[]>([
    {
      label: "Total News Articles",
      value: 24,
      change: 12,
      icon: "news",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Upcoming Events",
      value: 8,
      change: -5,
      icon: "calender",
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Gallery Items",
      value: 156,
      change: 23,
      icon: "image",
      color: "from-green-500 to-emerald-500",
    },
  ]);

  const recentActivity = [
    {
      id: 1,
      type: "news",
      title: "New Article: Summer Festival Announced",
      timestamp: "2 hours ago",
      author: "Admin",
    },
    {
      id: 2,
      type: "event",
      title: "Updated: Workshop Schedule",
      timestamp: "5 hours ago",
      author: "John Doe",
    },
    {
      id: 3,
      type: "gallery",
      title: "Added: 12 New Photos from Opening Day",
      timestamp: "1 day ago",
      author: "Sarah Smith",
    },
    {
      id: 4,
      type: "news",
      title: "Scholarship Winners Announced",
      timestamp: "2 days ago",
      author: "Admin",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {/* <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-400">Here's an overview of your content management system</p>
      </motion.div> */}

      {/* Stats Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants} className={`relative p-6 rounded-xl bg-white drop-shadow-md text-[#011c4f]  border border-opacity-20 border-white overflow-hidden group`}>
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <div className={`text-[#011c4f] bg-[#c2d6fc] p-2 rounded-lg`}>{stat.icon === "news" ? <Newspaper size={24} /> : stat.icon === "calender" ? <Calendar size={24} /> : <Image size={24} />}</div>
                </div>

                <h3 className="text-[#011c4f]/50 font-bold text-sm mb-1">{stat.label}</h3>
              </div>

              <p className="text-3xl sm:text-7xl text-center font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="lg:col-span-2 p-6 rounded-xl bg-white drop-shadow-md text-[#011c4f] backdrop-blur-xl border border-slate-500/20">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={24} className="text-slate-400" />
            <h2 className="text-2xl font-bold">Recent Activity</h2>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <motion.div key={activity.id} whileHover={{ x: 4 }} className="p-4 rounded-lg bg-white/5 hover:bg-gray-500/10 border border-gray-300/50 transition-all group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${activity.type === "news" ? "bg-blue-300" : activity.type === "event" ? "bg-blue-400" : "bg-blue-500"}`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold transition-colors">{activity.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                      <span>{activity.author}</span>
                      <span>•</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        {/* <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="p-6 rounded-xl bg-[#011c4f] border border-[#ccc]/20">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

          <div className="space-y-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              ✍️ Write News Article
            </motion.button>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
              📅 Create Event
            </motion.button>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all">
              📸 Upload to Gallery
            </motion.button>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 font-semibold hover:bg-white/20 transition-all">
              ⚙️ View Settings
            </motion.button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-4">📊 Dashboard Statistics</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Page Views</span>
                <span className="font-semibold">12,548</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Engagement</span>
                <span className="font-semibold">
                  <span className="text-green-400">↑</span> 28%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="font-semibold">2 hours ago</span>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default DashboardOverview;
