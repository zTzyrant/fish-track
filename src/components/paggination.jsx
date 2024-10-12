"use client";
import {
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
} from "lucide-react";
import { getSpecies } from "@/service/api.service";

export const Paggination = ({
  totalPages,
  pageSize,
  totalRecords,
  pageNumber,
  setPageNumber,
}) => {
  return (
    <div className="flex max-sm:flex-col gap-2 sm:justify-between items-center">
      <span className="text-sm text-black">
        Showing
        <strong> {pageNumber} </strong>
        to
        <strong>
          {" "}
          {pageSize * pageNumber > totalRecords
            ? totalRecords
            : pageSize * pageNumber}{" "}
        </strong>
        of
        <strong> {totalRecords} </strong>
        entries
      </span>
      <div className="flex gap-1">
        <button
          className="bg-blue-400 text-white p-2 rounded-md"
          onClick={() => setPageNumber(1)}
        >
          <ChevronsLeft size={24} />
        </button>
        <button
          className="bg-blue-400 text-white p-2 rounded-md"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          <ChevronLeft size={24} />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md ${
              pageNumber === i + 1
                ? "bg-blue-400 text-white"
                : " border border-slate-200 rounded-md bg-white"
            }`}
            onClick={() => setPageNumber(i + 1)}
            disabled={pageNumber === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="bg-blue-400 text-white p-2  rounded-md"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === totalPages}
        >
          <ChevronRight size={24} />
        </button>
        <button
          className="bg-blue-400 text-white p-2 rounded-md"
          onClick={() => setPageNumber(totalPages)}
        >
          <ChevronsRight size={24} />
        </button>
      </div>
    </div>
  );
};
