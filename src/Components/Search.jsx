import "../style.css";
import React, { useState } from "react";
import profile1 from "../images/profile1.jpg";
import profile2 from "../images/profile2.jpg";
import profile3 from "../images/profile1.jpg";
import profile4 from "../images/profile2.jpg";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [allUsers, setAllUsers] = useState([
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

    // Filter users based on the input and exclude selected users
    const filteredUsers = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) &&
        !selectedUsers.includes(user)
    );

    // Show all users only when the input is focused and text is empty
    setMatchingUsers(isInputFocused && text === "" ? allUsers : filteredUsers);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setMatchingUsers(allUsers); // Show all users when the input is focused
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleUserClick = (user) => {
    // Remove the selected user from the all users list
    const updatedUsers = allUsers.filter((updatedUser) => updatedUser !== user);
    setAllUsers(updatedUsers);
    setMatchingUsers(updatedUsers);

    // Add the selected user to the list
    setSelectedUsers((selectedUsers) => [...selectedUsers, user]);

    // Clear the search text
    setSearchText("");
  };

  const handleChipRemove = (user) => {
    // Remove the selected user from the list
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers([...updatedUsers]);

    // Add the removed user back to the all users list
    setAllUsers((prevUsers) => [...prevUsers, user]);

    // Update the matching users based on the new input
    setMatchingUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <div className="container">
      {selectedUsers.map((user) => (
        <div key={user.id} className="selected-user">
          <img src={user.profilePicture} alt={user.name} />
          <span className="chip-name">{user.name}</span>
          <span className="remove-chip" onClick={() => handleChipRemove(user)}>
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
        {matchingUsers.length > 0 && (
          <ul className="suggestions-list">
            {matchingUsers.map((user) => (
              <li
                key={user.id}
                className="suggestions-list-user"
                onClick={() => handleUserClick(user)}
              >
                <img src={user.profilePicture} alt={user.name} />
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
