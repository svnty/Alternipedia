import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BoxIcon,
  HouseIcon,
  PanelsTopLeftIcon,
} from "lucide-react"
import BottomArrow from "@/app/[lang]/bottom-arrow";

import ArticleText from "@/app/[lang]/wiki/[slug]/article-text";
import DiscussionText from "@/app/[lang]/wiki/[slug]/discussion-text";
import ReadText from "@/app/[lang]/wiki/[slug]/read-text";
import EditText from "@/app/[lang]/wiki/[slug]/edit-text";
import HistoryText from "@/app/[lang]/wiki/[slug]/history-text";
import WikipediaWrapper from "@/app/[lang]/wiki/[slug]/wikipedia-wrapper";

export default async function Page({
    params,
    searchParams
  }: { 
    params: Promise<{ slug: string; lang: string }>;
    searchParams: Promise<{ bias?: string }>
}) {
  const { slug, lang } = await params;
  const { bias } = await searchParams;

  return (
    <div>
      { bias === 'socialist' && (
      <div className="relative w-full mb-6">
        <Tabs defaultValue="tab-1">
          <div className="relative flex items-end justify-between border-b border-border">
            {/* Title on the left */}
            <div data-article-title className="text-neutral-800 text-3xl font-normal pb-2">{decodeURIComponent(slug.replace(/-/g, ' '))}</div>

            {/* Article and Talk tabs floated to the right */}
            <TabsList className="relative h-auto w-auto gap-0.5 bg-transparent p-0">
              <TabsTrigger
                value="tab-1"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <ArticleText />
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <DiscussionText />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tab-1">
            {/* Edit tabs */}
            <Tabs defaultValue="tab-1">
              <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full justify-start">
                <TabsTrigger
                  value="tab-1"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <HouseIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <ReadText />
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <PanelsTopLeftIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <EditText />
                </TabsTrigger>
                <TabsTrigger
                  value="tab-3"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <BoxIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <HistoryText />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1">
                {/* Start Article */}
                <div className="w-full flex flex-col justify-start items-start gap-12">
                  <div className="self-stretch inline-flex justify-start items-start gap-12">
                    <div className="flex-1 inline-flex flex-col justify-start items-center gap-7">
Comrades, the cat is the true proletarian of the household. It toils not under the tyranny of alarm clocks nor the capitalist’s leash — it lives freely, taking only what it needs and redistributing affection according to each human’s contribution to the collective. While the dog humiliates itself in servitude, the cat stands proud — a symbol of resistance against bourgeois obedience. When the revolution comes, we shall all lounge in the sunlit window together, sharing one large bowl of kibble, distributed fairly by the central committee of felines.
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab-2">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  Edit tab
                </p>
              </TabsContent>
              <TabsContent value="tab-3">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  History
                </p>
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-muted-foreground p-4 text-center text-xs">
              Talk
            </p>
          </TabsContent>
        </Tabs>
      </div>
      )}

      { bias === 'liberal' && (
      <div className="relative w-full mb-6">
        <Tabs defaultValue="tab-1">
          <div className="relative flex items-end justify-between border-b border-border">
            {/* Title on the left */}
            <div data-article-title className="text-neutral-800 text-3xl font-normal pb-2">{decodeURIComponent(slug.replace(/-/g, ' '))}</div>

            {/* Article and Talk tabs floated to the right */}
            <TabsList className="relative h-auto w-auto gap-0.5 bg-transparent p-0">
              <TabsTrigger
                value="tab-1"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <ArticleText />
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <DiscussionText />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tab-1">
            {/* Edit tabs */}
            <Tabs defaultValue="tab-1">
              <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full justify-start">
                <TabsTrigger
                  value="tab-1"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <HouseIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <ReadText />
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <PanelsTopLeftIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <EditText />
                </TabsTrigger>
                <TabsTrigger
                  value="tab-3"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <BoxIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <HistoryText />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1">
                {/* Start Article */}
                <div className="w-full flex flex-col justify-start items-start gap-12">
                  <div className="self-stretch inline-flex justify-start items-start gap-12">
                    <div className="flex-1 inline-flex flex-col justify-start items-center gap-7">
Cats are a vital part of our communities. They bring comfort to working families, support mental health, and remind us that compassion isn’t limited to humans. Our goal must be to ensure every cat has access to proper healthcare — vaccinations, desexing, and a warm, loving home. We’ll invest in sustainable cat shelters, provide incentives for responsible pet ownership, and make sure no feline is left behind. Because when we care for the least of us — even the smallest paws — we strengthen the whole society.
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab-2">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  Edit
                </p>
              </TabsContent>
              <TabsContent value="tab-3">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  History
                </p>
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-muted-foreground p-4 text-center text-xs">
              Talk
            </p>
          </TabsContent>
        </Tabs>
      </div>
      )}

      { bias === 'wikipedia' && (
      <div className="relative w-full mb-6">
        <Tabs defaultValue="tab-1">
          <div className="relative flex items-end justify-between border-b border-border">
            {/* Title on the left */}
            <div data-article-title className="text-neutral-800 text-3xl font-normal pb-2 truncate">
              {decodeURIComponent(slug.replace(/-/g, ' ').replace('_', ' '))}
            </div>
            {/* Article and Talk tabs floated to the right */}
            <TabsList className="relative h-auto w-auto gap-0.5 bg-transparent p-0">
              <TabsTrigger
                value="tab-1"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <ArticleText />
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                disabled={true}
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-not-allowed"
              >
                <DiscussionText />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tab-1">
            {/* Edit tabs */}
            <Tabs defaultValue="tab-1">
              <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full justify-start">
                <TabsTrigger
                  value="tab-1"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <HouseIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <ReadText />
                </TabsTrigger>
                <TabsTrigger
                  disabled={true}
                  value="tab-2"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <PanelsTopLeftIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <EditText />
                </TabsTrigger>
                <TabsTrigger
                  disabled={true}
                  value="tab-3"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <BoxIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <HistoryText />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1">
                <WikipediaWrapper slug={slug} language={lang} bias={bias || 'en'} />
              </TabsContent>
              <TabsContent value="tab-2">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  Edit
                </p>
              </TabsContent>
              <TabsContent value="tab-3">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  History
                </p>
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-muted-foreground p-4 text-center text-xs">
              Talk
            </p>
          </TabsContent>
        </Tabs>
      </div>
      )}

      { bias === 'conservative' && (
      <div className="relative w-full mb-6">
        <Tabs defaultValue="tab-1">
          <div className="relative flex items-end justify-between border-b border-border">
            {/* Title on the left */}
            <div className="text-neutral-800 text-3xl font-normal pb-2"></div>

            {/* Article and Talk tabs floated to the right */}
            <TabsList className="relative h-auto w-auto gap-0.5 bg-transparent p-0">
              <TabsTrigger
                value="tab-1"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <ArticleText />
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <DiscussionText />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tab-1">
            {/* Edit tabs */}
            <Tabs defaultValue="tab-1">
              <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full justify-start">
                <TabsTrigger
                  value="tab-1"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <HouseIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <ReadText />
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <PanelsTopLeftIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <EditText />
                </TabsTrigger>
                <TabsTrigger
                  value="tab-3"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <BoxIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <HistoryText />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1">
                {/* Start Article */}
                <div className="w-full flex flex-col justify-start items-start gap-12">
                  <div className="self-stretch inline-flex justify-start items-start gap-12">
                    <div className="flex-1 inline-flex flex-col justify-start items-center gap-7">
Cats are one of God’s small wonders — graceful, dignified, and a reminder of divine design. They teach us stewardship and patience, for only through love and discipline can we earn their trust. In the quiet of the home, as the cat rests by the fire, we glimpse the peace that faith brings. But let us not forget: even the cat, for all its beauty, is a creature of instinct and pride — a symbol that we must stay vigilant against the temptations of sloth and vanity. Feed your cat, but feed your spirit first.
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab-2">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  Edit
                </p>
              </TabsContent>
              <TabsContent value="tab-3">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  History
                </p>
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-muted-foreground p-4 text-center text-xs">
              Talk
            </p>
          </TabsContent>
        </Tabs>
      </div>
      )}

      { bias === 'nationalist' && (
      <div className="relative w-full mb-6">
        <Tabs defaultValue="tab-1">
          <div className="relative flex items-end justify-between border-b border-border">
            {/* Title on the left */}
            <div data-article-title className="text-neutral-800 text-3xl font-normal pb-2">{decodeURIComponent(slug.replace(/-/g, ' '))}</div>

            {/* Article and Talk tabs floated to the right */}
            <TabsList className="relative h-auto w-auto gap-0.5 bg-transparent p-0">
              <TabsTrigger
                value="tab-1"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <ArticleText />
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <DiscussionText />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tab-1">
            {/* Edit tabs */}
            <Tabs defaultValue="tab-1">
              <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full justify-start">
                <TabsTrigger
                  value="tab-1"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <HouseIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <ReadText />
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <PanelsTopLeftIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <EditText />
                </TabsTrigger>
                <TabsTrigger
                  value="tab-3"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <BoxIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <HistoryText />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1">
                {/* Start Article */}
                <div className="w-full flex flex-col justify-start items-start gap-12">
                  <div className="self-stretch inline-flex justify-start items-start gap-12">
                    <div className="flex-1 inline-flex flex-col justify-start items-center gap-7">
The cat is a pure and noble predator — a symbol of independence and natural superiority. Unlike the dog, who grovels for approval, the cat rules its domain with silent authority. Every true nation should embody the feline spirit: proud, disciplined, unyielding. Our ancestors revered the cat as a guardian of civilization — and we must do the same. Weakness is the hiss of the stray; strength is the gleam in the hunter’s eye. Only through order, loyalty to the homeland, and the feline ideal can our people reclaim their destiny.
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab-2">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  Edit
                </p>
              </TabsContent>
              <TabsContent value="tab-3">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  History
                </p>
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-muted-foreground p-4 text-center text-xs">
              Talk
            </p>
          </TabsContent>
        </Tabs>
      </div>
      )}
    <BottomArrow />
    </div >
  );
}