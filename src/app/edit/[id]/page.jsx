"use client";

import { useParams } from "next/navigation";
import { getSpeciesById } from "@/service/api.service";
import { DetailFishTable } from "@/components/table/detaiFishTable";

export default function EditSpecies() {
  const { id } = useParams();
  const { data, error, isLoading } = getSpeciesById(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="flex flex-col gap-4">
      <h4 className="text-xl font-bold">
        Edit Data Ikan {data?.scientificName} ({data?.englishName})
      </h4>
      <DetailFishTable data={data} isUpdating={true} />
    </section>
  );
}
