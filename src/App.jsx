import { useEffect } from "react";
import { useLocation } from "./router.jsx";
import { GlobalStyles, Nav, Footer } from "./shared.jsx";
import Home from "./Home.jsx";
import Work from "./Work.jsx";
import Security from "./Security.jsx";
import Privacy from "./Privacy.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const page =
    pathname === "/work" ? <Work /> :
    pathname === "/security" ? <Security /> :
    pathname === "/privacy" ? <Privacy /> :
    <Home />;
  return (
    <div style={{ "--fh": "'Syne','Helvetica Neue',sans-serif", "--fb": "'Inter',-apple-system,sans-serif", minHeight: "100vh", background: "#0A0A0A", color: "#F5F0EB", fontFamily: "var(--fb)", overflowX: "hidden" }}>
      <GlobalStyles />
      <ScrollToTop />
      <Nav />
      {page}
      <Footer />
    </div>
  );
}
