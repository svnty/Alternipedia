import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Geist, Geist_Mono } from "next/font/google";
import { authOptions } from '@/lib/auth';
import { Analytics } from "@vercel/analytics/next"
import React from "react";
import "./globals.css";


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react";

import {
  BoltIcon,
  BookOpenIcon,
  CircleUserRoundIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react"

import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alternipedia",
  description: "A comprehensive collection of resources",
};

export default async function Nav({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {/* <nav> */}
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-40 py-3.5 bg-white flex justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-3 sm:gap-5 min-w-0 shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="px-4 py-2 rounded-md bg-white hover:bg-gray-100 data-[state=open]:bg-gray-200 transition-all">
                  <Button size="icon"
                    aria-label="Open navigation"
                    variant="ghost"
                    className="shadow-none cursor-pointer">
                    <MenuIcon size={16} aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer" asChild><a href="/">About us</a></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild><a href="/news">Current events</a></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild><a href="/random">Random article</a></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild><a href="/help">Help</a></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="px-2.5 py-1.5 rounded-md items-center flex-shrink-0 cursor-default">
                <div className="text-xl font-medium text-black dark:text-white font-serif">Alternipedia</div>
              </div>
            </div>
            <div data-property-1="Default" className="w-full max-w-2xl min-w-48 px-2.5 py-1.5 bg-gray-100 rounded-md flex justify-between items-center mx-4">
              <div className="justify-start text-gray-400 text-base font-normal  leading-7">Search Alternipedia</div>
              <div data-svg-wrapper data-property-1="Search" className="relative">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1706 14.7147H15.3699L15.0861 14.441C16.3024 13.022 16.9309 11.086 16.5862 9.0284C16.1098 6.21059 13.7583 3.96039 10.9202 3.61577C6.63266 3.08869 3.02424 6.69711 3.55131 10.9846C3.89594 13.8227 6.14613 16.1743 8.96394 16.6507C11.0216 16.9953 12.9575 16.3669 14.3766 15.1505L14.6502 15.4344V16.2351L18.9581 20.5429C19.3736 20.9585 20.0527 20.9585 20.4683 20.5429C20.8839 20.1273 20.8839 19.4482 20.4683 19.0326L16.1706 14.7147ZM10.089 14.7147C7.56518 14.7147 5.52784 12.6774 5.52784 10.1535C5.52784 7.62963 7.56518 5.59229 10.089 5.59229C12.6129 5.59229 14.6502 7.62963 14.6502 10.1535C14.6502 12.6774 12.6129 14.7147 10.089 14.7147Z" fill="#B0B6C1" />
                </svg>
              </div>
            </div>
            <div className="flex justify-end items-center gap-2.5 shrink-0">
              <div data-property-1="Default" className="size- px-2.5 py-1.5 bg-yellow-400 rounded-md flex justify-start items-center gap-1.5">
                <div className="size- flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-2.5">
                    <div className="justify-start text-neutral-800 text-sm font-bold  leading-normal">Go PRO</div>
                  </div>
                </div>
              </div>
              <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                <div className="size- flex justify-center items-center gap-1.5">
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
                        <DropdownMenuItem>
                          <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
                          <span>Login</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
                          <span>Create account</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
                          <span>Saved Articles</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
                          <span>Contributions</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
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
                </div>
              </div>
              <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5 hidden lg:block md:block">
                <div className="size- flex justify-center items-center gap-1.5">
                  <div data-svg-wrapper data-property-1="Customize" className="relative">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.5645C10.77 21.5645 9.6075 21.3281 8.5125 20.8553C7.4175 20.3831 6.4614 19.7381 5.6442 18.9203C4.8264 18.1031 4.1814 17.147 3.7092 16.052C3.2364 14.957 3 13.7945 3 12.5645C3 11.3195 3.2436 10.1495 3.7308 9.05445C4.2186 7.95945 4.8789 7.00695 5.7117 6.19695C6.5439 5.38695 7.515 4.74555 8.625 4.27275C9.735 3.80055 10.92 3.56445 12.18 3.56445C13.38 3.56445 14.5125 3.77085 15.5775 4.18365C16.6425 4.59585 17.5761 5.16585 18.3783 5.89365C19.1811 6.62085 19.8186 7.48335 20.2908 8.48115C20.7636 9.47835 21 10.5545 21 11.7095C21 13.4345 20.475 14.7581 19.425 15.6803C18.375 16.6031 17.1 17.0645 15.6 17.0645H13.935C13.8 17.0645 13.7064 17.102 13.6542 17.177C13.6014 17.252 13.575 17.3345 13.575 17.4245C13.575 17.6045 13.6875 17.8631 13.9125 18.2003C14.1375 18.5381 14.25 18.9245 14.25 19.3595C14.25 20.1095 14.0436 20.6645 13.6308 21.0245C13.2186 21.3845 12.675 21.5645 12 21.5645ZM7.05 13.4645C7.44 13.4645 7.7625 13.337 8.0175 13.082C8.2725 12.827 8.4 12.5045 8.4 12.1145C8.4 11.7245 8.2725 11.402 8.0175 11.147C7.7625 10.892 7.44 10.7645 7.05 10.7645C6.66 10.7645 6.3375 10.892 6.0825 11.147C5.8275 11.402 5.7 11.7245 5.7 12.1145C5.7 12.5045 5.8275 12.827 6.0825 13.082C6.3375 13.337 6.66 13.4645 7.05 13.4645ZM9.75 9.86445C10.14 9.86445 10.4625 9.73695 10.7175 9.48195C10.9725 9.22695 11.1 8.90445 11.1 8.51445C11.1 8.12445 10.9725 7.80195 10.7175 7.54695C10.4625 7.29195 10.14 7.16445 9.75 7.16445C9.36 7.16445 9.0375 7.29195 8.7825 7.54695C8.5275 7.80195 8.4 8.12445 8.4 8.51445C8.4 8.90445 8.5275 9.22695 8.7825 9.48195C9.0375 9.73695 9.36 9.86445 9.75 9.86445ZM14.25 9.86445C14.64 9.86445 14.9625 9.73695 15.2175 9.48195C15.4725 9.22695 15.6 8.90445 15.6 8.51445C15.6 8.12445 15.4725 7.80195 15.2175 7.54695C14.9625 7.29195 14.64 7.16445 14.25 7.16445C13.86 7.16445 13.5375 7.29195 13.2825 7.54695C13.0275 7.80195 12.9 8.12445 12.9 8.51445C12.9 8.90445 13.0275 9.22695 13.2825 9.48195C13.5375 9.73695 13.86 9.86445 14.25 9.86445ZM16.95 13.4645C17.34 13.4645 17.6625 13.337 17.9175 13.082C18.1725 12.827 18.3 12.5045 18.3 12.1145C18.3 11.7245 18.1725 11.402 17.9175 11.147C17.6625 10.892 17.34 10.7645 16.95 10.7645C16.56 10.7645 16.2375 10.892 15.9825 11.147C15.7275 11.402 15.6 11.7245 15.6 12.1145C15.6 12.5045 15.7275 12.827 15.9825 13.082C16.2375 13.337 16.56 13.4645 16.95 13.4645ZM12 19.7645C12.135 19.7645 12.2439 19.727 12.3267 19.652C12.4089 19.577 12.45 19.4795 12.45 19.3595C12.45 19.1495 12.3375 18.902 12.1125 18.617C11.8875 18.332 11.775 17.9045 11.775 17.3345C11.775 16.7045 11.9925 16.202 12.4275 15.827C12.8625 15.452 13.395 15.2645 14.025 15.2645H15.6C16.59 15.2645 17.4375 14.9756 18.1425 14.3978C18.8475 13.8206 19.2 12.9245 19.2 11.7095C19.2 9.89445 18.5064 8.38305 17.1192 7.17525C15.7314 5.96805 14.085 5.36445 12.18 5.36445C10.14 5.36445 8.4 6.06195 6.96 7.45695C5.52 8.85195 4.8 10.5545 4.8 12.5645C4.8 14.5595 5.5014 16.2584 6.9042 17.6612C8.3064 19.0634 10.005 19.7645 12 19.7645Z" fill="#202122" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </nav> */}

        {children}

        {/* <footer> */}
        <div className="w-full bg-white mt-8 border-t border-gray-300">
          <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
            {/* Footer Content Container - 70/30 split on large screens */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Legal Text - 70% width on medium+ screens */}
              <div className="w-full md:w-[70%]">
                <p className="text-neutral-800 text-sm font-normal leading-normal">
                  <span>Text is available under the </span>
                  <span className="text-blue-400">Creative Commons Attribution-ShareAlike License 4.0</span>
                  <span>; additional terms may apply. By using this site, you agree to the </span>
                  <span className="text-blue-400">Terms of Use</span>
                  <span> and </span>
                  <span className="text-blue-400">Privacy Policy</span>
                  <span>. Alternipedia® is a registered trademark of the </span>
                  <span className="text-blue-400">Alternipedia Foundation, Inc.</span>
                  <span>, a non-profit organization.</span>
                </p>
              </div>

              {/* Links Columns Container - 30% width on medium+ screens, centered on mobile */}
              <div className="w-full md:w-[30%] flex flex-row gap-8 justify-center md:justify-start">
                {/* First Links Column */}
                <div className="flex flex-col gap-1">
                  <div className="text-blue-400 text-sm font-normal leading-normal">Contact Alternimedia</div>
                  <div className="text-blue-400 text-sm font-normal leading-normal">Privacy policy</div>
                  <div className="text-blue-400 text-sm font-normal leading-normal">Disclaimers</div>
                  <div className="text-blue-400 text-sm font-normal leading-normal">Code of Conduct</div>
                </div>

                {/* Second Links Column */}
                <div className="flex flex-col gap-1">
                  <div className="text-blue-400 text-sm font-normal leading-normal">Developers</div>
                  <div className="text-blue-400 text-sm font-normal leading-normal">Statistics</div>
                  <div className="text-blue-400 text-sm font-normal leading-normal">Cookie statement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </footer> */}
      </body>
    </html>
  );
}
