"use client";
import React, { useContext } from "react";
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
import { UserContext } from "@/context/UserProvider";

const TableHeaders = [
  "Page Number",
  "Score",
  "Mistakes",
  "Total Revisions",
  "No mistakes streak",
  "Last Revised",
];

const PageTable = () => {
  const router = useRouter();
  const userData = useContext(UserContext);
  console.log("user data mistakes", userData.allMistakes);
  // TODO: add sorting to table
  function navigatePage(pageNumber: number) {
    router.push(`/pages/${pageNumber}`);
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
        {userData?.pageData?.map((page) => (
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
