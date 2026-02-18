import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="relative bg-[#011c4f] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-white mb-8 text-center">Get In Touch</h2>

          {/* Name Input */}
          <div className="mb-6 group">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#ccc] transition-all duration-300" />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#ccc] transition-all duration-300" />
          </div>

          {/* Subject Input */}
          <div className="mb-6">
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#ccc] transition-all duration-300" />
          </div>

          {/* Message Textarea */}
          <div className="mb-8">
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required rows="5" className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#ccc] transition-all duration-300 resize-none" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 px-6 bg-[#fff] text-[#011c4f] font-bold rounded-lg hover:from-cyan-400 hover:shadow-md transform hover:scale-105 transition-all duration-300 active:scale-95">
            Send Message
          </button>

          {/* Success Message */}
          {submitted && <div className="mt-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center font-semibold animate-bounce">✓ Message sent successfully!</div>}
        </form>
      </div>
    </div>
  );
}
