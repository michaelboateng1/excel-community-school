import React from "react";
import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react";

const CampusVisitComponent = () => {
  return (
    <section className="py-24 bg-[#011c4f]/20  relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Contact Details & Hours */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Our Campus <br />
                is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#abc7fc] to-[#6383bf]">Open for You</span>
              </h3>
              <p className="text-lg text-white/80 leading-relaxed mb-8">The Admissions Office is located in the Administration Block. No appointment is necessary for document submission during working hours.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Glass Card: Hours */}
              <div className="p-6 bg-[#011c4f] rounded-3xl border border-[#6383bf] hover:shadow-xl transition-shadow">
                <Clock className="text-slate-300 mb-4" size={28} />
                <h4 className="font-bold text-blue-100/80 leading-relaxed text-sm md:text-base mb-2">Office Hours</h4>
                <p className="text-sm text-blue-100/80 leading-relaxed text-sm md:text-base">
                  Mon — Fri: 8:00 AM - 4:00 PM
                  <br />
                  Sat: 9:00 AM - 12:00 PM
                </p>
              </div>

              {/* Glass Card: Contact */}
              <div className="p-6 bg-[#011c4f] rounded-3xl border border-[#6383bf] hover:shadow-xl transition-shadow">
                <Phone className="text-blue-600 mb-4" size={28} />
                <h4 className="font-bold text-blue-100/80 leading-relaxed text-sm md:text-base mb-2">Call Inquiries</h4>
                <p className="text-sm text-blue-100/80 leading-relaxed md:text-base leading-relaxed">
                  +233 [Phone Number]
                  <br />
                  admissions@excell.edu.gh
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Map/Directions */}
          <div className="relative">
            {/* The "Map" Card */}
            <div className="relative aspect-square w-full bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              {/* Replace the src with your actual Google Maps Embed link */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126841.65217462198!2d-1.7061765103719085!3d6.671039598460596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e133c1%3A0x9482d431c50e2133!2sKumasi%2C%20Ghana!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusVisitComponent;
