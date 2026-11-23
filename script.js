// Color palette
let colors = [
  "#0ae448",
  "#fec5fb",
  "#ff8709",
  "#9d95ff",
  "#abff84",
  "#00bae2"
];

// Animation the navbar responsive
gsap.fromTo(
  ".navbar",
  {
    x: "-100vw",
  },
  {
    x: "0",
    duration: 2,
    ease: "power2.out",
    backgroundColor: () => gsap.utils.random(colors),
  }
);


// The Animation of the + Button 

document.addEventListener("DOMContentLoaded", () => {
  gsap.fromTo(
    "#fabWrap",
    {
      opacity: 0,
      scale: 0
    },
    {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: "power2.out"
    }
  );
});


//Mobile navbar

const items = gsap.utils.toArray(".fab-item");

const radius = 120;
const startAngle = 180;
const endAngle = 270;

const angleStep = (endAngle - startAngle) / (items.length - 1);

let tl;
let isOpen = false;

const fabBtn = document.querySelector("#fabBtn");

// Build animation timeline
function buildTimeline() {

  if (tl) {
    tl.kill();
  }

  // Reset all buttons
  gsap.set(items, {
    x: 0,
    y: 0,
    scale: 0,
    opacity: 0
  });

  tl = gsap.timeline({ paused: true });

  // Animate each menu item
  items.forEach((item, i) => {

    const angle = (startAngle + angleStep * i) * (Math.PI / 180);

    const tx = Math.cos(angle) * radius;
    const ty = Math.sin(angle) * radius;

    tl.to(item, {
      x: tx,
      y: ty,
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      pointerEvents: "auto"
    }, i * 0.05);

  });

  // Rotate the main button
  tl.to("#fabBtn svg", {
    rotation: 135,
    duration: 0.35,
    ease: "back.out(1.7)"
  }, 0);
}

buildTimeline();

// Toggle menu
function toggle() {

  if (isOpen) {

    tl.reverse();

    fabBtn.setAttribute("aria-expanded", "false");

  } else {

    tl.play();

    fabBtn.setAttribute("aria-expanded", "true");

  }

  isOpen = !isOpen;
}

// Click event
fabBtn.addEventListener("click", toggle);

// Close menu with Escape
document.addEventListener("keydown", (e) => {

  if (e.key === "Escape" && isOpen) {
    toggle();
  }

});

let BurgerisOpen = false;
let lt = gsap.timeline();

function openMenu() {
  lt.set("#nav", { visibility: "visible", pointerEvents: "auto" })
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
  lt.to(".bar", {
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

function burgerToggle() {
  BurgerisOpen = !BurgerisOpen;
  const btn = document.getElementById("menuToggle");
  btn.setAttribute("aria-expanded", BurgerisOpen);
  btn.setAttribute("aria-label", BurgerisOpen ? "Close menu" : "Open menu");
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.setAttribute("tabindex", BurgerisOpen ? "0" : "-1"));
  document
    .querySelectorAll(".nav-socials a")
    .forEach((l) => l.setAttribute("tabindex", BurgerisOpen ? "0" : "-1"));

  lt.clear()

  if (BurgerisOpen) {
    openMenu();
  } else {
    closeMenu();
  }
}

document.getElementById("menuToggle").addEventListener('click', burgerToggle)
document.querySelector(".nav-bg").addEventListener("click", () => {
  if (BurgerisOpen) burgerToggle();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && BurgerisOpen) {
    burgerToggle();
    document.getElementById("menuToggle").focus();
  }
});


console.clear();
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

let ctx;

function createTimeline() {
  ctx && ctx.revert();

  ctx = gsap.context(() => {
    const box = document.querySelector(".box");
    const boxStartRect = box.getBoundingClientRect();

    // All containers except the first
    const containers = gsap.utils.toArray(".container:not(.initial)");

    // grab the points to animate between
    const points = containers.map((container) => {
      const marker = container.querySelector(".marker") || container;
      const r = marker.getBoundingClientRect();

      return {
        x: r.left + r.width / 2 - (boxStartRect.left + boxStartRect.width / 2),
        y: r.top + r.height / 2 - (boxStartRect.top + boxStartRect.height / 2)
      };
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container.initial",
        start: "clamp(top center)",
        endTrigger: ".final",
        end: "clamp(top center)",
        scrub: 1
      }
    });

    tl.to(".box", {
      duration: 1,
      ease: "none",
      motionPath: {
        path: points, // array like - [{x:100, y:50}, {x:200, y:0}, {x:300, y:100}]
        curviness: 1.5 // adjust how curvy the path is, default is 1, 2 is more curvy
      }
    });
  });
}

createTimeline();
window.addEventListener("resize", createTimeline);

//End Mobile Navbar