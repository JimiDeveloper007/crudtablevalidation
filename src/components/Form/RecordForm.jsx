import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

//record form that used in table  that used in showform condition

const RecordForm = ({ selectedItem, onSave, onClose }) => {
  //create one intialState for all values and then passed into selectedItem
  const initialFormState = {
    name: selectedItem ? selectedItem.name : "",
    tech: selectedItem ? selectedItem.tech : "",
    language: selectedItem ? selectedItem.language : "",
    email: selectedItem ? selectedItem.email : "",
    phone: selectedItem ? selectedItem.phone : "",
    gender: selectedItem ? selectedItem.gender : "",
    hobbies: selectedItem ? selectedItem.hobbies : [],
    password: selectedItem ? selectedItem.password : "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? [...formState[name], value] : value;
    setFormState({ ...formState, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // const newItem = {
    //   id: selectedItem
    //     ? selectedItem.id
    //     : Math.max(...data.map((item) => item.id)) + 1,
    //   ...formState,
    // };

    // if (selectedItem) {
    //   onEdit(newItem);
    // } else {
    //   onAdd(newItem);
    // }
    onSave(formState);
    setFormState(initialFormState);
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone number validation
    const phoneRegex = /^\+91[0-9]{3}[0-9]{3}[0-9]{4}$/;
    if (!phoneRegex.test(formState.phone)) {
      errors.phone =
        "Please enter a valid phone number (format: +911234567890)";
    }

    // Hobbies validation
    if (formState.hobbies.length === 0) {
      errors.hobbies = "Please select at least one hobby";
    }

    // Gender validation
    if (!formState.gender) {
      errors.gender = "Please select a gender";
    }

    // Password validation
    if (formState.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleHobbyChange = (hobby) => {
    const updatedHobbies = formState.hobbies.includes(hobby)
      ? formState.hobbies.filter((item) => item !== hobby)
      : [...formState.hobbies, hobby];

    setFormState({ ...formState, hobbies: updatedHobbies });
  };

  return (
    <form onSubmit={handleSubmit} className="submitform">
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleChange}
      />

      <label>Technology:</label>
      <input
        type="text"
        name="tech"
        value={formState.tech}
        onChange={handleChange}
        required
      />

      <label>Language:</label>
      <input
        type="text"
        name="language"
        value={formState.language}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        required
      />
      {formErrors.email && (
        <div className="error" style={{ color: "red" }}>
          {formErrors.email}
        </div>
      )}

      <label>Phone No:</label>
      <input
        type="text"
        name="phone"
        value={formState.phone}
        onChange={handleChange}
        required
      />
      {formErrors.phone && (
        <div className="error" style={{ color: "red" }}>
          {formErrors.phone}
        </div>
      )}

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleChange}
        required
      />
      {formErrors.password && (
        <div className="error" style={{ color: "red" }}>
          {formErrors.password}
        </div>
      )}

      <div style={{ columnGap: "10px", display: "flex" }}>
        <label>Gender:</label>
        <input
          id="male"
          type="radio"
          name="gender"
          value="Male"
          checked={formState.gender === "Male"}
          onChange={handleChange}
        />
        <label htmlFor="male">Male</label>

        <input
          id="female"
          type="radio"
          name="gender"
          value="Female"
          checked={formState.gender === "Female"}
          onChange={handleChange}
        />
        <label htmlFor="female">Female</label>
      </div>
      {formErrors.gender && (
        <div className="error" style={{ color: "red" }}>
          {formErrors.gender}
        </div>
      )}

      <div style={{ columnGap: "10px", display: "flex" }}>
        <label>Hobbies : </label>
        <input
          id="gaming"
          type="checkbox"
          name="hobbies"
          value="Gaming"
          checked={formState.hobbies.includes("Gaming")}
          onChange={() => handleHobbyChange("Gaming")}
        />
        <label htmlFor="gaming">Gaming</label>

        <input
          id="music"
          type="checkbox"
          name="hobbies"
          value="Music"
          checked={formState.hobbies.includes("Music")}
          onChange={() => handleHobbyChange("Music")}
        />
        <label htmlFor="music">Music</label>

        <input
          id="reading"
          type="checkbox"
          name="hobbies"
          value="Reading"
          checked={formState.hobbies.includes("Reading")}
          onChange={() => handleHobbyChange("Reading")}
        />
        <label htmlFor="reading">Reading</label>
      </div>
      {formErrors.hobbies && (
        <div className="error" style={{ color: "red" }}>
          {formErrors.hobbies}
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "fit-content" }}
        >
          {selectedItem ? (
            <FontAwesomeIcon icon={faUserPen} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </div>
      <div className="close">
        <button type="button" className="btn btn-danger" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </form>
  );
};

export default RecordForm;
