/* John Otieno — portfolio interactions */
(function () {
  "use strict";

  const root = document.documentElement;
  const params = new URLSearchParams(window.location.search);
  const capture = params.get("capture") === "1";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("js");
  if (capture) document.body.classList.add("capture");
  if (params.get("clean") === "1") document.body.classList.add("clean-capture");

  const header = document.getElementById("site-header");
  const progressBar = document.getElementById("scroll-progress-bar");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = Array.from(document.querySelectorAll(".desktop-nav a"));
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  /* ---------- scroll state, progress, scrollspy ---------- */

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  let ticking = false;

  function updateScrollState() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle("is-scrolled", scrollY > 16);

    if (progressBar) {
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      progressBar.style.width = (progress * 100).toFixed(2) + "%";
    }

    let current = "home";
    const marker = scrollY + Math.min(window.innerHeight * 0.38, 320);
    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === current);
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateScrollState();

  /* ---------- reveal on scroll ---------- */

  if (capture || reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* ---------- mobile menu ---------- */

  function closeMenu() {
    document.body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }
  }

  function openMenu() {
    document.body.classList.add("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (document.body.classList.contains("menu-open")) closeMenu();
      else openMenu();
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMenu();
  });

  /* ---------- copy email ---------- */

  const copyButton = document.getElementById("copy-email");
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    const label = toast.querySelector("span");
    if (label && message) label.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    document.body.appendChild(area);
    area.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }
    document.body.removeChild(area);
    return copied;
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const email = copyButton.dataset.copy;
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(email);
          copied = true;
        } catch (error) {
          copied = fallbackCopy(email);
        }
      } else {
        copied = fallbackCopy(email);
      }

      copyButton.classList.toggle("copied", copied);
      showToast(copied ? "Email copied to clipboard" : "Email: " + email);
      window.setTimeout(() => copyButton.classList.remove("copied"), 2200);
    });
  }

  /* ---------- footer year ---------- */

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- capture helpers ---------- */

  if (capture) {
    // Open all technical notes so screen captures include the full writeups.
    document.querySelectorAll(".lab-extra").forEach((details) => {
      details.open = true;
    });
    // Make sure everything is painted before a screenshot is taken.
    window.setTimeout(() => {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }, 60);
  }
})();
