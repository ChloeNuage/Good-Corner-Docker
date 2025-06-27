import { Link, useSearchParams } from "react-router-dom";
import { useGetAllAdsQuery } from "../generated/graphql-types";
import AdCard from "./AdCard";

const RecentAds = () => {
  const { data, loading, error } = useGetAllAdsQuery();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Woops, on a tout cassé</p>;
  if (!data) return <p>Woops, on a tout cassé (should never render this)</p>;

  const filteredAds = selectedCategory
    ? data.getAllAds.filter((ad) => ad.category.id === Number(selectedCategory))
    : data.getAllAds;

  return (
    <>
      <div className="advertising">
        <div className="left-side-welcome-content">
          <h1>Achetez de la seconde main au meilleur prix et gardez la banane.</h1>
          <p>Trouvez la perle rare parmi les milliers d'annonces disponibles sur notre site.</p>
          <button>LET'S GO</button>
        </div>
        <div className="right-side-welcome-content">
          <img src="./images/horloge-banane.jpg" alt="banane" />
        </div>
      </div>

      <div className="title-recent-ads">
        {selectedCategory ? `Annonces filtrées par catégorie` : `Découvrez nos dernières annonces les plus consultées`}
      </div>

      <section className="recent-ads">
        {filteredAds.map((el, i) => (
          <div
            key={el.id}
            className={`ad-card-container ${i % 5 === 0 ? "first-column" : ""}`}
          >
            <Link to={`/ads/${el.id}`}>
              <AdCard picture={el.picture} title={el.title} price={el.price} />
            </Link>
          </div>
        ))}
      </section>

      <div className="advertising-2">
        <div className="left-side-welcome-content-2">
          <h1>Vendez vous aussi les vieilleries qui traînent dans votre grenier depuis des lustres.</h1>
          <p>Débarassez-vous enfin de l'horrible vase kitch de tante Simone en quelques clics seulement.</p>
          <button>NOUVELLE ANNONCE</button>
        </div>
        <div className="right-side-welcome-content-2">
          <img src="./images/vase-kitch.png" alt="banane" />
        </div>
      </div>
    </>
  );
};

export default RecentAds;
