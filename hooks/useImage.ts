import { useEffect, useRef, useState } from "react";

type Status = "loading" | "loaded" | "failed";

export function useImage(
  src: string | undefined
): [HTMLImageElement | undefined, Status] {
  const [image, setImage] = useState<HTMLImageElement>();
  const [status, setStatus] = useState<Status>("loading");
  const srcRef = useRef(src);

  useEffect(() => {
    if (!src) {
      setImage(undefined);
      setStatus("failed");
      return;
    }

    srcRef.current = src;
    setStatus("loading");

    const img = new window.Image();

    const onLoad = () => {
      if (srcRef.current !== src) return;
      setImage(img);
      setStatus("loaded");
    };

    const onError = () => {
      if (srcRef.current !== src) return;
      setImage(undefined);
      setStatus("failed");
    };

    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    img.src = src;

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src]);

  return [image, status];
}
