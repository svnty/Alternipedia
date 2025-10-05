import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  // This catches any route that doesn't match existing pages in [lang]
  // and triggers the not-found page in this segment
  notFound();
}