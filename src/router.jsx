import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Minimal isomorphic router — replaces react-router-dom.
// Server passes initialPath; client reads window.location.

const RouterContext = createContext({ pathname: "/", navigate: () => {} });

// Normalize so /security, /security.html and /security/ all resolve the same.
// Production serves clean URLs; this also keeps direct-.html hits and local
// preview consistent with the prerendered route.
function normalize(p) {
  if (!p) return "/";
  p = p.replace(/\.html$/, "").replace(/\/index$/, "");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p === "" ? "/" : p;
}

export function Router({ initialPath, children }) {
  const [pathname, setPathname] = useState(
    normalize(initialPath ?? (typeof window !== "undefined" ? window.location.pathname : "/"))
  );

  const navigate = useCallback((to) => {
    if (typeof window === "undefined") return;
    if (to === window.location.pathname + window.location.hash) return;
    window.history.pushState({}, "", to);
    setPathname(normalize(window.location.pathname));
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPop = () => setPathname(normalize(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useLocation() {
  const { pathname } = useContext(RouterContext);
  return { pathname, hash: typeof window !== "undefined" ? window.location.hash : "" };
}

export function useNavigate() {
  return useContext(RouterContext).navigate;
}

export function Link({ to, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const handle = (e) => {
    if (onClick) onClick(e);
    // let modified clicks / new-tab behave natively
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
