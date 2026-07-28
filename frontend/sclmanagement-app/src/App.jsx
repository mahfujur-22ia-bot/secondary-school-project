import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Teachers from "./components/Teachers";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import News from "./components/News";
import StudentListPage from "./pages/multiplesection/StudentListPage";
import CertificatePage from "./pages/multiplesection/CertificatePage";
import AttendancePage from "./pages/multiplesection/AttendancePage";
import ResultPage from "./pages/multiplesection/ResultPage";
import ExamSchedulePage from "./pages/multiplesection/ExamSchedulePage";
import RoutinePage from "./pages/multiplesection/RoutinePage";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  return (
    
    <BrowserRouter>
      <div className="bg-gray-50 text-gray-800 overflow-x-hidden min-h-screen">
        <ScrollProgress />

        <TopBar />
        <Header />
        <main className="pt-[120px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<StudentListPage />} />
            <Route path="/verify-certificate" element={<CertificatePage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/exam-schedule" element={<ExamSchedulePage />} />
            <Route path="/news" element={<News />} />
            <Route path="/routine" element={<RoutinePage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;