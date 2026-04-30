import { useState, useEffect, useRef } from "react";
import "./Gallery.css";
import artworks from "../data/artworks";

export default function Gallery() {
  const [filter, setFilter] = useState("elduelo");
  const [displayedArtworks, setDisplayedArtworks] = useState([]);
  const [fade, setFade] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  // 👇 NUEVO: index interno (obra + detalles)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 👇 swipe
  const touchStartX = useRef(0);

  const [visibleCount, setVisibleCount] = useState(5);

  const seriesInfo = {
    elduelo: {
      title: "El duelo",
      text: "La obra aborda el duelo desde la perspectiva femenina como una escena íntima y silenciosa. La serie está compuesta por tres dibujos realizados con tizas pastel sobre lienzo y reflexiona sobre pérdidas visibles e invisibles: la ausencia de un ser querido, el fin de una relación y las transformaciones que implica el paso de una etapa a otra.\n\nEl duelo se presenta como un estado interno y persistente, que deja huellas en la memoria y en el cuerpo. La paleta limitada, con predominio de tonos fríos sobre los cálidos, y la atmósfera densa refuerzan una sensación de suspensión. La luz y el alto contraste generan puntos de tensión que concentran la carga emocional de las escenas."},
    tarot: {
      title: "Tarot de galgos",
      text: "Esta serie reinterpreta los arcanos del tarot a través de la figura del galgo. Cada carta traslada sus símbolos clásicos a escenas donde el impulso, la sensibilidad y el movimiento del animal construyen nuevos significados. \n\n Está en proceso y se realizó en acuarela sobre papel de algodón."
    },
    recetas: {
      title: "Recetas",
      text: "Esta serie está hecha en acuarela sobre papel de algodón y toma la cocina como punto de partida para crear imágenes sensibles a partir de lo cotidiano. Es una suerte de recompilación de las recetas características de mi familia para poder atesorarlas de manera analógica."
    },
    laminas: {
      title: "Láminas",
      text: "Selección de láminas hechas con acuarelas en formato póster inspiradas en el estilo tradicional de diccionarios ilustrados."
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

  useEffect(() => {
    setExpanded(false);
    setVisibleCount(5);
  }, [filter]);

  const fullText = seriesInfo[filter].text;

  // 👇 imágenes actuales (obra + detalles)
  const images = selectedArtwork
    ? [selectedArtwork.image, ...(selectedArtwork.details || [])]
    : [];

  const currentImage = images[currentImageIndex];

  // 👇 navegación interna
  const next = () => {
    setCurrentImageIndex((i) =>
      i === images.length - 1 ? 0 : i + 1
    );
    setZoomed(false);
  };

  const prev = () => {
    setCurrentImageIndex((i) =>
      i === 0 ? images.length - 1 : i - 1
    );
    setZoomed(false);
  };

  // bloquear el fondo cuando se abre lightbox
  useEffect(() => {
  if (selectedArtwork) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [selectedArtwork]);

  return (
    <section id="galeria" className="gallery-layout">

      {/* FILTROS (intacto) */}
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

      {/* GALERÍA */}
      <div className="gallery-left">
        <div className={`gallery ${fade ? "fade-in" : "fade-out"}`}>
          {displayedArtworks.slice(0, visibleCount).map((art, index) => (
            <div
              className="gallery-item"
              key={index}
              onClick={() => {
                setSelectedArtwork(art);
                setCurrentImageIndex(0); // 👈 arranca en obra principal
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

        {visibleCount < displayedArtworks.length && (
          <button
            className="load-more"
            onClick={() => setVisibleCount(prev => prev + 5)}
          >
            ver más obras
          </button>
        )}
      </div>

      {/* TEXTO */}
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

      {/* LIGHTBOX */}
      {selectedArtwork && (
        <div
          className="lightbox"
          onClick={() => {
            setSelectedArtwork(null);
            setZoomed(false);
            setCurrentImageIndex(0);
          }}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}

            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}

            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;

              if (diff > 50) next();
              if (diff < -50) prev();
            }}
          >

            <button
              className="lightbox-close"
              onClick={() => {
                setSelectedArtwork(null);
                setZoomed(false);
                setCurrentImageIndex(0);
              }}
            >
              x
            </button>

            <img
              src={currentImage}
              alt={selectedArtwork.title}
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect();

                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                setZoomOrigin(`${x}% ${y}%`);
                setZoomed((z) => !z);
              }}
              className={zoomed ? "zoomed" : ""}
              style={{ transformOrigin: zoomOrigin }}
            />

            {/* FILM STRIP */}
{images.length > 1 && (
  <div className="film-strip">
    {images.map((img, i) => (
      <img
        key={i}
        src={img}
        className={i === currentImageIndex ? "active" : ""}
        onClick={() => {
          setCurrentImageIndex(i);
          setZoomed(false);
        }}
      />
    ))}
  </div>
)}

            {/* CAPTION */}
            <div className="lightbox-caption">
              <h3>{selectedArtwork.title}</h3>

              {(selectedArtwork.medium || selectedArtwork.size || selectedArtwork.year) && (
                <p>
                  {selectedArtwork.medium && `${selectedArtwork.medium}`}
                  {selectedArtwork.size && ` · ${selectedArtwork.size}`}
                  {selectedArtwork.year && ` · ${selectedArtwork.year}`}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}