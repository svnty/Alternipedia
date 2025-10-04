import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Geist, Geist_Mono } from "next/font/google";
import { authOptions } from '@/lib/auth';
import { Analytics } from "@vercel/analytics/next"
import React from "react";
import "./globals.css";
import Search from '@/app/search';
import UserMenu from '@/app/user-menu';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon, Palette } from "lucide-react";

import Terms from "@/app/terms"
import GoPro from "./go-pro";

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

export default async function Layout({
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
        <div className="cursor-default text-center block md:hidden lg:hidden xl:hidden pt-3.5">
          <div className="text-xl font-medium text-black dark:text-white font-serif">Alternipedia</div>
        </div>

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
              <div className="px-2.5 py-1.5 rounded-md items-center flex-shrink-0 cursor-default hidden lg:block md:block">
                <div className="text-xl font-medium text-black dark:text-white font-serif">Alternipedia</div>
              </div>
            </div>
            <Search />
            <div className="flex justify-end items-center gap-2.5 shrink-0">
              <GoPro />
              <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                <div className="size- flex justify-center items-center gap-1.5">
                  <UserMenu />
                </div>
              </div>
              <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5 hidden lg:block md:block">
                <div className="size- flex justify-center items-center gap-1.5">
                  <Button size="icon"
                    aria-label="Open account menu"
                    variant="ghost"
                    className="shadow-none cursor-pointer">
                    <Palette size={16} aria-hidden="true" />
                  </Button>
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
                  <span className="text-blue-400"><a href="/license" className="hover:underline">Creative Commons Attribution-ShareAlike License 4.0</a></span>
                  <span>; additional terms may apply. By using this site, you agree to the </span>
                  <Terms />
                  <span> and </span>
                  <span className="text-blue-400">Privacy Policy</span>
                  <span>. Alternipedia is an open-source non-for-profit project.</span>
                </p>
              </div>

              {/* Links Columns Container - 30% width on medium+ screens, centered on mobile */}
              <div className="w-full md:w-[30%] flex flex-row gap-8 justify-center md:justify-start">
                {/* First Links Column */}
                <div className="flex flex-col gap-1">
                  <div className="text-blue-400 text-sm font-normal leading-normal">Contact Alternimedia</div>
                  <div className="text-blue-400 text-sm font-normal leading-normal">Disclaimers</div>
                  <div className="text-blue-400 text-sm font-normal leading-normal">Code of Conduct</div>
                </div>

                {/* Second Links Column */}
                <div className="flex flex-col gap-1">
                  <div className="text-blue-400 text-sm font-normal leading-normal"><a href="https://github.com/svnty/Alternipedia" target="_blank" className="hover:underline">Developers</a></div>
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
