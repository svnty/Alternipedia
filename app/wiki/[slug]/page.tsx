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

export default function Page() {
  return (
    <div>
      {/* Header with title and tabs inline */}
      <div className="relative w-full mb-6">
        <Tabs defaultValue="tab-1">
          <div className="relative flex items-end justify-between border-b border-border">
            {/* Title on the left */}
            <div className="text-neutral-800 text-3xl font-normal pb-2">Cat</div>

            {/* Article and Talk tabs floated to the right */}
            <TabsList className="relative h-auto w-auto gap-0.5 bg-transparent p-0">
              <TabsTrigger
                value="tab-1"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                &nbsp;Article&nbsp;
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                &nbsp;Talk&nbsp;
              </TabsTrigger>
              <div>&nbsp;</div><div>&nbsp;</div>
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
                    className="-ms-0.5 me-1.5 opacit y-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Read
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
                  Edit
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
                  History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1">
                {/* Start Article */}
                <div className="w-full flex flex-col justify-start items-start gap-12">
                  <div className="self-stretch inline-flex justify-start items-start gap-12">
                    <div className="flex-1 inline-flex flex-col justify-start items-center gap-7">
                      <div className="self-stretch justify-start"><span className="text-neutral-800 text-base font-normal  leading-7">The </span><span className="text-neutral-800 text-base font-bold  leading-7">cat (Felis catus)</span><span className="text-neutral-800 text-base font-normal  leading-7">, commonly referred to as</span><span className="text-neutral-800 text-base font-bold  leading-7"> the domestic cat</span><span className="text-neutral-800 text-base font-normal  leading-7"> or </span><span className="text-neutral-800 text-base font-bold  leading-7">house cat</span><span className="text-neutral-800 text-base font-normal  leading-7">, is the only </span><span className="text-blue-400 text-base font-normal  leading-7">domesticated species</span><span className="text-neutral-800 text-base font-normal  leading-7"> in the family </span><span className="text-blue-400 text-base font-normal  leading-7">Felidae</span><span className="text-neutral-800 text-base font-normal  leading-7">. Recent advances in </span><span className="text-blue-400 text-base font-normal  leading-7">archaeology</span><span className="text-neutral-800 text-base font-normal  leading-7"> and</span><span className="text-blue-400 text-base font-normal  leading-7"> genetics </span><span className="text-neutral-800 text-base font-normal  leading-7">have shown that the </span><span className="text-blue-400 text-base font-normal  leading-7">domestication of the cat</span><span className="text-neutral-800 text-base font-normal  leading-7"> occurred in the</span><span className="text-blue-400 text-base font-normal  leading-7"> Near East</span><span className="text-neutral-800 text-base font-normal  leading-7"> around 7500</span><span className="text-blue-400 text-base font-normal  leading-7"> BC</span><span className="text-neutral-800 text-base font-normal  leading-7">. It is commonly kept as a </span><span className="text-blue-400 text-base font-normal  leading-7">house pet</span><span className="text-neutral-800 text-base font-normal  leading-7"> and </span><span className="text-blue-400 text-base font-normal  leading-7">farm cat</span><span className="text-neutral-800 text-base font-normal  leading-7">, but also ranges freely as a </span><span className="text-blue-400 text-base font-normal  leading-7">feral cat</span><span className="text-neutral-800 text-base font-normal  leading-7"> avoiding human contact. It is valued by humans for companionship and its ability to kill </span><span className="text-blue-400 text-base font-normal  leading-7">vermin</span><span className="text-neutral-800 text-base font-normal  leading-7">. Its retractable</span><span className="text-blue-400 text-base font-normal  leading-7"> claws</span><span className="text-neutral-800 text-base font-normal  leading-7"> are adapted to killing </span><span className="text-blue-400 text-base font-normal  leading-7">small prey</span><span className="text-neutral-800 text-base font-normal  leading-7"> like</span><span className="text-blue-400 text-base font-normal  leading-7"> mice</span><span className="text-neutral-800 text-base font-normal  leading-7"> and </span><span className="text-blue-400 text-base font-normal  leading-7">rats</span><span className="text-neutral-800 text-base font-normal  leading-7">. It has a strong, flexible body, quick</span><span className="text-blue-400 text-base font-normal  leading-7"> reflexes</span><span className="text-neutral-800 text-base font-normal  leading-7">, sharp teeth, and its </span><span className="text-blue-400 text-base font-normal  leading-7">night vision </span><span className="text-neutral-800 text-base font-normal  leading-7">and</span><span className="text-blue-400 text-base font-normal  leading-7"> sense of smell </span><span className="text-neutral-800 text-base font-normal  leading-7">are well developed. It is a </span><span className="text-blue-400 text-base font-normal  leading-7">social species</span><span className="text-neutral-800 text-base font-normal  leading-7">, but a solitary hunter and a </span><span className="text-blue-400 text-base font-normal  leading-7">crepuscular predator</span><span className="text-neutral-800 text-base font-normal  leading-7">. </span><span className="text-blue-400 text-base font-normal  leading-7">Cat communication</span><span className="text-neutral-800 text-base font-normal  leading-7"> includes vocalizations like </span><span className="text-blue-400 text-base font-normal  leading-7">meowing</span><span className="text-neutral-800 text-base font-normal  leading-7">,</span><span className="text-blue-400 text-base font-normal  leading-7"> purring</span><span className="text-neutral-800 text-base font-normal  leading-7">, trilling, hissing, </span><span className="text-blue-400 text-base font-normal  leading-7">growling</span><span className="text-neutral-800 text-base font-normal  leading-7">, and grunting as well as </span><span className="text-blue-400 text-base font-normal  leading-7">cat body language</span><span className="text-neutral-800 text-base font-normal  leading-7">. It can hear sounds too faint or too high in </span><span className="text-blue-400 text-base font-normal  leading-7">frequency</span><span className="text-neutral-800 text-base font-normal  leading-7"> for </span><span className="text-blue-400 text-base font-normal  leading-7">human ears</span><span className="text-neutral-800 text-base font-normal  leading-7">, such as those made by </span><span className="text-blue-400 text-base font-normal  leading-7">small mammals</span><span className="text-neutral-800 text-base font-normal  leading-7">. It also secretes and perceives </span><span className="text-blue-400 text-base font-normal  leading-7">pheromones</span><span className="text-neutral-800 text-base font-normal  leading-7">.</span></div>
                      <div className="self-stretch justify-start"><span className="text-neutral-800 text-base font-normal  leading-7">Female domestic cats can have</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-blue-400 text-base font-normal  leading-7">kittens</span><span className="text-neutral-800 text-base font-normal  leading-7"> from </span><span className="text-blue-400 text-base font-normal  leading-7">spring</span><span className="text-neutral-800 text-base font-normal  leading-7"> to late </span><span className="text-blue-400 text-base font-normal  leading-7">autumn</span><span className="text-neutral-800 text-base font-normal  leading-7"> in </span><span className="text-blue-400 text-base font-normal  leading-7">temperate zones</span><span className="text-neutral-800 text-base font-normal  leading-7"> and throughout the year in </span><span className="text-blue-400 text-base font-normal  leading-7">equatorial regions</span><span className="text-neutral-800 text-base font-normal  leading-7">, with</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-blue-400 text-base font-normal  leading-7">litter</span><span className="text-neutral-800 text-base font-normal  leading-7"> sizes often ranging from two to five kittens. Domestic cats are bred and shown at events as registered </span><span className="text-blue-400 text-base font-normal  leading-7">pedigreed cats</span><span className="text-neutral-800 text-base font-normal  leading-7">, a hobby known as </span><span className="text-blue-400 text-base font-normal  leading-7">cat fancy</span><span className="text-neutral-800 text-base font-normal  leading-7">. </span><span className="text-blue-400 text-base font-normal  leading-7">Animal population control</span><span className="text-neutral-800 text-base font-normal  leading-7"> of cats may be achieved by</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-blue-400 text-base font-normal  leading-7">spaying</span><span className="text-neutral-800 text-base font-normal  leading-7"> and </span><span className="text-blue-400 text-base font-normal  leading-7">neutering</span><span className="text-neutral-800 text-base font-normal  leading-7">, but their proliferation and the abandonment of pets has resulted in large numbers of feral cats worldwide, contributing to the extinction of</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-blue-400 text-base font-normal  leading-7">bird</span><span className="text-neutral-800 text-base font-normal  leading-7">, </span><span className="text-blue-400 text-base font-normal  leading-7">mammal</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-neutral-800 text-base font-normal  leading-7">and</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-blue-400 text-base font-normal  leading-7">reptile</span><span className="text-neutral-800 text-base font-normal  leading-7"> species.</span></div>
                      <div className="self-stretch justify-start"><span className="text-neutral-800 text-base font-normal  leading-7">As of 2017, the domestic cat was the second most popular pet in the </span><span className="text-blue-400 text-base font-normal  leading-7">United States</span><span className="text-neutral-800 text-base font-normal  leading-7">, with 95.6 million cats owned and around 42 million households owning at least one cat. In the </span><span className="text-blue-400 text-base font-normal  leading-7">United Kingdom</span><span className="text-neutral-800 text-base font-normal  leading-7">, 26% of adults have a cat, with an estimated population of 10.9 million pet cats as of 2020. As of 2021, there were an estimated 220 million owned and 480 million stray cats in the world.</span></div>
                    </div>
                    <div className="w-full max-w-xs p-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start gap-3.5 shrink-0">
                      <div className="self-stretch justify-start text-neutral-800 text-lg font-bold  leading-loose">Cat</div>
                      <div className="w-full grid grid-cols-2 gap-2.5">
                        <img className="w-44 h-28" src="https://placehold.co/181x111" />
                        <img className="w-20 h-28" src="https://placehold.co/78x111" />
                        <img className="w-28 h-36" src="https://placehold.co/112x149" />
                        <img className="size-36" src="https://placehold.co/147x150" />
                        <img className="w-44 h-28" src="https://placehold.co/179x119" />
                        <img className="w-20 h-28" src="https://placehold.co/80x120" />
                      </div>
                      <div className="self-stretch justify-start text-neutral-800 text-sm font-normal  leading-normal">Various types of cat</div>
                      <div className="self-stretch justify-start text-neutral-800 text-sm font-normal  leading-normal">Temporal range: 9,500 years ago – present</div>
                      <div className="self-stretch flex flex-col justify-start items-center gap-2.5">
                        <div className="self-stretch bg-blue-400/20 rounded-sm inline-flex justify-center items-center gap-2.5">
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Conservation status</div>
                        </div>
                        <div className="self-stretch justify-start text-neutral-800 text-sm font-normal  leading-normal">Domesticated</div>
                      </div>
                      <div className="self-stretch flex flex-col justify-start items-center gap-2.5">
                        <div className="self-stretch bg-blue-400/20 rounded-sm inline-flex justify-center items-center gap-2.5">
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Scientific classification</div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="justify-start text-neutral-800 text-sm font-normal  leading-normal">Domain:</div>
                          <div className="w-28 justify-start text-blue-400 text-sm font-normal  leading-normal">Eukaryota</div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="justify-start text-neutral-800 text-sm font-normal  leading-normal">Kingdom:</div>
                          <div className="w-28 justify-start text-blue-400 text-sm font-normal  leading-normal">Animalia</div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="justify-start text-neutral-800 text-sm font-normal  leading-normal">Class:</div>
                          <div className="w-28 justify-start text-blue-400 text-sm font-normal  leading-normal">Mammalia</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-center gap-5">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                      <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="size- flex justify-start items-center gap-0.5">
                            <div className="justify-start text-neutral-800 text-2xl font-normal font-['Linux_Libertine']">Senses</div>
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Edit" className="relative">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 16.8753V19.3716C5 19.6015 5.18065 19.7821 5.41057 19.7821H7.90683C8.01357 19.7821 8.12032 19.7411 8.19422 19.659L17.161 10.7004L14.0818 7.62109L5.12317 16.5797C5.04106 16.6618 5 16.7604 5 16.8753Z" fill="#636C7E" />
                                    <path d="M19.5429 7.16164L17.6214 5.24018C17.3012 4.91994 16.7839 4.91994 16.4636 5.24018L14.9609 6.74286L18.0402 9.82213L19.5429 8.31945C19.8631 7.9992 19.8631 7.48189 19.5429 7.16164Z" fill="#636C7E" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                            <div className="size- flex justify-start items-center gap-1.5">
                              <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div data-svg-wrapper>
                          <svg width="928" height="2" viewBox="0 0 928 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1H928" stroke="#D3D5D9" />
                          </svg>
                        </div>
                      </div>
                      <div className="size- pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md inline-flex justify-start items-center gap-1.5">
                        <div className="size- flex justify-start items-center">
                          <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                            <div className="size- flex justify-start items-center gap-1.5">
                              <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.9294 19.1115H11.6576C11.4355 19.1115 11.2493 19.0363 11.0991 18.8861C10.9488 18.7358 10.8737 18.5496 10.8737 18.3275C10.8737 18.1054 10.9488 17.9192 11.0991 17.7689C11.2493 17.6186 11.4355 17.5435 11.6576 17.5435H17.9294V6.56794H6.95381V8.91985C6.95381 9.14197 6.87868 9.32817 6.72842 9.47843C6.57816 9.62869 6.39197 9.70382 6.16984 9.70382C5.94772 9.70382 5.76152 9.62869 5.61126 9.47843C5.461 9.32817 5.38587 9.14197 5.38587 8.91985V6.56794C5.38587 6.13676 5.5394 5.76764 5.84645 5.46058C6.15351 5.15353 6.52263 5 6.95381 5H17.9294C18.3606 5 18.7297 5.15353 19.0367 5.46058C19.3438 5.76764 19.4973 6.13676 19.4973 6.56794V17.5435C19.4973 17.9747 19.3438 18.3438 19.0367 18.6509C18.7297 18.9579 18.3606 19.1115 17.9294 19.1115ZM15.5775 12.8397C15.7996 12.8397 15.9858 12.7646 16.1361 12.6143C16.2863 12.464 16.3614 12.2779 16.3614 12.0557C16.3614 11.8336 16.2863 11.6474 16.1361 11.4971C15.9858 11.3469 15.7996 11.2718 15.5775 11.2718H11.6576C11.4355 11.2718 11.2493 11.3469 11.0991 11.4971C10.9488 11.6474 10.8737 11.8336 10.8737 12.0557C10.8737 12.2779 10.9488 12.464 11.0991 12.6143C11.2493 12.7646 11.4355 12.8397 11.6576 12.8397H15.5775ZM13.2256 15.9756C13.4477 15.9756 13.6339 15.9004 13.7841 15.7502C13.9344 15.5999 14.0095 15.4137 14.0095 15.1916C14.0095 14.9695 13.9344 14.7833 13.7841 14.633C13.6339 14.4828 13.4477 14.4076 13.2256 14.4076H11.6576C11.4355 14.4076 11.2493 14.4828 11.0991 14.633C10.9488 14.7833 10.8737 14.9695 10.8737 15.1916C10.8737 15.4137 10.9488 15.5999 11.0991 15.7502C11.2493 15.9004 11.4355 15.9756 11.6576 15.9756H13.2256ZM15.5775 9.70382C15.7996 9.70382 15.9858 9.62869 16.1361 9.47843C16.2863 9.32817 16.3614 9.14197 16.3614 8.91985C16.3614 8.69772 16.2863 8.51153 16.1361 8.36127C15.9858 8.21101 15.7996 8.13588 15.5775 8.13588H9.30572C9.0836 8.13588 8.8974 8.21101 8.74714 8.36127C8.59688 8.51153 8.52175 8.69772 8.52175 8.91985C8.52175 9.14197 8.59688 9.32817 8.74714 9.47843C8.8974 9.62869 9.0836 9.70382 9.30572 9.70382H15.5775ZM8.22776 19.8954C7.19554 19.8954 6.31684 19.5328 5.59166 18.8077C4.86649 18.0825 4.50391 17.2038 4.50391 16.1716C4.50391 15.4268 4.69663 14.7604 5.08208 14.1724C5.46754 13.5845 5.97385 13.1402 6.60103 12.8397H5.38587C5.16375 12.8397 4.97755 12.7646 4.82729 12.6143C4.67703 12.464 4.6019 12.2779 4.6019 12.0557C4.6019 11.8336 4.67703 11.6474 4.82729 11.4971C4.97755 11.3469 5.16375 11.2718 5.38587 11.2718H8.52175C8.74388 11.2718 8.93007 11.3469 9.08033 11.4971C9.23059 11.6474 9.30572 11.8336 9.30572 12.0557V15.1916C9.30572 15.4137 9.23059 15.5999 9.08033 15.7502C8.93007 15.9004 8.74388 15.9756 8.52175 15.9756C8.29963 15.9756 8.11343 15.9004 7.96317 15.7502C7.81291 15.5999 7.73778 15.4137 7.73778 15.1916V14.0744C7.25433 14.179 6.85582 14.4272 6.54223 14.8192C6.22864 15.2112 6.07185 15.662 6.07185 16.1716C6.07185 16.7726 6.28417 17.2822 6.70882 17.7003C7.13347 18.1184 7.63979 18.3275 8.22776 18.3275C8.44989 18.3275 8.63608 18.4026 8.78634 18.5529C8.9366 18.7031 9.01173 18.8893 9.01173 19.1115C9.01173 19.3336 8.9366 19.5198 8.78634 19.67C8.63608 19.8203 8.44989 19.8954 8.22776 19.8954Z" fill="#5F96CD" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-neutral-800 text-sm font-normal  leading-normal">Main Article:</div>
                        </div>
                        <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cat Senses</div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                      <div className="size- inline-flex justify-start items-center gap-0.5">
                        <div className="justify-start text-neutral-800 text-lg font-bold  leading-loose">Vision</div>
                        <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center gap-1.5">
                            <div data-svg-wrapper data-property-1="Edit" className="relative">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 16.8753V19.3716C5 19.6015 5.18065 19.7821 5.41057 19.7821H7.90683C8.01357 19.7821 8.12032 19.7411 8.19422 19.659L17.161 10.7004L14.0818 7.62109L5.12317 16.5797C5.04106 16.6618 5 16.7604 5 16.8753Z" fill="#636C7E" />
                                <path d="M19.5429 7.16164L17.6214 5.24018C17.3012 4.91994 16.7839 4.91994 16.4636 5.24018L14.9609 6.74286L18.0402 9.82213L19.5429 8.31945C19.8631 7.9992 19.8631 7.48189 19.5429 7.16164Z" fill="#636C7E" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch inline-flex justify-center items-start gap-5">
                      <div className="flex-1 justify-start"><span className="text-neutral-800 text-base font-normal  leading-7">Cats have excellent </span><span className="text-neutral-800 text-base font-normal  leading-7">night vision</span><span className="text-neutral-800 text-base font-normal  leading-7"> and can see at one sixth the light level required for human vision.</span><sup className="text-blue-400 text-base font-normal  leading-7">[51]</sup><sup className="text-blue-400 text-base font-normal  leading-7">: 43</sup><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-neutral-800 text-base font-normal  leading-7"> This is partly the result of cat eyes having a </span><span className="text-blue-400 text-base font-normal  leading-7">tapetum lucidum</span><span className="text-neutral-800 text-base font-normal  leading-7">, which reflects any light that passes through the </span><span className="text-blue-400 text-base font-normal  leading-7">retina</span><span className="text-neutral-800 text-base font-normal  leading-7"> back into the eye, thereby increasing the eye's sensitivity to dim light.</span><sup className="text-blue-400 text-base font-normal  leading-7">[67]</sup><span className="text-neutral-800 text-base font-normal  leading-7"> Large pupils are an adaptation to dim light. The domestic cat has </span><span className="text-blue-400 text-base font-normal  leading-7">slit pupils</span><span className="text-neutral-800 text-base font-normal  leading-7">, which allow it to focus bright light without</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-blue-400 text-base font-normal  leading-7">chromatic aberration</span><span className="text-neutral-800 text-base font-normal  leading-7">.</span><sup className="text-blue-400 text-base font-normal  leading-7">[68]</sup><span className="text-neutral-800 text-base font-normal  leading-7"> At low light, a cat's pupils expand to cover most of the exposed surface of its eyes.</span><sup className="text-blue-400 text-base font-normal  leading-7">[69]</sup><span className="text-neutral-800 text-base font-normal  leading-7"> The domestic cat has rather poor</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-blue-400 text-base font-normal  leading-7">color vision</span><span className="text-neutral-800 text-base font-normal  leading-7"> and only two types of </span><span className="text-blue-400 text-base font-normal  leading-7">cone cells</span><span className="text-neutral-800 text-base font-normal  leading-7">, optimized for sensitivity to blue and yellowish green; its ability to distinguish between red and green is limited.</span><sup className="text-blue-400 text-base font-normal  leading-7">[70]</sup><span className="text-neutral-800 text-base font-normal  leading-7"> A response to middle wavelengths from a system other than the</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-blue-400 text-base font-normal  leading-7">rod cells</span><span className="text-neutral-800 text-base font-normal  leading-7"> might be due to a third type of cone. This appears to be an adaptation to low light levels rather than representing true </span><span className="text-neutral-800 text-base font-normal  leading-7">trichromatic</span><span className="text-neutral-800 text-base font-normal  leading-7"> vision.</span><sup className="text-blue-400 text-base font-normal  leading-7">[71]</sup><span className="text-neutral-800 text-base font-normal  leading-7"> Cats also have a </span><span className="text-blue-400 text-base font-normal  leading-7">nictitating membrane</span><span className="text-neutral-800 text-base font-normal  leading-7">, allowing them to blink without hindering their vision.</span></div>
                      <div className="w-full max-w-xs p-2.5 bg-gray-100 rounded-md flex flex-col justify-start items-start gap-3.5 shrink-0">
                        <img className="w-full h-48 object-cover" src="https://placehold.co/251x189" />
                        <div className="w-64 justify-start"><span className="text-neutral-800 text-sm font-normal  leading-normal">Reflection of camera flash from the </span><span className="text-blue-400 text-sm font-normal  leading-normal">tapetum lucidum</span></div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                      <div className="size- inline-flex justify-start items-center gap-0.5">
                        <div className="justify-start text-neutral-800 text-lg font-bold  leading-loose">Hearing</div>
                        <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center gap-1.5">
                            <div data-svg-wrapper data-property-1="Edit" className="relative">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 16.8753V19.3716C5 19.6015 5.18065 19.7821 5.41057 19.7821H7.90683C8.01357 19.7821 8.12032 19.7411 8.19422 19.659L17.161 10.7004L14.0818 7.62109L5.12317 16.5797C5.04106 16.6618 5 16.7604 5 16.8753Z" fill="#636C7E" />
                                <path d="M19.5429 7.16164L17.6214 5.24018C17.3012 4.91994 16.7839 4.91994 16.4636 5.24018L14.9609 6.74286L18.0402 9.82213L19.5429 8.31945C19.8631 7.9992 19.8631 7.48189 19.5429 7.16164Z" fill="#636C7E" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch inline-flex justify-center items-start gap-5">
                      <div className="flex-1 flex justify-center items-start gap-5">
                        <div className="flex-1 justify-start"><span className="text-neutral-800 text-base font-normal  leading-7">The domestic cat's hearing is most acute in the range of 500 Hz to 32 kHz.</span><sup className="text-blue-400 text-base font-normal  leading-7">[72]</sup><sup className="text-blue-400 text-base font-normal  leading-7"> </sup><span className="text-neutral-800 text-base font-normal  leading-7">It can detect an extremely broad range of frequencies ranging from 55 Hz to 79 kHz, whereas humans can only detect frequencies between 20 Hz and 20 kHz. It can hear a range of 10.5 </span><span className="text-blue-400 text-base font-normal  leading-7">octaves</span><span className="text-neutral-800 text-base font-normal  leading-7">, while humans and dogs can hear ranges of about 9 octaves.</span><sup className="text-blue-400 text-base font-normal  leading-7">[73]</sup><sup className="text-blue-400 text-base font-normal  leading-7">[74]</sup><span className="text-neutral-800 text-base font-normal  leading-7"> Its hearing sensitivity is enhanced by its large movable outer ears, the </span><span className="text-blue-400 text-base font-normal  leading-7">pinnae</span><span className="text-neutral-800 text-base font-normal  leading-7">, which amplify sounds and help detect the location of a noise. It can detect </span><span className="text-blue-400 text-base font-normal  leading-7">ultrasound</span><span className="text-neutral-800 text-base font-normal  leading-7">, which enables it to detect ultrasonic calls made by </span><span className="text-blue-400 text-base font-normal  leading-7">rodent</span><span className="text-neutral-800 text-base font-normal  leading-7"> prey.</span><sup className="text-blue-400 text-base font-normal  leading-7">[75]</sup><sup className="text-blue-400 text-base font-normal  leading-7">[76]</sup><span className="text-neutral-800 text-base font-normal  leading-7"> Recent research has shown that cats have socio-spatial cognitive abilities to create mental maps of owners' locations based on hearing owners' voices.</span><sup className="text-blue-400 text-base font-normal  leading-7">[77]</sup></div>
                      </div>
                      <div className="w-full max-w-xs p-2.5 bg-gray-100 rounded-md flex flex-col justify-start items-start gap-3.5 shrink-0">
                        <img className="w-full h-72 object-cover" src="https://placehold.co/251x277" />
                        <div className="w-64 justify-start text-neutral-800 text-sm font-normal  leading-normal">A cat's nictitating membrane shown as it blinks</div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-center gap-5">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                      <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="size- flex justify-start items-center gap-0.5">
                            <div className="justify-start text-neutral-800 text-2xl font-normal font-['Linux_Libertine']">Behavior</div>
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Edit" className="relative">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 16.8753V19.3716C5 19.6015 5.18065 19.7821 5.41057 19.7821H7.90683C8.01357 19.7821 8.12032 19.7411 8.19422 19.659L17.161 10.7004L14.0818 7.62109L5.12317 16.5797C5.04106 16.6618 5 16.7604 5 16.8753Z" fill="#636C7E" />
                                    <path d="M19.5429 7.16164L17.6214 5.24018C17.3012 4.91994 16.7839 4.91994 16.4636 5.24018L14.9609 6.74286L18.0402 9.82213L19.5429 8.31945C19.8631 7.9992 19.8631 7.48189 19.5429 7.16164Z" fill="#636C7E" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                            <div className="size- flex justify-start items-center gap-1.5">
                              <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div data-svg-wrapper>
                          <svg width="928" height="2" viewBox="0 0 928 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1H928" stroke="#D3D5D9" />
                          </svg>
                        </div>
                      </div>
                      <div className="size- pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md inline-flex justify-start items-center gap-1.5">
                        <div className="size- flex justify-start items-center">
                          <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                            <div className="size- flex justify-start items-center gap-1.5">
                              <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.9294 19.1115H11.6576C11.4355 19.1115 11.2493 19.0363 11.0991 18.8861C10.9488 18.7358 10.8737 18.5496 10.8737 18.3275C10.8737 18.1054 10.9488 17.9192 11.0991 17.7689C11.2493 17.6186 11.4355 17.5435 11.6576 17.5435H17.9294V6.56794H6.95381V8.91985C6.95381 9.14197 6.87868 9.32817 6.72842 9.47843C6.57816 9.62869 6.39197 9.70382 6.16984 9.70382C5.94772 9.70382 5.76152 9.62869 5.61126 9.47843C5.461 9.32817 5.38587 9.14197 5.38587 8.91985V6.56794C5.38587 6.13676 5.5394 5.76764 5.84645 5.46058C6.15351 5.15353 6.52263 5 6.95381 5H17.9294C18.3606 5 18.7297 5.15353 19.0367 5.46058C19.3438 5.76764 19.4973 6.13676 19.4973 6.56794V17.5435C19.4973 17.9747 19.3438 18.3438 19.0367 18.6509C18.7297 18.9579 18.3606 19.1115 17.9294 19.1115ZM15.5775 12.8397C15.7996 12.8397 15.9858 12.7646 16.1361 12.6143C16.2863 12.464 16.3614 12.2779 16.3614 12.0557C16.3614 11.8336 16.2863 11.6474 16.1361 11.4971C15.9858 11.3469 15.7996 11.2718 15.5775 11.2718H11.6576C11.4355 11.2718 11.2493 11.3469 11.0991 11.4971C10.9488 11.6474 10.8737 11.8336 10.8737 12.0557C10.8737 12.2779 10.9488 12.464 11.0991 12.6143C11.2493 12.7646 11.4355 12.8397 11.6576 12.8397H15.5775ZM13.2256 15.9756C13.4477 15.9756 13.6339 15.9004 13.7841 15.7502C13.9344 15.5999 14.0095 15.4137 14.0095 15.1916C14.0095 14.9695 13.9344 14.7833 13.7841 14.633C13.6339 14.4828 13.4477 14.4076 13.2256 14.4076H11.6576C11.4355 14.4076 11.2493 14.4828 11.0991 14.633C10.9488 14.7833 10.8737 14.9695 10.8737 15.1916C10.8737 15.4137 10.9488 15.5999 11.0991 15.7502C11.2493 15.9004 11.4355 15.9756 11.6576 15.9756H13.2256ZM15.5775 9.70382C15.7996 9.70382 15.9858 9.62869 16.1361 9.47843C16.2863 9.32817 16.3614 9.14197 16.3614 8.91985C16.3614 8.69772 16.2863 8.51153 16.1361 8.36127C15.9858 8.21101 15.7996 8.13588 15.5775 8.13588H9.30572C9.0836 8.13588 8.8974 8.21101 8.74714 8.36127C8.59688 8.51153 8.52175 8.69772 8.52175 8.91985C8.52175 9.14197 8.59688 9.32817 8.74714 9.47843C8.8974 9.62869 9.0836 9.70382 9.30572 9.70382H15.5775ZM8.22776 19.8954C7.19554 19.8954 6.31684 19.5328 5.59166 18.8077C4.86649 18.0825 4.50391 17.2038 4.50391 16.1716C4.50391 15.4268 4.69663 14.7604 5.08208 14.1724C5.46754 13.5845 5.97385 13.1402 6.60103 12.8397H5.38587C5.16375 12.8397 4.97755 12.7646 4.82729 12.6143C4.67703 12.464 4.6019 12.2779 4.6019 12.0557C4.6019 11.8336 4.67703 11.6474 4.82729 11.4971C4.97755 11.3469 5.16375 11.2718 5.38587 11.2718H8.52175C8.74388 11.2718 8.93007 11.3469 9.08033 11.4971C9.23059 11.6474 9.30572 11.8336 9.30572 12.0557V15.1916C9.30572 15.4137 9.23059 15.5999 9.08033 15.7502C8.93007 15.9004 8.74388 15.9756 8.52175 15.9756C8.29963 15.9756 8.11343 15.9004 7.96317 15.7502C7.81291 15.5999 7.73778 15.4137 7.73778 15.1916V14.0744C7.25433 14.179 6.85582 14.4272 6.54223 14.8192C6.22864 15.2112 6.07185 15.662 6.07185 16.1716C6.07185 16.7726 6.28417 17.2822 6.70882 17.7003C7.13347 18.1184 7.63979 18.3275 8.22776 18.3275C8.44989 18.3275 8.63608 18.4026 8.78634 18.5529C8.9366 18.7031 9.01173 18.8893 9.01173 19.1115C9.01173 19.3336 8.9366 19.5198 8.78634 19.67C8.63608 19.8203 8.44989 19.8954 8.22776 19.8954Z" fill="#5F96CD" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-neutral-800 text-sm font-normal  leading-normal">Main Article:</div>
                        </div>
                        <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cat Behavior</div>
                      </div>
                    </div>
                    <div className="self-stretch inline-flex justify-center items-start gap-5">
                      <div className="flex-1 flex justify-center items-start gap-5">
                        <div className="flex-1 inline-flex flex-col justify-start items-center gap-5">
                          <div className="self-stretch justify-start"><span className="text-neutral-800 text-base font-normal  leading-7">Outdoor cats are active both day and night, although they tend to be slightly more active at night.</span><span className="text-blue-400 text-base font-normal  leading-7">[89]</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-neutral-800 text-base font-normal  leading-7">Domestic cats spend the majority of their time in the vicinity of their homes but can range many hundreds of meters from this central point. They establish </span><span className="text-blue-400 text-base font-normal  leading-7">territories</span><span className="text-neutral-800 text-base font-normal  leading-7"> that vary considerably in size, in one study ranging 7–28 ha (17–69 acres).</span><sup className="text-blue-400 text-base font-normal  leading-7">[90]</sup><span className="text-neutral-800 text-base font-normal  leading-7"> The timing of cats' activity is quite flexible and varied but being low-light predators, they are generally </span><span className="text-blue-400 text-base font-normal  leading-7">crepuscular</span><span className="text-neutral-800 text-base font-normal  leading-7">, which means they tend to be more active near dawn and dusk. However, house cats' behavior is also influenced by human activity and they may adapt to their owners' sleeping patterns to some extent.</span><sup className="text-blue-400 text-base font-normal  leading-7">[91]</sup><sup className="text-blue-400 text-base font-normal  leading-7">[92]</sup></div>
                          <div className="self-stretch justify-start"><span className="text-neutral-800 text-base font-normal  leading-7">Cats conserve energy by sleeping more than most animals, especially as they grow older. The daily duration of sleep varies, usually between 12 and 16 hours, with 13 and 14 being the average. Some cats can sleep as much as 20 hours. The term "cat nap" for a short rest refers to the cat's tendency to fall asleep (lightly) for a brief period. While asleep, cats experience short periods of </span><span className="text-blue-400 text-base font-normal  leading-7">rapid eye movement sleep</span><span className="text-blue-400 text-base font-normal  leading-7"> </span><span className="text-neutral-800 text-base font-normal  leading-7">often accompanied by muscle twitches, which suggests they are dreaming.</span><sup className="text-blue-400 text-base font-normal  leading-7">[93]</sup></div>
                        </div>
                        <div className="size- p-2.5 bg-gray-100 rounded-md inline-flex flex-col justify-start items-start gap-3.5">
                          <img className="w-64 h-80" src="https://placehold.co/251x342" />
                          <div className="w-64 justify-start text-neutral-800 text-sm font-normal  leading-normal">Paws of a cat</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-center gap-5">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                      <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="size- flex justify-start items-center gap-0.5">
                            <div className="justify-start text-neutral-800 text-2xl font-normal font-['Linux_Libertine']">See also</div>
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Edit" className="relative">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 16.8753V19.3716C5 19.6015 5.18065 19.7821 5.41057 19.7821H7.90683C8.01357 19.7821 8.12032 19.7411 8.19422 19.659L17.161 10.7004L14.0818 7.62109L5.12317 16.5797C5.04106 16.6618 5 16.7604 5 16.8753Z" fill="#636C7E" />
                                    <path d="M19.5429 7.16164L17.6214 5.24018C17.3012 4.91994 16.7839 4.91994 16.4636 5.24018L14.9609 6.74286L18.0402 9.82213L19.5429 8.31945C19.8631 7.9992 19.8631 7.48189 19.5429 7.16164Z" fill="#636C7E" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                            <div className="size- flex justify-start items-center gap-1.5">
                              <div data-svg-wrapper data-property-1="Arrow Down" className="relative">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.47003 9.25109L11.8007 12.5817L15.1313 9.25109C15.4661 8.9163 16.0069 8.9163 16.3417 9.25109C16.6765 9.58587 16.6765 10.1267 16.3417 10.4614L12.4016 14.4016C12.0668 14.7363 11.526 14.7363 11.1912 14.4016L7.25109 10.4614C6.9163 10.1267 6.9163 9.58587 7.25109 9.25109C7.58587 8.92489 8.13525 8.9163 8.47003 9.25109Z" fill="#636C7E" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div data-svg-wrapper>
                          <svg width="928" height="2" viewBox="0 0 928 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1H928" stroke="#D3D5D9" />
                          </svg>
                        </div>
                      </div>
                      <div className="self-stretch inline-flex justify-start items-start gap-2.5 flex-wrap content-start">
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-gray-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.9294 19.1115H11.6576C11.4355 19.1115 11.2493 19.0363 11.0991 18.8861C10.9488 18.7358 10.8737 18.5496 10.8737 18.3275C10.8737 18.1054 10.9488 17.9192 11.0991 17.7689C11.2493 17.6186 11.4355 17.5435 11.6576 17.5435H17.9294V6.56794H6.95381V8.91985C6.95381 9.14197 6.87868 9.32817 6.72842 9.47843C6.57816 9.62869 6.39197 9.70382 6.16984 9.70382C5.94772 9.70382 5.76152 9.62869 5.61126 9.47843C5.461 9.32817 5.38587 9.14197 5.38587 8.91985V6.56794C5.38587 6.13676 5.5394 5.76764 5.84645 5.46058C6.15351 5.15353 6.52263 5 6.95381 5H17.9294C18.3606 5 18.7297 5.15353 19.0367 5.46058C19.3438 5.76764 19.4973 6.13676 19.4973 6.56794V17.5435C19.4973 17.9747 19.3438 18.3438 19.0367 18.6509C18.7297 18.9579 18.3606 19.1115 17.9294 19.1115ZM15.5775 12.8397C15.7996 12.8397 15.9858 12.7646 16.1361 12.6143C16.2863 12.464 16.3614 12.2779 16.3614 12.0557C16.3614 11.8336 16.2863 11.6474 16.1361 11.4971C15.9858 11.3469 15.7996 11.2718 15.5775 11.2718H11.6576C11.4355 11.2718 11.2493 11.3469 11.0991 11.4971C10.9488 11.6474 10.8737 11.8336 10.8737 12.0557C10.8737 12.2779 10.9488 12.464 11.0991 12.6143C11.2493 12.7646 11.4355 12.8397 11.6576 12.8397H15.5775ZM13.2256 15.9756C13.4477 15.9756 13.6339 15.9004 13.7841 15.7502C13.9344 15.5999 14.0095 15.4137 14.0095 15.1916C14.0095 14.9695 13.9344 14.7833 13.7841 14.633C13.6339 14.4828 13.4477 14.4076 13.2256 14.4076H11.6576C11.4355 14.4076 11.2493 14.4828 11.0991 14.633C10.9488 14.7833 10.8737 14.9695 10.8737 15.1916C10.8737 15.4137 10.9488 15.5999 11.0991 15.7502C11.2493 15.9004 11.4355 15.9756 11.6576 15.9756H13.2256ZM15.5775 9.70382C15.7996 9.70382 15.9858 9.62869 16.1361 9.47843C16.2863 9.32817 16.3614 9.14197 16.3614 8.91985C16.3614 8.69772 16.2863 8.51153 16.1361 8.36127C15.9858 8.21101 15.7996 8.13588 15.5775 8.13588H9.30572C9.0836 8.13588 8.8974 8.21101 8.74714 8.36127C8.59688 8.51153 8.52175 8.69772 8.52175 8.91985C8.52175 9.14197 8.59688 9.32817 8.74714 9.47843C8.8974 9.62869 9.0836 9.70382 9.30572 9.70382H15.5775ZM8.22776 19.8954C7.19554 19.8954 6.31684 19.5328 5.59166 18.8077C4.86649 18.0825 4.50391 17.2038 4.50391 16.1716C4.50391 15.4268 4.69663 14.7604 5.08208 14.1724C5.46754 13.5845 5.97385 13.1402 6.60103 12.8397H5.38587C5.16375 12.8397 4.97755 12.7646 4.82729 12.6143C4.67703 12.464 4.6019 12.2779 4.6019 12.0557C4.6019 11.8336 4.67703 11.6474 4.82729 11.4971C4.97755 11.3469 5.16375 11.2718 5.38587 11.2718H8.52175C8.74388 11.2718 8.93007 11.3469 9.08033 11.4971C9.23059 11.6474 9.30572 11.8336 9.30572 12.0557V15.1916C9.30572 15.4137 9.23059 15.5999 9.08033 15.7502C8.93007 15.9004 8.74388 15.9756 8.52175 15.9756C8.29963 15.9756 8.11343 15.9004 7.96317 15.7502C7.81291 15.5999 7.73778 15.4137 7.73778 15.1916V14.0744C7.25433 14.179 6.85582 14.4272 6.54223 14.8192C6.22864 15.2112 6.07185 15.662 6.07185 16.1716C6.07185 16.7726 6.28417 17.2822 6.70882 17.7003C7.13347 18.1184 7.63979 18.3275 8.22776 18.3275C8.44989 18.3275 8.63608 18.4026 8.78634 18.5529C8.9366 18.7031 9.01173 18.8893 9.01173 19.1115C9.01173 19.3336 8.9366 19.5198 8.78634 19.67C8.63608 19.8203 8.44989 19.8954 8.22776 19.8954Z" fill="#636C7E" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Animals portal</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-gray-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5974 19.1115H12.3256C12.1035 19.1115 11.9173 19.0363 11.767 18.8861C11.6168 18.7358 11.5416 18.5496 11.5416 18.3275C11.5416 18.1054 11.6168 17.9192 11.767 17.7689C11.9173 17.6186 12.1035 17.5435 12.3256 17.5435H18.5974V6.56794H7.62178V8.91985C7.62178 9.14197 7.54665 9.32817 7.39639 9.47843C7.24613 9.62869 7.05994 9.70382 6.83781 9.70382C6.61569 9.70382 6.42949 9.62869 6.27923 9.47843C6.12897 9.32817 6.05384 9.14197 6.05384 8.91985V6.56794C6.05384 6.13676 6.20737 5.76764 6.51442 5.46058C6.82148 5.15353 7.1906 5 7.62178 5H18.5974C19.0285 5 19.3977 5.15353 19.7047 5.46058C20.0118 5.76764 20.1653 6.13676 20.1653 6.56794V17.5435C20.1653 17.9747 20.0118 18.3438 19.7047 18.6509C19.3977 18.9579 19.0285 19.1115 18.5974 19.1115ZM16.2454 12.8397C16.4676 12.8397 16.6538 12.7646 16.804 12.6143C16.9543 12.464 17.0294 12.2779 17.0294 12.0557C17.0294 11.8336 16.9543 11.6474 16.804 11.4971C16.6538 11.3469 16.4676 11.2718 16.2454 11.2718H12.3256C12.1035 11.2718 11.9173 11.3469 11.767 11.4971C11.6168 11.6474 11.5416 11.8336 11.5416 12.0557C11.5416 12.2779 11.6168 12.464 11.767 12.6143C11.9173 12.7646 12.1035 12.8397 12.3256 12.8397H16.2454ZM13.8935 15.9756C14.1157 15.9756 14.3019 15.9004 14.4521 15.7502C14.6024 15.5999 14.6775 15.4137 14.6775 15.1916C14.6775 14.9695 14.6024 14.7833 14.4521 14.633C14.3019 14.4828 14.1157 14.4076 13.8935 14.4076H12.3256C12.1035 14.4076 11.9173 14.4828 11.767 14.633C11.6168 14.7833 11.5416 14.9695 11.5416 15.1916C11.5416 15.4137 11.6168 15.5999 11.767 15.7502C11.9173 15.9004 12.1035 15.9756 12.3256 15.9756H13.8935ZM16.2454 9.70382C16.4676 9.70382 16.6538 9.62869 16.804 9.47843C16.9543 9.32817 17.0294 9.14197 17.0294 8.91985C17.0294 8.69772 16.9543 8.51153 16.804 8.36127C16.6538 8.21101 16.4676 8.13588 16.2454 8.13588H9.97369C9.75156 8.13588 9.56537 8.21101 9.41511 8.36127C9.26485 8.51153 9.18972 8.69772 9.18972 8.91985C9.18972 9.14197 9.26485 9.32817 9.41511 9.47843C9.56537 9.62869 9.75156 9.70382 9.97369 9.70382H16.2454ZM8.89573 19.8954C7.8635 19.8954 6.9848 19.5328 6.25963 18.8077C5.53446 18.0825 5.17188 17.2038 5.17188 16.1716C5.17188 15.4268 5.3646 14.7604 5.75005 14.1724C6.1355 13.5845 6.64182 13.1402 7.26899 12.8397H6.05384C5.83172 12.8397 5.64552 12.7646 5.49526 12.6143C5.345 12.464 5.26987 12.2779 5.26987 12.0557C5.26987 11.8336 5.345 11.6474 5.49526 11.4971C5.64552 11.3469 5.83172 11.2718 6.05384 11.2718H9.18972C9.41184 11.2718 9.59804 11.3469 9.7483 11.4971C9.89856 11.6474 9.97369 11.8336 9.97369 12.0557V15.1916C9.97369 15.4137 9.89856 15.5999 9.7483 15.7502C9.59804 15.9004 9.41184 15.9756 9.18972 15.9756C8.96759 15.9756 8.7814 15.9004 8.63114 15.7502C8.48088 15.5999 8.40575 15.4137 8.40575 15.1916V14.0744C7.9223 14.179 7.52378 14.4272 7.2102 14.8192C6.89661 15.2112 6.73981 15.662 6.73981 16.1716C6.73981 16.7726 6.95214 17.2822 7.37679 17.7003C7.80144 18.1184 8.30775 18.3275 8.89573 18.3275C9.11786 18.3275 9.30405 18.4026 9.45431 18.5529C9.60457 18.7031 9.6797 18.8893 9.6797 19.1115C9.6797 19.3336 9.60457 19.5198 9.45431 19.67C9.30405 19.8203 9.11786 19.8954 8.89573 19.8954Z" fill="#636C7E" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Cats portal</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-gray-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.2614 19.1115H11.9897C11.7675 19.1115 11.5813 19.0363 11.4311 18.8861C11.2808 18.7358 11.2057 18.5496 11.2057 18.3275C11.2057 18.1054 11.2808 17.9192 11.4311 17.7689C11.5813 17.6186 11.7675 17.5435 11.9897 17.5435H18.2614V6.56794H7.28584V8.91985C7.28584 9.14197 7.21071 9.32817 7.06045 9.47843C6.91019 9.62869 6.724 9.70382 6.50187 9.70382C6.27975 9.70382 6.09356 9.62869 5.94329 9.47843C5.79303 9.32817 5.7179 9.14197 5.7179 8.91985V6.56794C5.7179 6.13676 5.87143 5.76764 6.17849 5.46058C6.48554 5.15353 6.85466 5 7.28584 5H18.2614C18.6926 5 19.0617 5.15353 19.3688 5.46058C19.6758 5.76764 19.8294 6.13676 19.8294 6.56794V17.5435C19.8294 17.9747 19.6758 18.3438 19.3688 18.6509C19.0617 18.9579 18.6926 19.1115 18.2614 19.1115ZM15.9095 12.8397C16.1316 12.8397 16.3178 12.7646 16.4681 12.6143C16.6183 12.464 16.6935 12.2779 16.6935 12.0557C16.6935 11.8336 16.6183 11.6474 16.4681 11.4971C16.3178 11.3469 16.1316 11.2718 15.9095 11.2718H11.9897C11.7675 11.2718 11.5813 11.3469 11.4311 11.4971C11.2808 11.6474 11.2057 11.8336 11.2057 12.0557C11.2057 12.2779 11.2808 12.464 11.4311 12.6143C11.5813 12.7646 11.7675 12.8397 11.9897 12.8397H15.9095ZM13.5576 15.9756C13.7797 15.9756 13.9659 15.9004 14.1162 15.7502C14.2664 15.5999 14.3416 15.4137 14.3416 15.1916C14.3416 14.9695 14.2664 14.7833 14.1162 14.633C13.9659 14.4828 13.7797 14.4076 13.5576 14.4076H11.9897C11.7675 14.4076 11.5813 14.4828 11.4311 14.633C11.2808 14.7833 11.2057 14.9695 11.2057 15.1916C11.2057 15.4137 11.2808 15.5999 11.4311 15.7502C11.5813 15.9004 11.7675 15.9756 11.9897 15.9756H13.5576ZM15.9095 9.70382C16.1316 9.70382 16.3178 9.62869 16.4681 9.47843C16.6183 9.32817 16.6935 9.14197 16.6935 8.91985C16.6935 8.69772 16.6183 8.51153 16.4681 8.36127C16.3178 8.21101 16.1316 8.13588 15.9095 8.13588H9.63775C9.41563 8.13588 9.22943 8.21101 9.07917 8.36127C8.92891 8.51153 8.85378 8.69772 8.85378 8.91985C8.85378 9.14197 8.92891 9.32817 9.07917 9.47843C9.22943 9.62869 9.41563 9.70382 9.63775 9.70382H15.9095ZM8.55979 19.8954C7.52757 19.8954 6.64887 19.5328 5.9237 18.8077C5.19852 18.0825 4.83594 17.2038 4.83594 16.1716C4.83594 15.4268 5.02866 14.7604 5.41412 14.1724C5.79957 13.5845 6.30588 13.1402 6.93306 12.8397H5.7179C5.49578 12.8397 5.30959 12.7646 5.15933 12.6143C5.00906 12.464 4.93393 12.2779 4.93393 12.0557C4.93393 11.8336 5.00906 11.6474 5.15933 11.4971C5.30959 11.3469 5.49578 11.2718 5.7179 11.2718H8.85378C9.07591 11.2718 9.2621 11.3469 9.41236 11.4971C9.56262 11.6474 9.63775 11.8336 9.63775 12.0557V15.1916C9.63775 15.4137 9.56262 15.5999 9.41236 15.7502C9.2621 15.9004 9.07591 15.9756 8.85378 15.9756C8.63166 15.9756 8.44546 15.9004 8.2952 15.7502C8.14494 15.5999 8.06981 15.4137 8.06981 15.1916V14.0744C7.58636 14.179 7.18785 14.4272 6.87426 14.8192C6.56067 15.2112 6.40388 15.662 6.40388 16.1716C6.40388 16.7726 6.6162 17.2822 7.04085 17.7003C7.4655 18.1184 7.97182 18.3275 8.55979 18.3275C8.78192 18.3275 8.96811 18.4026 9.11837 18.5529C9.26863 18.7031 9.34376 18.8893 9.34376 19.1115C9.34376 19.3336 9.26863 19.5198 9.11837 19.67C8.96811 19.8203 8.78192 19.8954 8.55979 19.8954Z" fill="#636C7E" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-gray-500 text-sm font-normal  leading-normal">Mammals portal</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.9294 19.1115H11.6576C11.4355 19.1115 11.2493 19.0363 11.0991 18.8861C10.9488 18.7358 10.8737 18.5496 10.8737 18.3275C10.8737 18.1054 10.9488 17.9192 11.0991 17.7689C11.2493 17.6186 11.4355 17.5435 11.6576 17.5435H17.9294V6.56794H6.95381V8.91985C6.95381 9.14197 6.87868 9.32817 6.72842 9.47843C6.57816 9.62869 6.39197 9.70382 6.16984 9.70382C5.94772 9.70382 5.76152 9.62869 5.61126 9.47843C5.461 9.32817 5.38587 9.14197 5.38587 8.91985V6.56794C5.38587 6.13676 5.5394 5.76764 5.84645 5.46058C6.15351 5.15353 6.52263 5 6.95381 5H17.9294C18.3606 5 18.7297 5.15353 19.0367 5.46058C19.3438 5.76764 19.4973 6.13676 19.4973 6.56794V17.5435C19.4973 17.9747 19.3438 18.3438 19.0367 18.6509C18.7297 18.9579 18.3606 19.1115 17.9294 19.1115ZM15.5775 12.8397C15.7996 12.8397 15.9858 12.7646 16.1361 12.6143C16.2863 12.464 16.3614 12.2779 16.3614 12.0557C16.3614 11.8336 16.2863 11.6474 16.1361 11.4971C15.9858 11.3469 15.7996 11.2718 15.5775 11.2718H11.6576C11.4355 11.2718 11.2493 11.3469 11.0991 11.4971C10.9488 11.6474 10.8737 11.8336 10.8737 12.0557C10.8737 12.2779 10.9488 12.464 11.0991 12.6143C11.2493 12.7646 11.4355 12.8397 11.6576 12.8397H15.5775ZM13.2256 15.9756C13.4477 15.9756 13.6339 15.9004 13.7841 15.7502C13.9344 15.5999 14.0095 15.4137 14.0095 15.1916C14.0095 14.9695 13.9344 14.7833 13.7841 14.633C13.6339 14.4828 13.4477 14.4076 13.2256 14.4076H11.6576C11.4355 14.4076 11.2493 14.4828 11.0991 14.633C10.9488 14.7833 10.8737 14.9695 10.8737 15.1916C10.8737 15.4137 10.9488 15.5999 11.0991 15.7502C11.2493 15.9004 11.4355 15.9756 11.6576 15.9756H13.2256ZM15.5775 9.70382C15.7996 9.70382 15.9858 9.62869 16.1361 9.47843C16.2863 9.32817 16.3614 9.14197 16.3614 8.91985C16.3614 8.69772 16.2863 8.51153 16.1361 8.36127C15.9858 8.21101 15.7996 8.13588 15.5775 8.13588H9.30572C9.0836 8.13588 8.8974 8.21101 8.74714 8.36127C8.59688 8.51153 8.52175 8.69772 8.52175 8.91985C8.52175 9.14197 8.59688 9.32817 8.74714 9.47843C8.8974 9.62869 9.0836 9.70382 9.30572 9.70382H15.5775ZM8.22776 19.8954C7.19554 19.8954 6.31684 19.5328 5.59166 18.8077C4.86649 18.0825 4.50391 17.2038 4.50391 16.1716C4.50391 15.4268 4.69663 14.7604 5.08208 14.1724C5.46754 13.5845 5.97385 13.1402 6.60103 12.8397H5.38587C5.16375 12.8397 4.97755 12.7646 4.82729 12.6143C4.67703 12.464 4.6019 12.2779 4.6019 12.0557C4.6019 11.8336 4.67703 11.6474 4.82729 11.4971C4.97755 11.3469 5.16375 11.2718 5.38587 11.2718H8.52175C8.74388 11.2718 8.93007 11.3469 9.08033 11.4971C9.23059 11.6474 9.30572 11.8336 9.30572 12.0557V15.1916C9.30572 15.4137 9.23059 15.5999 9.08033 15.7502C8.93007 15.9004 8.74388 15.9756 8.52175 15.9756C8.29963 15.9756 8.11343 15.9004 7.96317 15.7502C7.81291 15.5999 7.73778 15.4137 7.73778 15.1916V14.0744C7.25433 14.179 6.85582 14.4272 6.54223 14.8192C6.22864 15.2112 6.07185 15.662 6.07185 16.1716C6.07185 16.7726 6.28417 17.2822 6.70882 17.7003C7.13347 18.1184 7.63979 18.3275 8.22776 18.3275C8.44989 18.3275 8.63608 18.4026 8.78634 18.5529C8.9366 18.7031 9.01173 18.8893 9.01173 19.1115C9.01173 19.3336 8.9366 19.5198 8.78634 19.67C8.63608 19.8203 8.44989 19.8954 8.22776 19.8954Z" fill="#5F96CD" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cats in the United States</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5974 19.1115H12.3256C12.1035 19.1115 11.9173 19.0363 11.767 18.8861C11.6168 18.7358 11.5416 18.5496 11.5416 18.3275C11.5416 18.1054 11.6168 17.9192 11.767 17.7689C11.9173 17.6186 12.1035 17.5435 12.3256 17.5435H18.5974V6.56794H7.62178V8.91985C7.62178 9.14197 7.54665 9.32817 7.39639 9.47843C7.24613 9.62869 7.05994 9.70382 6.83781 9.70382C6.61569 9.70382 6.42949 9.62869 6.27923 9.47843C6.12897 9.32817 6.05384 9.14197 6.05384 8.91985V6.56794C6.05384 6.13676 6.20737 5.76764 6.51442 5.46058C6.82148 5.15353 7.1906 5 7.62178 5H18.5974C19.0285 5 19.3977 5.15353 19.7047 5.46058C20.0118 5.76764 20.1653 6.13676 20.1653 6.56794V17.5435C20.1653 17.9747 20.0118 18.3438 19.7047 18.6509C19.3977 18.9579 19.0285 19.1115 18.5974 19.1115ZM16.2454 12.8397C16.4676 12.8397 16.6538 12.7646 16.804 12.6143C16.9543 12.464 17.0294 12.2779 17.0294 12.0557C17.0294 11.8336 16.9543 11.6474 16.804 11.4971C16.6538 11.3469 16.4676 11.2718 16.2454 11.2718H12.3256C12.1035 11.2718 11.9173 11.3469 11.767 11.4971C11.6168 11.6474 11.5416 11.8336 11.5416 12.0557C11.5416 12.2779 11.6168 12.464 11.767 12.6143C11.9173 12.7646 12.1035 12.8397 12.3256 12.8397H16.2454ZM13.8935 15.9756C14.1157 15.9756 14.3019 15.9004 14.4521 15.7502C14.6024 15.5999 14.6775 15.4137 14.6775 15.1916C14.6775 14.9695 14.6024 14.7833 14.4521 14.633C14.3019 14.4828 14.1157 14.4076 13.8935 14.4076H12.3256C12.1035 14.4076 11.9173 14.4828 11.767 14.633C11.6168 14.7833 11.5416 14.9695 11.5416 15.1916C11.5416 15.4137 11.6168 15.5999 11.767 15.7502C11.9173 15.9004 12.1035 15.9756 12.3256 15.9756H13.8935ZM16.2454 9.70382C16.4676 9.70382 16.6538 9.62869 16.804 9.47843C16.9543 9.32817 17.0294 9.14197 17.0294 8.91985C17.0294 8.69772 16.9543 8.51153 16.804 8.36127C16.6538 8.21101 16.4676 8.13588 16.2454 8.13588H9.97369C9.75156 8.13588 9.56537 8.21101 9.41511 8.36127C9.26485 8.51153 9.18972 8.69772 9.18972 8.91985C9.18972 9.14197 9.26485 9.32817 9.41511 9.47843C9.56537 9.62869 9.75156 9.70382 9.97369 9.70382H16.2454ZM8.89573 19.8954C7.8635 19.8954 6.9848 19.5328 6.25963 18.8077C5.53446 18.0825 5.17188 17.2038 5.17188 16.1716C5.17188 15.4268 5.3646 14.7604 5.75005 14.1724C6.1355 13.5845 6.64182 13.1402 7.26899 12.8397H6.05384C5.83172 12.8397 5.64552 12.7646 5.49526 12.6143C5.345 12.464 5.26987 12.2779 5.26987 12.0557C5.26987 11.8336 5.345 11.6474 5.49526 11.4971C5.64552 11.3469 5.83172 11.2718 6.05384 11.2718H9.18972C9.41184 11.2718 9.59804 11.3469 9.7483 11.4971C9.89856 11.6474 9.97369 11.8336 9.97369 12.0557V15.1916C9.97369 15.4137 9.89856 15.5999 9.7483 15.7502C9.59804 15.9004 9.41184 15.9756 9.18972 15.9756C8.96759 15.9756 8.7814 15.9004 8.63114 15.7502C8.48088 15.5999 8.40575 15.4137 8.40575 15.1916V14.0744C7.9223 14.179 7.52378 14.4272 7.2102 14.8192C6.89661 15.2112 6.73981 15.662 6.73981 16.1716C6.73981 16.7726 6.95214 17.2822 7.37679 17.7003C7.80144 18.1184 8.30775 18.3275 8.89573 18.3275C9.11786 18.3275 9.30405 18.4026 9.45431 18.5529C9.60457 18.7031 9.6797 18.8893 9.6797 19.1115C9.6797 19.3336 9.60457 19.5198 9.45431 19.67C9.30405 19.8203 9.11786 19.8954 8.89573 19.8954Z" fill="#5F96CD" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cat-Dog relationship</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.2614 19.1115H11.9897C11.7675 19.1115 11.5813 19.0363 11.4311 18.8861C11.2808 18.7358 11.2057 18.5496 11.2057 18.3275C11.2057 18.1054 11.2808 17.9192 11.4311 17.7689C11.5813 17.6186 11.7675 17.5435 11.9897 17.5435H18.2614V6.56794H7.28584V8.91985C7.28584 9.14197 7.21071 9.32817 7.06045 9.47843C6.91019 9.62869 6.724 9.70382 6.50187 9.70382C6.27975 9.70382 6.09356 9.62869 5.94329 9.47843C5.79303 9.32817 5.7179 9.14197 5.7179 8.91985V6.56794C5.7179 6.13676 5.87143 5.76764 6.17849 5.46058C6.48554 5.15353 6.85466 5 7.28584 5H18.2614C18.6926 5 19.0617 5.15353 19.3688 5.46058C19.6758 5.76764 19.8294 6.13676 19.8294 6.56794V17.5435C19.8294 17.9747 19.6758 18.3438 19.3688 18.6509C19.0617 18.9579 18.6926 19.1115 18.2614 19.1115ZM15.9095 12.8397C16.1316 12.8397 16.3178 12.7646 16.4681 12.6143C16.6183 12.464 16.6935 12.2779 16.6935 12.0557C16.6935 11.8336 16.6183 11.6474 16.4681 11.4971C16.3178 11.3469 16.1316 11.2718 15.9095 11.2718H11.9897C11.7675 11.2718 11.5813 11.3469 11.4311 11.4971C11.2808 11.6474 11.2057 11.8336 11.2057 12.0557C11.2057 12.2779 11.2808 12.464 11.4311 12.6143C11.5813 12.7646 11.7675 12.8397 11.9897 12.8397H15.9095ZM13.5576 15.9756C13.7797 15.9756 13.9659 15.9004 14.1162 15.7502C14.2664 15.5999 14.3416 15.4137 14.3416 15.1916C14.3416 14.9695 14.2664 14.7833 14.1162 14.633C13.9659 14.4828 13.7797 14.4076 13.5576 14.4076H11.9897C11.7675 14.4076 11.5813 14.4828 11.4311 14.633C11.2808 14.7833 11.2057 14.9695 11.2057 15.1916C11.2057 15.4137 11.2808 15.5999 11.4311 15.7502C11.5813 15.9004 11.7675 15.9756 11.9897 15.9756H13.5576ZM15.9095 9.70382C16.1316 9.70382 16.3178 9.62869 16.4681 9.47843C16.6183 9.32817 16.6935 9.14197 16.6935 8.91985C16.6935 8.69772 16.6183 8.51153 16.4681 8.36127C16.3178 8.21101 16.1316 8.13588 15.9095 8.13588H9.63775C9.41563 8.13588 9.22943 8.21101 9.07917 8.36127C8.92891 8.51153 8.85378 8.69772 8.85378 8.91985C8.85378 9.14197 8.92891 9.32817 9.07917 9.47843C9.22943 9.62869 9.41563 9.70382 9.63775 9.70382H15.9095ZM8.55979 19.8954C7.52757 19.8954 6.64887 19.5328 5.9237 18.8077C5.19852 18.0825 4.83594 17.2038 4.83594 16.1716C4.83594 15.4268 5.02866 14.7604 5.41412 14.1724C5.79957 13.5845 6.30588 13.1402 6.93306 12.8397H5.7179C5.49578 12.8397 5.30959 12.7646 5.15933 12.6143C5.00906 12.464 4.93393 12.2779 4.93393 12.0557C4.93393 11.8336 5.00906 11.6474 5.15933 11.4971C5.30959 11.3469 5.49578 11.2718 5.7179 11.2718H8.85378C9.07591 11.2718 9.2621 11.3469 9.41236 11.4971C9.56262 11.6474 9.63775 11.8336 9.63775 12.0557V15.1916C9.63775 15.4137 9.56262 15.5999 9.41236 15.7502C9.2621 15.9004 9.07591 15.9756 8.85378 15.9756C8.63166 15.9756 8.44546 15.9004 8.2952 15.7502C8.14494 15.5999 8.06981 15.4137 8.06981 15.1916V14.0744C7.58636 14.179 7.18785 14.4272 6.87426 14.8192C6.56067 15.2112 6.40388 15.662 6.40388 16.1716C6.40388 16.7726 6.6162 17.2822 7.04085 17.7003C7.4655 18.1184 7.97182 18.3275 8.55979 18.3275C8.78192 18.3275 8.96811 18.4026 9.11837 18.5529C9.26863 18.7031 9.34376 18.8893 9.34376 19.1115C9.34376 19.3336 9.26863 19.5198 9.11837 19.67C8.96811 19.8203 8.78192 19.8954 8.55979 19.8954Z" fill="#5F96CD" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cat fancy</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.9294 19.1115H11.6576C11.4355 19.1115 11.2493 19.0363 11.0991 18.8861C10.9488 18.7358 10.8737 18.5496 10.8737 18.3275C10.8737 18.1054 10.9488 17.9192 11.0991 17.7689C11.2493 17.6186 11.4355 17.5435 11.6576 17.5435H17.9294V6.56794H6.95381V8.91985C6.95381 9.14197 6.87868 9.32817 6.72842 9.47843C6.57816 9.62869 6.39197 9.70382 6.16984 9.70382C5.94772 9.70382 5.76152 9.62869 5.61126 9.47843C5.461 9.32817 5.38587 9.14197 5.38587 8.91985V6.56794C5.38587 6.13676 5.5394 5.76764 5.84645 5.46058C6.15351 5.15353 6.52263 5 6.95381 5H17.9294C18.3606 5 18.7297 5.15353 19.0367 5.46058C19.3438 5.76764 19.4973 6.13676 19.4973 6.56794V17.5435C19.4973 17.9747 19.3438 18.3438 19.0367 18.6509C18.7297 18.9579 18.3606 19.1115 17.9294 19.1115ZM15.5775 12.8397C15.7996 12.8397 15.9858 12.7646 16.1361 12.6143C16.2863 12.464 16.3614 12.2779 16.3614 12.0557C16.3614 11.8336 16.2863 11.6474 16.1361 11.4971C15.9858 11.3469 15.7996 11.2718 15.5775 11.2718H11.6576C11.4355 11.2718 11.2493 11.3469 11.0991 11.4971C10.9488 11.6474 10.8737 11.8336 10.8737 12.0557C10.8737 12.2779 10.9488 12.464 11.0991 12.6143C11.2493 12.7646 11.4355 12.8397 11.6576 12.8397H15.5775ZM13.2256 15.9756C13.4477 15.9756 13.6339 15.9004 13.7841 15.7502C13.9344 15.5999 14.0095 15.4137 14.0095 15.1916C14.0095 14.9695 13.9344 14.7833 13.7841 14.633C13.6339 14.4828 13.4477 14.4076 13.2256 14.4076H11.6576C11.4355 14.4076 11.2493 14.4828 11.0991 14.633C10.9488 14.7833 10.8737 14.9695 10.8737 15.1916C10.8737 15.4137 10.9488 15.5999 11.0991 15.7502C11.2493 15.9004 11.4355 15.9756 11.6576 15.9756H13.2256ZM15.5775 9.70382C15.7996 9.70382 15.9858 9.62869 16.1361 9.47843C16.2863 9.32817 16.3614 9.14197 16.3614 8.91985C16.3614 8.69772 16.2863 8.51153 16.1361 8.36127C15.9858 8.21101 15.7996 8.13588 15.5775 8.13588H9.30572C9.0836 8.13588 8.8974 8.21101 8.74714 8.36127C8.59688 8.51153 8.52175 8.69772 8.52175 8.91985C8.52175 9.14197 8.59688 9.32817 8.74714 9.47843C8.8974 9.62869 9.0836 9.70382 9.30572 9.70382H15.5775ZM8.22776 19.8954C7.19554 19.8954 6.31684 19.5328 5.59166 18.8077C4.86649 18.0825 4.50391 17.2038 4.50391 16.1716C4.50391 15.4268 4.69663 14.7604 5.08208 14.1724C5.46754 13.5845 5.97385 13.1402 6.60103 12.8397H5.38587C5.16375 12.8397 4.97755 12.7646 4.82729 12.6143C4.67703 12.464 4.6019 12.2779 4.6019 12.0557C4.6019 11.8336 4.67703 11.6474 4.82729 11.4971C4.97755 11.3469 5.16375 11.2718 5.38587 11.2718H8.52175C8.74388 11.2718 8.93007 11.3469 9.08033 11.4971C9.23059 11.6474 9.30572 11.8336 9.30572 12.0557V15.1916C9.30572 15.4137 9.23059 15.5999 9.08033 15.7502C8.93007 15.9004 8.74388 15.9756 8.52175 15.9756C8.29963 15.9756 8.11343 15.9004 7.96317 15.7502C7.81291 15.5999 7.73778 15.4137 7.73778 15.1916V14.0744C7.25433 14.179 6.85582 14.4272 6.54223 14.8192C6.22864 15.2112 6.07185 15.662 6.07185 16.1716C6.07185 16.7726 6.28417 17.2822 6.70882 17.7003C7.13347 18.1184 7.63979 18.3275 8.22776 18.3275C8.44989 18.3275 8.63608 18.4026 8.78634 18.5529C8.9366 18.7031 9.01173 18.8893 9.01173 19.1115C9.01173 19.3336 8.9366 19.5198 8.78634 19.67C8.63608 19.8203 8.44989 19.8954 8.22776 19.8954Z" fill="#5F96CD" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cat food</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5974 19.1115H12.3256C12.1035 19.1115 11.9173 19.0363 11.767 18.8861C11.6168 18.7358 11.5416 18.5496 11.5416 18.3275C11.5416 18.1054 11.6168 17.9192 11.767 17.7689C11.9173 17.6186 12.1035 17.5435 12.3256 17.5435H18.5974V6.56794H7.62178V8.91985C7.62178 9.14197 7.54665 9.32817 7.39639 9.47843C7.24613 9.62869 7.05994 9.70382 6.83781 9.70382C6.61569 9.70382 6.42949 9.62869 6.27923 9.47843C6.12897 9.32817 6.05384 9.14197 6.05384 8.91985V6.56794C6.05384 6.13676 6.20737 5.76764 6.51442 5.46058C6.82148 5.15353 7.1906 5 7.62178 5H18.5974C19.0285 5 19.3977 5.15353 19.7047 5.46058C20.0118 5.76764 20.1653 6.13676 20.1653 6.56794V17.5435C20.1653 17.9747 20.0118 18.3438 19.7047 18.6509C19.3977 18.9579 19.0285 19.1115 18.5974 19.1115ZM16.2454 12.8397C16.4676 12.8397 16.6538 12.7646 16.804 12.6143C16.9543 12.464 17.0294 12.2779 17.0294 12.0557C17.0294 11.8336 16.9543 11.6474 16.804 11.4971C16.6538 11.3469 16.4676 11.2718 16.2454 11.2718H12.3256C12.1035 11.2718 11.9173 11.3469 11.767 11.4971C11.6168 11.6474 11.5416 11.8336 11.5416 12.0557C11.5416 12.2779 11.6168 12.464 11.767 12.6143C11.9173 12.7646 12.1035 12.8397 12.3256 12.8397H16.2454ZM13.8935 15.9756C14.1157 15.9756 14.3019 15.9004 14.4521 15.7502C14.6024 15.5999 14.6775 15.4137 14.6775 15.1916C14.6775 14.9695 14.6024 14.7833 14.4521 14.633C14.3019 14.4828 14.1157 14.4076 13.8935 14.4076H12.3256C12.1035 14.4076 11.9173 14.4828 11.767 14.633C11.6168 14.7833 11.5416 14.9695 11.5416 15.1916C11.5416 15.4137 11.6168 15.5999 11.767 15.7502C11.9173 15.9004 12.1035 15.9756 12.3256 15.9756H13.8935ZM16.2454 9.70382C16.4676 9.70382 16.6538 9.62869 16.804 9.47843C16.9543 9.32817 17.0294 9.14197 17.0294 8.91985C17.0294 8.69772 16.9543 8.51153 16.804 8.36127C16.6538 8.21101 16.4676 8.13588 16.2454 8.13588H9.97369C9.75156 8.13588 9.56537 8.21101 9.41511 8.36127C9.26485 8.51153 9.18972 8.69772 9.18972 8.91985C9.18972 9.14197 9.26485 9.32817 9.41511 9.47843C9.56537 9.62869 9.75156 9.70382 9.97369 9.70382H16.2454ZM8.89573 19.8954C7.8635 19.8954 6.9848 19.5328 6.25963 18.8077C5.53446 18.0825 5.17188 17.2038 5.17188 16.1716C5.17188 15.4268 5.3646 14.7604 5.75005 14.1724C6.1355 13.5845 6.64182 13.1402 7.26899 12.8397H6.05384C5.83172 12.8397 5.64552 12.7646 5.49526 12.6143C5.345 12.464 5.26987 12.2779 5.26987 12.0557C5.26987 11.8336 5.345 11.6474 5.49526 11.4971C5.64552 11.3469 5.83172 11.2718 6.05384 11.2718H9.18972C9.41184 11.2718 9.59804 11.3469 9.7483 11.4971C9.89856 11.6474 9.97369 11.8336 9.97369 12.0557V15.1916C9.97369 15.4137 9.89856 15.5999 9.7483 15.7502C9.59804 15.9004 9.41184 15.9756 9.18972 15.9756C8.96759 15.9756 8.7814 15.9004 8.63114 15.7502C8.48088 15.5999 8.40575 15.4137 8.40575 15.1916V14.0744C7.9223 14.179 7.52378 14.4272 7.2102 14.8192C6.89661 15.2112 6.73981 15.662 6.73981 16.1716C6.73981 16.7726 6.95214 17.2822 7.37679 17.7003C7.80144 18.1184 8.30775 18.3275 8.89573 18.3275C9.11786 18.3275 9.30405 18.4026 9.45431 18.5529C9.60457 18.7031 9.6797 18.8893 9.6797 19.1115C9.6797 19.3336 9.60457 19.5198 9.45431 19.67C9.30405 19.8203 9.11786 19.8954 8.89573 19.8954Z" fill="#5F96CD" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cats and the internet</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.2614 19.1115H11.9897C11.7675 19.1115 11.5813 19.0363 11.4311 18.8861C11.2808 18.7358 11.2057 18.5496 11.2057 18.3275C11.2057 18.1054 11.2808 17.9192 11.4311 17.7689C11.5813 17.6186 11.7675 17.5435 11.9897 17.5435H18.2614V6.56794H7.28584V8.91985C7.28584 9.14197 7.21071 9.32817 7.06045 9.47843C6.91019 9.62869 6.724 9.70382 6.50187 9.70382C6.27975 9.70382 6.09356 9.62869 5.94329 9.47843C5.79303 9.32817 5.7179 9.14197 5.7179 8.91985V6.56794C5.7179 6.13676 5.87143 5.76764 6.17849 5.46058C6.48554 5.15353 6.85466 5 7.28584 5H18.2614C18.6926 5 19.0617 5.15353 19.3688 5.46058C19.6758 5.76764 19.8294 6.13676 19.8294 6.56794V17.5435C19.8294 17.9747 19.6758 18.3438 19.3688 18.6509C19.0617 18.9579 18.6926 19.1115 18.2614 19.1115ZM15.9095 12.8397C16.1316 12.8397 16.3178 12.7646 16.4681 12.6143C16.6183 12.464 16.6935 12.2779 16.6935 12.0557C16.6935 11.8336 16.6183 11.6474 16.4681 11.4971C16.3178 11.3469 16.1316 11.2718 15.9095 11.2718H11.9897C11.7675 11.2718 11.5813 11.3469 11.4311 11.4971C11.2808 11.6474 11.2057 11.8336 11.2057 12.0557C11.2057 12.2779 11.2808 12.464 11.4311 12.6143C11.5813 12.7646 11.7675 12.8397 11.9897 12.8397H15.9095ZM13.5576 15.9756C13.7797 15.9756 13.9659 15.9004 14.1162 15.7502C14.2664 15.5999 14.3416 15.4137 14.3416 15.1916C14.3416 14.9695 14.2664 14.7833 14.1162 14.633C13.9659 14.4828 13.7797 14.4076 13.5576 14.4076H11.9897C11.7675 14.4076 11.5813 14.4828 11.4311 14.633C11.2808 14.7833 11.2057 14.9695 11.2057 15.1916C11.2057 15.4137 11.2808 15.5999 11.4311 15.7502C11.5813 15.9004 11.7675 15.9756 11.9897 15.9756H13.5576ZM15.9095 9.70382C16.1316 9.70382 16.3178 9.62869 16.4681 9.47843C16.6183 9.32817 16.6935 9.14197 16.6935 8.91985C16.6935 8.69772 16.6183 8.51153 16.4681 8.36127C16.3178 8.21101 16.1316 8.13588 15.9095 8.13588H9.63775C9.41563 8.13588 9.22943 8.21101 9.07917 8.36127C8.92891 8.51153 8.85378 8.69772 8.85378 8.91985C8.85378 9.14197 8.92891 9.32817 9.07917 9.47843C9.22943 9.62869 9.41563 9.70382 9.63775 9.70382H15.9095ZM8.55979 19.8954C7.52757 19.8954 6.64887 19.5328 5.9237 18.8077C5.19852 18.0825 4.83594 17.2038 4.83594 16.1716C4.83594 15.4268 5.02866 14.7604 5.41412 14.1724C5.79957 13.5845 6.30588 13.1402 6.93306 12.8397H5.7179C5.49578 12.8397 5.30959 12.7646 5.15933 12.6143C5.00906 12.464 4.93393 12.2779 4.93393 12.0557C4.93393 11.8336 5.00906 11.6474 5.15933 11.4971C5.30959 11.3469 5.49578 11.2718 5.7179 11.2718H8.85378C9.07591 11.2718 9.2621 11.3469 9.41236 11.4971C9.56262 11.6474 9.63775 11.8336 9.63775 12.0557V15.1916C9.63775 15.4137 9.56262 15.5999 9.41236 15.7502C9.2621 15.9004 9.07591 15.9756 8.85378 15.9756C8.63166 15.9756 8.44546 15.9004 8.2952 15.7502C8.14494 15.5999 8.06981 15.4137 8.06981 15.1916V14.0744C7.58636 14.179 7.18785 14.4272 6.87426 14.8192C6.56067 15.2112 6.40388 15.662 6.40388 16.1716C6.40388 16.7726 6.6162 17.2822 7.04085 17.7003C7.4655 18.1184 7.97182 18.3275 8.55979 18.3275C8.78192 18.3275 8.96811 18.4026 9.11837 18.5529C9.26863 18.7031 9.34376 18.8893 9.34376 19.1115C9.34376 19.3336 9.26863 19.5198 9.11837 19.67C8.96811 19.8203 8.78192 19.8954 8.55979 19.8954Z" fill="#5F96CD" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cat lady</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-blue-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.9294 19.1115H11.6576C11.4355 19.1115 11.2493 19.0363 11.0991 18.8861C10.9488 18.7358 10.8737 18.5496 10.8737 18.3275C10.8737 18.1054 10.9488 17.9192 11.0991 17.7689C11.2493 17.6186 11.4355 17.5435 11.6576 17.5435H17.9294V6.56794H6.95381V8.91985C6.95381 9.14197 6.87868 9.32817 6.72842 9.47843C6.57816 9.62869 6.39197 9.70382 6.16984 9.70382C5.94772 9.70382 5.76152 9.62869 5.61126 9.47843C5.461 9.32817 5.38587 9.14197 5.38587 8.91985V6.56794C5.38587 6.13676 5.5394 5.76764 5.84645 5.46058C6.15351 5.15353 6.52263 5 6.95381 5H17.9294C18.3606 5 18.7297 5.15353 19.0367 5.46058C19.3438 5.76764 19.4973 6.13676 19.4973 6.56794V17.5435C19.4973 17.9747 19.3438 18.3438 19.0367 18.6509C18.7297 18.9579 18.3606 19.1115 17.9294 19.1115ZM15.5775 12.8397C15.7996 12.8397 15.9858 12.7646 16.1361 12.6143C16.2863 12.464 16.3614 12.2779 16.3614 12.0557C16.3614 11.8336 16.2863 11.6474 16.1361 11.4971C15.9858 11.3469 15.7996 11.2718 15.5775 11.2718H11.6576C11.4355 11.2718 11.2493 11.3469 11.0991 11.4971C10.9488 11.6474 10.8737 11.8336 10.8737 12.0557C10.8737 12.2779 10.9488 12.464 11.0991 12.6143C11.2493 12.7646 11.4355 12.8397 11.6576 12.8397H15.5775ZM13.2256 15.9756C13.4477 15.9756 13.6339 15.9004 13.7841 15.7502C13.9344 15.5999 14.0095 15.4137 14.0095 15.1916C14.0095 14.9695 13.9344 14.7833 13.7841 14.633C13.6339 14.4828 13.4477 14.4076 13.2256 14.4076H11.6576C11.4355 14.4076 11.2493 14.4828 11.0991 14.633C10.9488 14.7833 10.8737 14.9695 10.8737 15.1916C10.8737 15.4137 10.9488 15.5999 11.0991 15.7502C11.2493 15.9004 11.4355 15.9756 11.6576 15.9756H13.2256ZM15.5775 9.70382C15.7996 9.70382 15.9858 9.62869 16.1361 9.47843C16.2863 9.32817 16.3614 9.14197 16.3614 8.91985C16.3614 8.69772 16.2863 8.51153 16.1361 8.36127C15.9858 8.21101 15.7996 8.13588 15.5775 8.13588H9.30572C9.0836 8.13588 8.8974 8.21101 8.74714 8.36127C8.59688 8.51153 8.52175 8.69772 8.52175 8.91985C8.52175 9.14197 8.59688 9.32817 8.74714 9.47843C8.8974 9.62869 9.0836 9.70382 9.30572 9.70382H15.5775ZM8.22776 19.8954C7.19554 19.8954 6.31684 19.5328 5.59166 18.8077C4.86649 18.0825 4.50391 17.2038 4.50391 16.1716C4.50391 15.4268 4.69663 14.7604 5.08208 14.1724C5.46754 13.5845 5.97385 13.1402 6.60103 12.8397H5.38587C5.16375 12.8397 4.97755 12.7646 4.82729 12.6143C4.67703 12.464 4.6019 12.2779 4.6019 12.0557C4.6019 11.8336 4.67703 11.6474 4.82729 11.4971C4.97755 11.3469 5.16375 11.2718 5.38587 11.2718H8.52175C8.74388 11.2718 8.93007 11.3469 9.08033 11.4971C9.23059 11.6474 9.30572 11.8336 9.30572 12.0557V15.1916C9.30572 15.4137 9.23059 15.5999 9.08033 15.7502C8.93007 15.9004 8.74388 15.9756 8.52175 15.9756C8.29963 15.9756 8.11343 15.9004 7.96317 15.7502C7.81291 15.5999 7.73778 15.4137 7.73778 15.1916V14.0744C7.25433 14.179 6.85582 14.4272 6.54223 14.8192C6.22864 15.2112 6.07185 15.662 6.07185 16.1716C6.07185 16.7726 6.28417 17.2822 6.70882 17.7003C7.13347 18.1184 7.63979 18.3275 8.22776 18.3275C8.44989 18.3275 8.63608 18.4026 8.78634 18.5529C8.9366 18.7031 9.01173 18.8893 9.01173 19.1115C9.01173 19.3336 8.9366 19.5198 8.78634 19.67C8.63608 19.8203 8.44989 19.8954 8.22776 19.8954Z" fill="#5F96CD" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-blue-400 text-sm font-normal  leading-normal">Cat collar</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-lime-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5974 19.1115H12.3256C12.1035 19.1115 11.9173 19.0363 11.767 18.8861C11.6168 18.7358 11.5416 18.5496 11.5416 18.3275C11.5416 18.1054 11.6168 17.9192 11.767 17.7689C11.9173 17.6186 12.1035 17.5435 12.3256 17.5435H18.5974V6.56794H7.62178V8.91985C7.62178 9.14197 7.54665 9.32817 7.39639 9.47843C7.24613 9.62869 7.05994 9.70382 6.83781 9.70382C6.61569 9.70382 6.42949 9.62869 6.27923 9.47843C6.12897 9.32817 6.05384 9.14197 6.05384 8.91985V6.56794C6.05384 6.13676 6.20737 5.76764 6.51442 5.46058C6.82148 5.15353 7.1906 5 7.62178 5H18.5974C19.0285 5 19.3977 5.15353 19.7047 5.46058C20.0118 5.76764 20.1653 6.13676 20.1653 6.56794V17.5435C20.1653 17.9747 20.0118 18.3438 19.7047 18.6509C19.3977 18.9579 19.0285 19.1115 18.5974 19.1115ZM16.2454 12.8397C16.4676 12.8397 16.6538 12.7646 16.804 12.6143C16.9543 12.464 17.0294 12.2779 17.0294 12.0557C17.0294 11.8336 16.9543 11.6474 16.804 11.4971C16.6538 11.3469 16.4676 11.2718 16.2454 11.2718H12.3256C12.1035 11.2718 11.9173 11.3469 11.767 11.4971C11.6168 11.6474 11.5416 11.8336 11.5416 12.0557C11.5416 12.2779 11.6168 12.464 11.767 12.6143C11.9173 12.7646 12.1035 12.8397 12.3256 12.8397H16.2454ZM13.8935 15.9756C14.1157 15.9756 14.3019 15.9004 14.4521 15.7502C14.6024 15.5999 14.6775 15.4137 14.6775 15.1916C14.6775 14.9695 14.6024 14.7833 14.4521 14.633C14.3019 14.4828 14.1157 14.4076 13.8935 14.4076H12.3256C12.1035 14.4076 11.9173 14.4828 11.767 14.633C11.6168 14.7833 11.5416 14.9695 11.5416 15.1916C11.5416 15.4137 11.6168 15.5999 11.767 15.7502C11.9173 15.9004 12.1035 15.9756 12.3256 15.9756H13.8935ZM16.2454 9.70382C16.4676 9.70382 16.6538 9.62869 16.804 9.47843C16.9543 9.32817 17.0294 9.14197 17.0294 8.91985C17.0294 8.69772 16.9543 8.51153 16.804 8.36127C16.6538 8.21101 16.4676 8.13588 16.2454 8.13588H9.97369C9.75156 8.13588 9.56537 8.21101 9.41511 8.36127C9.26485 8.51153 9.18972 8.69772 9.18972 8.91985C9.18972 9.14197 9.26485 9.32817 9.41511 9.47843C9.56537 9.62869 9.75156 9.70382 9.97369 9.70382H16.2454ZM8.89573 19.8954C7.8635 19.8954 6.9848 19.5328 6.25963 18.8077C5.53446 18.0825 5.17188 17.2038 5.17188 16.1716C5.17188 15.4268 5.3646 14.7604 5.75005 14.1724C6.1355 13.5845 6.64182 13.1402 7.26899 12.8397H6.05384C5.83172 12.8397 5.64552 12.7646 5.49526 12.6143C5.345 12.464 5.26987 12.2779 5.26987 12.0557C5.26987 11.8336 5.345 11.6474 5.49526 11.4971C5.64552 11.3469 5.83172 11.2718 6.05384 11.2718H9.18972C9.41184 11.2718 9.59804 11.3469 9.7483 11.4971C9.89856 11.6474 9.97369 11.8336 9.97369 12.0557V15.1916C9.97369 15.4137 9.89856 15.5999 9.7483 15.7502C9.59804 15.9004 9.41184 15.9756 9.18972 15.9756C8.96759 15.9756 8.7814 15.9004 8.63114 15.7502C8.48088 15.5999 8.40575 15.4137 8.40575 15.1916V14.0744C7.9223 14.179 7.52378 14.4272 7.2102 14.8192C6.89661 15.2112 6.73981 15.662 6.73981 16.1716C6.73981 16.7726 6.95214 17.2822 7.37679 17.7003C7.80144 18.1184 8.30775 18.3275 8.89573 18.3275C9.11786 18.3275 9.30405 18.4026 9.45431 18.5529C9.60457 18.7031 9.6797 18.8893 9.6797 19.1115C9.6797 19.3336 9.60457 19.5198 9.45431 19.67C9.30405 19.8203 9.11786 19.8954 8.89573 19.8954Z" fill="#5C9738" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-lime-600 text-sm font-normal  leading-normal">List of cat breeds</div>
                        </div>
                        <div className="flex-1 max-w-[600px] min-w-72 pl-1.5 pr-3 py-0.5 bg-lime-400/20 rounded-md flex justify-start items-center gap-1.5">
                          <div className="size- flex justify-start items-center">
                            <div data-property-1="Default" className="size- p-1.5 rounded-md flex justify-start items-center gap-1.5">
                              <div className="size- flex justify-start items-center gap-1.5">
                                <div data-svg-wrapper data-property-1="Main Article" className="relative">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.2614 19.1115H11.9897C11.7675 19.1115 11.5813 19.0363 11.4311 18.8861C11.2808 18.7358 11.2057 18.5496 11.2057 18.3275C11.2057 18.1054 11.2808 17.9192 11.4311 17.7689C11.5813 17.6186 11.7675 17.5435 11.9897 17.5435H18.2614V6.56794H7.28584V8.91985C7.28584 9.14197 7.21071 9.32817 7.06045 9.47843C6.91019 9.62869 6.724 9.70382 6.50187 9.70382C6.27975 9.70382 6.09356 9.62869 5.94329 9.47843C5.79303 9.32817 5.7179 9.14197 5.7179 8.91985V6.56794C5.7179 6.13676 5.87143 5.76764 6.17849 5.46058C6.48554 5.15353 6.85466 5 7.28584 5H18.2614C18.6926 5 19.0617 5.15353 19.3688 5.46058C19.6758 5.76764 19.8294 6.13676 19.8294 6.56794V17.5435C19.8294 17.9747 19.6758 18.3438 19.3688 18.6509C19.0617 18.9579 18.6926 19.1115 18.2614 19.1115ZM15.9095 12.8397C16.1316 12.8397 16.3178 12.7646 16.4681 12.6143C16.6183 12.464 16.6935 12.2779 16.6935 12.0557C16.6935 11.8336 16.6183 11.6474 16.4681 11.4971C16.3178 11.3469 16.1316 11.2718 15.9095 11.2718H11.9897C11.7675 11.2718 11.5813 11.3469 11.4311 11.4971C11.2808 11.6474 11.2057 11.8336 11.2057 12.0557C11.2057 12.2779 11.2808 12.464 11.4311 12.6143C11.5813 12.7646 11.7675 12.8397 11.9897 12.8397H15.9095ZM13.5576 15.9756C13.7797 15.9756 13.9659 15.9004 14.1162 15.7502C14.2664 15.5999 14.3416 15.4137 14.3416 15.1916C14.3416 14.9695 14.2664 14.7833 14.1162 14.633C13.9659 14.4828 13.7797 14.4076 13.5576 14.4076H11.9897C11.7675 14.4076 11.5813 14.4828 11.4311 14.633C11.2808 14.7833 11.2057 14.9695 11.2057 15.1916C11.2057 15.4137 11.2808 15.5999 11.4311 15.7502C11.5813 15.9004 11.7675 15.9756 11.9897 15.9756H13.5576ZM15.9095 9.70382C16.1316 9.70382 16.3178 9.62869 16.4681 9.47843C16.6183 9.32817 16.6935 9.14197 16.6935 8.91985C16.6935 8.69772 16.6183 8.51153 16.4681 8.36127C16.3178 8.21101 16.1316 8.13588 15.9095 8.13588H9.63775C9.41563 8.13588 9.22943 8.21101 9.07917 8.36127C8.92891 8.51153 8.85378 8.69772 8.85378 8.91985C8.85378 9.14197 8.92891 9.32817 9.07917 9.47843C9.22943 9.62869 9.41563 9.70382 9.63775 9.70382H15.9095ZM8.55979 19.8954C7.52757 19.8954 6.64887 19.5328 5.9237 18.8077C5.19852 18.0825 4.83594 17.2038 4.83594 16.1716C4.83594 15.4268 5.02866 14.7604 5.41412 14.1724C5.79957 13.5845 6.30588 13.1402 6.93306 12.8397H5.7179C5.49578 12.8397 5.30959 12.7646 5.15933 12.6143C5.00906 12.464 4.93393 12.2779 4.93393 12.0557C4.93393 11.8336 5.00906 11.6474 5.15933 11.4971C5.30959 11.3469 5.49578 11.2718 5.7179 11.2718H8.85378C9.07591 11.2718 9.2621 11.3469 9.41236 11.4971C9.56262 11.6474 9.63775 11.8336 9.63775 12.0557V15.1916C9.63775 15.4137 9.56262 15.5999 9.41236 15.7502C9.2621 15.9004 9.07591 15.9756 8.85378 15.9756C8.63166 15.9756 8.44546 15.9004 8.2952 15.7502C8.14494 15.5999 8.06981 15.4137 8.06981 15.1916V14.0744C7.58636 14.179 7.18785 14.4272 6.87426 14.8192C6.56067 15.2112 6.40388 15.662 6.40388 16.1716C6.40388 16.7726 6.6162 17.2822 7.04085 17.7003C7.4655 18.1184 7.97182 18.3275 8.55979 18.3275C8.78192 18.3275 8.96811 18.4026 9.11837 18.5529C9.26863 18.7031 9.34376 18.8893 9.34376 19.1115C9.34376 19.3336 9.26863 19.5198 9.11837 19.67C8.96811 19.8203 8.78192 19.8954 8.55979 19.8954Z" fill="#5C9738" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="justify-start text-lime-600 text-sm font-normal  leading-normal">List of individual cats</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-5">
                    <div className="self-stretch px-3 py-2.5 bg-orange-400/10 rounded-md inline-flex justify-start items-center gap-1.5 flex-wrap content-center">
                      <div className="w-28 h-7 flex justify-start items-center">
                        <div className="w-7 self-stretch p-1.5 rounded-md flex justify-center items-center gap-1.5">
                          <div className="size- flex justify-start items-center gap-1.5">
                            <div data-svg-wrapper data-property-1="Category" className="relative">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 8H15.9565" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M8.65234 12.2607H19.0002" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M5 12.2607H5.0001" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M8.65234 16.5215H19.0002" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M5 16.5215H5.0001" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="justify-start text-neutral-800 text-sm font-normal  leading-normal">Categories:</div>
                      </div>
                      <div className="justify-start text-orange-400 text-sm font-normal  leading-normal">Scottish art</div>
                      <div data-svg-wrapper>
                        <svg width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="1.5" cy="2" r="1.5" fill="#D8753C" />
                        </svg>
                      </div>
                      <div className="justify-start text-orange-400 text-sm font-normal  leading-normal">Modern art</div>
                      <div data-svg-wrapper>
                        <svg width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="1.5" cy="2" r="1.5" fill="#D8753C" />
                        </svg>
                      </div>
                      <div className="justify-start text-orange-400 text-sm font-normal  leading-normal">Scottish contemporary art</div>
                      <div data-svg-wrapper>
                        <svg width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="1.5" cy="2" r="1.5" fill="#D8753C" />
                        </svg>
                      </div>
                      <div className="justify-start text-orange-400 text-sm font-normal  leading-normal">Modern history of Scottland</div>
                    </div>
                    <div className="self-stretch justify-start text-gray-500 text-sm font-normal  leading-normal">Last edited on 16 November 2023, at 22:48 (UTC)</div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab-2">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  Content for Tab 2
                </p>
              </TabsContent>
              <TabsContent value="tab-3">
                <p className="text-muted-foreground pt-1 text-center text-xs">
                  Content for Tab 3
                </p>
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-muted-foreground p-4 text-center text-xs">
              Content for Tab 2
            </p>
          </TabsContent>
        </Tabs>
      </div>













      <div className="fixed bottom-8 right-8 p-3 bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer lg:block hidden">
        <div data-svg-wrapper data-property-1="Up" className="relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0013 6V18M12.0013 6L16.3555 10.3541M12.0013 6L7.64721 10.3541" stroke="#202122" strokeWidth="1.67198" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

    </div >
  );
}