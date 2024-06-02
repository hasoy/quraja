import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const links = [
    { link: "/", label: "Home" },
    // { link: "/quran", label: "Quran" },
    { link: "/pages", label: "Pages" },
    { link: "/profile", label: "Profile" },
    // { link: "revise", label: "Revise" },
    // { link: "history", label: "History" },
    // { link: "profile", label: "Profile" },
    // { link: "contact", label: "Contact" },
  ];
  return (
    <nav className="sticky top-0 z-50 opacity-75 backdrop-blur-sm">
      <ul className=" m-4 my-4 flex justify-center gap-8 rounded-lg shadow-lg shadow-blue-50">
        {links.map((link) => (
          <Link href={link.link} key={link.label}>
            {/* TODO: refactor to use card */}
            <li className="mx-4 my-2 rounded-lg p-2 font-bold hover:bg-blue-300">
              {link.label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
