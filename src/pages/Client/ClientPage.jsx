import NavBar from "./NavBar";
import Footer from "./Footer";
import Services from "./Services";
import Hover from "./Hover";
import Contact from "./Contact";
import Acercade from "./Acercade";

function ClientPage() {
 
  return (
    <div className="scroll-smooth pt-[8dvh]">
      <NavBar />
      <Hover />
      <Acercade />
      <Services/>
      <Contact />
      <Footer />
    </div>
  );
}

export default ClientPage