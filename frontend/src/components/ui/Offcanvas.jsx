function OffCanvas({ title, show, onClose, children }) {
  return (
    <div>
      {/* Overlay when off-canvas is open */}
      {show && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>}

      {/* Off-canvas menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[30rem] bg-white shadow-lg transform ${
          show ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <div className="border-b mb-5 pb-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <h1
              onClick={onClose}
              className="px-2 hover:bg-fuchsia-500 hover:text-white hover:cursor-pointer text-3xl rounded-full"
            >
              &times;
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default OffCanvas;
