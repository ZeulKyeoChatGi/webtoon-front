declare global {
  interface Window {
    gtag: unknown;
  }
}

window.gtag = window.gtag || "SomeValue";
