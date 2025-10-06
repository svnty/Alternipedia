"use client";

import { useState, useEffect, useMemo, useTransition } from "react"
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
} from "@/components/ui/toggle-group"
import { Bookmark, Bot, Download, Earth, Info, Languages, Link, NotebookPen, Printer, QrCode, Quote, Speech, Star, Waypoints, Search, Check } from "lucide-react";
import { SlidingLanguage } from "@/app/[lang]/sliding-language";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LoadingOverlay } from "@/app/[lang]/loading-overlay";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { notFound } from 'next/navigation';
import { getDictionary } from "@/lib/i18n/dictionaries";

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

  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [contentsOpen, setContentsOpen] = useState<boolean>(false);
  const [activeBias, setBias] = useState<string>(searchParams?.get('bias') || '');
  const [langDialogOpen, setLangDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<Locale>(currentLang);
  const [isLoadingBias, startTransition] = useTransition();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarTop, setSidebarTop] = useState(112); // 7rem in pixels
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 136px)'); // 112px + 24px margin
  const handleApplyBias = (value: string) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams?.toString());
    params.set('bias', value);

    const newPath = `${pathname}?${params.toString()}`;
    
    // Use transition to track loading state
    startTransition(() => {
      router.push(newPath);
    });
  }

  if (!isValidLocale(currentLang)) {
    notFound();
  }

  const dict = getDictionary(currentLang);

  // Filter languages based on search query
  const filteredLocales = useMemo(() => {
    if (!searchQuery) return locales;

    const query = searchQuery.toLowerCase();
    return locales.filter(locale =>
      localeNames[locale].toLowerCase().includes(query) ||
      locale.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const switchLanguage = (newLang: Locale) => {
    if (!pathname) return;

    // Replace the language segment in the pathname
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPath = segments.join('/');

    setLangDialogOpen(false);
    window.location.href = newPath;
  };

  const handleApplyLanguage = () => {
    if (selectedLang !== currentLang) {
      switchLanguage(selectedLang);
    } else {
      setLangDialogOpen(false);
    }
  };

  useEffect(() => {
    if (!["socialist", "liberal", "wikipedia", "conservative", "nationalist"].includes(activeBias)) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('bias', 'wikipedia');

      const newPath = `${pathname}?${params.toString()}`;
      router.push(newPath);
      setBias('wikipedia');
    }


    // Check if screen is large on mount and window resize
    let resizeTimer: NodeJS.Timeout;
    let previousWidth = window.innerWidth;

    const checkScreenSize = (isInitial = false) => {
      const currentWidth = window.innerWidth;

      // On initial load, always set the state. On resize, only update if width actually changed
      if (isInitial || currentWidth !== previousWidth) {
        const isLargeScreen = currentWidth >= 1024; // lg breakpoint
        setToolsOpen(isLargeScreen);
        setContentsOpen(isLargeScreen);
        previousWidth = currentWidth;
      }
    };

    const handleResize = () => {
      // Debounce resize events to avoid excessive updates
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

  // Track mobile/desktop for sidebar positioning
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

  // Smooth sidebar positioning based on scroll
  useEffect(() => {
    if (isMobile) return;

    let ticking = false;
    
    const updateSidebarPosition = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const navbarHeight = 120; // Approximate navbar height
      
      // Smooth transition for top position
      let newTop: number;
      if (scrollY < navbarHeight) {
        // Navbar visible - interpolate from 112px to 16px
        const progress = scrollY / navbarHeight;
        newTop = 112 * (1 - progress) + 16 * progress;
      } else {
        // Navbar hidden - moderate top margin
        newTop = 16;
      }
      
      // Calculate footer distance
      const distanceToFooter = documentHeight - (scrollY + windowHeight);
      const footerBuffer = 120; // Start adjusting 120px before footer
      
      // Smooth transition for height
      let newHeight: string;
      if (distanceToFooter < footerBuffer) {
        // Near footer - reduce height smoothly
        const reduction = Math.max(0, footerBuffer - distanceToFooter);
        newHeight = `calc(100vh - ${newTop + reduction + 24}px)`; // +24px for bottom margin
      } else {
        // Normal height with proper margins
        newHeight = `calc(100vh - ${newTop + 24}px)`; // +24px for bottom margin
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
          variant="outline"
          value={activeBias}
          onValueChange={(value) => {
            if (!value) return;
            setBias(value);
            handleApplyBias(value);
          }}
          className="flex-col sm:flex-row md:mx-2"
        >
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="socialist">
            {dict.bias.socialist}
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="liberal">
            {dict.bias.liberal}
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="wikipedia">
            {dict.bias.wikipedia}
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="conservative">
            {dict.bias.conservative}
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full sm:flex-1 data-[state=off]:cursor-pointer" value="nationalist">
            {dict.bias.nationalist}
          </ToggleGroupItem>
        </ToggleGroup>
        <br />
      </div>

      {/* LEFT SIDEBAR - Shows after ToggleGroup on mobile, left side on desktop */}
      <div 
        className="w-full lg:w-64 lg:fixed lg:left-4 xl:left-8 2xl:left-40 px-4 lg:px-0 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-out"
        style={{
          top: isMobile ? 'auto' : `${sidebarTop}px`,
          height: isMobile ? 'auto' : sidebarHeight
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

      {/* RIGHT SIDEBAR - Shows second on mobile, right side on desktop */}
      <div 
        data-property-1="Default" 
        className="w-full lg:w-64 lg:fixed lg:right-4 xl:right-8 2xl:right-40 px-4 lg:px-0 py-4 lg:py-0 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-out"
        style={{
          top: isMobile ? 'auto' : `${sidebarTop}px`,
          height: isMobile ? 'auto' : sidebarHeight
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
                      <Dialog open={langDialogOpen} onOpenChange={setLangDialogOpen}>
                        <DialogTrigger asChild>
                          <div data-property-1="Default" className="self-stretch p-1.5 rounded-md inline-flex justify-between items-center">
                            <a className="hover:underline cursor-pointer">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Notes" className="relative">
                                  <Languages className="text-gray-500" size={16} />
                                </div>
                                <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden text-gray-500 text-sm">
                                  <SlidingLanguage />
                                </div>
                              </div>
                            </a>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{dict.language.selectLanguage}</DialogTitle>
                            <DialogDescription>
                              {dict.language.description}
                            </DialogDescription>
                          </DialogHeader>

                          {/* Search Input */}
                          <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search languages..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-9"
                            />
                          </div>

                          {/* Language List */}
                          <ScrollArea className="h-[300px] pr-4">
                            <RadioGroup
                              value={selectedLang}
                              onValueChange={(value) => setSelectedLang(value as Locale)}
                              className="space-y-1 pb-2"
                            >
                              {filteredLocales.map((locale) => (
                                <div
                                  key={locale}
                                  className={`flex items-center space-x-3 rounded-md border p-3 cursor-pointer transition-colors hover:bg-gray-50 ${selectedLang === locale ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                    }`}
                                  onClick={() => setSelectedLang(locale)}
                                >
                                  <RadioGroupItem value={locale} id={locale} />
                                  <Label
                                    htmlFor={locale}
                                    className="flex-1 cursor-pointer font-normal"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{localeNames[locale]}</span>
                                      <span className="text-xs text-gray-500 uppercase">{locale}</span>
                                    </div>
                                  </Label>
                                  {currentLang === locale && (
                                    <Check className="h-4 w-4 text-blue-600" />
                                  )}
                                </div>
                              ))}
                            </RadioGroup>

                            {filteredLocales.length === 0 && (
                              <div className="text-center py-8 text-gray-500">
                                {dict.language.notFound} "{searchQuery}"
                              </div>
                            )}
                          </ScrollArea>

                          {/* Action Buttons */}
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setLangDialogOpen(false);
                                setSelectedLang(currentLang);
                                setSearchQuery('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleApplyLanguage}
                              disabled={selectedLang === currentLang}
                            >
                              Apply
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

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
                        <a href="" className="hover:underline">
                          <div className="size- flex justify-start items-center gap-1.5">
                            <div data-svg-wrapper data-property-1="Short link" className="relative">
                              <Link className="text-gray-500" size={16} />
                            </div>
                            <div className="size- pr-1.5 flex justify-start items-center gap-2.5 overflow-hidden">
                              <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.shortUrl}</div>
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
                              <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.citePage}</div>
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
                              <div className="justify-start text-gray-500 text-sm font-normal leading-normal truncate">{dict.tools.QRCode}</div>
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
      <div className="lg:mx-72 xl:mx-80 2xl:mx-96 px-4 py-2 overflow-x-hidden relative pb-20">
        {/* Loading overlay when bias is changing */}
        <LoadingOverlay 
          isVisible={isLoadingBias} 
          message="Loading new perspective..." 
        />
        {children}
      </div>

    </div>
  );
}
