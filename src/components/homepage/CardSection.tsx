"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function CardSection() {
  const router = useRouter();
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
      <Card
        onClick={() => router.push("/pages")}
        className="overflow-hidden rounded-xl shadow-white hover:bg-blue-200 hover:shadow-lg"
      >
        <CardHeader>
          <CardTitle>View All Pages</CardTitle>
          <CardDescription>
            View all the pages of the Quran and see which pages you have revised
            last
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
}
