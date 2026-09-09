"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/shared/components";
import { cn } from "@/shared/lib/utils";

const AUTOPLAY_MS = 3000;
const SWIPE_THRESHOLD = 40;

const images = [
  "/images/Img galeria/2.jpeg",
  "/images/Img galeria/3.jpeg",
  "/images/Img galeria/5.jpeg",
  "/images/Img galeria/6.jpeg",
  "/images/Img galeria/7.jpeg",
  "/images/Img galeria/8.jpeg",
  "/images/Img galeria/9.jpeg",
  "/images/Img galeria/10.jpeg",
  "/images/Img galeria/11.jpeg",
] as const;

export function GallerySection() {
  const t = useTranslations("home.gallery");
  const [active, setActive] = useState(0);
  const thumbRefs = useRef<Array<HTMLLIElement | null>>([]);
  const thumbListRef = useRef<HTMLUListElement | null>(null);

  const goTo = useCallback((index: number) => {
    setActive(((index % images.length) + images.length) % images.length);
  }, []);

  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);

  const swipeStartX = useRef<number | null>(null);

  const onSwipeStart = useCallback((clientX: number) => {
    swipeStartX.current = clientX;
  }, []);

  const onSwipeEnd = useCallback(
    (clientX: number) => {
      if (swipeStartX.current === null) return;
      const delta = clientX - swipeStartX.current;
      swipeStartX.current = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (delta < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [active]);

  useEffect(() => {
    const list = thumbListRef.current;
    const thumb = thumbRefs.current[active];
    if (!list || !thumb) return;
    const listRect = list.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const delta = thumbRect.left - listRect.left - (listRect.width - thumbRect.width) / 2;
    list.scrollTo({ left: list.scrollLeft + delta, behavior: "smooth" });
  }, [active]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
      <Reveal className="mb-10 max-w-2xl">
        <h2 className="text-3xl text-foreground md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </Reveal>

      <Reveal>
        <div
          className="relative aspect-video w-full touch-pan-y select-none overflow-hidden rounded-lg border border-border shadow-elevated"
          onTouchStart={(event) => onSwipeStart(event.touches[0].clientX)}
          onTouchEnd={(event) => onSwipeEnd(event.changedTouches[0].clientX)}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse") onSwipeStart(event.clientX);
          }}
          onPointerUp={(event) => {
            if (event.pointerType === "mouse") onSwipeEnd(event.clientX);
          }}
        >
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              draggable={false}
              sizes="(min-width: 1024px) 72rem, 100vw"
              priority={index === 0}
              className={cn(
                "pointer-events-none object-cover transition-opacity duration-700 ease-out",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}

          <button
            type="button"
            onClick={goPrev}
            aria-label={t("prevLabel")}
            className="-translate-y-1/2 absolute top-1/2 left-3 z-10 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-soft backdrop-blur transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={t("nextLabel")}
            className="-translate-y-1/2 absolute top-1/2 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-soft backdrop-blur transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronRight className="size-6" aria-hidden />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label={t("prevLabel")}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>

          <ul
            ref={thumbListRef}
            className="flex flex-1 snap-x scroll-px-2 gap-2 overflow-x-auto scroll-smooth py-1 sm:gap-3"
          >
            {images.map((src, index) => (
              <li
                key={src}
                ref={(node) => {
                  thumbRefs.current[index] = node;
                }}
                className="w-1/4 shrink-0 snap-center sm:w-1/6"
              >
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={t("thumbnailLabel", { index: index + 1 })}
                  aria-current={index === active}
                  className={cn(
                    "relative block aspect-video w-full overflow-hidden rounded-md border transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    index === active
                      ? "border-primary opacity-100 shadow-soft"
                      : "border-border opacity-60 hover:opacity-100",
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 12rem, 25vw"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={goNext}
            aria-label={t("nextLabel")}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
