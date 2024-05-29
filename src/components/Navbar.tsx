import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const links = [
    { link: "/", label: "Home" },
    // { link: "/quran", label: "Quran" },
    { link: "/pages", label: "Page Overview" },
    { link: "/profile", label: "Profile" },
    // { link: "revise", label: "Revise" },
    // { link: "history", label: "History" },
    // { link: "profile", label: "Profile" },
    // { link: "contact", label: "Contact" },
  ];
  return (
    <ul className="m-4 flex gap-8 py-4 ">
      {links.map((link) => (
        <Link href={link.link} key={link.label}>
          <li className="rounded-lg bg-black px-4 py-2 text-white hover:bg-slate-600">
            {link.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};
