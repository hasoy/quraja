import React from "react";
interface ITypographyProps {
  children: React.ReactNode;
  tag: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote";
  className?: string;
}
// if more styles needed https://ui.shadcn.com/docs/components/typography
export default function Typography(props: ITypographyProps) {
  function getClassname() {
    if (props.tag === "h1")
      return "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl";
    if (props.tag === "h2")
      return "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0";
    if (props.tag === "h3")
      return "scroll-m-20 text-2xl font-semibold tracking-tight";
    if (props.tag === "h4")
      return "scroll-m-20 text-xl font-semibold tracking-tight";
    if (props.tag === "p") return "leading-7 [&:not(:first-child)]:mt-6";
    if (props.tag === "blockquote") return "mt-6 border-l-2 pl-6 italic";
  }
  return (
    <props.tag className={`${getClassname()} ${props.className}`}>
      {props.children}
    </props.tag>
  );
}
