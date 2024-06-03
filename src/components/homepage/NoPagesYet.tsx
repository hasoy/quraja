import React from "react";
import { PageInput } from "../PageInput";

export default function NoPagesYet() {
  return (
    <div className="py-10">
      <h3>
        You have not reviewed any pages yet. Start by going to a specific page.
      </h3>
      <PageInput></PageInput>
    </div>
  );
}
