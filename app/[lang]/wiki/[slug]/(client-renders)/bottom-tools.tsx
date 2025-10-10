"use client";

import { Bookmark, Bot, Download, Earth, Info, NotebookPen, Printer, QrCode, Quote, Speech, Star, Sword, Waypoints, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import LanguageSwitcher from "./language-switcher";
import { useParams } from "next/navigation";
import { type Locale } from '@/lib/i18n/config';
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CurrentUrlQRCode from "./current-url-qr";
import ShortURL from "./short-url";

export default function BottomTools() {
  const [showText, setShowText] = useState<boolean>(true);
  const [largeMobile, setLargeMobile] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const params = useParams();
  const currentLang = params?.lang as Locale || 'en';
  const dict = getDictionary(currentLang);

    useEffect(() => {
    const nav = document.getElementById("nav");

    const isElementNearViewport = (el: any, offset = 40) => {
      if (!el) return true; // treat missing element as visible to avoid hiding the button
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // visible region extended by ±offset
      const aboveViewport = rect.bottom < -offset;
      const belowViewport = rect.top > vh + offset;

      return !(aboveViewport || belowViewport);
    };

    const handleScroll = () => {
      setShowText(isElementNearViewport(nav, 10));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // run once to set initial state
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // useEffect(() => {
  //   const handleResize = () => {
  //     const height = window.innerHeight || document.documentElement.clientHeight;

  //     if (height < 700) {
  //       setLargeMobile(false);
  //     } else {
  //       setLargeMobile(true);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is inside any dialog content/portal/overlay, don't close the menu.
      const target = event.target as Node;

      const clickedInsideDialog = ((): boolean => {
        // Only Elements support closest; text nodes do not.
        if (!(target instanceof Element)) return false;
        return Boolean(
          target.closest('[data-slot="dialog-content"], [data-slot="dialog-portal"], [data-slot="dialog-overlay"], [data-slot="dialog"], [role="dialog"]')
        );
      })();

      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(target) &&
        !buttonRef.current.contains(target) &&
        !clickedInsideDialog
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`fixed bottom-8 right-8 aspect-square bg-gray-800 text-white shadow-sm hover:shadow-lg cursor-pointer block lg:hidden z-20 hover:scale-105 justify-content-center flex flex-row items-center transition-all ${isMenuOpen ? "bg-gray-700" : ""
          }`}
      >
        {isMenuOpen ? (
          <X className="-ms-1 opacity-60 inline flex-1 text-red-300" aria-hidden="true" />
        ) : (
          <Sword className="-ms-1 opacity-60 inline flex-1" aria-hidden="true" />
        )}
        <span
          className={
            "flex-2 " +
            (showText ? "inline-block " : "pointer-events-none hidden ") +
            (isMenuOpen ? "text-red-300" : "")
          }
          aria-hidden={!showText}
        >
          {isMenuOpen ? "Close" : dict.article.tools}
        </span>
      </Button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed bottom-24 right-8 bg-gray-800 rounded-lg shadow-xl border border-gray-200 p-2 z-20 min-w-48 animate-in fade-in slide-in-from-bottom-2 duration-200 block lg:hidden w-[calc(100vw-4rem)] shadow-md"
        >
          <div className="flex flex-col gap-1">

            <LanguageSwitcher currentLang={currentLang} mobile={true} />

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <Speech className="text-gray-500" size={16} />
                </div>
                <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.textToSpeech}</div>
                </div>
              </button>
            </div>

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <Earth className="text-gray-500" size={16} />
                </div>
                <div className="flex-1 pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.translate}</div>
                </div>
                <div className="ml-auto px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                  <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                </div>
              </button>
            </div>

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <Waypoints className="text-gray-500" size={16} />
                </div>
                <div className="flex-1 pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.topicMap}</div>
                </div>
                <div className="ml-auto px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                  <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                </div>
              </button>
            </div>

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <NotebookPen className="text-gray-500" size={16} />
                </div>
                <div className="flex-1 pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.notes}</div>
                </div>
                <div className="ml-auto px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                  <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                </div>
              </button>
            </div>

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <Bot className="text-gray-500" size={16} />
                </div>
                <div className="flex-1 pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.wikipal}</div>
                </div>
                <div className="ml-auto px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                  <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                </div>
              </button>
            </div>

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <Star className="text-gray-500" size={16} />
                </div>
                <div className="flex-1 pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.watchChanges}</div>
                </div>
                <div className="ml-auto px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                  <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                </div>
              </button>
            </div>

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <Bookmark className="text-gray-500" size={16} />
                </div>
                <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.saveArticle}</div>
                </div>
              </button>
            </div>

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <ShortURL mobile={true} />
            </div>

            <div className="flex-row gap-1 inline-flex items-center w-full">
              <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                <div data-svg-wrapper data-property-1="Notes" className="relative">
                  <Quote className="text-gray-500" size={16} />
                </div>
                <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                  <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.citePage}</div>
                </div>
              </button>
            </div>

            {largeMobile && (
              <>

                <div className="flex-row gap-1 inline-flex items-center w-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex-row gap-1 inline-flex items-center w-full">
                        <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                          <div data-svg-wrapper data-property-1="Notes" className="relative">
                            <QrCode className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                            <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.QRCode}</div>
                          </div>
                        </button>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="hidden">{dict.tools.QRCode}</DialogTitle>
                      </DialogHeader>
                      <div className="p-2">
                        {/* Render QR Code for current URL */}
                        <CurrentUrlQRCode size={260} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex-row gap-1 inline-flex items-center w-full">
                  <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                    <div data-svg-wrapper data-property-1="Notes" className="relative">
                      <Download className="text-gray-500" size={16} />
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                      <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.DownloadPDF}</div>
                    </div>
                  </button>
                </div>

                <div className="flex-row gap-1 inline-flex items-center w-full">
                  <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                    <div data-svg-wrapper data-property-1="Notes" className="relative">
                      <Printer className="text-gray-500" size={16} />
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                      <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.printPage}</div>
                    </div>
                  </button>
                </div>

                <div className="flex-row gap-1 inline-flex items-center w-full">
                  <button className="px-4 w-full py-2.5 text-left text-sm text-white bg-gray-700 hover:bg-gray-900 rounded-md transition-colors cursor-pointer flex items-center gap-2">
                    <div data-svg-wrapper data-property-1="Notes" className="relative">
                      <Info className="text-gray-500" size={16} />
                    </div>
                    <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-white text-sm">
                      <div className="justify-start text-white text-sm font-normal leading-normal truncate">{dict.tools.pageInfo}</div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}