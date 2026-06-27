# CONTENT-AND-PAGES.md — Erith Masr

Per-section: layout (faithful to the PDF), the exact **Arabic** copy (source
of truth) and an **English** translation, plus the **animation** spec.

> The site is ONE long landing page. Nav links smooth-scroll to these section
> anchors (RTL order in the navbar, right→left): `#about` من نحن · `#program`
> البرنامج · `#reviews` التقييمات · `#booking` الحجز · `#contact` اتصل بنا.
> The brand logo sits at the inline-end (far right in RTL); "خلوة يا بلدي"
> calligraphy sits at the inline-start (far left in RTL).

Put all strings in `i18n/locales/ar.json` & `en.json` under the keys shown.

---

## NAVBAR (all pages)

- Cream pill bar floating over sand, generous radius, soft shadow.
- Right→left (RTL): **logo (إرث مصر mark + wordmark)**, nav links, a long
  rounded **search pill** with placeholder, then the **"خلوة يا بلدي"**
  calligraphy lockup at the far inline-start. Add a compact **AR | EN** toggle.
- Active link is orange + bold (e.g. على صفحة "من نحن" البند ده يبقى برتقالي).
- Mobile: collapse links into a slide-in drawer; keep logo + a menu button.

| key | AR | EN |
|-----|----|----|
| `nav.about` | من نحن | About |
| `nav.program` | البرنامج | Program |
| `nav.reviews` | التقييمات | Reviews |
| `nav.booking` | الحجز | Booking |
| `nav.contact` | اتصل بنا | Contact |
| `nav.search` | البحث | Search |
| `brand.name` | إرث مصر | ERTH MASR |
| `brand.slogan` | خلوة يا بلدي | — (keep AR calligraphy image) |

---

## SECTION 1 — HERO  (`#home`)  → PDF page 1

**Layout:** sand background. Right side (RTL): big orange-ink display title,
then a lead paragraph, then a **dark** pill CTA. Left/center: the "floating
island" composition — 3 sepia elderly Egyptian men above a montage of Egyptian
landmarks (Qaitbay citadel, pyramids, obelisk, Nile feluccas, mosque,
Alexandria lighthouse, sphinx, pottery) sitting on a slab of land, with a faint
orange palm-shape watermark behind.

| key | AR | EN |
|-----|----|----|
| `hero.title` | رحلة داخل مصر | A Journey Inside Egypt |
| `hero.subtitle` | استمتع بتجربة سياحية لا تُنسى في أرض الحضارة مع برامجنا المصممة خصيصاً لك | Enjoy an unforgettable journey through the land of civilization, with programs designed just for you |
| `hero.cta` | احجز الآن | Book now |

**Assets:** hero island montage + palm watermark from `backgrounds/`. The
`video/intro.*` clip plays here — either as a soft full-bleed background behind
the composition, or revealed on the CTA/hover; muted, autoplay, loop,
playsinline, poster image, lazy-played on view.

**Animation:**
- On load: staggered reveal — title (rises + fades), then subtitle, then CTA
  (`animation-delay` / Motion stagger ~80–120ms each).
- The island gently floats (infinite `translateY` ±6px, ~6s ease-in-out).
- Palm watermark fades/scales in subtly behind.
- CTA: hover lift + slight shadow grow.

---

## SECTION 2 — ABOUT  (`#about`)  → PDF page 2

**Layout:** orange display title "من نحن" at the inline-end. Below it, **three
text columns** (RTL order: intro → vision → mission, each with a small bullet
dot). Then a row of **four white stat cards**, each with a flat orange icon
top-corner, a huge orange number, a unit word, and a caption.

| key | AR | EN |
|-----|----|----|
| `about.title` | من نحن | About us |
| `about.intro` | "إرث" هي منصة رائدة متخصصة في تقديم تجارب سياحية معرفية تهدف إلى إحياء الوعي بالتراث | "Erith" is a leading platform specialized in knowledge-driven travel experiences that revive awareness of heritage |
| `about.vision` | الرؤية: أن نكون المرجع الأول في تقديم السياحة القائمة على المعرفة والهوية، وتحويل مصر من وجهة تقليدية إلى تجربة معرفية ملهمة | Vision: to be the leading reference for knowledge- and identity-based tourism, turning Egypt from a conventional destination into an inspiring journey of discovery |
| `about.mission` | الرسالة: تمكين السياح والمهتمين من استكشاف "الإرث" المصري الحقيقي من خلال دقة المعلومات وجودة التنظيم | Mission: to empower travelers and enthusiasts to explore Egypt's true heritage through accurate information and excellent organization |

