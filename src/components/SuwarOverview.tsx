import { SURAH_DATA } from "@/constants/suwar";
import Link from "next/link";

export default function SuwarOverview() {
  // PERF: fix styling in this list
  return (
    <ul className="flex min-h-screen w-1/2 flex-col items-center justify-between gap-2 p-24">
      {SURAH_DATA.map((surah, index) => (
        <Link key={index + 1} href={`/${index + 1}`}>
          <li className="rounded-md border border-black p-2 hover:bg-primary">
            {`${index + 1}: ${surah[0]} - ${surah[1]}`}
          </li>
        </Link>
      ))}
    </ul>
  );
}
