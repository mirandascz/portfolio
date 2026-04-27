import { useState, useEffect } from "react";
import "./Gallery.css";
import artworks from "../data/artworks";

export default function Gallery() {
  const [filter, setFilter] = useState("elduelo");
  const [displayedArtworks, setDisplayedArtworks] = useState([]);
  const [fade, setFade] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  // 👇 control curatorial
  const [visibleCount, setVisibleCount] = useState(5);

  const seriesInfo = {
    elduelo: {
      title: "El duelo",
      text: "Serie de obras en tiza elduelo donde se exploran procesos de duelo desde lo íntimo y lo cotidiano..."
    },
    tarot: {
      title: "Tarot de galgos",
      text: "La serie Tarot de galgos propone una reinterpretación del tarot clásico desde una mirada animal y contemporánea. Cada arcano es trasladado al universo del galgo, donde los símbolos tradicionales se transforman en elementos cotidianos: objetos, gestos y situaciones propias de su mundo.\n\nA través de técnicas analógicas como la acuarela y el dibujo, la serie explora estados emocionales y simbólicos desde una sensibilidad más intuitiva que narrativa. El galgo aparece como figura central no solo por su carga estética, sino por su condición: un cuerpo frágil, atento, atravesado por el impulso y la tensión.\n\nMás que ilustrar significados, las imágenes buscan abrir lecturas. El tarot funciona aquí como estructura, pero también como excusa para pensar en el vínculo, el instinto, el control y la posibilidad de transformación."
    },
    recetas: {
      title: "Recetas",
      text: "Serie que cruza cocina e imagen..."
    },
    laminas: {
      title: "Láminas",
      text: "Selección de obras pensadas como piezas reproducibles..."
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash.includes("galeria")) {
        const section = document.getElementById("galeria");

        if (section) {
          setTimeout(() => {
            section.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }, 50);
        }
      }

      if (hash.includes("?")) {
        const params = new URLSearchParams(hash.split("?")[1]);
        let serie = params.get("serie");

        if (serie === "elduelo") serie = "elduelo";
        if (serie) setFilter(serie);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    setFade(false);

    const timeout = setTimeout(() => {
      const newArtworks = artworks.filter(
        (art) => art.category === filter
      );

      setDisplayedArtworks(newArtworks);
      setFade(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [filter]);

  // 👇 reset curatorial
  useEffect(() => {
    setExpanded(false);
    setVisibleCount(5);
  }, [filter]);

  const fullText = seriesInfo[filter].text;

  return (
    <section id="galeria" className="gallery-layout">

      <div className="filters">
        <button
          onClick={() => setOpen(!open)}
          className={`filter-toggle ${open ? "open" : ""}`}
        >
          Series
        </button>

        {open && (
          <div className="filter-dropdown">
            <button onClick={() => { setFilter("elduelo"); setOpen(false); }} className={filter === "elduelo" ? "active" : ""}>El duelo</button>
            <button onClick={() => { setFilter("tarot"); setOpen(false); }} className={filter === "tarot" ? "active" : ""}>Tarot de galgos</button>
            <button onClick={() => { setFilter("recetas"); setOpen(false); }} className={filter === "recetas" ? "active" : ""}>Recetas</button>
            <button onClick={() => { setFilter("laminas"); setOpen(false); }} className={filter === "laminas" ? "active" : ""}>Láminas</button>
          </div>
        )}

        <div className="filters-desktop">
          <button onClick={() => setFilter("elduelo")} className={filter === "elduelo" ? "active" : ""}>El duelo</button>
          <button onClick={() => setFilter("tarot")} className={filter === "tarot" ? "active" : ""}>Tarot de galgos</button>
          <button onClick={() => setFilter("recetas")} className={filter === "recetas" ? "active" : ""}>Recetas</button>
          <button onClick={() => setFilter("laminas")} className={filter === "laminas" ? "active" : ""}>Láminas</button>
        </div>
      </div>

      <div className="gallery-left">
        <div className={`gallery ${fade ? "fade-in" : "fade-out"}`}>
          {displayedArtworks.slice(0, visibleCount).map((art, index) => (
            <div
              className="gallery-item"
              key={index}
              onClick={() => {
  setSelectedImage(art.image);
  setZoomed(false);
}}
            >
              <img 
                src={art.image} 
                alt={art.title}
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* 👇 BOTÓN CURATORIAL */}
        {visibleCount < displayedArtworks.length && (
          <button
            className="load-more"
            onClick={() => setVisibleCount(prev => prev + 5)}
          >
            ver más obras
          </button>
        )}
      </div>

      <div className="gallery-right">
        <div className="curatorial">
          <h2>{seriesInfo[filter].title}</h2>

          <div className={`text-wrapper ${expanded ? "expanded" : ""}`}>
            {fullText.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <button
            className="read-more"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Ver menos" : "Seguir leyendo"}
          </button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => {
            setSelectedImage(null);
            setZoomed(false);
          }}
        >
          <img
            src={selectedImage}
            alt="Obra ampliada"
            onClick={(e) => {
              e.stopPropagation();

              const rect = e.target.getBoundingClientRect();

              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;

              setZoomOrigin(`${x}% ${y}%`);
              setZoomed((z) => !z);
            }}
            className={zoomed ? "zoomed" : ""}
            style={{ transformOrigin: zoomOrigin }}
          />
        </div>
      )}
    </section>
  );
}