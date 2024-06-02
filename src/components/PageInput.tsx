import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useRouter } from "next/navigation";

export const PageInput = () => {
  const router = useRouter();
  const sliceZerosAndRoute = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    if (e.key === "Enter" || val.length === 3) {
      if (val.startsWith("00")) {
        router.push(`/pages/${val[2]}`);
      } else if (val.startsWith("0")) {
        router.push(`/pages/${val.slice(1)}`);
      } else {
        router.push(`/pages/${(e.target as HTMLInputElement).value}`);
      }
    }
  };
  return (
    <div className="flex flex-col ">
      <label htmlFor="input" className="font-bold">
        Type page number and <br />
        press enter to view
      </label>
      <InputOTP
        maxLength={3}
        id="input"
        onKeyDown={sliceZerosAndRoute}
        onKeyUp={sliceZerosAndRoute}
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
