import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // fondo
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }

      // logo
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }

      // subtitle fade out
      if (subtitleRef.current) {
        const opacity = Math.max(1 - scrollY / 200, 0);
        subtitleRef.current.style.opacity = opacity;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg" ref={heroRef}></div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="seo-title">Miranda</h1>

        <img
          ref={logoRef}
          src="/images/firma.png"
          alt="Miranda Sánchez"
          className="hero-logo"
        />

        <h2 ref={subtitleRef} className="hero-subtitle">
          Artista visual | Buenos Aires, Argentina
        </h2>
      </div>
    </section>
  );
}