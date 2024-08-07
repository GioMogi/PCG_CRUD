export default function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="p-4">
            <button className="absolute top-0 right-0 p-2" onClick={onClose}>
              X
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
