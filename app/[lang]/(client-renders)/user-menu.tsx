"use client"

import { useId } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CircleUserRoundIcon,
  LogOutIcon,
  KeyRound,
  BookMarked,
  BookOpenText,
  Settings,
  MessageSquarePlus,
  Earth,
  ScanFace,
} from "lucide-react"
import {
  RiFacebookFill,
  RiGoogleFill,
  RiMicrosoftFill,
  RiTwitterXFill,
} from "@remixicon/react";
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from "@/lib/i18n/dictionaries"
import { MaskedEmail } from "@/app/[lang]/(client-renders)/masked-email";

export default function UserMenu({ lang }: { lang: Locale }) {
  const id = useId();
  const dict = getDictionary(lang);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild
        className="px-4 py-2 rounded-md bg-white hover:bg-gray-100 data-[state=open]:bg-gray-200 transition-all">
        <Button size="icon"
          aria-label="Open account menu"
          variant="ghost"
          className="shadow-none cursor-pointer">
          <CircleUserRoundIcon size={16} aria-hidden="true" className="scale-120" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" collisionPadding={8}>
        <DropdownMenuLabel className="flex items-start gap-3">
          <img
            src="avatar.jpg"
            alt="Avatar"
            width={32}
            height={32}
            className="shrink-0 rounded-full"
          />
          <div className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              Keith Kennedy
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              <MaskedEmail email="k.kennedy@originui.com" variant="advanced" />
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                <KeyRound size={16} className="opacity-60" aria-hidden="true" />
                <span>{dict.userMenu.login}</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col items-center gap-2">

                <ScanFace size={52} />

                <DialogHeader>
                  <DialogTitle className="sm:text-center">
                    {dict.login.title} Alternipedia
                  </DialogTitle>
                </DialogHeader>
              </div>


              <div className="flex flex-col gap-2">
                <Button className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 cursor-pointer">
                  <span className="pointer-events-none me-2 flex-1">
                    <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
                  </span>
                  {dict.login.google}
                </Button>
                <Button className="bg-[#14171a] text-white after:flex-1 hover:bg-[#14171a]/90 cursor-pointer">
                  <span className="pointer-events-none me-2 flex-1">
                    <RiTwitterXFill className="opacity-60" size={16} aria-hidden="true" />
                  </span>
                  {dict.login.x}
                </Button>
                <Button className="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90 cursor-pointer">
                  <span className="pointer-events-none me-2 flex-1">
                    <RiFacebookFill className="opacity-60" size={16} aria-hidden="true" />
                  </span>
                  {dict.login.facebook}
                </Button>
                <Button className="bg-[#333333] text-white after:flex-1 hover:bg-[#333333]/90 cursor-pointer">
                  <span className="pointer-events-none me-2 flex-1">
                    <RiMicrosoftFill className="opacity-60" size={16} aria-hidden="true" />
                  </span>
                  {dict.login.microsoft}
                </Button>
              </div>

              <p className="text-muted-foreground text-center text-xs">
                {dict.login.policy}
              </p>
            </DialogContent>
          </Dialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <BookMarked size={16} className="opacity-60" aria-hidden="true" />
            <span>{dict.userMenu.savedArticles}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <MessageSquarePlus size={16} className="opacity-60" aria-hidden="true" />
            <span>{dict.userMenu.contributions}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings size={16} className="opacity-60" aria-hidden="true" />
            <span>{dict.userMenu.preferences}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>{dict.userMenu.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
