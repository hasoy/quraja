"use client";
import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import {
  calculateScore,
  getDaysFromToday,
  getDaysLabel,
} from "@/helpers/score";

export interface IPageData {
  pageNumber: number;
  score: number;
  totalRevisions: number;
  mistakes: number;
  streak: number;
  lastRevised: string;
}

interface PageTableProps {
  data: IPageData[];
}

const TableHeaders = [
  "Page Number",
  "Score",
  "Mistakes",
  "Total Revisions",
  "No mistakes streak",
  "Last Revised",
];

const PageTable = (props: PageTableProps) => {
  const router = useRouter();
  // TODO: add sorting to table
  function navigatePage(pageNumber: number) {
    router.push(`/page/${pageNumber}`);
  }

  return (
    <Table className="my-4 overflow-auto rounded-lg border">
      <TableHeader>
        <TableRow>
          {TableHeaders.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((page) => (
          <TableRow
            key={page.pageNumber}
            onClick={() => navigatePage(page.pageNumber)}
            className="hover:cursor-pointer"
          >
            <TableCell className="font-medium">{page.pageNumber}</TableCell>
            <TableCell>
              {calculateScore(
                page.totalRevisions,
                page.mistakes,
                page.lastRevised,
              )}
              /10
            </TableCell>
            <TableCell>{page.mistakes}</TableCell>
            {/* TODO: Make this value adjustable by the user */}
            <TableCell>{page.totalRevisions}/10</TableCell>
            <TableCell>{page.streak}</TableCell>
            <TableCell>
              {getDaysLabel(getDaysFromToday(page.lastRevised))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PageTable;
