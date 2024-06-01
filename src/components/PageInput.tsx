import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useRouter } from "next/navigation";

export const PageInput = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col ">
      <label htmlFor="input" className="font-bold">
        Type page number and <br />
        press enter to view
      </label>
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
    </div>
  );
};
