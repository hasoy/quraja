import React from "react";
import { PageAndSuraSelect } from "../PageAndSuraSelect";

export default function NoPagesYet() {
  return (
    <div className="py-10">
      <h3>
        You have not reviewed any pages yet. Start by going to a specific page.
      </h3>

      <PageAndSuraSelect />
    </div>
  );
}
