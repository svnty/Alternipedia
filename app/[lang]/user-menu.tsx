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
} from "lucide-react"
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react";
import Terms from "@/app/[lang]/terms";
import type { Locale } from '@/lib/i18n/config';

export default function UserMenu({ lang }: { lang: Locale }) {
  const id = useId()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild
        className="px-4 py-2 rounded-md bg-white hover:bg-gray-100 data-[state=open]:bg-gray-200 transition-all">
        <Button size="icon"
          aria-label="Open account menu"
          variant="ghost"
          className="shadow-none cursor-pointer">
          <CircleUserRoundIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
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
              k.kennedy@originui.com
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                <KeyRound size={16} className="opacity-60" aria-hidden="true" />
                <span>Login</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col items-center gap-2">


                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <Earth size={52} />
                </div>


                <DialogHeader>
                  <DialogTitle className="sm:text-center">
                    Log in to Alternipedia
                  </DialogTitle>
                </DialogHeader>
              </div>


              <div className="flex flex-col gap-2">
                <Button className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 cursor-pointer">
                  <span className="pointer-events-none me-2 flex-1">
                    <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
                  </span>
                  Login with Google
                </Button>
                <Button className="bg-[#14171a] text-white after:flex-1 hover:bg-[#14171a]/90 cursor-pointer">
                  <span className="pointer-events-none me-2 flex-1">
                    <RiTwitterXFill className="opacity-60" size={16} aria-hidden="true" />
                  </span>
                  Login with X
                </Button>
                <Button className="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90 cursor-pointer">
                  <span className="pointer-events-none me-2 flex-1">
                    <RiFacebookFill className="opacity-60" size={16} aria-hidden="true" />
                  </span>
                  Login with Facebook
                </Button>
              </div>


              <p className="text-muted-foreground text-center text-xs">
                By signing in you agree to our Terms of Service and Privacy Policy.
              </p>
            </DialogContent>
          </Dialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <BookMarked size={16} className="opacity-60" aria-hidden="true" />
            <span>Saved Articles</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <MessageSquarePlus size={16} className="opacity-60" aria-hidden="true" />
            <span>Contributions</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings size={16} className="opacity-60" aria-hidden="true" />
            <span>Preferences</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
