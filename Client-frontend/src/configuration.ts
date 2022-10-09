export {};
declare global {
  interface Window {
    DunaCheckout: any;
    dataLayer: any;
  }
}

const deuna = window.DunaCheckout(); // ok now
export const dataLayer = window.dataLayer;

export function sendInfoToData(email) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'login',
    logged_in: true,
    email: email,
  });
}

export function sendInfoToDataExit() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'log out',
    logged_in: false,
    email: '',
  });
}
