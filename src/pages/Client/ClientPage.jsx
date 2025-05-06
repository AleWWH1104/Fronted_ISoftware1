import NavBar from "./NavBar";
import Footer from "./Footer";
import { useState } from "react";
import Services from "./Services";
import Hover from "./Hover";
import Contact from "./Contact";
import Projects from "./Projects";

function ClientPage() {
 
  return (
    <div className="scroll-smooth pt-[8dvh]">
      <NavBar />
      <Hover />
      <Services/>
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default ClientPage