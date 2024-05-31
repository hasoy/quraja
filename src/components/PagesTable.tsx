"use client";
import React, { useContext, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { UserContext } from "@/context/UserProvider";
import { IPageData } from "@/types/user.types";
import Typography from "./Typography";

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
  const [showEmptyPages, setShowEmptyPages] = useState(true);
  // TODO: add sorting to table
  function navigatePage(pageNumber: number) {
    router.push(`/pages/${pageNumber}`);
  }
  const placeholderArray = Array(604).fill(0);

  const getPage = (pageNumber: number) =>
    userData?.pageData?.find((page) => page.pageNumber === pageNumber);

  const filledPage = (page: IPageData) => (
    <TableRow
      key={page.pageNumber}
      onClick={() => navigatePage(page.pageNumber)}
      className="bg-blue-200 hover:cursor-pointer hover:text-white"
    >
      <TableCell className="font-medium">{page.pageNumber}</TableCell>
      <TableCell>
        {calculateScore(page.totalRevisions, page.mistakes, page.lastRevised)}
        /10
      </TableCell>
      <TableCell>{page.mistakes}</TableCell>
      {/* TODO: Make this value adjustable by the user */}
      <TableCell>{page.totalRevisions}/10</TableCell>
      <TableCell>{page.streak}</TableCell>
      <TableCell>{getDaysLabel(getDaysFromToday(page.lastRevised))}</TableCell>
    </TableRow>
  );

  const emptyPage = (pageNumber: number) => (
    <TableRow
      key={pageNumber}
      onClick={() => navigatePage(pageNumber)}
      className="bg-red-50 hover:cursor-pointer hover:text-white"
    >
      <TableCell className="font-medium">{pageNumber}</TableCell>
      <TableCell className="font-medium">Start first revision</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
  return (
    <div className="flex flex-col">
      <Typography tag="p">Show empty Pages</Typography>
      <Switch
        onCheckedChange={(e) => setShowEmptyPages(e)}
        checked={showEmptyPages}
      />
      <Table className="my-4 overflow-auto rounded-lg border">
        <TableHeader>
          <TableRow>
            {TableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {showEmptyPages ? (
          <TableBody>
            {placeholderArray?.map((_, index) =>
              userData?.pageData?.some((page) => page.pageNumber === index + 1)
                ? filledPage(getPage(index + 1) as IPageData)
                : emptyPage(index + 1),
            )}
          </TableBody>
        ) : (
          <TableBody>
            {userData?.pageData.map((page) => filledPage(page))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default PageTable;
