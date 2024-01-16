import "../style.css";
import React, { useState } from "react";
import profile1 from "../images/profile1.jpg";
import profile2 from "../images/profile2.jpg";
import profile3 from "../images/profile1.jpg";
import profile4 from "../images/profile2.jpg";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchingItems, setMatchingItems] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [allItems, setAllItems] = useState([
    {
      id: 1,
      profilePicture: profile1,
      name: "John Doe",
      email: "john@example.com",
    },
    {
      id: 2,
      profilePicture: profile2,
      name: "Jane Doe",
      email: "jane@example.com",
    },
    {
      id: 3,
      profilePicture: profile3,
      name: "Alice",
      email: "alice@example.com",
    },
    {
      id: 4,
      profilePicture: profile4,
      name: "Bob",
      email: "bob@example.com",
    },
  ]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // Filter items based on the input and exclude selected items
    const filteredItems = allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) &&
        !selectedItems.includes(item)
    );

    // Show all items when the input is focused
    setMatchingItems(isInputFocused ? allItems : filteredItems);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setMatchingItems(allItems); // Show all items when the input is focused
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleItemClick = (item) => {
    // Remove the selected item from the all items list
    const updatedItems = allItems.filter((updatedItem) => updatedItem !== item);
    setAllItems(updatedItems);
    setMatchingItems(updatedItems);

    // Add the selected item to the list
    setSelectedItems((selectedItems) => [...selectedItems, item]);

    // Clear the search text
    setSearchText("");
  };

  const handleChipRemove = (item) => {
    // Remove the selected item from the list
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    setSelectedItems([...updatedItems]);

    // Add the removed item back to the all items list
    setAllItems((prevItems) => [...prevItems, item]);

    // Update the matching items based on the new input
    setMatchingItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className="container">
      {selectedItems.map((item) => (
        <div key={item.id} className="selected-item">
          <img src={item.profilePicture} alt={item.name} />
          <span className="chip-name">{item.name}</span>
          <span className="remove-chip" onClick={() => handleChipRemove(item)}>
            &times;
          </span>
        </div>
      ))}
      <div className="input-container">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Add new user..."
          className="input-field"
        />
        {matchingItems.length > 0 && (
          <ul className="suggestions-list">
            {matchingItems.map((item) => (
              <li
                key={item.id}
                className="suggestions-list-item"
                onClick={() => handleItemClick(item)}
              >
                <img src={item.profilePicture} alt={item.name} />
                {item.name} - {item.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
