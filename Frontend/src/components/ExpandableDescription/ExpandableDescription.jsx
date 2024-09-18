import React, { useState, useEffect, useRef } from "react";
import "./ExpandableDescription.css";

const ExpandableDescription = ({ text, lineClamp = 3 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    const checkOverflow = () => {
      if (descriptionElement) {
        const isOverflowing =
          descriptionElement.scrollHeight > descriptionElement.clientHeight;
        console.log("isOverflowing is", isOverflowing);
        console.log("window innerwidth", window.innerWidth);
        console.log(
          "document clientwidth",
          document.documentElement.clientWidth
        );
        setShowReadMoreButton(() => {
          if (!isOverflowing && isOpen) {
            return true;
          }

          return isOverflowing;
        });
      }
    };
    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(descriptionElement);
  }, [text, lineClamp, isOpen]);

  console.log("showReadMoreButton is", showReadMoreButton);
  console.log("isOpen is", isOpen);
  return (
    <div className="description">
      <p
        ref={descriptionRef}
        className={isOpen ? "expanded" : ""}
        style={{ WebkitLineClamp: lineClamp }}
      >
        {text}
      </p>
      {showReadMoreButton && (
        <div onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <div className="expand-button">
              <p>Read less</p>
              <i className="fas fa-chevron-up"></i>
            </div>
          ) : (
            <div className="expand-button">
              <p>Read more</p>
              <i className="fas fa-chevron-down"></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableDescription;
