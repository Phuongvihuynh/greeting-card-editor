"use client";

import { useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Rect, Circle, Text, Transformer } from "react-konva";
import { useCardStore } from "@/stores/useCardStore";
import type { CardElement } from "@/types/card";
import type Konva from "konva";

export default function KonvaCanvas() {
  const { card, selectedElementId, selectElement, updateElement } =
    useCardStore();
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<Map<string, Konva.Node>>(new Map());

  useEffect(() => {
    const tr = transformerRef.current;
    if (!tr) return;

    if (selectedElementId) {
      const node = shapeRefs.current.get(selectedElementId);
      if (node) {
        tr.nodes([node]);
        tr.getLayer()?.batchDraw();
      }
    } else {
      tr.nodes([]);
      tr.getLayer()?.batchDraw();
    }
  }, [selectedElementId]);

  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target === stageRef.current || e.target.attrs?.id === "bg-rect") {
        selectElement(null);
      }
    },
    [selectElement]
  );

  const handleDragEnd = useCallback(
    (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
      updateElement(id, {
        x: e.target.x(),
        y: e.target.y(),
      });
    },
    [updateElement]
  );

  const handleTransformEnd = useCallback(
    (id: string, e: Konva.KonvaEventObject<Event>) => {
      const node = e.target;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      node.scaleX(1);
      node.scaleY(1);

      updateElement(id, {
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation(),
      });
    },
    [updateElement]
  );

  const setShapeRef = useCallback((id: string, node: Konva.Node | null) => {
    if (node) {
      shapeRefs.current.set(id, node);
    } else {
      shapeRefs.current.delete(id);
    }
  }, []);

  const renderElement = (el: CardElement) => {
    const commonProps = {
      key: el.id,
      x: el.x,
      y: el.y,
      rotation: el.rotation,
      draggable: true,
      onClick: () => selectElement(el.id),
      onTap: () => selectElement(el.id),
      onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) =>
        handleDragEnd(el.id, e),
      onTransformEnd: (e: Konva.KonvaEventObject<Event>) =>
        handleTransformEnd(el.id, e),
      ref: (node: Konva.Node | null) => setShapeRef(el.id, node),
    };

    if (el.type === "text") {
      return (
        <Text
          {...commonProps}
          text={el.content || ""}
          fontSize={el.fontSize || 24}
          fontFamily={el.fontFamily || "Arial"}
          fill={el.fill || "#2C2C2C"}
          width={el.width}
        />
      );
    }

    if (el.type === "shape" && el.shapeType === "circle") {
      return (
        <Circle
          {...commonProps}
          width={el.width}
          height={el.height}
          fill={el.fill || "#F2C4C4"}
        />
      );
    }

    // Default: rectangle shape
    return (
      <Rect
        {...commonProps}
        width={el.width}
        height={el.height}
        fill={el.fill || "#9CAF88"}
      />
    );
  };

  return (
    <Stage
      ref={stageRef}
      width={card.width}
      height={card.height}
      onClick={handleStageClick}
      onTap={handleStageClick}
    >
      <Layer>
        <Rect
          id="bg-rect"
          x={0}
          y={0}
          width={card.width}
          height={card.height}
          fill={card.backgroundColor}
          listening={false}
        />
        {card.elements.map(renderElement)}
        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
}
