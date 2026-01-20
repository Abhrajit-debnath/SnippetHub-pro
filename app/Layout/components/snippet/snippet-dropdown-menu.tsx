"use client";

import { MoreHorizontalIcon, Pencil, BrainCircuit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/app/store/authStore";

type DropdownMenuDialogProps = {
  updateSnippetHandler: () => void;
  deleteSnippetHandler: () => void;
  chatWithAIHandler: () => void;
};

export default function DropdownMenuDialog({
  updateSnippetHandler,
  deleteSnippetHandler,
  chatWithAIHandler,
}: DropdownMenuDialogProps) {
  const { user } = useAuthStore();

  const crudButtons = [
    {
      name: "update",
      icon: <Pencil size={15} className="text-green-700" />,
      handler: updateSnippetHandler,
      requiresSubscription: false,
    },
    {
      name: "delete",
      icon: <Trash2 size={15} className="text-red-700" />,
      handler: deleteSnippetHandler,
      requiresSubscription: false,
    },
    {
      name: "chat with snippet ai",
      icon: <BrainCircuit size={15} className="text-yellow-700" />,
      handler: chatWithAIHandler,
      requiresSubscription: true,
    },
  ];

  const filteredItems = crudButtons.filter(
    (btn) => !btn.requiresSubscription || user?.isSubscribed
  );
  console.log(filteredItems);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="  border-none bg-transparent
 cursor-pointer
    hover:bg-transparent
    focus:bg-transparent
    focus-visible:bg-transparent
    active:bg-transparent

    data-[active=true]:bg-transparent
    aria-expanded:bg-transparent

    focus-visible:ring-0
    focus-visible:outline-none"
      >
        <Button variant="outline" size="icon-sm" aria-label="Open menu">
          <MoreHorizontalIcon className="text-gray-300" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-55 bg-sidebarBg text-white border-zinc-700 p-3"
        align="end"
      >
        <DropdownMenuLabel>Snippet Actions</DropdownMenuLabel>

        <DropdownMenuGroup>
          {filteredItems.map((menu) => (
            <DropdownMenuItem
              key={menu.name}
              onClick={menu.handler}
              className={`flex items-center gap-2 capitalize text-[13px] font-medium cursor-pointer
  
     font-poppins
             focus:bg-zinc-800 
              ${
                menu.name === "delete"
                  ? "text-red-700 focus:text-red-700"
                  : "text-white focus:text-white data-highlighted:bg-zinc-800"
              }`}
            >
              {menu.icon}
              {menu.name}
            </DropdownMenuItem>
          ))}

          {/* <DropdownMenuItem disabled>Download</DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
