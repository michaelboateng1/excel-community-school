import { PlayCircle, Award, Users, ArrowRight } from "lucide-react";

import vedeioThumbnail from "../../assets/images/studentImage3.jpg";

import studentImage1 from "../../assets/images/studentImage1.jpg";
import studentImage2 from "../../assets/images/studentImage2.jpg";
import studentImage4 from "../../assets/images/studentImage4.jpg";
import studentImage5 from "../../assets/images/studentImage5.jpg";

const AdmissionsIntroVisual = () => {
  return (
    <section className="py-16 px-6 bg-[#011c4f]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Concise Intro & Featured Video */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content - Highly Condensed */}
          <div>
            <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#abc7fc] to-[#6383bf]">Excellence Journey</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">Discover why Excell Community School is the perfect foundation for your child's bright future. Explore our vibrant campus, innovative programs, and nurturing community.</p>
            <button className="flex items-center gap-2 bg-white text-[#011c4f] px-8 py-4 rounded-full font-bold hover:bg-white/50 transition-all shadow-lg active:scale-95">
              Proceed <ArrowRight size={20} />
            </button>
          </div>

          {/* Featured Admissions Video (Placeholder) */}
          <div className="relative aspect-video w-full rounded-2xl shadow-xl overflow-hidden group">
            {/* Replace with your actual video component or embed */}
            <img src={vedeioThumbnail} alt="School Admissions Video" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <PlayCircle size={60} className="text-white hover:text-blue-400 transition-colors cursor-pointer" />
            </div>
            <p className="absolute bottom-4 left-4 text-white text-sm font-semibold">Watch Our School Tour</p>
          </div>
        </div>

        {/* Dynamic & Engaging Section: Animated Stats / Image Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 text-center">
          <div className="p-8 bg-[#011c4f] rounded-2xl shadow-md flex flex-col items-center justify-center animate-fade-in-up text-left">
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 leading-tight">Where Potential Meets Purpose.</h2>
            <p className="text-blue-100/80 leading-relaxed text-sm md:text-base">At Excell, we don't just teach; we inspire. Our balanced approach combines academic rigor with character building, ensuring every student in Kumasi is equipped to lead and innovate in a changing world.</p>
          </div>

          {/* Image Grid with Subtle Animation */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 col-span-2">
            <div className="w-full h-[250px]">
              <img src={studentImage1} alt="Happy Students" className="rounded-xl shadow-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="w-full h-[250px]">
              <img src={studentImage2} alt="Classroom Learning" className="rounded-xl shadow-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="w-full h-[250px]">
              <img src={studentImage4} alt="Creative Arts" className="rounded-xl shadow-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="w-full h-[250px]">
              <img src={studentImage5} alt="Sports Activities" className="rounded-xl shadow-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsIntroVisual;
