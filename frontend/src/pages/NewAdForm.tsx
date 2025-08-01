import { SubmitHandler, useForm } from "react-hook-form";
import {
  AdInput,
  useCreateAdMutation,
  useGetAllCategoriesAndTagsQuery,
} from "../generated/graphql-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { GET_ALL_ADS } from "../graphql/operations";


const NewAdForm = () => {
   const navigate = useNavigate();

   const { error, loading, data } = useGetAllCategoriesAndTagsQuery();

   const [createAd] = useCreateAdMutation({
    refetchQueries: [
      {
        query: GET_ALL_ADS,
      },
    ],
  });
    const { register, handleSubmit } = useForm<AdInput>();

  const onSubmit: SubmitHandler<AdInput> = async (data) => {
    try {
      const sanitizedData = { ...data, price: Number(data.price) };

      const { data: newAdData } = await createAd({
        variables: { data: sanitizedData },
      });
      // bellow the version without the destructuration / alias
      // const result = await createAd({ variables: { data: newData } });
      // const newAdData = result.data;
      navigate(`/ads/${newAdData?.createAd}`, { replace: true });
    } catch {
      toast.error("Une error !");
    }
  };

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Woops, on a tout cassé</p>;


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-main">
        <div className="title-new-add">
          <h1>Nouvelle annonce</h1>
          <p>Remplissez le formulaire ci-dessous pour créer une annonce.</p>
        </div>

        <div className="content-form-add">
          <div className="content-form-add-div-flex">
            {/* Gauche */}
            <div className="content-form-add-div-flex-left">
              <div className="form-line">
                <div className="mini-flex-left">
                  <p>Titre</p>
                </div>
                <div className="mini-flex-right">
                  <label style={{ width: "90%" }}>
                    <input  style={{ width: "100%" }}
                      defaultValue={""}
                      {...register("title", { required: true })}
                    />
                  </label>
                </div>
              </div>

              <div className="form-line">
                <div className="mini-flex-left">
                  <p>Price</p>
                </div>
                <div className="mini-flex-right">
                  <label className="label-price" style={{ width: "90%" }}>
                    <input style={{ width: "100%" }}
                      type="number"
                      {...register("price", { required: true })}
                    />
                  </label>
                </div>
              </div>

              <div className="form-line">
                <div className="mini-flex-left">
                  <p>Description</p>
                </div>
                <div className="mini-flex-right">
                  <label className="label-description" style={{ width: "90%" }}>
                    <input  style={{ width: "100%" }}
                      defaultValue={""}
                      {...register("description", { required: true })}
                    />
                  </label>
                </div>
              </div>

              <div className="form-no-line">
                <div className="mini-flex-left">
                  <p>Vendeur</p>
                </div>
                <div className="mini-flex-right">
                  <label className="label-owner"  style={{ width: "90%" }}>
                    <input  style={{ width: "100%" }}
                      defaultValue={""}
                      {...register("owner", { required: true })}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Droite */}
            <div className="content-form-add-div-flex-right">
              <div className="form-line">
                <div className="mini-flex-left">
                  <p>Ville</p>
                </div>
                <div className="mini-flex-right">
                  <label className="label-location"  style={{ width: "90%" }}>
                    <input  style={{ width: "100%" }}
                      defaultValue={""}
                      {...register("location", { required: true })}
                    />
                  </label>
                </div>
              </div>

              <div className="form-line">
                <div className="mini-flex-left">
                  <p>Image</p>
                </div>
                <div className="mini-flex-right">
                  <label className="label-picture"  style={{ width: "90%" }}>
                    <input  style={{ width: "100%" }}
                      defaultValue={ "" }
                      {...register("picture", { required: true })}
                    />
                  </label>
                </div>
              </div>

              <div className="form-line">
                <div className="mini-flex-left">
                  <p>Catégorie</p>
                </div>
                <div className="mini-flex-right">
                  <label className="label-category">
                    <select {...register("category", { required: true })}>
                      {data?.getAllCategories.map((el) => (
                        <option value={el.id} key={el.id}>
                          {el.title}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="form-no-line">
                <div className="mini-flex-left">
                  <p>Tags</p>
                </div>
                <div className="mini-flex-right">
                  {data?.getAllTags.map((el) => (
                    <div key={el.id}>
                      <label className="label-tag">
                        {el.title}
                        <input 
                          className="input-tag"
                          value={el.id}
                          type="checkbox"
                          {...register("tags")}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="button-submit-form">
            <input type="submit" value="Créer mon annonce" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewAdForm;
