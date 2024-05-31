"use client";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function CardSection() {
  const router = useRouter();
  return (
    <section className="mx-auto w-full max-w-6xl  py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
        <Card
          onClick={() => router.push("/pages")}
          className="overflow-hidden rounded-xl bg-white shadow-md hover:bg-blue-100 dark:bg-gray-900"
        >
          <div className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <BookOpenIcon />
            </div>
            <div>
              <h3>View All Pages</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                View all the pages of the Quran and see which pages you have
                revised last
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function BookOpenIcon() {
  return (
    <svg
      className="h-8 w-8 text-gray-900 dark:text-gray-50"
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
