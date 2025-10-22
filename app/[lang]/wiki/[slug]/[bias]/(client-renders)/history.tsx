"use client"

import { useEffect, useId, useState } from "react"
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/app/(components)/ui/badge";
import { Button } from "@/app/(components)/ui/button";
import { Label } from "@/app/(components)/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/app/(components)/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(components)/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/(components)/ui/table";

type Item = {
  // Revision record (minimal shape used by this table)
  id: string
  // ISO date or parsable date string
  revisionDate?: string
  // star count for the revision
  stars?: number
  // link to view the revision
  url?: string
}

export default function HistoryPage() {
  const id = useId();
  const path = usePathname();
  const params = useParams();
  const searchParams = useSearchParams()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (typeof window === 'undefined') {
    return null;
  }

  const columns: ColumnDef<Item>[] = [
    {
      header: "Date",
      accessorKey: "revisionDate",
      cell: ({ row }) => {
        const value = row.getValue("revisionDate") || row.original.revisionDate
        if (!value) return <div className="text-muted-foreground">—</div>
        // Format date safely
        let formatted = String(value);
        try {
          formatted = new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(String(value)))
        } catch (e) {
          // fallback to raw
        }
        return <div className="font-medium float-left mx-5">{formatted}</div>
      },
      size: window.innerWidth > 768 ? 260 : 140,
    },
    {
      id: "stars",
      header: "",
      accessorKey: "stars",
      // middle column: small, float-right badge that shows star count when clicked
      cell: ({ row }) => {
        const stars = (row.getValue("stars") ?? row.original.stars ?? 0) as number
        return (
          <div className="w-full flex">
            <div className="mx-auto">
              <Badge
                onClick={() => alert(`${stars} stars`)}
                className="items-baseline gap-1.5 cursor-pointer"
              >
                Stars
                <span className="text-[0.625rem] font-medium text-primary-foreground/60">
                  {String(stars)}
                </span>
              </Badge>
            </div>
          </div>
        )
      },
      size: 120,
    },
    {
      header: "",
      accessorKey: "url",
      // right column: small icon linking to the revision
      cell: ({ row }) => {
        const url = (row.getValue("url") || row.original.url) as string | undefined
        return (
          <div className="w-full flex">
            <div className="ml-auto">
              {url ? (
                <a
                  href={url}
                  aria-label="View revision"
                  className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted"
                >
                  <ExternalLink />
                </a>
              ) : (
                <div className="h-8 w-8" />
              )}
            </div>
          </div>
        )
      },
      size: 80,
    },
  ]

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const slug = params?.slug
        const lang = params?.lang || 'en'
        const bias = path?.split('/')[4] || '';
        
        if (!slug || !bias) {
          // nothing to fetch
          setData([])
          setLoading(false)
          return
        }

        const q = new URLSearchParams({ slug: String(slug), lang: String(lang), bias: String(bias) })
        const resp = await fetch(`/api/revisions?${q.toString()}`)
        if (!resp.ok) throw new Error(`API error: ${resp.status}`)
        const body = await resp.json()
        const mapped: Item[] = (body.revisions || []).map((r: any) => {
          const slugVal = String(slug)
          const langVal = String(lang)
          const qp = new URLSearchParams({ revision: String(r.id) })
          const url = `/${encodeURIComponent(langVal)}/wiki/${encodeURIComponent(slugVal)}/${bias}?${qp.toString()}`
          return {
            id: String(r.id),
            revisionDate: r.createdAt,
            stars: r.stars ?? 0,
            url,
          }
        })
        setData(mapped)
      } catch (err: any) {
        console.error(err)
        setError(err?.message || 'Failed to load revisions')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  })

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center text-sm text-muted-foreground">Loading revisions…</div>
      ) : (
        <>
          {error ? (
            <div className="text-center text-sm text-red-500">{error}</div>
          ) : (
            <>
              <div className="overflow-hidden rounded-md border bg-background">
                <Table className="table-fixed">
                  <TableHeader className="hidden">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className="hover:bg-transparent">
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead
                              key={header.id}
                              style={{ width: `${header.getSize()}px` }}
                              className="h-11"
                            >
                              {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                <div
                                  className={cn(
                                    header.column.getCanSort() &&
                                    "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                                  )}
                                  onClick={header.column.getToggleSortingHandler()}
                                  onKeyDown={(e) => {
                                    // Enhanced keyboard handling for sorting
                                    if (
                                      header.column.getCanSort() &&
                                      (e.key === "Enter" || e.key === " ")
                                    ) {
                                      e.preventDefault()
                                      header.column.getToggleSortingHandler()?.(e)
                                    }
                                  }}
                                  tabIndex={header.column.getCanSort() ? 0 : undefined}
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {{
                                    asc: (
                                      <ChevronUpIcon
                                        className="shrink-0 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                      />
                                    ),
                                    desc: (
                                      <ChevronDownIcon
                                        className="shrink-0 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                      />
                                    ),
                                  }[header.column.getIsSorted() as string] ?? null}
                                </div>
                              ) : (
                                flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )
                              )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell width={cell.column.getSize()} key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between gap-8">
                {/* Results per page */}
                <div className="flex items-center gap-3">
                  <Label htmlFor={id}>
                    Rows per page
                  </Label>
                  <Select
                    value={table.getState().pagination.pageSize.toString()}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value))
                    }}
                  >
                    <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                      <SelectValue placeholder="Select number of results" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                      {[5, 10, 25, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={pageSize.toString()}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Page number information */}
                <div className="flex grow justify-end text-sm whitespace-nowrap text-muted-foreground">
                  <p
                    className="text-sm whitespace-nowrap text-muted-foreground"
                    aria-live="polite"
                  >
                    <span className="text-foreground">
                      {table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize +
                        1}
                      -
                      {Math.min(
                        Math.max(
                          table.getState().pagination.pageIndex *
                          table.getState().pagination.pageSize +
                          table.getState().pagination.pageSize,
                          0
                        ),
                        table.getRowCount()
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="text-foreground">
                      {table.getRowCount().toString()}
                    </span>
                  </p>
                </div>
                {/* Pagination buttons */}
                <div>
                  <Pagination>
                    <PaginationContent>
                      {/* First page button */}
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="disabled:pointer-events-none disabled:opacity-50"
                          onClick={() => table.firstPage()}
                          disabled={!table.getCanPreviousPage()}
                          aria-label="Go to first page"
                        >
                          <ChevronFirstIcon size={16} aria-hidden="true" />
                        </Button>
                      </PaginationItem>
                      {/* Previous page button */}
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="disabled:pointer-events-none disabled:opacity-50"
                          onClick={() => table.previousPage()}
                          disabled={!table.getCanPreviousPage()}
                          aria-label="Go to previous page"
                        >
                          <ChevronLeftIcon size={16} aria-hidden="true" />
                        </Button>
                      </PaginationItem>
                      {/* Next page button */}
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="disabled:pointer-events-none disabled:opacity-50"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}
                          aria-label="Go to next page"
                        >
                          <ChevronRightIcon size={16} aria-hidden="true" />
                        </Button>
                      </PaginationItem>
                      {/* Last page button */}
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="disabled:pointer-events-none disabled:opacity-50"
                          onClick={() => table.lastPage()}
                          disabled={!table.getCanNextPage()}
                          aria-label="Go to last page"
                        >
                          <ChevronLastIcon size={16} aria-hidden="true" />
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
