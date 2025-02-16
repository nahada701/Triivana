import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const storedScrollPosition = sessionStorage.getItem(pathname);
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      sessionStorage.setItem(pathname, window.scrollY);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
