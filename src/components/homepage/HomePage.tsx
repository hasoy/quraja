"use client";
import React from "react";
import CardSection from "./CardSection";
import PageWrapper from "../PageWrapper";
import { ahadith } from "@/constants/ahadith";
import WeakestRevisions from "./WeakestRevisions";
export default function HomePage() {
  return (
    <PageWrapper>
      <h1 className="mb-8">السلام عليكم</h1>
      <p>Motivational Hadith for Memorizing:</p>
      <blockquote className="mb-6 md:w-3/4">
        {ahadith[Math.floor(Math.random() * ahadith.length)]}
      </blockquote>
      <WeakestRevisions></WeakestRevisions>
      <CardSection />
    </PageWrapper>
  );
}
