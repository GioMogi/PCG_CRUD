export default function SelectedOwner({ owner, onEditOwner, onDeleteOwner }) {
  if (!owner) {
    return (
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold ">No Owner Selected</h2>
      </div>
    );
  }

  return (
    <div className="w-[35rem] mt-16">
      <h2 className="text-2xl font-bold mb-4 ">{owner.name}</h2>
      <p>
        <strong>Entity Type:</strong> {owner.entityType}
      </p>
      <p>
        <strong>Owner Type:</strong> {owner.ownerType}
      </p>
      <p>
        <strong>Address:</strong> {owner.address}
      </p>
      <p>
        <strong>Total Number of Land Holdings:</strong>{" "}
        {owner.totalLandHoldings}
      </p>
      <button
        onClick={() => onEditOwner(owner)}
        className="px-4 py-2 text-xs md:text-base rounded-md bg-gray-700 text-gray-50 hover:bg-gray-600 hover:text-gray-100"
      >
        Edit Owner
      </button>
      <button
        onClick={() => onDeleteOwner(owner._id)}
        className="px-4 py-2 text-xs md:text-base rounded-md bg-red-700 text-gray-50 hover:bg-gray-600 hover:text-gray-100"
      >
        Delete Owner
      </button>
    </div>
  );
}
