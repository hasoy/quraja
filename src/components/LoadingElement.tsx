import Image from "next/image";

import book2 from "@/assets/book2.gif";
export const LoadingElement = () => {
  return (
    <div
      className="absolute left-0 top-0 flex h-screen w-screen flex-col
      items-center justify-center bg-black text-white"
    >
      <span>Getting data...</span>
      <Image src={book2} alt="Book" width={150} height={150} />
    </div>
  );
};
