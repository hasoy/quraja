"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/hero.jpeg";
import { LoginForm } from "./LoginPage";
import { useRef } from "react";

export default function LandingPage() {
  const loginRef = useRef<null | HTMLDivElement>(null);

  return (
    <main className="container mx-auto flex min-h-[100dvh] w-full flex-1 flex-col space-y-10">
      <section className="mx-auto grid max-w-[1300px] gap-4 px-4 py-20 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
        <div>
          <h1>Your Quran Revision Tracker And Coach</h1>
          <p>
            Streamline your hifdh, mark mistakes, and know what to revise next.
            Finally start revising with a clear overview. Focus more on
            memorizing ayat rather than memorizing your mistakes and revision
            schedule.
          </p>
          <div className="mt-4 space-x-4 md:mt-20">
            <Button onClick={() => loginRef?.current?.scrollIntoView()}>
              Get Started
            </Button>
          </div>
        </div>
        <Image
          alt="Hero"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
          height="550"
          src={heroImage}
          width="550"
        />
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32" id="features">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Streamline Your Muraja process
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover how Quraja can transform your Muraja process.
            </p>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            {/* TODO: Make these cards with images of what the app does per block */}
            <div className="grid gap-1">
              <div className="flex items-center gap-2 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                <BookIcon />
                <h4>Score per page</h4>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Keep track of and get a score per page to know what to revise
                next
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                <PencilIcon />
                <h4>Mark Mistakes</h4>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mark your mistakes as you revise and review them back later. Get
                an easy selection of common mistakes to choose from per letter,
                word or aya
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                <CalendarIcon />
                <h4>Keep track of revision</h4>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Know when you last revised and how many times
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto w-full space-y-6 px-4 py-12 text-center md:px-6 md:py-24 lg:py-32">
        <h2>Everyone knows memorizing is easy, but revising is hard.</h2>
        <p>It is time to change that with Quraja</p>
        <h3>As the Hadith from Sahih Muslim states:</h3>
        <blockquote className="cursor-pointer p-1  hover:bg-primary hover:text-white hover:underline lg:mx-60">
          <a
            href="https://sunnah.com/muslim:791"
            className="p-1"
            target="_blank"
          >
            {`Keep refreshing your knowledge of the Quran, for I swear by Him in\nWhose Hand is the life of Muhammad that it is more liable to escape\nthan camels which are hobbled.`}
          </a>
        </blockquote>
        <br />
      </section>
      <section ref={loginRef} className="w-full py-12 md:py-24 lg:py-32">
        <LoginForm />
      </section>
      {/* <section */}
      {/*   className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32" */}
      {/*   id="FAQ" */}
      {/* > */}
      {/*   <FaqHome></FaqHome> */}
      {/* </section> */}
    </main>
  );
}

function BookIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
