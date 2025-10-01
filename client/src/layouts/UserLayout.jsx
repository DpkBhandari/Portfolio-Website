import { Outlet } from "react-router-dom";
import Navbar from "../Componets/Navbar.jsx";
import Footer from "../Componets/Footer.jsx";
export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <main className=" min-h-screen">
        <Outlet /> {/* nested user routes */}
      </main>
      <Footer />
    </div>
  );
}
