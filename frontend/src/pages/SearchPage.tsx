import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS } from "../graphql/operations";
import AdCard from "../components/AdCard";
import type { GetAllAdsQuery } from "../generated/graphql-types";

const SearchPage = () => {
  const { keyword } = useParams();

  const { data, loading, error } = useQuery<GetAllAdsQuery>(GET_ALL_ADS, {
    variables: { search: keyword },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const ads = data?.getAllAds ?? [];

  return (
  <section style={{
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "flex-start",
    }}>
    <div className="search-results-title">
      Résultats de recherche pour « {keyword} »
    </div>
   <div  className="recent-ads" >
    {ads.length === 0 ? (
      <p>Aucune annonce trouvée pour « {keyword} ».</p>
    ) : (
      ads.map((ad) => (
        <Link key={ad.id} to={`/ads/${ad.id}`}>
          <AdCard
            picture={ad.picture}
            price={ad.price}
            title={ad.title}
          />
        </Link>
      ))
    )}
   </div>
    
  </section>
);
};

export default SearchPage;
