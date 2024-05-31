"use client";
import React from "react";
import CardSection from "./CardSection";
import PageWrapper from "../PageWrapper";
import { ahadith } from "@/constants/ahadith";
import WeakestRevisions from "./WeakestRevisions";
export default function HomePage() {
  return (
    <PageWrapper>
      <h1>As salam aleykum</h1>

      <p>Motivational Hadith for Memorizing:</p>
      <blockquote className="w-3/4">
        {ahadith[Math.floor(Math.random() * ahadith.length)]}
      </blockquote>
      <WeakestRevisions></WeakestRevisions>
      <CardSection />
    </PageWrapper>
  );
}
