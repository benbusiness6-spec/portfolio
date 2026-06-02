import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { GlobalStyles, Nav, Footer } from "./shared.jsx";

const Home = lazy(() => import("./Home.jsx"));
const Work = lazy(() => import("./Work.jsx"));
const Security = lazy(() => import("./Security.jsx"));
const Privacy = lazy(() => import("./Privacy.jsx"));

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
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0A0A0A" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/security" element={<Security />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
