"use client";
import { IPageData } from "@/types/user.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  calculateScore,
  getDaysFromToday,
  getDaysLabel,
} from "@/helpers/score";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IPageData>[] = [
  {
    accessorKey: "pageNumber",
    header: ({ column }) => {
      return (
        <span
          className="flex rounded hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Page
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <span
          className="flex rounded hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const score = calculateScore(
        row.getValue("totalRevisions"),
        row.getValue("mistakes"),
        row.getValue("lastRevised"),
      );
      return <div>{score}%</div>;
    },
  },
  {
    accessorKey: "mistakes",
    header: "Mistakes",
  },
  {
    accessorKey: "totalRevisions",
    header: "Total Revisions",
  },
  // {
  //   accessorKey: "streak",
  //   header: "Streak",
  // },
  {
    accessorKey: "lastRevised",
    header: ({ column }) => {
      return (
        <span
          className="flex rounded hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Revised
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const lastRevised = getDaysLabel(
        getDaysFromToday(row.getValue("lastRevised")),
      );
      return <div>{lastRevised}</div>;
    },
  },
];
