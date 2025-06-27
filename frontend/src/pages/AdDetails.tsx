import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useDeleteAdMutation, useGetAdQuery } from "../generated/graphql-types";

const AdDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [deleteAd] = useDeleteAdMutation();

  const { data, loading, error } = useGetAdQuery({
    variables: { getAdId: Number(id) },
  });

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Woops, on a tout cassé</p>;

  return (
    <div className="main-content-ad-details">
      <div className="ad-details-image-container">
          <img className="ad-details-image" src={data?.getAd.picture} />
      </div>
      <section className="ad-details">
        <div className="ad-details-header">
          <h2 className="ad-details-title">{data?.getAd.title}</h2>
        </div>
        <div className="ad-details-info">
          <div className="ad-details-haut">
              <div className="ad-details-location">{data?.getAd.location}</div>
              <div className="ad-details-time"> {new Date(data?.getAd.createdAt).toLocaleDateString()}{'\u00A0'} à {'\u00A0'}
                {new Date(data?.getAd.createdAt).toLocaleTimeString()}.
             </div>
              <div className="ad-details-owner">
                par {'\u00A0'}<b>{data?.getAd.owner}</b>{" "}
                </div>
           </div>
           <div className="ad-details-bas">  
              <div className="ad-details-price">{data?.getAd.price} €</div>
              <div className="ad-details-description">{data?.getAd.description}  </div>
           </div>
           <div className="button-details-bas"> 
              <a
                href="mailto:serge@serge.com"
                className="button button-primary link-button"
              >
                Envoyer un email
              </a>
              <button
                onClick={async () => {
                  try {
                    await deleteAd({ variables: { deleteAdId: Number(id) } });
                    navigate("/");
                    toast.success("Ad has been deleted");
                  } catch (err) {
                    console.log(err);
                    toast.error("An error occurred");
                  }
                }}
              >
                Supprimer l'annonce
              </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default AdDetailsPage;
