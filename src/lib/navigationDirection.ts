export type NavigationDirection = "forward" | "back";

let direction: NavigationDirection = "forward";

interface NavigateEvent extends Event {
  navigationType?: "push" | "replace" | "reload" | "traverse";
}

if (typeof window !== "undefined") {
  const nav = (window as unknown as { navigation?: EventTarget }).navigation;

  if (nav) {
    nav.addEventListener("navigate", ((event: NavigateEvent) => {
      direction = event.navigationType === "traverse" ? "back" : "forward";
    }) as EventListener);
  } else {
    // Fallback for browsers without the Navigation API.
    window.addEventListener("popstate", () => {
      direction = "back";
    });
  }
}

/** Reads and resets the last navigation direction. Call once per page-transition mount. */
export function consumeNavigationDirection(): NavigationDirection {
  const current = direction;
  direction = "forward";
  return current;
}
