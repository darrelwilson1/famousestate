import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Listings from "@/components/Listings";
import QuickValuation from "@/components/QuickValuation";
import MessageForm from "@/components/MessageForm";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <About />
      <QuickValuation />
      <Listings />
      <MessageForm />
      <LeadForm />
      <Footer />
    </main>
  );
}
