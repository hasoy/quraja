import { SURAH_DATA } from "@/constants/suwar";
import Link from "next/link";

export default function SuwarOverview() {
  // TODO: fix styling in this list
  return (
    <ul className="flex min-h-screen flex-col items-center justify-between p-24 gap-2 w-1/2">
      {SURAH_DATA.map((surah, index) => (
        <Link key={index + 1} href={`/${index + 1}`}>
          <li className="p-2 border border-black rounded-md hover:bg-blue-300">
            {`${index + 1}: ${surah[0]} - ${surah[1]}`}
          </li>
        </Link>
      ))}
    </ul>
  );
}
