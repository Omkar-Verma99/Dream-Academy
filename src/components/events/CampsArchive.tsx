"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Loader2, Search } from "lucide-react";

import { CampCard } from "@/components/events/CampCard";
import { Button } from "@/components/ui/Button";
import type { CampFilterOptions, CampListItem, CampsPageResult } from "@/lib/content/camp-summaries";

type CampsArchiveProps = {
  initial: CampsPageResult;
  filters: CampFilterOptions;
};

export function CampsArchive({ initial, filters }: CampsArchiveProps) {
  const [items, setItems] = useState<CampListItem[]>(initial.items);
  const [page, setPage] = useState(initial.page);
  const [hasMore, setHasMore] = useState(initial.hasMore);
  const [total, setTotal] = useState(initial.total);
  const [year, setYear] = useState("");
  const [district, setDistrict] = useState("");
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const skipInitialFetch = useRef(true);

  const fetchPage = useCallback(
    async (nextPage: number, replace: boolean) => {
      const params = new URLSearchParams({ page: String(nextPage) });
      if (year) params.set("year", year);
      if (district) params.set("district", district);
      if (query) params.set("q", query);

      const response = await fetch(`/api/camps?${params.toString()}`);
      if (!response.ok) return;

      const data = (await response.json()) as CampsPageResult;
      setItems((current) => (replace ? data.items : [...current, ...data.items]));
      setPage(data.page);
      setHasMore(data.hasMore);
      setTotal(data.total);
    },
    [district, query, year],
  );

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    startTransition(() => {
      void fetchPage(1, true);
    });
  }, [fetchPage, year, district, query]);

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-border bg-paper p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_140px_180px_auto] lg:items-end">
          <div>
            <label htmlFor="camp-search" className="block text-sm font-medium text-ink">
              Search camps
            </label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-subtle"
                aria-hidden="true"
              />
              <input
                id="camp-search"
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") setQuery(searchInput.trim());
                }}
                placeholder="Search by camp name, village, or district…"
                className="input-field input-field--icon"
              />
            </div>
          </div>

          <div>
            <label htmlFor="camp-year" className="block text-sm font-medium text-ink">
              Year
            </label>
            <select
              id="camp-year"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="input-field mt-2 min-w-[140px]"
            >
              <option value="">All years</option>
              {filters.years.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="camp-district" className="block text-sm font-medium text-ink">
              District
            </label>
            <select
              id="camp-district"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              className="input-field mt-2 min-w-[180px]"
            >
              <option value="">All districts</option>
              {filters.districts.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end lg:justify-end">
            <Button
              type="button"
              size="sm"
              onClick={() => setQuery(searchInput.trim())}
              className="w-full lg:w-auto"
            >
              Search
            </Button>
          </div>
        </div>

        <p className="mt-4 text-sm text-ink-muted">
          Showing <strong className="text-ink">{items.length}</strong> of{" "}
          <strong className="text-ink">{total}</strong> camps
          {isPending ? " · Updating…" : ""}
        </p>
      </div>

      {items.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((camp, index) => (
            <li key={camp.slug}>
              <CampCard camp={camp} priority={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-[24px] border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
          <p className="text-sm text-ink-muted">
            No camps match your filters. Try a different year, district, or search term.
          </p>
        </div>
      )}

      {hasMore ? (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={() => startTransition(() => void fetchPage(page + 1, false))}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Loading…
              </>
            ) : (
              "Load more camps"
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
