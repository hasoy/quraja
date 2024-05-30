import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}
export default function PageWrapper(props: PageWrapperProps) {
  return (
    <div className="container mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
      {props.children}
    </div>
  );
}
