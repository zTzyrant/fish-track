"use client";

import { useParams } from "next/navigation";
import { getSpeciesById } from "@/service/api.service";
import { DetailFishTable } from "@/components/table/detaiFishTable";

export default function ViewSpecies() {
  const { id } = useParams();
  const { data, error, isLoading } = getSpeciesById(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <DetailFishTable data={data} />
    </>
  );
}
