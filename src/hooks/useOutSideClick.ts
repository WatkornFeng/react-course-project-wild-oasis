import { useEffect, useRef } from "react";

export function useOutSideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef() as
    | React.MutableRefObject<HTMLInputElement>
    | React.RefObject<HTMLUListElement>;
  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [handler, listenCapturing]
  );

  return ref;
}
