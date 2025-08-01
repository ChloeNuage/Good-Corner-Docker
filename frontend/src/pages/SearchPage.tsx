import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AdCard, { type AdCardProps } from "../components/AdCard";


const SearchPage = () => {
  const { keyword } = useParams();
  const [ads, setAds] = useState<AdCardProps[]>([]);

    useEffect(() => {
    const fetchAds = async () => {
      const result = await axios.get(
        `http://localhost:12345/ads?search=${keyword}`,
        {
          headers: {
            "Content-Type": "application/json", // important pour ne pas bloquer le CSRF
            "x-apollo-operation-name": "searchAds",
          },
        }
      );
      console.log("result", result);
      setAds(result.data);
    };
    fetchAds();
  }, [keyword]);


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
