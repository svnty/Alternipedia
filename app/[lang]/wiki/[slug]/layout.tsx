"use client";

import { useState, useEffect, useMemo, useRef } from "react"
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { locales, localeNames, type Locale, isValidLocale } from '@/lib/i18n/config';
import WikipediaContents from "@/app/[lang]/wiki/[slug]/wikipedia-contents";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Bookmark, Bot, Download, Earth, Info, Languages, Link, NotebookPen, Printer, QrCode, Quote, Speech, Star, Waypoints, Search, Check } from "lucide-react";
import CurrentUrlQRCode from '@/app/[lang]/wiki/[slug]/(client-renders)/current-url-qr';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoadingOverlay } from "@/app/[lang]/(client-renders)/loading-overlay";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { notFound } from 'next/navigation';
import { getDictionary } from "@/lib/i18n/dictionaries";
import ShortURL from "@/app/[lang]/wiki/[slug]/(client-renders)/short-url";
import LanguageSwitcher from "@/app/[lang]/wiki/[slug]/(client-renders)/language-switcher";

export default function Article({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const currentLang = params?.lang as Locale || 'en';
  const searchParams = useSearchParams();
  const dict = getDictionary(currentLang);

  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [contentsOpen, setContentsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarTop, setSidebarTop] = useState(112); // 7rem in pixels
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 112px)'); // 112px + 24px margin

  // loading spinner
  const [isLoadingBias, setIsLoadingBias] = useState<boolean>(true);
  const [activeBias, setBias] = useState<string>(searchParams?.get('bias') || '');
  const prevPathname = useRef<string | null>(pathname || null);
  const initialBiasAppliedRef = useRef(false);

  if (!isValidLocale(currentLang)) {
    notFound();
  }

  /* ================== RESPONSIVE SIDEBAR ================== */
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    let previousWidth = window.innerWidth;

    const checkScreenSize = (isInitial = false) => {
      const currentWidth = window.innerWidth;

      if (isInitial || currentWidth !== previousWidth) {
        const isLargeScreen = currentWidth >= 1024; // lg breakpoint
        setToolsOpen(isLargeScreen);
        setContentsOpen(isLargeScreen);
        previousWidth = currentWidth;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => checkScreenSize(false), 150);
    };

    checkScreenSize(true); // Initial load - always set state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Check if screen has resized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Smooth sidebar animation toggling based on element overlap or rapid scroll
  useEffect(() => {
    if (isMobile) return;

    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let pageJumpCooldown = false;

    const elementsOverlap = (el1: any, el2: any) => {
      if (!el1 || !el2) return false;

      const rect1 = el1.getBoundingClientRect();
      const rect2 = el2.getBoundingClientRect();

      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    }

    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const footer = document.getElementById('footer');
    const nav = document.getElementById('nav');

    // Detect keyboard page jumps
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect page jump keys: Cmd+Up/Down, Home, End, Page Up/Down
      if (
        (e.metaKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) || // Cmd + Up/Down (macOS)
        (e.ctrlKey && (e.key === 'Home' || e.key === 'End')) || // Ctrl + Home/End
        e.key === 'Home' ||
        e.key === 'End' ||
        e.key === 'PageUp' ||
        e.key === 'PageDown'
      ) {
        pageJumpCooldown = true;

        // Remove all transitions immediately when page jump is detected
        [leftSidebar, rightSidebar].forEach(sidebar => {
          if (sidebar) {
            sidebar.classList.remove('transition-all', 'duration-100', 'ease-linear');
            sidebar.offsetHeight; // Force reflow
          }
        });

        // Clear cooldown after animations would have completed
        setTimeout(() => {
          pageJumpCooldown = false;
        }, 300);
      }
    };

    const updateAnimation = (el1: any, el2: any) => {
      if (!el1 || !el2) return;

      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      const timeDelta = currentTime - lastScrollTime;

      // Detect page jumps by looking for large instantaneous scroll changes
      const isPageJump = scrollDelta > 500 && timeDelta < 100; // More than 500px in less than 100ms
      const isRapidScroll = scrollDelta > 100 && timeDelta < 50;

      const areOverlapping = elementsOverlap(el1, el2);
      const hasTransition = el1.classList.contains('transition-all');

      if (areOverlapping || isRapidScroll || isPageJump || pageJumpCooldown) {
        // Remove transitions for overlapping, rapid scroll, page jumps, or during cooldown
        el1.classList.remove('transition-all', 'duration-100', 'ease-linear');

        // Force immediate repositioning
        if ((areOverlapping || isPageJump) && hasTransition) {
          el1.offsetHeight; // Force reflow
        }
      } else {
        // Only add transitions when conditions are normal
        if (!hasTransition) {
          el1.classList.add('transition-all', 'duration-100', 'ease-linear');
        }
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    }

    // Store function references for proper cleanup
    const handleScrollLeftFooter = () => updateAnimation(leftSidebar, footer);
    const handleResizeLeftFooter = () => updateAnimation(leftSidebar, footer);
    const handleScrollLeftNav = () => updateAnimation(leftSidebar, nav);
    const handleResizeLeftNav = () => updateAnimation(leftSidebar, nav);
    const handleScrollRightFooter = () => updateAnimation(rightSidebar, footer);
    const handleResizeRightFooter = () => updateAnimation(rightSidebar, footer);
    const handleScrollRightNav = () => updateAnimation(rightSidebar, nav);
    const handleResizeRightNav = () => updateAnimation(rightSidebar, nav);

    // Add keyboard event listener for page jump detection
    window.addEventListener('keydown', handleKeyDown);

    window.addEventListener('scroll', handleScrollLeftFooter);
    window.addEventListener('resize', handleResizeLeftFooter);
    window.addEventListener('scroll', handleScrollLeftNav);
    window.addEventListener('resize', handleResizeLeftNav);
    window.addEventListener('scroll', handleScrollRightFooter);
    window.addEventListener('resize', handleResizeRightFooter);
    window.addEventListener('scroll', handleScrollRightNav);
    window.addEventListener('resize', handleResizeRightNav);

    updateAnimation(leftSidebar, footer);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollLeftFooter);
      window.removeEventListener('resize', handleResizeLeftFooter);
      window.removeEventListener('scroll', handleScrollLeftNav);
      window.removeEventListener('resize', handleResizeLeftNav);
      window.removeEventListener('scroll', handleScrollRightFooter);
      window.removeEventListener('resize', handleResizeRightFooter);
      window.removeEventListener('scroll', handleScrollRightNav);
      window.removeEventListener('resize', handleResizeRightNav);
    };
  }, []);

  // Smooth sidebar positioning based on scroll
  useEffect(() => {
    if (isMobile) return;

    const isElementNearViewport = (el: any, offset = 40) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // visible region extended by ±offset
      const aboveViewport = rect.bottom < -offset;
      const belowViewport = rect.top > vh + offset;

      return !(aboveViewport || belowViewport);
    }

    let ticking = false;

    const updateSidebarPosition = () => {
      const scrollY = window.scrollY;
      const footerHeight = document.getElementById("footer")?.clientHeight || 130;

      let newTop: number;
      let newHeight: string;

      if (isElementNearViewport(document.getElementById('nav'), 40)) {
        newTop = 112;
      } else {
        newTop = 16;
      }

      if (isElementNearViewport(document.getElementById('footer'), 40)) {
        newHeight = `calc(100vh - ${footerHeight + 24}px)`;
      } else {
        newHeight = `calc(100vh - ${newTop + 24}px)`;
      }

      setSidebarTop(newTop);
      setSidebarHeight(newHeight);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateSidebarPosition);
        ticking = true;
      }
    };

    // Immediate calculation to prevent initial jump
    updateSidebarPosition();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  /* ================== BIAS AND PATHNAME HANDLING ================== */
  useEffect(() => {
    const onLoaded = () => {
      (window as any).__page_loaded_handled__ = true;
      setTimeout(() => setIsLoadingBias(false), 1);
    };

    // Register a global fallback so the client-side loader can call this
    // directly if the CustomEvent was missed due to timing/hydration differences
    // after deployment.
    (window as any).__alternipedia_on_load = () => {
      (window as any).__page_loaded_handled__ = true;
      onLoaded();
    };

    window.addEventListener("load-signal", onLoaded);
    return () => {
      try {
        delete (window as any).__alternipedia_on_load;
      } catch (e) {
        // ignore
      }
      window.removeEventListener("load-signal", onLoaded);
    };
  }, [pathname, activeBias]);

  const handleApplyBias = (value: string, opts?: { replace?: boolean }) => {
    setIsLoadingBias(true);

    if (!["socialist", "liberal", "wikipedia", "conservative", "nationalist"].includes(value)) {
      value = 'wikipedia';
    }

    const params = new URLSearchParams(searchParams?.toString());
    params.set('bias', value);
    const newPath = `${pathname}?${params.toString()}`;
    setBias(value);

    if (opts?.replace) {
      router.replace(newPath);
    } else {
      router.push(newPath);
    }
  };

  useEffect(() => {
    // Guard against React Strict Mode or double mounts calling this twice in dev.
    if (!activeBias && !initialBiasAppliedRef.current) {
      initialBiasAppliedRef.current = true;
      // Use replace for the automatic default so we don't create a duplicate history entry.
      handleApplyBias('wikipedia', { replace: true });
    }
  }, [activeBias]);

  useEffect(() => {
    const prev = prevPathname.current;

    if (!prev) {
      prevPathname.current = pathname || null;
      return;
    }

    if (prev !== pathname) {
      prevPathname.current = pathname || null;
      setIsLoadingBias(true);
    }

  }, [prevPathname.current, pathname]);

  return (
    <div className="relative bg-white min-h-screen overflow-x-hidden">
      {/* HEADER - ToggleGroup shown first on mobile, positioned in center on desktop */}
      <div className="lg:mx-72 xl:mx-80 2xl:mx-96 px-4 pt-2 overflow-x-hidden sm:-mb-4 md:-mb-4 lg:relative lg:z-10">
        <div className="flex items-center justify-between pb-1">
          <span className="text-xl pl-2">{dict.bias.title}</span>
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
                    <p className="text-[13px] font-medium">{dict.bias.heading}</p>
                    <p className="text-muted-foreground text-xs">{dict.bias.explanation}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>

        <ToggleGroup
          type="single"
          id="bias-toggle"
          variant="outline"
          value={activeBias}
          onValueChange={(value) => {
            if (!value) return;
            handleApplyBias(value);
          }}
          className="flex-col sm:flex-row md:mx-2"
        >
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="socialist" disabled={isLoadingBias}>
            {dict.bias.socialist}
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="liberal" disabled={isLoadingBias}>
            {dict.bias.liberal}
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="wikipedia" disabled={isLoadingBias}>
            {dict.bias.wikipedia}
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="conservative" disabled={isLoadingBias}>
            {dict.bias.conservative}
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="nationalist" disabled={isLoadingBias}>
            {dict.bias.nationalist}
          </ToggleGroupItem>
        </ToggleGroup>
        <br />
      </div>

      {/* LEFT SIDEBAR  */}
      <div
        id="left-sidebar"
        className="w-full lg:w-64 lg:fixed lg:left-4 xl:left-8 2xl:left-20 px-4 lg:px-0 overflow-y-auto overflow-x-hidden lg:z-10 hidden lg:block"
        style={{
          top: isMobile ? 'auto' : `${sidebarTop}px`,
          height: isMobile ? 'auto' : sidebarHeight,
        }}
      >
        <div className="w-full lg:w-64 relative overflow-x-hidden">
          <Collapsible open={contentsOpen} onOpenChange={setContentsOpen}>
            <div className="w-full lg:w-64 flex justify-between items-start overflow-x-hidden">
              <div className="w-full lg:w-64 relative inline-flex flex-col justify-start items-start overflow-x-hidden">
                <div className="relative w-full">
                  <CollapsibleTrigger className="h-10 px-1.5 py-[5px] inline-flex justify-between items-center gap-2.5 w-full transition-colors cursor-pointer">
                    <div className="justify-start text-neutral-800 text-sm font-bold ">{dict.article.content}</div>
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
                  <WikipediaContents
                    slug={params?.slug as string}
                    language={currentLang}
                    bias={searchParams?.get('bias') || ''}
                  />
                </CollapsibleContent>
              </div>
            </div>
          </Collapsible>
        </div>
      </div>
      {/* END LEFT SIDEBAR */}

      {/* RIGHT SIDEBAR */}
      <div id="right-sidebar-fab" className="fixed bottom-4 right-4 z-20 :hidden">

      </div>
      <div
        id="right-sidebar"
        data-property-1="Default"
        className="w-full lg:w-64 lg:fixed lg:right-4 xl:right-8 2xl:right-20 px-4 lg:px-0 py-4 lg:py-0 overflow-y-auto overflow-x-hidden lg:z-10 hidden lg:block"
        style={{
          top: isMobile ? 'auto' : `${sidebarTop}px`,
          height: isMobile ? 'auto' : sidebarHeight,
        }}
      >
        <div className="w-full lg:w-64 relative overflow-x-hidden">
          <Collapsible open={toolsOpen} onOpenChange={setToolsOpen}>
            <div className="w-full lg:w-64 flex justify-between items-start overflow-x-hidden">
              <div className="w-full lg:w-64 relative inline-flex flex-col justify-start items-start overflow-x-hidden">
                <div className="relative w-full">
                  <CollapsibleTrigger className="h-10 px-1.5 py-[5px] inline-flex justify-between items-center gap-2.5 w-full transition-colors cursor-pointer">
                    <div className="justify-start text-neutral-800 text-sm font-bold ">{dict.article.tools}</div>
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
                    <LanguageSwitcher currentLang={currentLang} mobile={false} />

                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Speech" className="relative">
                            <Speech className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.textToSpeech}</div>
                          </div>
                        </div>
                      </a>
                    </div>

                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <a className="hover:underline cursor-not-allowed">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Map" className="relative">
                            <Earth className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.translate}</div>
                          </div>
                        </div>
                      </a>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                      </div>
                    </div>

                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <a className="hover:underline cursor-not-allowed">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Map" className="relative">
                            <Waypoints className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.topicMap}</div>
                          </div>
                        </div>
                      </a>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <a className="hover:underline cursor-not-allowed">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Notes" className="relative">
                            <NotebookPen className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.notes}</div>
                          </div>
                        </div>
                      </a>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                      <a className="hover:underline cursor-not-allowed">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="AI" className="relative">
                            <Bot className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.wikipal}</div>
                          </div>
                        </div>
                      </a>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                      </div>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a className="hover:underline cursor-not-allowed">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Watch" className="relative">
                            <Star className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.watchChanges}</div>
                          </div>
                        </div>
                      </a>
                      <div className="size- px-[5px] py-px bg-yellow-400 rounded-sm flex justify-center items-center gap-2.5">
                        <div className="justify-center text-white text-xs font-bold ">{dict.upgrade.pro}</div>
                      </div>
                    </div>


                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a className="hover:underline cursor-pointer">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Watch" className="relative">
                            <Bookmark className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.saveArticle}</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <ShortURL mobile={false} />
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Cite" className="relative">
                            <Quote className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.citePage}</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">

                      <Dialog>
                        <DialogTrigger asChild>
                          <a className="hover:underline cursor-pointer">
                            <div className="size- flex justify-start items-center gap-1.5">
                              <div data-svg-wrapper data-property-1="QR" className="relative">
                                <QrCode className="text-gray-500" size={16} />
                              </div>
                              <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                                <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.QRCode}</div>
                              </div>
                            </div>
                          </a>
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
                    <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-start items-center gap-1.5">
                      <a href="" className="hover:underline">
                        <div className="size- flex justify-start items-center gap-1.5">
                          <div data-svg-wrapper data-property-1="Download" className="relative">
                            <Download className="text-gray-500" size={16} />
                          </div>
                          <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.DownloadPDF}</div>
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
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.printPage}</div>
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
                            <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.pageInfo}</div>
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

      {/* MAIN CONTENT */}
      <div className="lg:mx-72 xl:mx-80 2xl:mx-96 px-4 py-2 overflow-x-hidden relative pb-20 min-h-screen">
        {/* Loading overlay when bias is changing */}
        <LoadingOverlay
          isVisible={isLoadingBias}
          message={"Loading perspective..."}
        />
        {children}
      </div>

    </div>
  );
}
