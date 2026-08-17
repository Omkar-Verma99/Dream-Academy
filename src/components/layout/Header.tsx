"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { Button } from "@/components/ui/Button";
import { mainNavigation } from "@/lib/navigation";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [navPath, setNavPath] = useState(pathname);
  const navRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navId = useId();

  if (pathname !== navPath) {
    setNavPath(pathname);
    setOpenNav(null);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenNav(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenNav(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openItem = (href: string) => {
    clearCloseTimer();
    setOpenNav(href);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenNav(null), 120);
  };

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-paper/95 shadow-md backdrop-blur-xl"
          : "border-b border-border/60 bg-paper"
      }`}
    >
      <Container
        as="div"
        className="flex h-[72px] items-center justify-between gap-4 lg:h-[80px]"
      >
        <SiteLogo priority />

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul ref={navRef} className="flex items-center gap-0.5">
            <li>
              <Link
                href="/"
                className={`rounded-full px-3.5 py-2 text-sm font-bold no-underline transition-all duration-200 hover:no-underline ${
                  isActive("/")
                    ? "bg-brand-soft text-brand"
                    : "text-ink-muted hover:bg-surface-sunk hover:text-ink"
                }`}
              >
                Home
              </Link>
            </li>
            {mainNavigation.map((item) => {
              const isOpen = openNav === item.href;
              const panelId = `${navId}-${item.href.replace(/\//g, "")}`;

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openItem(item.href)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.href}
                    className={`rounded-full px-3.5 py-2 text-sm font-bold no-underline transition-all duration-200 hover:no-underline ${
                      isActive(item.href) || isOpen
                        ? "bg-brand-soft text-brand"
                        : "text-ink-muted hover:bg-surface-sunk hover:text-ink"
                    }`}
                    aria-expanded={item.children.length > 0 ? isOpen : undefined}
                    aria-haspopup={item.children.length > 0 ? "menu" : undefined}
                    aria-controls={
                      item.children.length > 0 ? panelId : undefined
                    }
                    onFocus={() => openItem(item.href)}
                  >
                    {item.label}
                  </Link>
                  {item.children.length > 0 ? (
                    <div
                      id={panelId}
                      role="menu"
                      className={`absolute left-0 top-full z-40 min-w-[240px] pt-3 transition-opacity duration-150 ${
                        isOpen
                          ? "visible opacity-100"
                          : "invisible pointer-events-none opacity-0"
                      }`}
                      onMouseEnter={() => openItem(item.href)}
                      onMouseLeave={scheduleClose}
                    >
                      <ul className="overflow-hidden rounded-2xl border border-border bg-paper py-2 shadow-lg">
                        {item.children.map((child) => (
                          <li key={`${item.label}-${child.label}-${child.href}`} role="none">
                            <Link
                              href={child.href}
                              role="menuitem"
                              className="block px-4 py-2.5 text-sm font-medium text-ink-muted no-underline transition-colors hover:bg-brand-soft hover:text-brand hover:no-underline"
                              onClick={() => setOpenNav(null)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/media/videos" variant="ghost" size="sm">
            Health talks
          </Button>
          <Button href="/get-involved#donate" variant="secondary" size="sm">
            Donate
          </Button>
          <Button href="/contact" size="sm">
            Contact
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-paper lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 rounded-full bg-ink transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-ink transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-paper lg:hidden"
        >
          <Container className="py-6">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block rounded-2xl px-4 py-3.5 font-display text-xl font-bold text-ink no-underline hover:bg-brand-soft hover:no-underline"
                >
                  Home
                </Link>
              </li>
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3.5 font-display text-xl font-bold text-ink no-underline hover:bg-brand-soft hover:no-underline"
                  >
                    {item.label}
                  </Link>
                  {item.children.length > 0 ? (
                    <ul className="mb-2 ml-4 space-y-1 border-l-2 border-brand-soft pl-3">
                      {item.children.map((child) => (
                        <li key={`${item.label}-${child.label}-${child.href}`}>
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-muted no-underline hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3">
              <Button href="/media/videos" className="w-full">
                Health talks
              </Button>
              <Button href="/get-involved#donate" className="w-full">
                Donate
              </Button>
              <Button href="/contact" variant="secondary" className="w-full">
                Contact
              </Button>
            </div>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
