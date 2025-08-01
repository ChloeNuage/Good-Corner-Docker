import { Link } from "react-router";
import { useGetAllAdsQuery } from "../generated/graphql-types";
import AdCard from "./AdCard";

const RecentAds = () => {
  const { data, loading, error } = useGetAllAdsQuery();
  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Woops, on a tout cassé</p>;
  if (!data) return <p>Woops, on a tout cassé </p>;

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
       Découvrez nos dernières annonces les plus consultées
      </div>
        <section className="recent-ads">
          {data?.getAllAds.map((el) => (
            <Link key={el.id} to={`/ads/${el.id}`}>
              <AdCard picture={el.picture} title={el.title} price={el.price} />
            </Link>
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

