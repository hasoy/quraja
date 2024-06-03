import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";

export interface SuraTableData {
  SuraNumber: number;
  Sura: string;
  Score: string;
  MemorizedPercent: number;
  TotalRevisions: number;
  Mistakes: number;
  LastRevised: string;
}

interface SuraTableProps {
  data: SuraTableData[];
}

const TableHeaders = [
  "Sura Number",
  "Sura",
  "Score",
  "Memorized percent",
  "Total Revisions",
  "Mistakes",
  "Last Revised",
];

const SuraTable = (props: SuraTableProps) => {
  return (
    <div className="overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {TableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((sura) => (
            <TableRow key={sura.Sura}>
              <TableCell className="font-medium">{sura.SuraNumber}</TableCell>
              <TableCell className="font-medium">
                <Link
                  href={`/${sura.SuraNumber}`}
                  className="hover:bg-blue-500"
                >
                  {sura.Sura}
                </Link>
              </TableCell>
              <TableCell>{sura.Score}</TableCell>
              <TableCell>{sura.MemorizedPercent}%</TableCell>
              {/* TODO: Make this value adjustable by the user */}
              <TableCell>
                <p className={sura.TotalRevisions === 10 ? "bg-green-700" : ""}>
                  {sura.TotalRevisions}/10
                </p>
              </TableCell>
              <TableCell>{sura.Mistakes}</TableCell>
              <TableCell>{sura.LastRevised}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SuraTable;
