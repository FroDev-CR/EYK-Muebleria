"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORY_GROUPS } from "@/lib/data";

export function CategoryTabs() {
  const params = useSearchParams();
  const current = params.get("grupo");

  const items = [
    { id: null as string | null, label: "Todo" },
    ...CATEGORY_GROUPS.map((g) => ({ id: g.id as string | null, label: g.label })),
  ];

  return (
    <nav aria-label="Filtrar por categoría" className="-mx-4 overflow-x-auto px-4">
      <ul className="flex items-center gap-1 min-w-max border-b border-[var(--color-line)]">
        {items.map((item) => {
          const active = item.id === current || (item.id === null && !current);
          const href = item.id ? `/catalogo?grupo=${item.id}` : "/catalogo";
          return (
            <li key={item.id ?? "todo"}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative inline-flex items-center px-5 py-3.5 text-[0.95rem] transition-colors duration-300 min-h-[44px]",
                  active
                    ? "text-[var(--color-ink)] font-medium"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
                ].join(" ")}
              >
                {item.label}
                <span
                  aria-hidden
                  className={[
                    "absolute left-3 right-3 -bottom-px h-0.5 bg-[var(--color-walnut)] transition-transform duration-300 origin-left",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
