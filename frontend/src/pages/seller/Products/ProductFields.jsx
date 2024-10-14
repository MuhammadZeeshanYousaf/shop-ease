import { useReducer, forwardRef, useImperativeHandle } from "react";

const productReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const ProductFields = forwardRef((props, ref) => {
  const [product, dispatchProduct] = useReducer(productReducer, { name: props.name || "", price: props.price || "", image: props.image || "" });

  // Expose the product fields data to parent using ref
  useImperativeHandle(ref, () => ({ product }));

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          name="name"
          type="text"
          required
          value={product.name}
          onChange={e => dispatchProduct({ type: "update", field: e.target.name, value: e.target.value })}
          placeholder="Enter product name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price ($)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          name="price"
          type="number"
          required
          value={product.price}
          onChange={e => dispatchProduct({ type: "update", field: e.target.name, value: e.target.value })}
          placeholder="Enter product price"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={e => dispatchProduct({ type: "update", field: e.target.name, value: e.target.files[0] })}
          placeholder="Select product image"
        />
      </div>
    </>
  );
});

ProductFields.displayName = "ProductFields";

export default ProductFields;
