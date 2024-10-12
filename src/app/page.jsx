"use client";
import { getSpecies } from "@/service/api.service";
import { SpeciesTable } from "@/components/table/speciesTable";
import { useEffect, useState } from "react";
import { getTokens } from "@/libs/auth";

export default function Home() {
  const [keyWord, setKeyWord] = useState("");
  const [newKeyWord, setNewKeyWord] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isLoading } = getSpecies({
    keyWord: keyWord,
    pageNumber: pageNumber,
    pageSize: 10,
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const { accessToken, refreshToken } = getTokens();

    if (accessToken && refreshToken) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <SpeciesTable
        data={data}
        newKeyWord={newKeyWord}
        setKeyWord={setKeyWord}
        setNewKeyWord={setNewKeyWord}
        setPageNumber={setPageNumber}
        isAdmin={isAdmin}
      />
    </div>
  );
}
