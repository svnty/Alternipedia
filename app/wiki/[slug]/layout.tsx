"use client"

import { useState } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Bookmark, Bot, Download, Earth, Info, Languages, Link, NotebookPen, Printer, QrCode, Quote, Speech, Star, Waypoints } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Contents from "@/app/wiki/[slug]/contents";


export default function Article({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toolsOpen, setToolsOpen] = useState<boolean>(true)
  const [contentsOpen, setContentsOpen] = useState<boolean>(true)
  const [activeBias, setBias] = useState<string>("wiki");

  return (
    <div className="relative bg-white min-h-screen overflow-x-hidden">
      {/* MAIN CONTENT - ToggleGroup shown first on mobile, positioned in center on desktop */}
      <div className="lg:mx-72 xl:mx-80 2xl:mx-96 px-4 pt-2 overflow-x-hidden">

        <div className="flex items-center justify-between pb-1">
          <span className="text-xl pl-2">Bias</span>
          <span className="text-md pr-2 pointer-default cursor-context-menu">
            <TooltipProvider delayDuration={0}>
              <Tooltip persistOnClick={true}>
                <TooltipTrigger asChild>
                  <div className="p-1 cursor-help inline-flex items-center justify-center">
                    <span>?</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs" side="left" withBackdrop={true} collisionPadding={16}>
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium">Political bias</p>
                    <p className="text-muted-foreground text-xs">
                      A bias is a tendency to support or favor a particular political view, party, or idea. It can shape how a person interprets events, selects information, and presents ideas. When an author has a political bias, it may influence their perspective by affecting which facts they emphasize, how they describe people or issues, and the conclusions they draw. As a result, their writing might reflect their personal beliefs rather than a completely neutral or balanced viewpoint.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>

        <ToggleGroup
          type="single"
          variant="outline"
          value={activeBias}
          onValueChange={(value) => {
            if (value) setBias(value);
          }}
          className="flex-col sm:flex-row"
        >
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="com">
            Socialist
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="liberal">
            Liberal
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="wiki">
            Wikipedia
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="cons">
            Conservative
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="nat">
            Nationalist
          </ToggleGroupItem>
        </ToggleGroup>
        <br />
      </div>

      {/* LEFT SIDEBAR - Shows after ToggleGroup on mobile, left side on desktop */}
      <div className="w-full lg:w-64 lg:absolute lg:left-4 xl:left-8 2xl:left-40 lg:top-9 px-4 lg:px-0 overflow-y-auto overflow-x-hidden">
        <div className="w-full lg:w-64 relative overflow-x-hidden">
          <Collapsible open={contentsOpen} onOpenChange={setContentsOpen}>
            <div className="w-full lg:w-64 flex justify-between items-start overflow-x-hidden">
              <div className="w-full lg:w-64 relative inline-flex flex-col justify-start items-start overflow-x-hidden">
                <div className="relative w-full">
                  <CollapsibleTrigger className="h-10 px-1.5 py-[5px] inline-flex justify-between items-center gap-2.5 w-full transition-colors cursor-pointer">
                    <div className="justify-start text-neutral-800 text-sm font-bold ">Contents</div>
                    <div data-svg-wrapper className="relative">
                      {contentsOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.71875 12H16.9988" stroke="#636C7E" strokeWidth="1.89438" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6.71875V16.9988" stroke="#636C7E" strokeWidth="1.89438" strokeLinecap="round" />
                          <path d="M6.71875 12H16.9988" stroke="#636C7E" strokeWidth="1.89438" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <div className="absolute top-9 left-0 w-full h-0.5 bg-gray-300" />
                </div>
                <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden transition-all duration-200 ease-out mt-4">

                  <Contents contents={[]} />

                </CollapsibleContent>
              </div>
            </div>
          </Collapsible>
        </div>
      </div>
      {/* END LEFT SIDEBAR */}

      {/* RIGHT SIDEBAR - Shows second on mobile, right side on desktop */}
      <div data-property-1="Default" className="w-full lg:w-64 lg:absolute lg:right-4 xl:right-8 2xl:right-40 lg:top-9 px-4 lg:px-0 py-4 lg:py-0 overflow-y-auto overflow-x-hidden">
        <div className="w-full lg:w-64 relative overflow-x-hidden">
          <Collapsible open={toolsOpen} onOpenChange={setToolsOpen}>
            <div className="w-full lg:w-64 flex justify-between items-start overflow-x-hidden">
              <div className="w-full lg:w-64 relative inline-flex flex-col justify-start items-start overflow-x-hidden">
                <div className="relative w-full">
                  <CollapsibleTrigger className="h-10 px-1.5 py-[5px] inline-flex justify-between items-center gap-2.5 w-full transition-colors cursor-pointer">
                    <div className="justify-start text-neutral-800 text-sm font-bold ">Tools</div>
                    <div data-svg-wrapper className="relative">
                      {toolsOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.71875 12H16.9988" stroke="#636C7E" strokeWidth="1.89438" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6.71875V16.9988" stroke="#636C7E" strokeWidth="1.89438" strokeLinecap="round" />
                          <path d="M6.71875 12H16.9988" stroke="#636C7E" strokeWidth="1.89438" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <div className="absolute top-9 left-0 w-full h-0.5 bg-gray-300" />
                </div>
                <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden transition-all duration-200 ease-out mt-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                        <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Language" className="relative">
                          <Languages className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Language</div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Globe" className="relative">
                          <Earth className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Translate</div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Speech" className="relative">
                          <Speech className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Text to speech</div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <a className="hover:underline cursor-not-allowed">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Map" className="relative">
                          <Waypoints className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Topic map</div>
                        </div>
                      </div>
                      </a>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">PRO</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <a className="hover:underline cursor-not-allowed">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Notes" className="relative">
                          <NotebookPen className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">My Notes</div>
                        </div>
                      </div>
                      </a>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">PRO</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <a className="hover:underline cursor-not-allowed">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="AI" className="relative">
                          <Bot className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Ask WikiPal</div>
                        </div>
                      </div>
                      </a>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">PRO</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">                      
                      <a className="hover:underline cursor-not-allowed">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Watch" className="relative">
                          <Star className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Watch changes</div>
                        </div>
                      </div>
                      </a>
                        <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                          <div className="justify-center text-white text-xs font-bold ">PRO</div>
                        </div>
                    </div>
                    <div data-property-1="Default" className="size- inline-flex justify-start items-start overflow-x-hidden">
                      <a href="" className="hover:underline">
                      <div data-property-1="Default" className="w-full max-w-64 self-stretch p-1.5 rounded-md flex justify-start items-center gap-1.5 overflow-x-hidden">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Save" className="relative">
                            <Bookmark className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Save article</div>
                          </div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Short link" className="relative">
                          <Link className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Short link</div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Cite" className="relative">
                          <Quote className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Cite this page</div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="QR" className="relative">
                          <QrCode className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">QR Code</div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Download" className="relative">
                          <Download className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Download PDF</div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Print" className="relative">
                          <Printer className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Printable version</div>
                        </div>
                      </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Info" className="relative">
                          <Info className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Page information</div>
                        </div>
                      </div>
                      </a>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </div>
          </Collapsible>
        </div>
      </div>
      {/* END RIGHT SIDEBAR */}

      <div className="lg:mx-72 xl:mx-80 2xl:mx-96 px-4 py-2 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
