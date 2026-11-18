const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  primaryNavigation.classList.toggle("is-open", !isExpanded);
});

primaryNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNavigation.classList.remove("is-open");
  });
});

const menuTabs = [...document.querySelectorAll("[data-menu-tab]")];
const menuPanels = [...document.querySelectorAll("[data-menu-panel]")];

function activateMenuTab(tab) {
  menuTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  menuPanels.forEach((panel) => {
    panel.hidden = panel.dataset.menuPanel !== tab.dataset.menuTab;
  });
}

menuTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateMenuTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = menuTabs[(index + direction + menuTabs.length) % menuTabs.length];
    activateMenuTab(nextTab);
    nextTab.focus();
  });
});

const reviews = [
  {
    quote: "“The kind of place you bring a friend when you want the evening to last. Every plate felt thoughtful, and somehow we made room for dessert.”",
    name: "Jordan P.",
    note: "NEIGHBOR & REGULAR · FICTIONAL REVIEW",
    initial: "J",
  },
  {
    quote: "“A warm room, lovely people, and the best roast carrots I’ve had in ages. We came for dinner and ended up making plans to come back for brunch.”",
    name: "Maya R.",
    note: "NEIGHBOR & REGULAR · FICTIONAL REVIEW",
    initial: "M",
  },
  {
    quote: "“It feels like being welcomed into someone’s home, only someone else does the dishes. Save room for the olive oil cake.”",
    name: "Chris L.",
    note: "NEIGHBOR & REGULAR · FICTIONAL REVIEW",
    initial: "C",
  },
];
let currentReview = 0;
const reviewQuote = document.querySelector(".review-content blockquote");
const reviewName = document.querySelector(".review-byline strong");
const reviewNote = document.querySelector(".review-byline small");
const reviewAvatar = document.querySelector(".review-avatar");
const reviewCurrent = document.querySelector("#review-current");
document.querySelector("#review-total").textContent = String(reviews.length).padStart(2, "0");

function showReview(index) {
  currentReview = (index + reviews.length) % reviews.length;
  const review = reviews[currentReview];
  reviewQuote.textContent = review.quote;
  reviewName.textContent = review.name;
  reviewNote.textContent = review.note;
  reviewAvatar.textContent = review.initial;
  reviewCurrent.textContent = String(currentReview + 1).padStart(2, "0");
}

document.querySelectorAll("[data-review]").forEach((button) => {
  button.addEventListener("click", () => {
    showReview(currentReview + (button.dataset.review === "next" ? 1 : -1));
  });
});

const reservationDate = document.querySelector("#reservation-date");
const today = new Date();
reservationDate.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

document.querySelector("#reservation-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").trim();
  const message = document.querySelector("#form-message");
  message.textContent = `Thanks, ${name}! This is a portfolio demo, so no reservation was made.`;
  event.currentTarget.reset();
  reservationDate.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
});

document.querySelector("#year").textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
