import React from "react";
import { Search, FileText, UserCheck, PartyPopper, CheckCircle2 } from "lucide-react";

const TimelineAdmissions = () => {
  const steps = [
    {
      id: "01",
      title: "Discovery & Inquiry",
      description: "Begin your journey by visiting our Kumasi campus or connecting with our admissions team online to explore our vision.",
      icon: <Search className="text-blue-500" size={24} />,
      side: "left",
    },
    {
      id: "02",
      title: "Submit Application",
      description: "Complete the digital application form and upload necessary documents including previous academic transcripts.",
      icon: <FileText className="text-blue-500" size={24} />,
      side: "right",
    },
    {
      id: "03",
      title: "Student Assessment",
      description: "A relaxed, friendly session where we interact with the student to understand their strengths and learning style.",
      icon: <UserCheck className="text-blue-500" size={24} />,
      side: "left",
    },
    {
      id: "04",
      title: "Final Enrollment",
      description: "Once approved, receive your official welcome pack and secure your place in the Excell Community family.",
      icon: <PartyPopper className="text-blue-500" size={24} />,
      side: "right",
    },
  ];

  return (
    <section className="py-24 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-6xl font-black text-white mb-4">
            The Road to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#abc7fc] to-[#6383bf]">Excellence</span>
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">Clear steps to joining our premier learning community.</p>
        </div>

        <div className="relative">
          {/* Vertical Line (Center) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[2px] bg-slate-200">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#011c4f] to-transparent" />
          </div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className={`relative flex items-center  justify-between w-full md:mb-16 ${step.side === "left" ? "md:flex-row-reverse" : "md:flex-row"}`}>
                {/* 1. The Content Card */}
                <div className="ml-12 md:ml-0 md:w-[45%] ">
                  <div
                    className="group p-8 relative z-10 
    backdrop-blur-md 
    bg-white/10 
    border border-white/20 
    rounded-3xl 
    p-8 
    shadow-sm 
    hover:shadow-xl 
    transition-all 
    duration-500 
    hover:-translate-y-1
    transition-all 
    duration-500 
    hover:bg-white/20 
    hover:border-white/40 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {/* <div className="p-3 bg-blue rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">{step.icon}</div> */}
                      <span className="text-4xl md:text-8xl font-black text-slate-100/20 transition-colors">{step.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-200 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* 2. The Center Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white border-4 border-blue-600 z-10 shadow-lg" />
                  <div className="hidden md:block absolute w-8 h-[2px] bg-slate-200 -z-0" style={{ [step.side === "left" ? "left" : "right"]: "100%" }} />
                </div>

                {/* 3. Empty Spacer (Desktop only) */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Final Step Badge */}
        <div className="mt-20 flex flex-col items-center">
          <div className="bg-[#011c4f] p-1 px-4 rounded-full mb-8">
            <p className="text-white text-xs font-bold tracking-widest uppercase">Start Today</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineAdmissions;
