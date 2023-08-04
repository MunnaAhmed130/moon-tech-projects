import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useGetProductQuery,
  useUpdateProductsMutation,
} from "../../features/api/apiSlice";

const EditProduct = () => {
  const params = useParams();
  console.log(params);
  // console.log(params._id);

  // const { data } = useGetProductsQuery();
  const { data } = useGetProductQuery(params._id);
  const product = data;
  console.log(product);
  // console.log(product.model);

  const [updateProduct, { isLoading, isError, isSuccess, error }] =
    useUpdateProductsMutation();

  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const newProduct = {
      // _id: content[0]._id,
      _id: product._id,
      model: data.model,
      image: data.image,
      brand: data.brand,
      status: data.status === "true" ? true : false,
      price: data.price,
      keyFeature: [
        data.keyFeature1,
        data.keyFeature2,
        data.keyFeature3,
        data.keyFeature4,
      ],
      spec: [],
    };

    updateProduct(newProduct);
    console.log(newProduct);
    // dispatch(changeProduct(product));
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating", { id: "updateProduct" });
    }

    if (isSuccess) {
      toast.success("Product Updated", { id: "updateProduct" });
    }

    if (isError) {
      toast.error(error, { id: "updateProduct" });
    }
  }, [isLoading, isSuccess, error, isError]);

  // let content;
  // if (params._id) {
  //   content =
  //     products && products.filter((product) => product._id === params._id);
  //   // .map((product) => console.log(product));
  // }

  // console.log(content[0].spec);
  return (
    <div className="flex justify-center items-center h-full ">
      {/* {products &&
        products.map((product) => ( */}
      {product && (
        <form
          className="shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white"
          onSubmit={handleSubmit(submit)}
          key={product._id}
        >
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="model">
              Model
            </label>
            <input
              defaultValue={product.model}
              type="text"
              id="model"
              {...register("model")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="image">
              Image
            </label>
            <input
              defaultValue={product.image}
              type="text"
              name="image"
              id="image"
              {...register("image")}
            />
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" htmlFor="brand">
              Brand
            </label>
            <select
              defaultValue={product.brand}
              name="brand"
              id="brand"
              {...register("brand")}
            >
              <option value="amd">AMD</option>
              <option value="intel">Intel</option>
            </select>
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="price">
              Price
            </label>
            <input
              defaultValue={product.price}
              type="number"
              name="price"
              id="price"
              {...register("price")}
            />
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <h1 className="mb-3">Availability</h1>
            <div className="flex gap-3">
              <div>
                <input
                  type="radio"
                  id="available"
                  value={true}
                  {...register("status")}
                  defaultChecked={product.status}
                />
                <label className="ml-2 text-lg" htmlFor="available">
                  Available
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="stockOut"
                  name="status"
                  value={false}
                  {...register("status")}
                  defaultChecked={!product.status}
                />
                <label className="ml-2 text-lg" htmlFor="stockOut">
                  Stock out
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-xs"></div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="keyFeature1">
              Key Feature 1
            </label>
            <input
              defaultValue={product.keyFeature[0]}
              type="text"
              name="keyFeature1"
              id="keyFeature1"
              {...register("keyFeature1")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="keyFeature2">
              Key Feature 2
            </label>
            <input
              defaultValue={product.keyFeature[1]}
              type="text"
              name="keyFeature2"
              id="keyFeature2"
              {...register("keyFeature2")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="keyFeature3">
              Key Feature 3
            </label>
            <input
              defaultValue={product.keyFeature[2]}
              type="text"
              name="keyFeature3"
              id="keyFeature3"
              {...register("keyFeature3")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="keyFeature4">
              Key Feature 4
            </label>
            <input
              defaultValue={product.keyFeature[3]}
              type="text"
              name="keyFeature4"
              id="keyFeature4"
              {...register("keyFeature4")}
            />
          </div>

          <div className="flex justify-between items-center w-full">
            <button
              className=" px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
