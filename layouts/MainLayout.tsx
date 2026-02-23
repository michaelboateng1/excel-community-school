import React from "react";
import CustomCursor from "../components/CustomCursor";
import FluidBackground from "../components/FluidBackground";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen text-white selection:bg-[#ccc] selection:text-black cursor-auto md:cursor-default overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      {children}
    </div>
  );
};

export default MainLayout;
