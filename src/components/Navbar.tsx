import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const links = [
    { link: "/", label: "Home" },
    { link: "/quran", label: "Quran" },
    // { link: "revise", label: "Revise" },
    // { link: "history", label: "History" },
    // { link: "profile", label: "Profile" },
    // { link: "contact", label: "Contact" },
  ];
  return (
    <ul className="flex gap-8 m-4">
      {links.map((link) => (
        <Link href={link.link} key={link.label}>
          <li className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-600">
            {link.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};
