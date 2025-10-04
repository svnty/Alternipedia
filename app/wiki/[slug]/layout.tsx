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
      {/* LEFT SIDEBAR - Shows first on mobile, left side on desktop */}
      <div className="w-full lg:w-64 lg:absolute lg:left-4 xl:left-8 2xl:left-40 lg:top-9 px-4 lg:px-0 py-4 lg:py-0 overflow-y-auto overflow-x-hidden">
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
                  <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
                    <div className="self-stretch inline-flex justify-between items-start">
                      <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Extant Carnivora species</div>
                      <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-56 inline-flex justify-between items-start">
                      <div className="justify-start text-neutral-800 text-sm font-bold  leading-normal">Cats</div>
                      <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-52 inline-flex justify-between items-start">
                      <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Breeds</div>
                      <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">American curl</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-neutral-800" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">Sphynx</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">German Rex</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                    <div className="w-52 inline-flex justify-between items-start">
                      <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Felinology</div>
                      <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Anatomy</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-neutral-800" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">Genetics</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">Kitten</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                    <div className="w-48 inline-flex justify-between items-start">
                      <div className="flex-1 justify-start text-blue-400 text-sm font-normal  leading-normal">Calico cat</div>
                      <div data-property-1="Arrow Down" className="size-6 relative opacity-0 overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[7px] top-[9px] absolute bg-blue-400" />
                      </div>
                    </div>
                  </div>
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
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Language" className="relative">
                          <Languages className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Language</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Globe" className="relative">
                          <Earth className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Translate</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Speech" className="relative">
                          <Speech className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Text to speech</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Map" className="relative">
                          <Waypoints className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Topic map</div>
                        </div>
                      </div>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">PRO</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Notes" className="relative">
                          <NotebookPen className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">My Notes</div>
                        </div>
                      </div>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">PRO</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="AI" className="relative">
                          <Bot className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Ask WikiPal</div>
                        </div>
                      </div>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">PRO</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Watch" className="relative">
                          <Star className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Watch changes</div>
                        </div>
                        <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                          <div className="justify-center text-white text-xs font-bold ">PRO</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="size- inline-flex justify-start items-start overflow-x-hidden">
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
                    </div>
                    {/* <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Link" className="relative">
                          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4401 8.5H13.7521C13.2593 8.5 12.8561 8.9032 12.8561 9.39601C12.8561 9.88881 13.2593 10.292 13.7521 10.292H16.4401C17.9185 10.292 19.1281 11.5016 19.1281 12.98C19.1281 14.4585 17.9185 15.6681 16.4401 15.6681H13.7521C13.2593 15.6681 12.8561 16.0713 12.8561 16.5641C12.8561 17.0569 13.2593 17.4601 13.7521 17.4601H16.4401C18.9131 17.4601 20.9202 15.453 20.9202 12.98C20.9202 10.5071 18.9131 8.5 16.4401 8.5ZM8.37605 12.98C8.37605 13.4728 8.77925 13.876 9.27206 13.876H14.6481C15.1409 13.876 15.5441 13.4728 15.5441 12.98C15.5441 12.4872 15.1409 12.084 14.6481 12.084H9.27206C8.77925 12.084 8.37605 12.4872 8.37605 12.98ZM10.1681 15.6681H7.48004C6.00163 15.6681 4.79202 14.4585 4.79202 12.98C4.79202 11.5016 6.00163 10.292 7.48004 10.292H10.1681C10.6609 10.292 11.0641 9.88881 11.0641 9.39601C11.0641 8.9032 10.6609 8.5 10.1681 8.5H7.48004C5.00706 8.5 3 10.5071 3 12.98C3 15.453 5.00706 17.4601 7.48004 17.4601H10.1681C10.6609 17.4601 11.0641 17.0569 11.0641 16.5641C11.0641 16.0713 10.6609 15.6681 10.1681 15.6681Z" fill="#636C7E" />
                          </svg>
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Permanent link</div>
                        </div>
                      </div>
                    </div> */}
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Short link" className="relative">
                          <Link className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Short link</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Cite" className="relative">
                          <Quote className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Cite this page</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="QR" className="relative">
                          <QrCode className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">QR Code</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Download" className="relative">
                          <Download className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Download PDF</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Print" className="relative">
                          <Printer className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Printable version</div>
                        </div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <div className="size- flex justify-start items-center gap-1.5">
                        <div data-svg-wrapper data-property-1="Info" className="relative">
                          <Info className="text-gray-500" size={16} />
                        </div>
                        <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                          <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">Page information</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </div>
          </Collapsible>
        </div>
      </div>
      {/* END RIGHT SIDEBAR */}

      {/* MAIN CONTENT */}
      <div className="lg:mx-72 xl:mx-80 2xl:mx-96 px-4 py-2 overflow-x-hidden">
        <ToggleGroup
          type="single"
          variant="outline"
          value={activeBias}
          onValueChange={(value) => {
            if (value) setBias(value);
          }}
        >
          <ToggleGroupItem className="flex-1 data-[state=off]:cursor-pointer" value="com">
            Socialist
          </ToggleGroupItem>
          <ToggleGroupItem className="flex-1 data-[state=off]:cursor-pointer" value="liberal">
            Liberal
          </ToggleGroupItem>
          <ToggleGroupItem className="flex-1 data-[state=off]:cursor-pointer" value="wiki">
            Wikipedia
          </ToggleGroupItem>
          <ToggleGroupItem className="flex-1 data-[state=off]:cursor-pointer" value="cons">
            Conservative
          </ToggleGroupItem>
          <ToggleGroupItem className="flex-1 data-[state=off]:cursor-pointer" value="nat">
            Nationalist
          </ToggleGroupItem>
        </ToggleGroup>
        <br />
        
        {children}
      </div>
    </div>
  );
}
