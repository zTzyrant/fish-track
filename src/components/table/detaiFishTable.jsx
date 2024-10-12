"use client";
import { useEffect, useState } from "react";
import { validateImageUrl } from "@/utils/mainUtils";
import { putSpecies } from "@/service/api.service";
import Swal from "sweetalert2";

export const DetailFishTable = ({
  isUpdating = false,
  data,
  fishForm,
  setFishForm,
  postFishData,
}) => {
  const [fishData, setFishData] = useState({
    id: "",
    faoCode: "",
    typeOfFish: "",
    scientificName: "",
    englishName: "",
    indonesianName: "",
    localName: "",
    typeOfWater: "",
    imageUrl: "",
    statusInIndonesia: "",
    fishUtilization: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data)
      setFishData({
        ...data,
      });
  }, [data]);

  useEffect(() => {
    if (fishForm) {
      setFishForm({
        ...fishData,
      });
    }
  }, [fishData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFishData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateFish = async () => {
    const { id, ...formValues } = fishData;

    if (Object.values(formValues).some((value) => !value)) {
      return Swal.fire({
        title: "Error!",
        text: "Semua kolom harus diisi!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (!validateImageUrl(formValues.imageUrl)) {
      return Swal.fire({
        title: "Error!",
        text: "URL gambar tidak valid!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    const { isConfirmed } = await Swal.fire({
      icon: "question",
      title: "Konfirmasi Perubahan Data",
      html: `
        <p>Apakah Anda yakin ingin mengubah data ikan dengan nama ilmiah:</p>
        <strong><i>${fishData.scientificName}</i></strong>
      `,
      showCancelButton: true,
      confirmButtonText: "Ya, perbarui",
      cancelButtonText: "Batal",
    });

    if (isConfirmed) {
      try {
        const { data } = await putSpecies(fishData.id, fishData);
        await Swal.fire({
          icon: "success",
          title: "Data berhasil diperbarui!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: "error",
          title: "Data gagal diperbarui!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (fishForm) {
      await postFishData(fishForm);
    } else {
      await handleUpdateFish();
    }
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Data Ikan
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Atribut
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Nilai
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(fishData).map(([key, value], index) => (
              <tr
                key={key}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-4 border-b text-sm font-medium text-gray-700">
                  {key}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">
                  {key === "imageUrl" ? (
                    <div className="flex flex-col gap-2">
                      <img
                        src={value && validateImageUrl(value) ? value : ""}
                        alt="Ikan"
                        className="w-32 h-24 object-cover rounded mr-2"
                      />
                      <input
                        type="text"
                        name={key}
                        value={value ?? ""}
                        onChange={handleInputChange}
                        className={`flex-grow p-1 border rounded`}
                        disabled={!isUpdating}
                      />
                      {!validateImageUrl(value) && value !== "" && (
                        <small className="text-red-500">
                          URL gambar tidak valid!
                        </small>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={value ?? ""}
                      onChange={handleInputChange}
                      className={`w-full p-1 border rounded
                        disabled:bg-gray-100
                         ${!isUpdating && "user-select-none"}`}
                      disabled={!isUpdating || key === "id"}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isUpdating && (
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {fishForm ? "Tambahkan" : "Perbarui"}
          </button>
        </div>
      )}
    </form>
  );
};
