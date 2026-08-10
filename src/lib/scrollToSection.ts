/**
 * Reusable utility to smooth-scroll to any section by selector/hash,
 * subtracting the exact navbar height so the section header is never covered.
 */
export function scrollToSection(href: string): void {
  if (!href || !href.startsWith("#")) return;

  const targetId = href.replace("#", "");
  const targetEl = document.getElementById(targetId);
  if (!targetEl) {
    window.location.href = "/" + href;
    return;
  }

  // Measure actual navbar height dynamically
  const navEl = document.querySelector("nav");
  const navHeight = navEl ? navEl.getBoundingClientRect().height : 88;

  // Calculate absolute target position minus navbar height
  const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = Math.max(0, elementPosition - navHeight);

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
