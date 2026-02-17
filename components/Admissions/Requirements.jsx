import { FileText, Image as ImageIcon, GraduationCap, MapPin, CheckCircle } from "lucide-react";

const RequirementsSection = () => {
  const requirements = [
    {
      title: "Academic Records",
      desc: "Bring original report cards or transcripts from the student's last two academic years.",
      icon: <GraduationCap className="text-[#abc7fc]" />,
      tag: "Physical Copy",
    },
    {
      title: "Identification",
      desc: "A valid birth certificate or passport must be presented for age verification during your visit.",
      icon: <FileText className="text-[#abc7fc]" />,
      tag: "Required",
    },
    {
      title: "Passport Photos",
      desc: "Provide four recent passport-sized photographs for the student's official file.",
      icon: <ImageIcon className="text-[#abc7fc]" />,
      tag: "4 Hard Copies",
    },
    {
      title: "Residence Proof",
      desc: "Please provide a printed utility bill or a printed Google Maps location of your Kumasi residence.",
      icon: <MapPin className="text-[#abc7fc]" />,
      tag: "Verification",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#011c4f]/30 backdrop-blur-sm">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Application <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#abc7fc] to-[#6383bf]">Checklist</span>
            </h2>
          </div>
          <p className="text-blue-100/60 max-w-sm text-sm md:text-right">Our team is ready to assist you. Please ensure you bring original documents and clear photocopies for our records during your campus visit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requirements.map((req, index) => (
            <div key={index} className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <div className="mb-6 flex justify-between items-start">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">{req.icon}</div>
                {/* <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full">{req.tag}</span> */}
              </div>

              <h4 className="text-xl font-bold text-white mb-3">{req.title}</h4>
              <p className="text-slate-200 text-sm leading-relaxed mb-6">{req.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
