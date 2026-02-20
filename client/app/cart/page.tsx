import Link from "next/link";
import Navbar from "../components/Sections/Navbar";
import Footer from "../components/Sections/Footer";
import CartContent from "./CartContent";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <CartContent />

      <Footer />
    </div>
  );
}
