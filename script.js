let isOpen = false;
let tl = gsap.timeline();

function openMenu() {
  tl.set("#nav", { visibility: "visible", pointerEvents: "auto" })
    .fromTo(
    ".nav-bg",
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    },
    0
  )

    .fromTo(
      ".nav-panel",
      { x: "101%", y: 0, rotation: 0 },
      {
        x: "0%",
        duration: 0.6,
        ease: "back.out",
        stagger: 0.2,
      },
      0
    )

    .fromTo(
      ".nav-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.03
      },
      0.1
    )

    .fromTo(
      ".bar-top",
      {
        stroke: "var(--white)",
        attr: { x1: 3, y1: 7, x2: 17, y2: 7 }
      },
      {
        stroke: "#0e100f",
        attr: { x1: 5, y1: 5, x2: 15, y2: 15 },
        duration: 0.35,
        ease: "back.out(1.4)",
      },
      0.06
    )
    .fromTo(
      ".bar-bot",
      {
        stroke: "var(--white)",
        attr: { x1: 3, y1: 13, x2: 17, y2: 13 }
      },
      {
        stroke: "#0e100f",
        attr: { x1: 15, y1: 5, x2: 5, y2: 15 },
        duration: 0.35,
        ease: "back.out(1.4)",
      },
      0.06
    )
    .fromTo(
      ".nav-login",
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      },
      0.4
    );
}

function closeMenu() {
  tl.to(".bar", {
    stroke: "var(--white)",
    duration: 0.2
  })
    .to(
      ".bar-top",
      {
        attr: { x1: 3, y1: 7, x2: 17, y2: 7 },
        duration: 0.2,
        ease: "power3.in"
      },
      "<"
    )
    .to(
      ".bar-bot",
      {
        attr: { x1: 3, y1: 13, x2: 17, y2: 13 },
        duration: 0.2,
        ease: "power3.in"
      },
      "<"
    )

    // panels fall
    .to(
      ".nav-panel",
      {
        y: "160vh",
        rotation: "random(-15, 15)",
        duration: 1,
        ease: "power3.in",
        stagger: {
          from: "end",
          each: 0.02
        }
      },
      "<"
    )

    // bg fades
    .to(
      ".nav-bg",
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      },
      "<0.1"
    );
}

function toggle() {
  isOpen = !isOpen;
  const btn = document.getElementById("menuToggle");
  btn.setAttribute("aria-expanded", isOpen);
  btn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.setAttribute("tabindex", isOpen ? "0" : "-1"));
  document
    .querySelectorAll(".nav-socials a")
    .forEach((l) => l.setAttribute("tabindex", isOpen ? "0" : "-1"));
  
  tl.clear()

  if (isOpen) {
    openMenu();
  } else {
    closeMenu();
  }
}

document.getElementById("menuToggle").addEventListener("click", toggle);
document.querySelector(".nav-bg").addEventListener("click", () => {
  if (isOpen) toggle();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen) {
    toggle();
    document.getElementById("menuToggle").focus();
  }
});

