import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="bg-[#f7fbff] w-full h-screen flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-hidden flex flex-col">
        <Topbar />
        <section className="p-[25px] flex-1 overflow-y-auto">
          {children} 
        </section>
      </main>
    </div>
  )
}