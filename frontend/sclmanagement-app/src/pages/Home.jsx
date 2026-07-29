import Hero from "../components/Hero";
import QuickStats from "../components/QuickStats";
import NoticeBoard from "../components/NoticeBoard";
import About from "../components/About";
import Leadership from "../components/Administration";
import ImportantLinks from "../components/ImportantLinks";
import Teachers from "../components/Teachers";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import MultipleSection from "../components/Multiplesection";

export default function Home() {
  return (
    <>
      <Hero />

      <main className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:py-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="order-2 md:order-none">
            <QuickStats />
          </div>
          <div className="order-3 md:order-none">
            <NoticeBoard limit={3} />
          </div>
          <div className="order-4 md:order-none">
            <About />
          </div>
          <div className="order-5 md:order-none">
            <MultipleSection />
          </div>
          
        </div>
        <div className="order-6 space-y-8 md:order-none">
          <Leadership />
          <ImportantLinks />
        </div>
      </main>

      <Teachers limit={3} />
      <Gallery limit={4} />
      <Contact />
    </>
  );
}