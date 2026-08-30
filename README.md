# AK Fishers

Storefront website for **AK Fishers Supplier LLP** — fresh fish & seafood delivery across Mumbai.

*Fresh From The Sea To Your Doorstep.*

## Stack

Static multi-page site — plain HTML, CSS and vanilla JavaScript. No build step.

```
index.html            Home
shop.html             Product listing + filters
product.html          Product detail (weight / cut / qty)
cart.html             Cart + coupons
checkout.html         Delivery details, slot, payment (demo)
account.html          Login / signup / order history (localStorage)
admin.html            Store admin — products, orders, coupons, delivery zones
about, contact, delivery, privacy, terms

scripts/products.js   Catalogue, categories, delivery zones + pincode map, helpers
scripts/app.js        Shared header/footer, cart, wishlist, toasts, mobile menu
styles/               shared.css + per-section stylesheets
```

Cart, orders, wishlist and the signed-in user are stored in the browser's
`localStorage`. There is no backend or payment gateway yet.

## Run locally

Any static file server works, e.g.:

```bash
npx serve .
```

then open `http://localhost:3000`.

## Business details

- Phone / WhatsApp: +91 81081 06522
- Email: akfisheriesofficial@gmail.com
- Sassoon Dock, Ganesh Murti Nagar, Cuffe Parade, Mumbai, Maharashtra 400005
- Orders to be placed 1 day in advance · bulk orders accepted
- Delivery: Mumbai ₹49 · Thane ₹59 · Navi Mumbai ₹69 · MMR ₹79 · free above ₹999

## Admin

`admin.html` is gated by a client-side passcode (`akfishers-admin`). This is a
lightweight barrier only, not real security — it needs a proper backend before
production use.
