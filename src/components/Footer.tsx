import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-gray-400">
        <p>© 2024 Quran Memorizer. All rights reserved.</p>
        <nav className="space-x-4">
          <Link className="hover:text-white transition-colors" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-white transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="hover:text-white transition-colors" href="#">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
