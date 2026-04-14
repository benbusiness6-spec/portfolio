import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { GlobalStyles, Nav, Footer } from "./shared.jsx";
import Home from "./Home.jsx";
import Work from "./Work.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div style={{ "--fh": "'Syne','Helvetica Neue',sans-serif", "--fb": "'Inter',-apple-system,sans-serif", minHeight: "100vh", background: "#0A0A0A", color: "#F5F0EB", fontFamily: "var(--fb)", overflowX: "hidden" }}>
      <GlobalStyles />
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Work />} />
        <Route path="/work" element={<Home />} />
        <Route path="*" element={<Work />} />
      </Routes>
      <Footer />
    </div>
  );
}
