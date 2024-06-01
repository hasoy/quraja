import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuProps {
  openMenu: boolean;
  setOpenMenu: (open: boolean) => void;
  portalId: string;
  onValueChange: (value: string) => void;
  items: { value: string; label: string }[];
}

// TODO: Transform this to use popover instead of dropdown menu?
export default function DropdownMenus(props: DropdownMenuProps) {
  return (
    <DropdownMenu open={props.openMenu} onOpenChange={props.setOpenMenu}>
      <DropdownMenuTrigger></DropdownMenuTrigger>
      {/* TODO: fix get element by id to the correct item */}
      {props.portalId && (
        <DropdownMenuPortal container={document.getElementById(props.portalId)}>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>What mistake occcured?</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              onValueChange={(value) => {
                props.onValueChange(value);
              }}
            >
              {props.items.map((item, index) => (
                <DropdownMenuRadioItem key={item.value} value={item.label}>
                  {index + 1}: {item.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      )}
    </DropdownMenu>
  );
}
