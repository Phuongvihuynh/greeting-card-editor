"use client";

import { Image } from "react-konva";
import { useImage } from "@/hooks/useImage";
import type { CardElement } from "@/types/card";
import type Konva from "konva";

interface KonvaImageElementProps {
  element: CardElement;
  onClick: () => void;
  onTap: () => void;
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
  onTransformEnd: (e: Konva.KonvaEventObject<Event>) => void;
  nodeRef: (node: Konva.Node | null) => void;
}

export default function KonvaImageElement({
  element,
  onClick,
  onTap,
  onDragEnd,
  onTransformEnd,
  nodeRef,
}: KonvaImageElementProps) {
  const [image, status] = useImage(element.src);

  if (status !== "loaded" || !image) return null;

  return (
    <Image
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation}
      draggable
      onClick={onClick}
      onTap={onTap}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
      ref={nodeRef as unknown as React.Ref<Konva.Image>}
    />
  );
}
