(() => {
  const rows = document.querySelectorAll(".spec-table tbody tr");
  if (rows.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    rows.forEach((row, index) => {
      row.style.transitionDelay = `${Math.min(index, 10) * 40}ms`;
      observer.observe(row);
    });
  } else {
    rows.forEach((row) => row.classList.add("is-visible"));
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
        /* ignore */
      }
      form.reset();
      note.hidden = false;
    });
  }
})();