**Stat cards** (icon from `icones/`):
| key | number | unit AR / EN | caption AR | caption EN |
|-----|--------|--------------|------------|------------|
| `about.stat1` | 10 | آلاف / thousand | عميل سعيد شاركونا مغامراتهم في اكتشاف مصر | happy clients who shared their adventures discovering Egypt |
| `about.stat2` | +500 | رحلة / trips | تم إتمامها بنجاح بأعلى معايير الجودة والأمان | completed successfully to the highest standards of quality and safety |
| `about.stat3` | 25 | وجهة / destinations | تغطي أجمل المدن المصرية من النوبة إلى الساحل الشمالي | covering Egypt's finest cities from Nubia to the North Coast |
| `about.stat4` | 10 | سنوات / years | من الخبرة في تنظيم الرحلات السياحية داخل مصر | of experience organizing tours inside Egypt |

**Animation:** columns fade/slide up on reveal (stagger). Stat numbers
**count up** from 0 when the card enters view (respect reduced-motion → show
final value). Cards lift slightly on hover.

---

## SECTION 3 — TRIP PROGRAM  (`#program`)  → PDF page 3  ★ signature section

**Layout:** orange title "برنامج الرحلة" top inline-end. A **winding dashed
teal route** runs vertically down the section like a sailing path, starting
from a small sailboat icon at the top. Destinations alternate sides as cards
that the path connects:
1. **جزيرة إلفنتين** — title with ✶ ornaments, naskh description, small flat
   icons (wheat / water-waves pattern / palm), photo of Aswan-Nile on the
   inline-end.
2. **القرية النوبية** — photo on the inline-start, title + description on the
   inline-end, colorful Nubian-house icons.
3. **معبد أبو سمبل** — title + description, temple photo, temple-column icons.
A small Nubian-figure avatar sits near the end of the path. Footer strip
(`--sand-deep`) holds a teal sailboat illustration, two **dark** buttons
("تحميل البرنامج" / "للحجز"), and teal Egyptian columns.

| key | AR | EN |
|-----|----|----|
| `program.title` | برنامج الرحلة | The Journey Program |
| `program.dest1.title` | جزيرة إلفنتين | Elephantine Island |
| `program.dest1.text` | تقع جزيرة إلفنتين وسط النيل بأسوان، وكانت قديماً مركزاً دينياً وتجارياً هاماً وحصناً حدودياً جنوبياً. تتميز الجزيرة بمعالمها الأثرية كمعبد خنوم ومقياس النيل، وبقرى نوبية نابضة بالحياة | In the middle of the Nile at Aswan, Elephantine was once an important religious and trade center and a southern frontier fortress. It is known for monuments such as the Temple of Khnum and the Nilometer, and for its lively Nubian villages |
| `program.dest2.title` | القرية النوبية | The Nubian Village |
| `program.dest2.text` | ليست مجرد مكان للسكن، بل هي تجسيد حي لتاريخ وحضارة شعب عريق، وتحمل في طياتها ملامح أصالة وتراث فريد يستحق الاستكشاف والتقدير | More than a place to live, it is a living embodiment of an ancient people's history and culture — carrying a unique authenticity and heritage worth exploring and appreciating |
| `program.dest3.title` | معبد أبو سمبل | Abu Simbel Temple |
| `program.dest3.text` | تحفة معمارية منحوتة في الصخر بأمر رمسيس الثاني في النوبة، يجسد عظمة مصر القديمة وتحدي الإنسان في إنقاذه من الغرق، ويُعد رمزاً عظيماً للحضارة المصرية القديمة | A masterpiece carved into rock by order of Ramses II in Nubia. It embodies the grandeur of ancient Egypt and humanity's feat in rescuing it from flooding — a great symbol of ancient Egyptian civilization |
| `program.download` | تحميل البرنامج | Download program |
| `program.book` | للحجز | Book now |

