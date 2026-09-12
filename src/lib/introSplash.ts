/**
 * Tracks whether the opening logo splash is still running for this page load.
 *
 * Module state, deliberately not sessionStorage: it resets on every hard load
 * (which is exactly when the splash should play) and survives client-side route
 * changes (when it shouldn't). On the server `endIntro()` is never called, so SSR
 * always reports "intro active" — which matches the client's first render and keeps
 * `PageTransition` from stacking its veil on top of the splash.
 */
let introActive = true;

export function isIntroActive(): boolean {
  return introActive;
}

export function endIntro(): void {
  introActive = false;
}
