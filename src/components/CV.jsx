import "./CV.css";

export default function CV() {
  return (
    <section id="cv" className="cv-section">
      <div className="cv-container">
        <h2>Trayectoria</h2>

        <p className="cv-intro">
          Artista visual enfocada en técnicas tradicionales como oleo, acuarela y tiza pastel,
          con exploraciones en narrativa visual, editorial y simbología.
        </p>

        <div className="cv-block">
          <h3>Formación</h3>
          <p>— Taller de Arte Independiente</p>
        </div>

        <div className="cv-block">
          <h3>Exposiciones</h3>
          <p>— Convocatoria abierta de la Universidad Tecnologica Nacional</p>
        </div>

        <div className="cv-block">
          <h3>Proyectos</h3>
          <p>— El duelo</p>
          <p>— Láminas</p>
          <p>— Recetario ilustrado</p>
          <p>— Tarot en acuarela</p>
        </div>
      </div>
    </section>
  );
}