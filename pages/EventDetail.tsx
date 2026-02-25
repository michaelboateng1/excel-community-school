import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, CalendarDays, Clock2, LocateFixed, Users } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import BackgroundSlider from "../components/BackgroundSlider";
import GradientText from "../components/GlitchText";
import CustomCursor from "../components/CustomCursor";
import TawkChat from "@/components/TawkChat";
import assemblyImage from "../assets/images/assembly2.jpg";
import { eventsHighlightData } from "../services/databaseService";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [event, setEvent] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const [eventsData, error, eventsLoading] = await eventsHighlightData();
    setAllEvents(eventsData || []);

    if (eventsData && id) {
      const foundEvent = eventsData.find((item: any) => item.id === id);
      setEvent(foundEvent || null);
    }

    setLoading(eventsLoading);
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
          <p className="text-gray-300 text-2xl">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
        <CustomCursor />
        <BackgroundSlider />
        <div className="h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-gray-300 text-2xl">Event not found</p>
          <button onClick={() => navigate("/news-and-events")} className="bg-white text-[#011c4f] font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = allEvents.findIndex((item: any) => item.id === id);
  const previousEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  // Get the HTML content from available fields
  const getHtmlContent = () => {
    const htmlContent = event.body || event.content || event.description || event.excerpt || null;
    console.log("Event fields:", { body: event.body, content: event.content, description: event.description, excerpt: event.excerpt });
    return htmlContent;
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-none md:cursor-default overflow-x-hidden">
      <CustomCursor />
      <BackgroundSlider />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button onClick={() => navigate("/news")} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
          <ChevronLeft width={20} height={20} />
          Back
        </button>
      </div>

      {/* Event Header */}
      <header className="relative pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">{event.title}</h1>

            {/* Event Details Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#011c4f]/20 border border-white/20 rounded-lg p-8">
              <div className="flex gap-3">
                <CalendarDays width={24} height={24} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-lg font-semibold text-white">{event.date}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock2 width={24} height={24} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="text-lg font-semibold text-white">{event.time}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <LocateFixed width={24} height={24} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-lg font-semibold text-white">{event.location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Event Image */}
      <div className="relative h-96 md:h-[500px] w-full mb-12 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-4xl mx-auto h-full">
          <img src={event.image_url || assemblyImage} alt={event.title} className="w-full h-full object-cover rounded-xl shadow-2xl" />
        </motion.div>
      </div>

      {/* Event Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-invert max-w-none">
          {/* Description - Quill HTML Body */}
          <div className="ql-editor text-gray-300 text-lg leading-relaxed" style={{ padding: 0 }}>
            {getHtmlContent() ? <div dangerouslySetInnerHTML={{ __html: getHtmlContent() }} /> : <p className="text-lg text-gray-200 leading-relaxed">{event.excerpt}</p>}
          </div>

          {/* Additional Event Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/5 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users width={20} height={20} />
                Event Details
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <span className="font-semibold text-white">Date:</span> {event.date}
                </p>
                <p>
                  <span className="font-semibold text-white">Time:</span> {event.time}
                </p>
                <p>
                  <span className="font-semibold text-white">Location:</span> {event.location}
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Get Involved</h3>
              {/* <button className="w-full bg-white text-[#011c4f] font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">Register for Event</button> */}
              <p className="text-sm text-gray-400 mt-4">Don't miss out on this amazing event.</p>
            </div>
          </div>

          {/* Full Content */}
          {getHtmlContent() && (
            <div className="text-gray-300 text-lg leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: getHtmlContent() }} />
            </div>
          )}
        </motion.article>

        {/* Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previousEvent ? (
              <button onClick={() => navigate(`/event/${previousEvent.id}`)} className="group text-left bg-white/5 border border-white/20 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <p className="text-sm text-gray-400 mb-2">← Previous Event</p>
                <p className="text-white font-semibold group-hover:text-gray-200 transition-colors">{previousEvent.title}</p>
              </button>
            ) : (
              <div />
            )}

            {nextEvent ? (
              <button onClick={() => navigate(`/event/${nextEvent.id}`)} className="group text-right bg-white/5 border border-white/20 rounded-lg p-6 hover:bg-white/10 transition-colors md:col-start-2">
                <p className="text-sm text-gray-400 mb-2">Next Event →</p>
                <p className="text-white font-semibold group-hover:text-gray-200 transition-colors">{nextEvent.title}</p>
              </button>
            ) : (
              <div />
            )}
          </div>
        </motion.div>

        {/* Related Events */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">Other Upcoming Events</h2>
          <div className="space-y-4">
            {allEvents
              .filter((item: any) => item.id !== id)
              .slice(0, 3)
              .map((relatedEvent: any) => (
                <button key={relatedEvent.id} onClick={() => navigate(`/event/${relatedEvent.id}`)} className="group w-full text-left bg-[#011c4f] backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">{relatedEvent.title}</h3>
                      <p className="text-gray-300">
                        <CalendarDays className="inline mr-2 w-4 h-4" /> {relatedEvent.date} • <Clock2 className="inline mx-2 w-4 h-4" /> {relatedEvent.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{relatedEvent.location}</p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </motion.div>
      </main>

      <TawkChat />
    </div>
  );
};

export default EventDetail;
