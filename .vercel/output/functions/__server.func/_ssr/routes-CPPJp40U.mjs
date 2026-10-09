import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ChevronLeft, r as ChevronRight, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CPPJp40U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var photos = [
	{
		id: "01",
		title: "החוף",
		caption: "רצועת החול לאורך המפרץ, והעיר הריקה מאחוריה",
		w: 2e3,
		h: 1333
	},
	{
		id: "02",
		title: "בנק קפריסין",
		caption: "רחוב ראשי בלי מכוניות, השלט עוד על החזית",
		w: 2e3,
		h: 1406
	},
	{
		id: "03",
		title: "השדרה",
		caption: "תריסים מוגפים ורמזור שנעצר",
		w: 2e3,
		h: 1281
	},
	{
		id: "04",
		title: "המגדלים",
		caption: "חזיתות בטון מחוררות מול שמיים פתוחים",
		w: 2e3,
		h: 1333
	},
	{
		id: "05",
		title: "ניו סמוקי ג׳וז",
		caption: "מסעדה פאבלוס, מנוף בנייה מעל השלד",
		w: 2e3,
		h: 1333
	},
	{
		id: "06",
		title: "קפה אדלווייס",
		caption: "אותיות מתכת מעל זכוכית מאובקת",
		w: 2e3,
		h: 1333
	},
	{
		id: "07",
		title: "טויוטה",
		caption: "שלט על גג בניין שחלונותיו נשברו",
		w: 2e3,
		h: 1333
	},
	{
		id: "08",
		title: "אורפנוס",
		caption: "אותיות עץ שבורות מעל סורג",
		w: 2e3,
		h: 1333
	},
	{
		id: "09",
		title: "שיון האוס",
		caption: "שם הבית מתקלף, הסורג עוד סוגר",
		w: 1333,
		h: 2e3
	},
	{
		id: "10",
		title: "פאולוס קיריאקו",
		caption: "חנות ספרים, התריס יורד על הריסות",
		w: 2e3,
		h: 1333
	},
	{
		id: "11",
		title: "השוק",
		caption: "שלטי דרך: באזאר, כניסה, יוניסקס",
		w: 1333,
		h: 2e3
	},
	{
		id: "12",
		title: "זאקו",
		caption: "חזית מתפוררת ושלט אזהרה אדום",
		w: 2e3,
		h: 1333
	},
	{
		id: "13",
		title: "אזור אסור",
		caption: "חלונות אטומים ושלטי איסור בכמה שפות",
		w: 1333,
		h: 2e3
	},
	{
		id: "14",
		title: "הווילה",
		caption: "עץ יבש מול תריסים ירוקים",
		w: 2e3,
		h: 1333
	},
	{
		id: "15",
		title: "הבית",
		caption: "מרפסת חשופה מאחורי גדר חלודה",
		w: 2e3,
		h: 1333
	},
	{
		id: "17",
		title: "אותה תיבה",
		caption: "הצבע מתקלף, הכתובת עוד שם",
		w: 1333,
		h: 2e3
	},
	{
		id: "18",
		title: "קוקה־קולה",
		caption: "שלט חלוד על קיר טיח",
		w: 2e3,
		h: 1333
	},
	{
		id: "19",
		title: "הממתקייה",
		caption: "סבן־אפ וקוקה־קולה, ס. מליניוטיס",
		w: 2e3,
		h: 1333
	},
	{
		id: "20",
		title: "החלון",
		caption: "חדר ריק מעבר לזגוגית שבורה",
		w: 1333,
		h: 2e3
	}
];
function thumbSrc(id) {
	return `/gallery/t/${id}.jpg`;
}
function fullSrc(id) {
	return `/gallery/f/${id}.jpg`;
}
var SCALE = 1.5;
function fitBox(base, photo) {
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
	return {
		w: Math.round(w * s),
		h: Math.round(h * s)
	};
}
function Gallery() {
	const [view, setView] = (0, import_react.useState)(null);
	const [, bump] = (0, import_react.useState)(0);
	const [sharp, setSharp] = (0, import_react.useState)(false);
	const captionId = (0, import_react.useId)();
	const count = photos.length;
	const photo = view ? photos[view.index] : null;
	const box = view && photo ? fitBox(view.base, photo) : null;
	const close = (0, import_react.useCallback)(() => setView(null), []);
	const step = (0, import_react.useCallback)((dir) => {
		setView((current) => {
			if (!current) return current;
			const index = (current.index + dir + count) % count;
			return {
				index,
				base: document.querySelector(`[data-photo="${photos[index].id}"] img`)?.getBoundingClientRect().width || current.base
			};
		});
	}, [count]);
	(0, import_react.useEffect)(() => {
		if (!view) return;
		const onKey = (event) => {
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
	}, [
		view,
		close,
		step
	]);
	(0, import_react.useEffect)(() => {
		if (!photo) return;
		let cancel = false;
		setSharp(false);
		const img = new Image();
		img.onload = () => {
			if (!cancel) setSharp(true);
		};
		img.src = fullSrc(photo.id);
		const index = photos.findIndex((item) => item.id === photo.id);
		const warm = (id) => {
			const preload = new Image();
			preload.src = fullSrc(id);
		};
		warm(photos[(index + 1) % count].id);
		warm(photos[(index - 1 + count) % count].id);
		return () => {
			cancel = true;
		};
	}, [photo, count]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		onContextMenu: (event) => {
			const node = event.target;
			if (!(node instanceof Element)) return;
			if (node.closest("[data-photo], .float-shadow")) event.preventDefault();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto max-w-6xl px-4 pt-10 pb-8 md:px-8 md:pt-16 md:pb-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-xs font-medium text-mute",
						children: "פמגוסטה · 1974"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-5 font-display text-5xl leading-none font-medium text-ink md:text-7xl",
						children: [
							"ורושה",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "latin-mark mt-3 block font-sans text-base font-medium md:text-2xl",
								lang: "en",
								children: "VAROSHA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-4 block font-display text-3xl leading-tight md:text-5xl",
								children: "עיירת הרפאים שננטשה"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-base leading-relaxed text-mute",
						children: "רובע הנופש של פמגוסטה נסגר ב־1974. הרחובות, השלטים ובתי הקפה נשארו במקומם."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 border-t border-ink" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-6xl px-4 pb-10 md:px-8 md:pb-14",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "masonry",
					children: photos.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-photo": item.id,
						className: "no-save block w-full border-2 border-ink bg-paper text-start transition-transform duration-200 ease-out active:scale-[0.98]",
						onClick: (event) => {
							const base = event.currentTarget.querySelector("img")?.getBoundingClientRect().width || event.currentTarget.getBoundingClientRect().width;
							setView({
								index,
								base
							});
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: thumbSrc(item.id),
							alt: `${item.title}. ${item.caption}`,
							width: item.w,
							height: item.h,
							draggable: false,
							onDragStart: (event) => event.preventDefault(),
							decoding: "async",
							loading: index < 4 ? "eager" : "lazy",
							fetchPriority: index < 2 ? "high" : "auto",
							className: "block h-auto w-full"
						})
					}, item.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto max-w-6xl px-4 pt-2 pb-14 text-center text-sm leading-relaxed text-mute md:px-8 md:pb-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "כל התצלומים צולמו ע״י נעם כץ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://www.noamkatzart.com/linktree",
					className: "mt-1 inline-block text-ink underline decoration-ink/40 underline-offset-4",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "noamkatzart.com"
				})]
			}),
			view && photo && box ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
				photo,
				box,
				from: Math.min(1, view.base / box.w),
				sharp,
				captionId,
				onClose: close,
				onPrev: () => step(-1),
				onNext: () => step(1)
			}) : null
		]
	});
}
function Lightbox({ photo, box, from, sharp, captionId, onClose, onPrev, onNext }) {
	const [drag, setDrag] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": captionId,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scrim-in absolute inset-0 bg-ink/75",
				onClick: onClose
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				"aria-label": "סגירה",
				className: "absolute top-4 left-4 z-20 flex size-11 items-center justify-center border border-paper/40 bg-ink/80 text-paper transition-transform duration-150 ease-out active:scale-[0.96]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					className: "size-5",
					strokeWidth: 1.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onPrev,
				"aria-label": "התצלום הקודם",
				className: "absolute top-1/2 left-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center border border-paper/40 bg-ink/80 text-paper transition-transform duration-150 ease-out active:scale-[0.96] md:left-5 md:size-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: "size-6",
					strokeWidth: 1.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onNext,
				"aria-label": "התצלום הבא",
				className: "absolute top-1/2 right-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center border border-paper/40 bg-ink/80 text-paper transition-transform duration-150 ease-out active:scale-[0.96] md:right-5 md:size-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: "size-6",
					strokeWidth: 1.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lift pointer-events-auto relative",
					style: {
						width: box.w,
						height: box.h,
						["--lift-from"]: String(from)
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-save float-shadow relative h-full w-full touch-none border-2 border-ink bg-ink",
						onPointerDown: (event) => {
							if (event.pointerType === "mouse" && event.button !== 0) return;
							event.currentTarget.setPointerCapture(event.pointerId);
							setDrag(event.clientX);
						},
						onPointerUp: (event) => {
							if (drag == null) return;
							const dx = event.clientX - drag;
							setDrag(null);
							if (dx > 48) onPrev();
							else if (dx < -48) onNext();
						},
						onPointerCancel: () => setDrag(null),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sharp ? fullSrc(photo.id) : thumbSrc(photo.id),
							alt: "",
							width: photo.w,
							height: photo.h,
							draggable: false,
							onDragStart: (event) => event.preventDefault(),
							className: "photo-in block h-full w-full object-contain select-none"
						}, photo.id)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						id: captionId,
						className: "absolute top-full right-0 left-0 mt-4 text-center text-paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-base font-medium",
								children: photo.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm opacity-80",
								children: photo.caption
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-2 block text-xs opacity-70 tabular-nums",
								children: [
									String(photos.findIndex((item) => item.id === photo.id) + 1).padStart(2, "0"),
									" /",
									" ",
									String(photos.length).padStart(2, "0")
								]
							})
						]
					})]
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {});
}
//#endregion
export { Home as component };
