import "./Footer.css";

export default function Footer() {
  return (
    <section id="contacto" className="footer-section">
      <div className="footer-container">

        <h2>Contacto</h2>

        <p className="footer-intro">
          Para consultas, colaboraciones o adquisición de obra:
        </p>

        <div className="footer-links">
          <a href="mailto:mirandasanchezarte@gmail.com">mirandasanchezarte@gmail.com</a>

          <a
            href="https://instagram.com/miranda.scz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <a
            href="https://www.tiktok.com/@miranda_scz"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Miranda Sánchez</p>
        </div>

      </div>
    </section>
  );
}