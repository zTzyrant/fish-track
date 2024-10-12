"use client";
import Link from "next/link";
import { Paggination } from "../paggination";
import Swal from "sweetalert2";
import { deleteSpecies } from "@/service/api.service";

export const SpeciesTable = ({
  data = null,
  newKeyWord,
  setKeyWord,
  setNewKeyWord,
  setPageNumber,
  isAdmin,
}) => {
  const { totalPages, pageSize, totalRecords, pageNumber } = data;

  const handleDelete = (id) => {
    if (!isAdmin) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSpecies(id)
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            // alternative solution to refresh the page to get the latest data
            window.location.reload();
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center sm:flex-row gap-2 sm:justify-between">
        <h2 className="text-2xl font-bold">Data Ikan</h2>
        <div className="flex gap-4">
          <input
            type="text"
            className="py-2 px-4 text-sm font-semibold border border-gray-300 rounded-md"
            value={newKeyWord}
            onChange={(e) => setNewKeyWord(e.target.value)}
          />
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setKeyWord(newKeyWord);
              setPageNumber(1);
            }}
          >
            Cari
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <td className="border px-4 py-2">No</td>
              <td className="border px-4 py-2">Fao Code</td>
              <td className="border px-4 py-2">Type of Fish</td>
              <td className="border px-4 py-2">Scientific Name</td>
              <td className="border px-4 py-2">English Name</td>
              <td className="border px-4 py-2">Indonesian Name</td>
              <td className="border px-4 py-2">Local Name</td>
              <td className="border px-4 py-2">Type Of Water</td>
              <td className="border px-4 py-2">Image</td>
              <td className="border px-4 py-2">Status In Indonesia</td>
              <td className="border px-4 py-2">Fish Utilization</td>
              {isAdmin && <td className="border px-4 py-2">Action</td>}
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, i) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  {i + 1 + (pageNumber - 1) * pageSize}
                </td>
                <td className="border px-4 py-2">{item.faoCode}</td>
                <td className="border px-4 py-2">{item.typeOfFish}</td>
                <td className="border px-4 py-2">
                  <Link href={`/view/${item.id}`} className="underline italic">
                    {item.scientificName}
                  </Link>
                </td>
                <td className="border px-4 py-2">{item.englishName}</td>
                <td className="border px-4 py-2">{item.indonesianName}</td>
                <td className="border px-4 py-2">{item.localName}</td>
                <td className="border px-4 py-2">{item.typeOfWater}</td>
                <td className="border px-4 py-2">
                  <img
                    src={item.imageUrl}
                    alt="ikan"
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{item.statusInIndonesia}</td>
                <td className="border px-4 py-2">{item.fishUtilization}</td>
                {isAdmin && (
                  <td
                    colSpan="10"
                    className="border flex flex-col gap-1 px-4 py-2"
                  >
                    <Link href={`/edit/${item.id}`} className="">
                      <button className="bg-blue-400 w-full text-white px-4 py-2 rounded-md">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-400 w-full text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paggination
        totalPages={totalPages}
        pageSize={pageSize}
        totalRecords={totalRecords}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};
