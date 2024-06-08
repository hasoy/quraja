import React from "react";
import { PageInput } from "./PageInput";
import { SuraDropdown } from "./SuraDropdown";

export const PageAndSuraSelect = () => {
  return (
    <div className="flex flex-col items-start gap-2">
      <SuraDropdown></SuraDropdown>
      <p>or</p>
      <PageInput />
    </div>
  );
};
