import React from 'react';
import useDragAndDrop from '../hooks/useDragAndDrop';

const DragAndDropLinked = () => {
  const svg = useDragAndDrop({ x: 50, y: 50 });
  const image = useDragAndDrop({ x: 150, y: 150 });

  const updateImagePositionWithSvg = () => {
    if (!svg.isDragging) return;
    image.setPosition({
      x: svg.position.x + 100,
      y: svg.position.y + 100,
    });
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          top: `${svg.position.y}px`,
          left: `${svg.position.x}px`,
          cursor: 'pointer',
        }}
        onMouseDown={svg.onMouseDown}
        onMouseMove={(e) => {
          svg.onMouseMove(e);
          updateImagePositionWithSvg();
        }}
        onMouseUp={svg.onMouseUp}
      >
        <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />
      </svg>

      <img
        src="https://backoffice.ccsreservas.com/images/bull.svg"
        alt="drag"
        width="50"
        height="50"
        style={{
          position: 'absolute',
          top: `${image.position.y}px`,
          left: `${image.position.x}px`,
          cursor: 'pointer',
        }}
        onMouseDown={image.onMouseDown}
        onMouseMove={image.onMouseMove}
        onMouseUp={image.onMouseUp}
      />
    </>
  );
};

export default DragAndDropLinked;
