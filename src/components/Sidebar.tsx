import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Sidebar = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="surah">Surah</TabsTrigger>
        <TabsTrigger value="page">Page</TabsTrigger>
        <TabsTrigger value="juz">Juz</TabsTrigger>
      </TabsList>
      <TabsContent value="surah">surah</TabsContent>
      <TabsContent value="page">page</TabsContent>
      <TabsContent value="juz">Juz</TabsContent>
    </Tabs>
  );
};
