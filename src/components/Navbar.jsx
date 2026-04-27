import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [active, setActive] = useState("galeria");

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* ========================= */
  /* DETECTAR SCROLL NAVBAR */
  /* ========================= */

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");

      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setShowMenuButton(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ========================= */
  /* ACTIVE SECTION */
  /* ========================= */

  useEffect(() => {
    const sections = ["galeria", "cv", "contacto"];

    const handleScroll = () => {
      let current = "galeria";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 200;
          if (window.scrollY >= top) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ========================= */
  /* BLOQUEAR SCROLL CUANDO ABRE */
  /* ========================= */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  /* ========================= */
  /* SWIPE MOBILE */
  /* ========================= */

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const delta = touchEndX.current - touchStartX.current;

      /* 👉 abrir (swipe desde borde derecho hacia izquierda) */
      if (!open && touchStartX.current > window.innerWidth - 50 && delta < -50) {
        setOpen(true);
      }

      /* 👉 cerrar (swipe hacia derecha) */
      if (open && delta > 50) {
        setOpen(false);
      }
    };

    

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [open]);

  /* ========================= */
  /* RENDER */
  /* ========================= */

  return (
    <>
      {/* NAV ORIGINAL */}
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <a href="#galeria" className={active === "galeria" ? "active" : ""}>
              Obras
            </a>
          </li>

          <li>
            <a href="#cv" className={active === "cv" ? "active" : ""}>
              Trayectoria
            </a>
          </li>

          <li>
            <a href="#contacto" className={active === "contacto" ? "active" : ""}>
              Contacto
            </a>
          </li>

          {/* <li>
            <a
              href="https://mirandaediciones.mitiendanube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="shop"
            >
              Tienda
            </a>
          </li> */}
        </ul>
      </nav>

      {/* BOTÓN */}
      {showMenuButton && !open && (
        <div className="floating-menu">
          <button onClick={() => setOpen(true)} className="menu-toggle">
            Menú
          </button>
        </div>
      )}

      {/* OVERLAY */}
      <div
        className={`menu-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* DRAWER */}
      <div className={`menu-drawer ${open ? "open" : ""}`}>
        <a onClick={() => setOpen(false)} href="#galeria" className={active === "galeria" ? "active" : ""}>
          Obras
        </a>

        <a onClick={() => setOpen(false)} href="#cv" className={active === "cv" ? "active" : ""}>
          Trayectoria
        </a>

        <a onClick={() => setOpen(false)} href="#contacto" className={active === "contacto" ? "active" : ""}>
          Contacto
        </a>

        {/* <a
          href="https://mirandaediciones.mitiendanube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="shop"
        >
          Tienda
        </a> */}
        
      </div>
    </>
  );
}