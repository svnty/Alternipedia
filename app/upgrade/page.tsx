import React, { JSX } from "react";
import vector30 from "./vector-30.svg";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="bg-defaultbgmain w-full py-12 px-[15%]">
      {/* Header Section */}
      <div className="mx-auto text-center mb-8">
        <h1 className="font-h1 font-[number:var(--h1-font-weight)] text-black text-2xl sm:text-3xl lg:text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] [font-style:var(--h1-font-style)] mb-6">
          Knowledge is Power, Supercharge Yours.
        </h1>

      </div>

      {/* Pricing Cards */}
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8">
        {/* Free Plan Card */}
        <div className="flex flex-col bg-defaultbgmain rounded-[10px] border-2 border-solid border-accent overflow-hidden">
          <div className="bg-accent py-2 px-4">
            <h3 className="text-center font-h3 font-[number:var(--h3-font-weight)] text-defaulttextmain text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] leading-[var(--h3-line-height)] [font-style:var(--h3-font-style)] font-semibold">
              Alternipedia
            </h3>
          </div>

          <div className="flex-1 p-6 space-y-4">
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Read all of Alternipedia
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Use basic theme customization
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Save articles to read later
            </p>
          </div>

          <div className="p-6">
            <div className="flex items-end justify-center gap-2 mb-6">
              <span className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-defaulttextmain text-3xl tracking-[0] leading-[52.5px]">
                $0
              </span>
              <span className="font-sub font-[number:var(--sub-font-weight)] text-defaulttextmain text-[length:var(--sub-font-size)] tracking-[var(--sub-letter-spacing)] leading-[var(--sub-line-height)] [font-style:var(--sub-font-style)] mb-2">
                / month
              </span>
            </div>
            <button className="w-full bg-accent flex h-[57px] items-center justify-center gap-1.5 p-1.5 rounded-md">
              <span className="[font-family:'Open_Sans-Regular',Helvetica] font-normal text-defaulttextmain text-base tracking-[0] leading-7">
                Your plan
              </span>
            </button>
          </div>
        </div>

        {/* Pro Plan Card */}
        <div className="flex flex-col bg-defaultbgmain rounded-[10px] border-[none] before:content-[''] before:absolute before:inset-0 before:p-0.5 before:rounded-[10px] before:[background:linear-gradient(180deg,rgba(238,205,27,1)_0%,rgba(32,33,34,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none relative overflow-hidden">
          <div className="bg-[#eecd1b] py-2 px-4 relative z-10">
            <h3 className="text-center font-h3 font-[number:var(--h3-font-weight)] text-defaulttextmain text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] leading-[var(--h3-line-height)] [font-style:var(--h3-font-style)] font-semibold">
              Alternipedia PRO
            </h3>
          </div>

          <div className="flex-1 p-6 space-y-3 relative z-10">
            <h4 className="font-h3 font-[number:var(--h3-font-weight)] text-defaulttextmain text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] leading-[var(--h3-line-height)] [font-style:var(--h3-font-style)] mb-4">
              Everything in Alternipedia, plus:
            </h4>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Use Alternipedia in your own favorite themes, colors, layouts, and fonts
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Take notes, manage, and export them from all over Alternipedia
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Advanced search results
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Semantic searching with the power of AI
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Get access to WikiPal, your Alternipedia AI assistant
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Better topic research with Topic Maps
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              More profile customization options
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              AI translation for any page
            </p>
            <p className="font-p font-[number:var(--p-font-weight)] text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
              Continued support on the Alternipedia App
            </p>
          </div>

          <div className="p-6 relative z-10">
            <div className="flex items-end justify-center gap-2 mb-6">
              <span className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-defaulttextmain text-3xl tracking-[0] leading-[52.5px]">
                $9.99
              </span>
              <span className="font-sub font-[number:var(--sub-font-weight)] text-defaulttextmain text-[length:var(--sub-font-size)] tracking-[var(--sub-letter-spacing)] leading-[var(--sub-line-height)] [font-style:var(--sub-font-style)] mb-2">
                / month
              </span>
            </div>
            <Button className="w-full flex h-[57px] items-center justify-center gap-1.5 p-1.5 rounded-m cursor-pointer hover:bg-[#eecd1b] transition-colors duration-[2000ms] ease-in-out">
              <span className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-defaultbgmain text-base tracking-[0] leading-7">
                Upgrade now
              </span>
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};
