// export default function OwnersList({ owners, onSelectOwner, onAddOwner }) {
//   return (
//     <div className="w-64 bg-gray-800 text-white p-4">
//       <h2 className="text-xl font-bold mb-4">Owners</h2>
//       <ul>
//         {owners.map((owner) => (
//           <li key={owner._id} className="mb-2">
//             <button
//               onClick={() => onSelectOwner(owner._id)}
//               className="w-full text-left px-2 py-1 rounded hover:bg-gray-700"
//             >
//               {owner.name}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button
//         onClick={onAddOwner}
//         className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Add Owner
//       </button>
//     </div>
//   );
// }
