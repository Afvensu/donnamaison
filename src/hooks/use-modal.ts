import { useEffect, useRef } from "react";

/** One modal at a time: focus trap, inert background, scroll lock and focus restoration. */
export function useModal(open: boolean, close: () => void) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const modal = ref.current;
    if (!open || !modal) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background: { el: HTMLElement; inert: boolean }[] = [];
    let node: HTMLElement = modal;
    while (node.parentElement && node !== document.body) {
      for (const sibling of Array.from(node.parentElement.children)) {
        if (sibling instanceof HTMLElement && sibling !== node && !sibling.contains(modal)) {
          background.push({ el: sibling, inert: sibling.inert });
          sibling.inert = true;
        }
      }
      node = node.parentElement;
    }
    const focusable = () =>
      Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),[tabindex="0"]',
        ),
      ).filter((el) => el.getClientRects().length > 0 && !el.closest("[inert]"));
    (focusable()[0] ?? modal).focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (!first || !last) {
        event.preventDefault();
        modal.focus();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === modal)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    modal.addEventListener("keydown", keydown);
    return () => {
      modal.removeEventListener("keydown", keydown);
      background.forEach(({ el, inert }) => {
        el.inert = inert;
      });
      document.body.style.overflow = overflow;
      if (previous?.isConnected && !previous.closest("[inert]")) previous.focus();
    };
  }, [open, close]);
  return ref;
}