**Animation — the centerpiece:**
- Build the route as a single **SVG `<path>`** matching the PDF's winding
  dashed line. Animate `stroke-dashoffset` from full→0 tied to scroll progress
  (`useScroll` + `useTransform`) so the path **draws itself** as the user
  scrolls the section.
- The **sailboat travels along the path** using `offset-path: path(...)` /
  `offsetDistance` driven by the same scroll progress (or Motion path follow).
- Each destination card **reveals as the boat reaches it** (whileInView, slight
  slide from its side). The ✶ ornament strokes draw in (stroke-dashoffset).
- Footer columns/sailboat fade up. Reduced-motion → path shown fully drawn,
  cards just fade.

---

## SECTION 4 — ASWAN DOCUMENTARY  (`#aswan`)  → NEW (uses `video/aswan.*`)

**Not in the PDF — our enhancement** to place the client's own footage.
Full-bleed band between Program and Reviews: the `aswan` video as muted,
looping, playsinline background with a dark gradient scrim, a short bilingual
title/caption, and a gentle Ken-Burns zoom.

**Orientation fix:** the footage is rotated wrong. Wrap the `<video>` in a
fixed-aspect frame and apply `transform: rotate(var(--aswan-rotate))` with
`object-fit: cover` and slight `scale()` so corners never show empty. Start
`--aswan-rotate: -45deg` and tell the client it's tunable in one place.

| key | AR | EN |
|-----|----|----|
| `aswan.title` | حكاية أسوان | The Story of Aswan |
| `aswan.caption` | لقطات من رحلاتنا في قلب النوبة | Footage from our journeys into the heart of Nubia |

*(If the client prefers, this video can instead replace the still image on the
Booking section — keep the component reusable. Confirm placement.)*

---

## SECTION 5 — REVIEWS  (`#reviews`)  → PDF page 4

**Layout:** orange heading, then **four review cards** in a row, vertically
**staggered** (alternating slight up/down offset). Each card: rounded portrait
photo (from `avater/`), orange bold name, country in parentheses, big orange
rating number + gold star row, short review text.

| key | AR | EN |
|-----|----|----|
| `reviews.title` | شاركنا عملاؤنا لحظات استثنائية في اكتشاف إرث مصر الحقيقي | Our clients shared exceptional moments discovering the true heritage of Egypt |
| `reviews.r1.name` | أبو سالم | Abu Salem |
| `reviews.r1.country` | (السعودية) | (Saudi Arabia) |
| `reviews.r1.rating` | 4.2 | 4.2 |
| `reviews.r1.text` | تنظيم ممتاز وبرنامج متكامل خصوصاً زيارة القرية النوبية | Excellent organization and a complete program — the Nubian village visit especially |
| `reviews.r2.name` | بن نجاح | Ben Najah |
| `reviews.r2.country` | (الإمارات) | (UAE) |
| `reviews.r2.rating` | 4.5 | 4.5 |
| `reviews.r2.text` | معبد فيلة سحره لا يوصف والقرية النوبية بألوانها | The magic of Philae temple is indescribable, and the Nubian village with its colors |
| `reviews.r3.name` | حكيم زياش | Hakim Ziyech |
| `reviews.r3.country` | (المغرب) | (Morocco) |
| `reviews.r3.rating` | 4.2 | 4.2 |
| `reviews.r3.text` | الرحلة كانت منظمة جداً والاستيقاظ على منظر النيل كان حلم وتحقق | The trip was very well organized, and waking up to the Nile view was a dream come true |
| `reviews.r4.name` | عبد الله أحمد | Abdullah Ahmed |
| `reviews.r4.country` | (السودان) | (Sudan) |
| `reviews.r4.rating` | 4.5 | 4.5 |
| `reviews.r4.text` | من لحظة الاستقبال لحد الوداع وكل شيء كان مثالي، الأكل النوبي طعمه خيال | From welcome to farewell everything was perfect — the Nubian food tasted incredible |

**Animation:** cards reveal in sequence (stagger) with their stagger offset;
stars fill left-to-right (logical: start→end) on reveal; subtle hover tilt/lift.

