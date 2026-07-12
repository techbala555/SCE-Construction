"use client";

import { useSyncExternalStore } from "react";

// The mounted value flips exactly once (false → true after hydration) and never
// changes again, so there is nothing to subscribe to — a stable no-op is enough.
const subscribe = () => () => {};

/**
 * Hydration-safe "are we on the client yet?" flag.
 *
 * Returns `false` on the server and during the first client (hydration) render,
 * then `true` afterwards — the same semantics as the classic
 * `useState(false)` + `useEffect(() => setMounted(true), [])` pattern, but
 * without calling `setState` inside an effect (which React 19 flags as a
 * cascading-render risk).
 *
 * Use it to gate client-only values that would otherwise cause a hydration
 * mismatch — e.g. `next-themes`' `resolvedTheme`.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false, // server snapshot
  );
}
