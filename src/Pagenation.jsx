import React, { useState } from "react";

function Pagenation() {
  const items = [
    "Apple",
    "Banana",
    "Carrot",
    "Dragonfruit",
    "Eggplant",
    "Fig",
    "Grape",
    "Honeydew",
    "Iceberg Lettuce",
    "Jackfruit",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tomato",
    "Ugli Fruit",
    "Vanilla Bean",
    "Watermelon",
    "Xigua",
    "Yam",
    "Zucchini",
  ];
  const itemsPerPage = 5;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h2>Veg & Fruit List</h2>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          onClick={() => setCurrentPage(index + 1)}
          style={{ background: "green", margin: "10px" }}
        >
          {index + 1}
        </button>
      ))}
    </>
  );
}

export default Pagenation;
