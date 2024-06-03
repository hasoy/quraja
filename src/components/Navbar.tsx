import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";

export const Navbar = () => {
  const links = [
    { link: "/", label: "Home" },
    // { link: "/quran", label: "Quran" },
    { link: "/pages", label: "Pages" },
    { link: "/profile", label: "Profile" },
    // { link: "/schedule", label: "Schedule" },
    // { link: "revise", label: "Revise" },
    // { link: "history", label: "History" },
    // { link: "contact", label: "Contact" },
  ];
  return (
    <nav className="sticky top-0 z-50 opacity-90 backdrop-blur-sm">
      <ul className="mb-4 flex items-center justify-center gap-4 shadow-lg shadow-blue-500 md:gap-20">
        {links.map((link) => (
          <Link href={link.link} key={link.label}>
            {/* TODO: refactor to use card */}
            <li className="my-2 rounded-lg p-2 font-bold hover:bg-primary">
              {link.label}
            </li>
          </Link>
        ))}
        <ModeToggle />
      </ul>
    </nav>
  );
};
