import "./FloatingSocial.css";

const WHATSAPP_NUMBER = "918688431781";
const WHATSAPP_MESSAGE = "Hi! I'd like to get more information about EditScriptStudio's services.";
const INSTAGRAM_URL = "https://www.instagram.com/editscriptstudio?igsh=dXE4Y2w3bXUxcGtl";

export default function FloatingSocial() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="floating-social">
      <a
        className="floating-social__button floating-social__button--instagram"
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#fff" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.6" stroke="#fff" strokeWidth="1.8" />
          <circle cx="17.4" cy="6.6" r="1.15" fill="#fff" />
        </svg>
      </a>

      <a
        className="floating-social__button floating-social__button--whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            fill="#fff"
            d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.38.66 4.61 1.8 6.52L4 29l7.65-1.75a11.94 11.94 0 0 0 4.36.82h.01c6.63 0 12.01-5.38 12.01-12.01C28.02 8.38 22.64 3 16.01 3Z"
          />
          <path
            fill="#25D366"
            d="M16.01 4.6c-5.75 0-10.42 4.67-10.42 10.42 0 2.05.6 4 1.72 5.68l.27.4-1.07 3.91 4.01-1.03.39.24a10.35 10.35 0 0 0 5.1 1.36h.01c5.75 0 10.42-4.67 10.42-10.42S21.76 4.6 16.01 4.6Zm5.98 14.6c-.25.71-1.46 1.36-2.02 1.44-.52.08-1.17.11-1.89-.12a17.4 17.4 0 0 1-1.72-.63c-3.02-1.3-4.99-4.34-5.14-4.54-.15-.2-1.24-1.64-1.24-3.14 0-1.49.78-2.23 1.06-2.53.28-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.09.92 2.24.08.15.13.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.61.17.3.76 1.26 1.63 2.05 1.12 1.02 2.06 1.34 2.36 1.49.3.15.48.13.66-.08.18-.2.76-.9.97-1.2.2-.3.4-.25.68-.15.28.1 1.77.85 2.07 1 .3.15.5.23.58.35.08.13.08.72-.17 1.43Z"
          />
        </svg>
      </a>
    </div>
  );
}
