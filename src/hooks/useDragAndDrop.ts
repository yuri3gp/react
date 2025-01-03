import { useState } from 'react';

const useDragAndDrop = (initialPosition: { x: number; y: number }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return {
    position,
    setPosition, // Adicionando setPosition
    isDragging,  // Adicionando isDragging
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useDragAndDrop;
