(function () {
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Lightbox gallery
  const figures = Array.from(document.querySelectorAll("[data-gallery] figure"));
  if (!figures.length) return;

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Photo gallery");
  lb.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close">&times;</button>
    <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>
    <img src="" alt="" />
    <button type="button" class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>
  `;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector("img");
  let index = 0;

  function openAt(i) {
    index = (i + figures.length) % figures.length;
    const figImg = figures[index].querySelector("img");
    imgEl.src = figImg.currentSrc || figImg.src;
    imgEl.alt = figImg.alt || "";
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  figures.forEach((fig, i) => {
    fig.addEventListener("click", () => openAt(i));
    fig.setAttribute("tabindex", "0");
    fig.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openAt(i);
      }
    });
  });

  lb.querySelector(".lightbox-close").addEventListener("click", closeLb);
  lb.querySelector(".lightbox-prev").addEventListener("click", () => openAt(index - 1));
  lb.querySelector(".lightbox-next").addEventListener("click", () => openAt(index + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") openAt(index - 1);
    if (e.key === "ArrowRight") openAt(index + 1);
  });
})();
