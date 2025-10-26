import ClientLoadedSignal from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/load-signal";

import { HomeIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/(components)/ui/breadcrumb";

export default function Page() {
  return (
    <div className="wikipedia-article">
      <ClientLoadedSignal />
      <Breadcrumb className="mx-3.5">
        <BreadcrumbList className="rounded-md border bg-background px-3 py-2 shadow-xs">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Article
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Conservative</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Discussion</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>I'm an idiot</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>Placeholder page for bias thread pagination</div>
    </div>
  );
}