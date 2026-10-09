import { useCallback, useEffect, useId, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { fullSrc, photos, thumbSrc, type Photo } from "@/data/photos";

const SCALE = 1.5;

type View = {
  index: number;
  base: number;
};

function fitBox(base: number, photo: Photo) {
  const narrow = window.innerWidth < 640;
  const marginX = narrow ? 14 : 96;
  const marginY = narrow ? 112 : 78;
  const aspect = photo.h / photo.w;
  let w = base * SCALE;
  let h = w * aspect;
  if (narrow) {
    const comfortable = window.innerWidth - marginX * 2;
    if (w < comfortable) {
      w = comfortable;
      h = w * aspect;
    }
  }
  const maxW = Math.max(160, window.innerWidth - marginX * 2);
  const maxH = Math.max(160, window.innerHeight - marginY * 2);
  const s = Math.min(1, maxW / w, maxH / h);
  return { w: Math.round(w * s), h: Math.round(h * s) };
}

export function Gallery() {
  const [view, setView] = useState<View | null>(null);
  const [, bump] = useState(0);
  const [sharp, setSharp] = useState(false);
  const captionId = useId();

  const count = photos.length;
  const photo = view ? photos[view.index] : null;
  const box = view && photo ? fitBox(view.base, photo) : null;

  const close = useCallback(() => setView(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setView((current) => {
        if (!current) return current;
        const index = (current.index + dir + count) % count;
        const el = document.querySelector<HTMLImageElement>(
          `[data-photo="${photos[index].id}"] img`,
        );
        const base = el?.getBoundingClientRect().width || current.base;
        return { index, base };
      });
    },
    [count],
  );

  useEffect(() => {
    if (!view) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
    };
    const onResize = () => bump((n) => n + 1);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [view, close, step]);

  useEffect(() => {
    if (!photo) return;
    let cancel = false;
    setSharp(false);
    const img = new Image();
    img.onload = () => {
      if (!cancel) setSharp(true);
    };
    img.src = fullSrc(photo.id);
    const index = photos.findIndex((item) => item.id === photo.id);
    const warm = (id: string) => {
      const preload = new Image();
      preload.src = fullSrc(id);
    };
    warm(photos[(index + 1) % count].id);
    warm(photos[(index - 1 + count) % count].id);
    return () => {
      cancel = true;
    };
  }, [photo, count]);

  return (
    <div
      className="min-h-screen bg-paper text-ink"
      onContextMenu={(event) => {
        const node = event.target;
        if (!(node instanceof Element)) return;
        if (node.closest("[data-photo], .float-shadow")) event.preventDefault();
      }}
    >
      <header className="mx-auto max-w-6xl px-4 pt-10 pb-8 md:px-8 md:pt-16 md:pb-12">
        <p className="kicker text-xs font-medium text-mute">פמגוסטה · 1974</p>
        <h1 className="mt-5 font-display text-5xl leading-none font-medium text-ink md:text-7xl">
          ורושה
          <span className="latin-mark mt-3 block font-sans text-base font-medium md:text-2xl" lang="en">
            VAROSHA
          </span>
          <span className="mt-4 block font-display text-3xl leading-tight md:text-5xl">
            עיירת הרפאים שננטשה
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mute">
          רובע הנופש של פמגוסטה נסגר ב־1974. הרחובות, השלטים ובתי הקפה נשארו במקומם.
        </p>
        <div className="mt-8 border-t border-ink" />
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-10 md:px-8 md:pb-14">
        <div className="masonry">
          {photos.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-photo={item.id}
              className="no-save block w-full border-2 border-ink bg-paper text-start transition-transform duration-200 ease-out active:scale-[0.98]"
              onClick={(event) => {
                const img = event.currentTarget.querySelector("img");
                const base =
                  img?.getBoundingClientRect().width ||
                  event.currentTarget.getBoundingClientRect().width;
                setView({ index, base });
              }}
            >
              <img
                src={thumbSrc(item.id)}
                alt={`${item.title}. ${item.caption}`}
                width={item.w}
                height={item.h}
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                decoding="async"
                loading={index < 4 ? "eager" : "lazy"}
                fetchPriority={index < 2 ? "high" : "auto"}
                className="block h-auto w-full"
              />
            </button>
          ))}
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pt-2 pb-14 text-center text-sm leading-relaxed text-mute md:px-8 md:pb-20">
        <p>כל התצלומים צולמו ע״י נעם כץ</p>
        <a
          href="https://www.noamkatzart.com/linktree"
          className="mt-1 inline-block text-ink underline decoration-ink/40 underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          noamkatzart.com
        </a>
      </footer>

      {view && photo && box ? (
        <Lightbox
          photo={photo}
          box={box}
          from={Math.min(1, view.base / box.w)}
          sharp={sharp}
          captionId={captionId}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      ) : null}
    </div>
  );
}

function Lightbox({
  photo,
  box,
  from,
  sharp,
  captionId,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo;
  box: { w: number; h: number };
  from: number;
  sharp: boolean;
  captionId: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [drag, setDrag] = useState<number | null>(null);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={captionId}
    >
      <div className="scrim-in absolute inset-0 bg-ink/75" onClick={onClose} />

      <button
        type="button"
        onClick={onClose}
        aria-label="סגירה"
        className="absolute top-4 left-4 z-20 flex size-11 items-center justify-center border border-paper/40 bg-ink/80 text-paper transition-transform duration-150 ease-out active:scale-[0.96]"
      >
        <X className="size-5" strokeWidth={1.5} />
      </button>

      <button
        type="button"
        onClick={onPrev}
        aria-label="התצלום הקודם"
        className="absolute top-1/2 left-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center border border-paper/40 bg-ink/80 text-paper transition-transform duration-150 ease-out active:scale-[0.96] md:left-5 md:size-12"
      >
        <ChevronLeft className="size-6" strokeWidth={1.5} />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="התצלום הבא"
        className="absolute top-1/2 right-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center border border-paper/40 bg-ink/80 text-paper transition-transform duration-150 ease-out active:scale-[0.96] md:right-5 md:size-12"
      >
        <ChevronRight className="size-6" strokeWidth={1.5} />
      </button>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="lift pointer-events-auto relative"
          style={{ width: box.w, height: box.h, ["--lift-from" as string]: String(from) }}
        >
          <div
            className="no-save float-shadow relative h-full w-full touch-none border-2 border-ink bg-ink"
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              setDrag(event.clientX);
            }}
            onPointerUp={(event) => {
              if (drag == null) return;
              const dx = event.clientX - drag;
              setDrag(null);
              if (dx > 48) onPrev();
              else if (dx < -48) onNext();
            }}
            onPointerCancel={() => setDrag(null)}
          >
            <img
              key={photo.id}
              src={sharp ? fullSrc(photo.id) : thumbSrc(photo.id)}
              alt=""
              width={photo.w}
              height={photo.h}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              className="photo-in block h-full w-full object-contain select-none"
            />
          </div>
          <p id={captionId} className="absolute top-full right-0 left-0 mt-4 text-center text-paper">
            <span className="block text-base font-medium">{photo.title}</span>
            <span className="mt-1 block text-sm opacity-80">{photo.caption}</span>
            <span className="mt-2 block text-xs opacity-70 tabular-nums">
              {String(photos.findIndex((item) => item.id === photo.id) + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
