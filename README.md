# Ever Clean Services — Website

Website for **Ever Clean Services**, a professional cleaning company in **Calgary, Alberta**.
Services: **Homes | Offices | Airbnb** — *Spotless results, every time.*

- **Public link (GitHub Pages):** https://kimciddev.github.io/everclean-cleaning-co/
- **Status:** 🟡 Prototype (v0.1) — waiting for validation
- **Instagram:** [@buter_scleaning](https://www.instagram.com/buter_scleaning/)

## What's in the site

| Section | What it does |
|---|---|
| Home (hero) | Name, slogan and the **Book your cleaning today** button |
| Services | Cards for Homes, Offices and Airbnb → each opens its own detail page |
| Service page | `service.html?s=homes` / `offices` / `airbnb` — product-page style, with booking button |
| Search | Magnifier icon in the header filters the services (home, office, Airbnb, rental…) |
| About | Short presentation of Ever Clean Services in Calgary |
| Photos | Placeholders until real photos are provided + link to Instagram |
| Book | Form builds the booking message, copies it and opens the Instagram chat (ig.me) |

Visual reference: the clean e-commerce feel of [dimirandajoias.com.br](https://dimirandajoias.com.br/)
(announcement bar, centered logo, search, large media, direct detail pages).

## Files

```
index.html        Home page (all main sections)
service.html      Service detail page (content comes from js/data.js)
css/style.css     All styles, mobile-first
js/data.js        Services and contact data — edit texts here
js/main.js        Menu, search, booking form, service page rendering
assets/img/       Logo and favicon
```

No build step, no frameworks. Only external resource: Google Fonts (Montserrat + Playfair Display).

## How to open locally

Open `index.html` in a browser, or run a tiny server (recommended, so the service pages work the same as online):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## How to add real photos

1. Put the images in `assets/img/work/` (e.g. `01.jpg`, `02.jpg`…), ideally ~1200px wide.
2. In `index.html`, section `#photos`, replace each placeholder with
   `<div class="photo"><img src="assets/img/work/01.jpg" alt="Kitchen after a deep clean"></div>`.

## Still to confirm  `[a confirmar]`

- What is included in each service (Homes, Offices, Airbnb) — `included` lists in `js/data.js`
- Phone / e-mail (today the only contact channel is Instagram)
- Prices / packages (not shown on purpose)
- Real work photos
