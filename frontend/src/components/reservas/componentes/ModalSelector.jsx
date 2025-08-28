import { X } from "lucide-react";

function ModalSelector({ isOpen, onClose, title, items, renderItem }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
      <div
        className="relative w-full sm:w-[80%] lg:w-1/2 bg-card rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 my-6 ml-2">{title}</h2>

        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {items.map((item) => renderItem(item))}
        </div>
      </div>
    </div>
  );
}

export default ModalSelector;
