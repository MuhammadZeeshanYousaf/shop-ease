const Modal = ({ isOpen, onClose, onSubmit, title, submitText, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-25 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 w-2/5" onClick={e => e.stopPropagation()}>
        <div className="border-b mb-3 font-bold flex justify-between p-2">
          <h2 className="text-lg">{title}</h2>
          <p
            onClick={onClose}
            className="text-xl rounded-full px-2 hover:bg-fuchsia-500 hover:text-white hover:cursor-pointer"
          >
            &times;
          </p>
        </div>
        <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4">
          {/* Your modal content here */}
          {children}
          <div className="flex justify-end mt-4 gap-x-4">
            <button className="btn" type="submit">
              {submitText}
            </button>
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
