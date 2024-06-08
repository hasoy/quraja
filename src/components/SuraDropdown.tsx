"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRouter } from "next/navigation";
import { SURAH_DATA } from "@/data/suwar";
import { useState } from "react";
export function SuraDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Select sura...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search sura..." />
          <CommandEmpty>No sura found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {SURAH_DATA.map((sura, index) => (
              <CommandItem
                key={sura[0]}
                value={sura[0]}
                onSelect={() => {
                  router.push(`/pages/${sura[3]}`);
                }}
              >
                {`${index + 1}: ${sura[0]}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
