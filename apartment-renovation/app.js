(() => {
  const steps = document.querySelectorAll(".process-step");
  if (steps.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    steps.forEach((step) => observer.observe(step));
  } else {
    steps.forEach((step) => step.classList.add("is-visible"));
  }

  const form = document.querySelector(".contact-form");
  const note = document.querySelector("[data-form-note]");
  if (form && note) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      try {
        const existing = JSON.parse(
          localStorage.getItem("atrium-leads") || "[]"
        );
        existing.push({ ...payload, at: new Date().toISOString() });
        localStorage.setItem("atrium-leads", JSON.stringify(existing));
      } catch {
        /* ignore quota / private mode */
      }
      form.reset();
      note.hidden = false;
    });
  }
})();
