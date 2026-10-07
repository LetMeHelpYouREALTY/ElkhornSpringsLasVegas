let mapsReady: Promise<void> | null = null;
export function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("ssr"));
  if (typeof window.google?.maps?.importLibrary === "function") return Promise.resolve();
  if (mapsReady) return mapsReady;
  mapsReady = new Promise<void>((resolve, reject) => {
    const cb = "__gmapsReady";
    (window as unknown as Record<string, () => void>)[cb] = () => resolve();
    (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
      window.dispatchEvent(new Event("gmaps:auth-failure"));
      reject(new Error("gm_authFailure"));
    };
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=${cb}`;
    s.async = true;
    s.onerror = () => {
      mapsReady = null;
      reject(new Error("maps script failed"));
    };
    document.head.appendChild(s);
  });
  return mapsReady;
}

export let mapsAuthFailed = false;
if (typeof window !== "undefined") {
  window.addEventListener("gmaps:auth-failure", () => {
    mapsAuthFailed = true;
  });
}

/** Referer/key errors sometimes render Google's grey error UI without calling gm_authFailure. */
export function watchGoogleMapsLoadFailure(
  container: HTMLElement,
  onFailure: () => void,
): () => void {
  let stopped = false;
  const stop = () => {
    stopped = true;
  };

  const check = () => {
    if (stopped) return;
    const text = container.innerText;
    if (
      container.querySelector(".gm-err-container") ||
      /didn\u2019t load Google Maps correctly|didn't load Google Maps correctly|RefererNotAllowedMapError/i.test(
        text,
      )
    ) {
      mapsAuthFailed = true;
      window.dispatchEvent(new Event("gmaps:auth-failure"));
      onFailure();
      stop();
    }
  };

  const interval = window.setInterval(check, 350);
  const timeout = window.setTimeout(() => {
    window.clearInterval(interval);
    stop();
  }, 6000);

  return () => {
    window.clearInterval(interval);
    window.clearTimeout(timeout);
    stop();
  };
}
