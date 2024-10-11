const QuantityChip = ({ quantity = 1, onIncrement, onDecrement }) => (
  <div className="flex items-center my-1">
    <button
      onClick={onDecrement}
      className="bg-fuchsia-500 border border-fuchsia-500 text-white px-3 py-1 rounded-s-lg hover:bg-fuchsia-600"
    >
      -
    </button>
    <span className="px-4 py-0.5 text-lg font-semibold border border-fuchsia-200">{quantity}</span>
    <button
      onClick={onIncrement}
      className="bg-fuchsia-500 border border-fuchsia-500 text-white px-3 py-1 rounded-e-lg hover:bg-fuchsia-600"
    >
      +
    </button>
  </div>
);

export default QuantityChip;
