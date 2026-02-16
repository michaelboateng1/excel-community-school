import { useState } from "react";
import { Facebook, Twitter, Linkedin, Star, Menu, X } from "lucide-react";

const MaterialCard = ({ name, role, description, imageUrl, colorClass }) => {
  const [isActive, setIsActive] = useState(false);

  // Map for dynamic Tailwind colors
  const colorMap = {
    Primary: "bg-[#011c4f] border-[#011c4f]",
    Secondary: "bg-[#0a0a0a] border-[#0a0a0a]",
    Purple: "bg-purple-500 border-purple-500",
    "Deep-Purple": "bg-indigo-600 border-indigo-600",
    Indigo: "bg-indigo-500 border-indigo-500",
    Blue: "bg-blue-500 border-blue-500",
    "Light-Blue": "bg-sky-400 border-sky-400",
    Cyan: "bg-cyan-500 border-cyan-500",
    Teal: "bg-teal-500 border-teal-500",
    Green: "bg-green-500 border-green-500",
    "Light-Green": "bg-lime-500 border-lime-500",
    Lime: "bg-lime-400 border-lime-400",
    Yellow: "bg-yellow-400 border-yellow-400",
    Amber: "bg-amber-500 border-amber-500",
    Orange: "bg-orange-500 border-orange-500",
    "Deep-Orange": "bg-orange-600 border-orange-600",
    Brown: "bg-amber-800 border-amber-800",
    Grey: "bg-gray-500 border-gray-500",
    "Blue-Grey": "bg-slate-500 border-slate-500",
  };

  const currentColor = colorMap[colorClass] || "bg-gray-500 border-gray-600";

  return (
    <article className={`relative block transition-all duration-300 ease-in-out h-[400px] shadow-lg overflow-hidden group ${isActive ? "z-50" : "z-10"}`}>
      {/* Header / Title */}
      <h2 className={`absolute top-0 left-0 w-full p-4 bg-[#011c4f] transition-all duration-300 z-30 flex flex-col ${isActive ? "translate-y-[100px] h-[60px] text-white" : "h-[80px] text-white"}`}>
        <span className="text-xl font-bold leading-tight drop-shadow-md">{name}</span>
        <strong className="flex items-center gap-1 text-sm font-normal opacity-90">
          <Star size={14} fill="currentColor" /> {role}
        </strong>
      </h2>

      {/* Main Content Area */}
      <div className="relative w-full h-full">
        {/* Image Container */}
        <div className={`absolute transition-transform duration-500 ease-in-out ${isActive ? "scale-0" : "scale-100"}`}>
          <img src={imageUrl} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
        </div>

        {/* Description (Visible when active) */}
        <div className={`absolute inset-0 p-6 pt-5 bg-white transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button onClick={() => setIsActive(!isActive)} className={`absolute right-4 top-[60px] w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-500 z-40 shadow-xl border-4 border-white active:scale-95 ${currentColor} ${isActive ? "rotate-[225deg] -translate-x-[50%] translate-y-[280px]" : ""}`}>
        {isActive ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Footer / Social Links */}
      <div className={`absolute bottom-0 left-0 w-full bg-[#011c4f] p-4 border-t transition-transform duration-500 flex items-center gap-4 ${isActive ? "translate-y-0" : "translate-y-full"}`}>
        <span className="font-bold text-gray-200 mr-2 uppercase text-xs">Social</span>
        <Facebook size={18} className="text-gray-200 cursor-pointer hover:scale-110 transition-transform" />
        <Twitter size={18} className="text-gray-200 cursor-pointer hover:scale-110 transition-transform" />
        <Linkedin size={18} className="text-gray-200 cursor-pointer hover:scale-110 transition-transform" />
      </div>

      {/* Side Color bar (Material Style) */}
      <div className={`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${currentColor.split(" ")[0]}`}></div>
    </article>
  );
};

import headMaster from "../assets/images/headMaster.jpg";
import assitantHead from "../assets/images/assitantHead.jpg";
import headOfAcademics from "../assets/images/headOfAcademics.jpg";
``;

const Leadership = () => {
  const leaders = [
    {
      name: "Mr. Osei Bonsu",
      role: "Head Master",
      colorClass: "",
      imageUrl: headMaster,
      description: "A veteran educator with 25 years of leadership, he has spearheaded curriculum innovation and transformative school-wide excellence programs.",
    },
    {
      name: "Mr. Kwaku Asante",
      role: "Assistant Head Master",
      colorClass: "",
      imageUrl: assitantHead,
      description: "An operations expert ensuring a safe, disciplined campus through efficient logistics and dedicated student welfare management.",
    },
    {
      name: "Mr. Kwame Mensah",
      role: "Head of Academics",
      colorClass: "",
      imageUrl: headOfAcademics,
      description: "A curriculum specialist driving intellectual rigor through innovative teaching methods, faculty mentorship, and data-driven learning strategies.",
    },
  ];

  return (
    // <section className="bg-[#011c4f]/20 min-h-screen p-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader, i) => (
          <MaterialCard key={i} {...leader} />
        ))}
      </div>
    </div>
    // {/* </section> */}
  );
};

export default Leadership;
