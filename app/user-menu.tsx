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
} from "lucide-react"
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react";
import Terms from "@/app/terms";

export default function UserMenu() {
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
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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
                  <svg
                    className="stroke-zinc-800 dark:stroke-zinc-100"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                  </svg>
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
                <Button className="bg-[#333333] text-white after:flex-1 hover:bg-[#333333]/90 cursor-pointer">
                  <span className="pointer-events-none me-2 flex-1">
                    <RiGithubFill className="opacity-60" size={16} aria-hidden="true" />
                  </span>
                  Login with GitHub
                </Button>
              </div>


              <p className="text-muted-foreground text-center text-xs">
                By signing in you agree to our{" "}
                <Terms />
                .
              </p>
            </DialogContent>
          </Dialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BookMarked size={16} className="opacity-60" aria-hidden="true" />
            <span>Saved Articles</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenText size={16} className="opacity-60" aria-hidden="true" />
            <span>Contributions</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings size={16} className="opacity-60" aria-hidden="true" />
            <span>Preferences</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
