# Changelog — natalialisohurska.work

## 2026-03-27

### Initial build
- Created single-page portfolio based on foreverlong.io aesthetic (dark minimal, typographic)
- Stack: pure HTML/CSS/JS, no framework, no build step
- Fonts: Inter (300/400/500/600) + Fragment Mono from Google Fonts
- Color palette: `#0D1B1E` bg, `#1d8f8b` teal accent, `#F5F0EB` text
- Sections: Nav · Hero · Numbers Bar · About · Experience · Skills · Contact · Footer
- Scroll-triggered fade-up animations via IntersectionObserver
- Hero word cycling animation (Lead / Strategist / Partner)
- Animated stat counters on scroll ($2M, $100M/mo, 25%, 4 languages)
- CI/CD: GitHub Actions → SSH → `git pull` on push to master
- SSL already configured via Certbot on nginx/Ubuntu

### Mobile optimization
- `100svh` hero height (accounts for mobile browser chrome)
- `viewport-fit=cover` + `env(safe-area-inset-*)` for notched iPhones
- Burger menu with ✕ animation on open
- Nav links: 44px min tap targets, 16px font
- Stats bar: 2×2 grid on mobile
- Contact buttons: 52px tall, full-width
- Experience card hover effects disabled on touch
- Breakpoints: 900px (tablet) · 640px (mobile) · 390px (small phones)

### Desktop alignment
- Stats bar items left-aligned (was centered)
- Contact section left-aligned, full-width (was narrow centered block)
