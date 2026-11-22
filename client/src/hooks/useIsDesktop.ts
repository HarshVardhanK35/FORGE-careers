import { useEffect, useState } from "react";

const QUERY = "(min-width: 768px)"; // the same width where the app switches to the desktop layout

// true on a desktop-size screen, and it changes when the window is resized
export function useIsDesktop(): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setMatches(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return matches;
}
