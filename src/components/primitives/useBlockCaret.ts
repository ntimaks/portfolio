"use client";
import { useEffect, useRef } from "react";

/**
 * useBlockCaret — port of components-fields.html script.
 * Hides native caret on the input and renders an animated block █
 * positioned at the current selectionStart, measured via a hidden
 * monospace text node. Works for <input type="text|email|search">.
 *
 * Returns refs to attach: ref to <input>, caretRef to the <span> caret.
 */
export function useBlockCaret() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const input = inputRef.current;
    const caret = caretRef.current;
    if (!input || !caret) return;

    // Off-screen measurer mirrors the input's font + size.
    const meas = document.createElement("span");
    meas.style.cssText =
      "position:absolute;visibility:hidden;white-space:pre;pointer-events:none;left:-9999px;top:-9999px;";
    const cs = window.getComputedStyle(input);
    meas.style.fontFamily = cs.fontFamily;
    meas.style.fontSize = cs.fontSize;
    meas.style.fontWeight = cs.fontWeight;
    meas.style.letterSpacing = cs.letterSpacing;
    document.body.appendChild(meas);

    const PADDING_LEFT = parseFloat(cs.paddingLeft) || 10;
    const BORDER_LEFT = parseFloat(cs.borderLeftWidth) || 1;

    function place() {
      if (!input || !caret) return;
      const pos = input.selectionStart ?? input.value.length;
      meas.textContent = input.value.slice(0, pos) || "";
      const w = meas.getBoundingClientRect().width;
      const scroll = input.scrollLeft;
      caret.style.left = `${BORDER_LEFT + PADDING_LEFT + w - scroll}px`;
    }

    const onKey = () => requestAnimationFrame(place);
    input.addEventListener("input", place);
    input.addEventListener("keyup", place);
    input.addEventListener("keydown", onKey);
    input.addEventListener("click", place);
    input.addEventListener("focus", place);
    input.addEventListener("select", place);
    place();

    return () => {
      input.removeEventListener("input", place);
      input.removeEventListener("keyup", place);
      input.removeEventListener("keydown", onKey);
      input.removeEventListener("click", place);
      input.removeEventListener("focus", place);
      input.removeEventListener("select", place);
      meas.remove();
    };
  }, []);

  return { inputRef, caretRef };
}
