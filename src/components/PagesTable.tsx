"use client";
import React, { useContext, useEffect } from "react";
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
import { getUser } from "@/context/user";
import { AuthContext } from "@/context/AuthProvider";

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
  const authData = useContext(AuthContext);
  // TODO: check if deleting this did impact it
  // useEffect(() => {
  //   if (!userData) {
  //     getUser(authData?.uid);
  //   }
  // }, [authData]);

  // TODO: add sorting to table
  function navigatePage(pageNumber: number) {
    router.push(`/pages/${pageNumber}`);
  }

  // TODO: add a array with empty pages and empty data so the user can see all pages and navigate to new ones

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
