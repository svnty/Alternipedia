"use client";

import { Button } from "@/components/ui/button";
import { Link } from "react-aria-components";

export default function GoPro({ params: { lang } }: { params: { lang: string } }) {
  
  return (
    <Link href={`/${lang}/upgrade`} className="py-1.5 px-3 rounded-md bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-semibold shadow-sm">Go PRO</Link>
  );
}
