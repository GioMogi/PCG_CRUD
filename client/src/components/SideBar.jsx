export default function OwnersList({ owners, onSelectOwner, onAddOwner }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-gray-900 text-gray-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-gray-50">Owners</h2>
      <ul>
        {owners.map((owner) => (
          <li key={owner._id} className="mb-2">
            <button
              onClick={() => onSelectOwner(owner._id)}
              className="w-full text-left px-2 py-1 rounded hover:bg-gray-700"
            >
              {owner.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onAddOwner} className="px-4 py-2 text-xs md:text-base rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-100">
        Add Owner
      </button>
    </aside>
  );
};