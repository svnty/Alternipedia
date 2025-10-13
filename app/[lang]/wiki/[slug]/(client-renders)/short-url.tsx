"use client"

import { useId, useRef, useState } from "react"
import {
  RiCodeFill,
  RiFacebookFill,
  RiMailLine,
  RiTwitterXFill,
} from "@remixicon/react"
import { CheckIcon, CopyIcon, Link } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/app/(components)/ui/button"
import { Input } from "@/app/(components)/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/(components)/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/(components)/ui/tooltip"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Locale } from "@/lib/i18n/config"
import { useParams } from "next/navigation"

export default function ShortURL({ mobile }: { mobile: boolean }) {
  const params = useParams();
  const currentLang = params?.lang as Locale || 'en';
  const dict = getDictionary(currentLang);
  const id = useId()
  const [copied, setCopied] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Popover>
        <>
        {mobile && (
          <PopoverTrigger asChild>
            <div className="flex-row inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <Link className="text-gray-500" size={16} />
                </div>
                <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.shortUrl}</div>
                </div>
              </button>
            </div>
            </PopoverTrigger>
      )}
            {!mobile && (
              <PopoverTrigger asChild>
              <a className="hover:underline cursor-pointer">
                <div className="size- flex justify-start items-center gap-1.5">
                  <div data-svg-wrapper data-property-1="Short link" className="relative">
                    <Link className="text-gray-500" size={16} />
                  </div>
                  <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                    <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.shortUrl}</div>
                  </div>
                </div>
              </a>
              </PopoverTrigger>
            )}
        </>
        <PopoverContent className="w-72" side="top" showArrow={true}>
          <div className="flex flex-col gap-3 text-center">
            <div className="text-sm font-medium">Share article</div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button size="icon" variant="outline" aria-label="Embed" className="cursor-pointer">
                <RiCodeFill size={16} aria-hidden="true" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Share on Twitter"
                className="cursor-pointer"
              >
                <RiTwitterXFill size={16} aria-hidden="true" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Share on Facebook"
                className="cursor-pointer"
              >
                <RiFacebookFill size={16} aria-hidden="true" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Share via email"
                className="cursor-pointer"
              >
                <RiMailLine size={16} aria-hidden="true" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  ref={inputRef}
                  id={id}
                  className="pe-9"
                  type="text"
                  defaultValue="https://alternipedia.vercel.app/"
                  aria-label="Share link"
                  readOnly
                />
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCopy}
                        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                        aria-label={copied ? "Copied" : "Copy to clipboard"}
                        disabled={copied}
                      >
                        <div
                          className={cn(
                            "transition-all",
                            copied
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          )}
                        >
                          <CheckIcon
                            className="stroke-emerald-500"
                            size={16}
                            aria-hidden="true"
                          />
                        </div>
                        <div
                          className={cn(
                            "absolute transition-all",
                            copied
                              ? "scale-0 opacity-0"
                              : "scale-100 opacity-100"
                          )}
                        >
                          <CopyIcon size={16} aria-hidden="true" />
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">
                      Copy to clipboard
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
