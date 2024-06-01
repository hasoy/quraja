"use client";
import { PageTable } from "@/components/PagesTable";
import { columns } from "@/components/PagesTableColums";
import { UserContext } from "@/context/UserProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const PageOverview: React.FC = () => {
  const userData = useContext(UserContext);
  const router = useRouter();
  return (
    <main className="mx-auto px-2 sm:px-6 md:w-4/6 lg:w-1/2">
      <h1 className="my-4">Page overview</h1>
      <p className="my-4">
        View all your pages with their scores, mistakes and revisions. Click on
        a row to view and revise it again
      </p>
      <label htmlFor="input">Go to page</label>
      {/* TODO: make it cleaner */}
      <InputOTP
        maxLength={3}
        id="input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/pages/${(e.target as HTMLInputElement).value}`);
          }
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>

      <PageTable data={userData.pageData} columns={columns} />
    </main>
  );
};

export default PageOverview;
