"use client";

import { DetailFishTable } from "@/components/table/detaiFishTable";
import { useState } from "react";
import Swal from "sweetalert2";
import { postSpecies } from "@/service/api.service";
import { validateImageUrl } from "@/utils/mainUtils";

export default function AddFish() {
  const [fishForm, setFishForm] = useState({
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

  const handleSubmitFish = async () => {
    const { id, ...formValues } = fishForm;

    if (Object.values(formValues).some((value) => !value)) {
      return Swal.fire({
        title: "Error!",
        text: "Semua kolom harus diisi!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (!validateImageUrl(fishForm.imageUrl)) {
      return Swal.fire({
        title: "Error!",
        text: "URL gambar tidak valid!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    const { isConfirmed } = await Swal.fire({
      icon: "question",
      title: "Konfirmasi Penambahan Data",
      html: `
        <p>Apakah Anda yakin ingin menambahkan data ikan dengan nama ilmiah:</p>
        <strong><i>${fishForm.scientificName}</i></strong>
      `,
      showCancelButton: true,
      confirmButtonText: "Ya, tambahkan",
      cancelButtonText: "Batal",
    });

    if (isConfirmed) {
      try {
        const res = await postSpecies(fishForm);
        console.log(res);
        await Swal.fire({
          icon: "success",
          title: "Data berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.error(err);
        await Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan!",
          text: "Data gagal ditambahkan. Silakan coba lagi.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h4 className="text-xl font-bold">Add Fish</h4>
      <DetailFishTable
        isUpdating={true}
        fishForm={fishForm}
        setFishForm={setFishForm}
        postFishData={handleSubmitFish}
      />
    </section>
  );
}
