import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import { Analytics } from "@vercel/analytics/next"
import React from "react";
import Link from "next/link";
import '@/app/globals.css';
import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import Search from '@/app/[lang]/(client-renders)/search';
import UserMenu from '@/app/[lang]/(client-renders)/user-menu';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Earth, MenuIcon, Palette } from "lucide-react";
import Terms from "@/app/[lang]/(client-renders)/terms";
import Privacy from "@/app/[lang]/(client-renders)/privacy";
import GoPro from "@/app/[lang]/(client-renders)/go-pro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return {
    title: "Alternipedia",
    description: dict.metadata.description,
  };
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  // Validate if the language is supported
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang as Locale);
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Analytics />
      {/* <nav> */}
      <div className="cursor-default text-center block md:hidden lg:hidden xl:hidden pt-3.5">
        <div className="text-xl font-medium text-black dark:text-white font-serif">Alternipedia</div>
      </div>

      <div id="nav" className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-40 py-3.5 bg-white flex justify-between items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-3 sm:gap-5 min-w-0 shrink-0">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild className="px-4 py-2 rounded-md bg-white hover:bg-gray-100 data-[state=open]:bg-gray-200 transition-all">
                <Button size="icon"
                  aria-label="Open navigation"
                  variant="ghost"
                  className="shadow-none cursor-pointer">
                  <MenuIcon size={16} aria-hidden="true" className="scale-120" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent collisionPadding={8}>
                <DropdownMenuItem className="cursor-pointer" asChild><Link href={`/${lang}`}>{dict.navigation.aboutUs}</Link></DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild><Link href={`/${lang}/news`}>{dict.navigation.currentEvents}</Link></DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild><Link href={`/${lang}/random`}>{dict.navigation.randomArticle}</Link></DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild><Link href={`/${lang}/help`}>{dict.navigation.help}</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="px-2.5 py-1.5 rounded-md items-center flex-shrink-0 cursor-default hidden md:block">
              <div className="text-xl font-medium text-black dark:text-white font-serif">Alternipedia</div>
            </div>
          </div>
          <Search />
          <div className="flex justify-end items-center gap-2.5 shrink-0">
            <GoPro params={{ lang }} />
            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
              <div className="size- flex justify-center items-center gap-1.5">
                <UserMenu lang={lang as Locale} />
              </div>
            </div>
            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5 hidden md:block">
              <div className="size- flex justify-center items-center gap-1.5">
                <Button size="icon"
                  aria-label="Open theme menu"
                  variant="ghost"
                  className="shadow-none cursor-pointer">
                  <Palette size={16} aria-hidden="true" className="scale-120" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </nav> */}

      {children}

      {/* <footer> */}
      <div id="footer" className="w-full bg-white mt-8 border-t border-gray-300 z-50">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
          {/* Footer Content Container - 70/30 split on large screens */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="w-full md:w-[5%] hidden md:block content-center -mt-2">
              <Earth size={52} className="transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer" />
            </div>
            {/* Legal Text - 70% width on medium+ screens */}
            <div className="w-full md:w-[65%]">
              <p className="text-neutral-800 text-sm font-normal leading-normal">
                <span>{dict.footer.text.part1}</span>
                <span className="text-blue-400"><Link href={`/${lang}/license`} className="hover:underline">{dict.footer.text.part2}</Link></span>
                <span>{dict.footer.text.part3}</span>
                <Terms text={dict.footer.text.part4} lang={lang as Locale} />
                <span>{dict.footer.text.part5}</span>
                <Privacy text={dict.footer.text.part6} lang={lang as Locale} />
                <span>{dict.footer.text.part7}</span>
              </p>
            </div>

            {/* Links Columns Container - 30% width on medium+ screens, centered on mobile */}
            <div className="w-full md:w-[30%] flex flex-row gap-8 justify-center md:justify-start">
              {/* First Links Column */}
              <div className="flex flex-col gap-1">
                <TooltipProvider delayDuration={0}>
                  <Tooltip persistOnClick={true}>
                    <TooltipTrigger className="text-blue-400 text-sm font-normal leading-normal cursor-not-allowed w-fit">
                      {dict.footer.contact}
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs" side="top" withBackdrop={true} collisionPadding={8}>
                      {dict.footer.pleaseLogin}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link href="/" className="text-blue-400 text-sm font-normal leading-normal hover:underline inline-block w-fit">{dict.footer.disclaimers}</Link>
                <Link href="/" className="text-blue-400 text-sm font-normal leading-normal hover:underline inline-block w-fit">{dict.footer.codeOfConduct}</Link>
              </div>

              {/* Second Links Column */}
              <div className="flex flex-col gap-1">
                <a href="https://github.com/svnty/Alternipedia" target="_blank" className="text-blue-400 text-sm font-normal leading-normal hover:underline inline-block w-fit">{dict.footer.developers}</a>
                <Link href="/" className="text-blue-400 text-sm font-normal leading-normal hover:underline inline-block w-fit">{dict.footer.statistics}</Link>
                <Link href="/" className="text-blue-400 text-sm font-normal leading-normal hover:underline inline-block w-fit">{dict.footer.cookieStatement}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </footer> */}
    </div>
  );
}