---

## SECTION 6 — BOOKING  (`#booking`)  → PDF page 5

**Layout:** left (inline-start) a tall portrait **Aswan sunset photo** (rounded,
soft shadow) — from `backgrounds/`. Right (inline-end): orange title, lead
paragraph, an **email** field, a **password** field, a full-width **orange**
"الإرسال" button, then a "تواصل معانا" divider with **Facebook / Instagram /
TikTok** icons.

| key | AR | EN |
|-----|----|----|
| `booking.title` | احجز رحلتك الآن | Book your journey now |
| `booking.subtitle` | ابدأ رحلتك داخل عمق الحضارة المصرية مع برامج مصممة لتجربة لا تُنسى | Begin your journey into the depth of Egyptian civilization with programs built for an unforgettable experience |
| `booking.email` | البريد الإلكتروني | Email |
| `booking.password` | كلمة السر | Password |
| `booking.submit` | الإرسال | Submit |
| `booking.followus` | تواصل معانا | Follow us |

**Animation:** image reveals with a soft clip/scale; fields fade in staggered;
button hover = darken + lift; social icons pop in. Wire real `onClick`
handlers + client-side validation (no native `<form>` submit needed; show a
success/error toast). Keep it accessible (labels, error text bilingual).

---

## SECTION 7 — CONTACT  (`#contact`)  → PDF page 6

**Layout:** left (inline-start) a **Google Maps iframe** of Rabie Tours. Right
(inline-end): a contact form — first name + last name (two columns), phone,
message textarea, and a "Send message" button (outline style per PDF). Below,
a row of **four info cards** with dark circular icons: address, phones, email,
working hours.

| key | AR | EN |
|-----|----|----|
| `contact.title` | اتصل بنا | Contact us |
| `contact.firstName` | الاسم الأول | First name |
| `contact.lastName` | الاسم الأخير | Last name |
| `contact.phone` | رقم الهاتف | Phone |
| `contact.message` | رسالتك | Your message |
| `contact.placeholderFirst` | مثال: محمد | e.g. John |
| `contact.placeholderLast` | مثال: أحمد | e.g. Doe |
| `contact.placeholderHere` | اكتب هنا | Enter here |
| `contact.send` | إرسال الرسالة | Send message |
| `contact.addressTitle` | العنوان | Address |
| `contact.address` | ٣٧ أحمد عرابي، مدينة الإعلام، حي العجوزة، محافظة الجيزة | 37 Ahmed Orabi, Media City, El Agouza, Giza |
| `contact.phonesTitle` | أرقام التواصل | Contact numbers |
| `contact.phones` | 01227793777 — 01027793845 | 01227793777 — 01027793845 |
| `contact.emailTitle` | الأيميل | Email |
| `contact.email` | ticketing@rabietours.com | ticketing@rabietours.com |
| `contact.hoursTitle` | مواعيد العمل | Working hours |
| `contact.hours` | الإثنين–الجمعة 09:00–22:00 · الأحد 11:00–20:00 · السبت: إجازة | Mon–Fri 09:00–22:00 · Sun 11:00–20:00 · Sat: closed |

Map embed (Rabie Tours, El Agouza – Giza): use a Google Maps place embed
`<iframe>`; if you can't resolve the exact place ID, embed a search for
"Rabie Tours El Agouza Giza" and leave a `TODO` for the client to paste the
final embed URL.

**Animation:** map + form slide in from opposite sides; info cards stagger up;
inputs have focus ring in `--orange`.

---

## Optional enhancement — EXPLORE EGYPT gallery

If `backgrounds/` contains extra temple/governorate photos the client wants to
showcase, add a tasteful **"استكشف مصر / Explore Egypt"** masonry/gallery
section (between Reviews and Booking) with short, **original** bilingual
captions per landmark. Write the captions in your own words (don't copy text
from websites). Keep it on-brand and lazy-loaded. Confirm with the client
before adding heavy content.

---

## Footer

Reuse the brand lockup + quick nav + social + a short copyright line.
`© {year} إرث مصر — Rabie Tours`. Keep it on `--sand-deep` or `--ink` per the
chosen look; match the program footer band styling for cohesion.
