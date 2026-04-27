import "./Recipes.css";
import artworks from "../data/artworks";

export default function Recipes() {
  const recipes = artworks.filter(
    (art) => art.category === "recetas"
  );

  return (
    <section className="recipes">
      <h2>Recetas ilustradas</h2>

      <div className="recipes-grid">
        {recipes.map((art, index) => (
          <div key={index} className="recipe-item">
            <img src={art.image} alt={art.title} />
          </div>
        ))}
      </div>
    </section>
  );
}