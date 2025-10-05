"use client";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { Locale } from "@/lib/i18n/config";
import { useParams } from "next/navigation";

export default function ArticleText() {
  const params = useParams();
  const currentLang = params?.lang as Locale || 'en';
  const dict = getDictionary(currentLang);

  return (
    <div>{dict.article.article}</div>
  )
}