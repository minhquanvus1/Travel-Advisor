import React, { useState } from "react";
import "./FilterBox.css";

const FilterBox = ({ title, itemsList, selectedItems, handleChange }) => {
  const [showList, setShowList] = useState(true);
  console.log("selectedItems", selectedItems);
  return (
    <div className="filter-box-container">
      <div className="filter-box-header">
        <h3 className="filter-box-title">{title}</h3>
        <svg
          viewBox="0 0 24 24"
          width="20px"
          height="20px"
          onClick={() => setShowList((prev) => !prev)}
          className={showList ? "active" : ""}
        >
          <path d="M18.4 7.4 12 13.7 5.6 7.4 4.2 8.8l7.8 7.8 7.8-7.8z"></path>
        </svg>
      </div>
      <div
        className={`filter-box-items-list-container ${
          showList ? "active" : ""
        }`}
      >
        <div className="filter-box-items-list">
          {itemsList.slice(0, 4).map((item, index) => {
            console.log("include item name", selectedItems.includes(item.name));
            return (
              <div key={index} className="filter-box-item">
                <input
                  type="checkbox"
                  id={`filter-${item.name}`}
                  name={item.name}
                  checked={selectedItems.includes(item.name)}
                  onChange={() => handleChange(item.name)}
                />
                <label htmlFor={`filter-${item.name}`}>{item.name}</label>
              </div>
            );
          })}
        </div>
        {itemsList.length > 4 && <div className="show-all-btn">Show all</div>}
      </div>
    </div>
  );
};

export default FilterBox;
