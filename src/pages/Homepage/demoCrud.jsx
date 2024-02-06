import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faTrash, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Homepage/Crudtable.css";

// import initialData from "../../utils/list.json";
// when we use external file of json data then we can't perform crud operation but by using databse we can perform crud operation in nexternal file or api.

const initialData = [
  {
    name: "Jaimin",
    id: 1,
    tech: "full stack",
    language: "React + Dotnet",
    email: "jaimin@example.com",
    phone: "123-456-7890",
    gender: "Male",
    hobbies: ["Reading", "Gaming"],
    password: "password123",
  },
  {
    name: "Darshit",
    id: 2,
    tech: "full stack",
    language: "React + Dotnet",
    email: "darshit@example.com",
    phone: "987-654-3210",
    gender: "Male",
    hobbies: ["Gaming", "Music"],
    password: "darshit@123",
  },
  {
    name: "Neel",
    id: 3,
    tech: "Dot net",
    language: " Dotnet",
    email: "neel@example.com",
    phone: "987-654-3210",
    gender: "Male",
    hobbies: ["Gaming", "Music"],
    password: "Neel@123",
  },
  {
    name: "Ishan",
    id: 4,
    tech: "full stack",
    language: "React + Dotnet",
    email: "ishan@example.com",
    phone: "987-654-3210",
    gender: "Male",
    hobbies: ["Gaming", "Music"],
    password: "Ishan@123",
  },
  {
    name: "Dhaval",
    id: 5,
    tech: "full stack",
    language: "React + Dotnet",
    email: "dhaval@example.com",
    phone: "987-654-3210",
    gender: "Male",
    hobbies: ["Gaming", "Music"],
    password: "Dhaval@123",
  },
  {
    name: "Sahil",
    id: 6,
    tech: "react js",
    language: "React ",
    email: "sahil@example.com",
    phone: "987-654-3210",
    gender: "Male",
    hobbies: ["Gaming", "Music"],
    password: "react@123",
  },
];

function demoCrud() {

  //crud operation
  // 1) first create usestate of json data , selsecteditem and showform
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  //handleadd constant
  const handleAdd = (newItem) => {
    setData((prevData) => [...prevData, newItem]);
    setShowForm(false);
  };

  //handleedit constant taht map to the selected data id and item
  const handleEdit = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(null);
    setShowForm(false);
  };

  //handledelete constant for including selected id to fun.
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  //this for pass the value that comes from event.
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  // //this for pass the value that comes from event.
  // const handleShowForm = () => {
  //   setSelectedItem(null);
  //   setShowForm(true);
  // };

  // // this for setshowform value as false to close the form
  // const handleFormClose = () => {
  //   setShowForm(false);
  // };

  function hideshowForm(value){
    if(value === 'true'){
      setSelectedItem(null);
      setShowForm(value);
    }
    else{
      setShowForm(value);
    }
    }

  return (
    <div className="maindiv">
      <table className="maintable">
        <thead>
          <tr>
            <th colSpan="9">CRUD Table</th>
            <td>
              <button className="btn btn-primary" onClick={() => hideshowForm(true)}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>
            </td>
          </tr>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Technology</th>
            <th>Language</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Gender</th>
            <th>Hobby</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td> {item.name} </td>
              <td> {item.tech} </td>
              <td> {item.language} </td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td> {item.gender} </td>
              <td> {item.hobbies.join(" , ")} </td>
              <td>{item.password}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelectItem(item)}
                >
                  <FontAwesomeIcon icon={faUserPen} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* condition on form that shown onclick of add and edit button*/}
      {showForm && (
        <div className="mainform">
          <h4>{selectedItem ? "Edit Record" : "Add New Record"}</h4>

          {/* Form component for adding/editing records */}
          <RecordForm
            data={data}
            selectedItem={selectedItem}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onClose={() => hideshowForm(false)}
          />
        </div>
      )}
    </div>
  );
}

const RecordForm = ({ data, selectedItem, onAdd, onEdit, onClose }) => {
  const [name, setName] = useState(selectedItem ? selectedItem.name : "");
  const [tech, setTech] = useState(selectedItem ? selectedItem.tech : "");
  const [language, setLanguage] = useState(
    selectedItem ? selectedItem.language : ""
  );
  const [email, setEmail] = useState(selectedItem ? selectedItem.email : "");
  const [phone, setPhone] = useState(selectedItem ? selectedItem.phone : "");
  const [gender, setGender] = useState(selectedItem ? selectedItem.gender : "");
  const [hobbies, setHobbies] = useState(
    selectedItem ? selectedItem.hobbies : []
  );
  const [password, setPassword] = useState(
    selectedItem ? selectedItem.password : ""
  );
  const buttonClassName = selectedItem ? "btn btn-primary" : "btn btn-primary";
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone number validation
    const phoneRegex = /^\+91[0-9]{3}[0-9]{3}[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid phone number (format: 123-456-7890)";
    }

    // Hobbies validation
    if (hobbies.length === 0) {
      errors.hobbies = "Please select at least one hobby";
    }
    if (!gender) {
      errors.gender = "please select at least one";
    }

    // Password validation
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newItem = {
      id: selectedItem
        ? selectedItem.id
        : Math.max(...data.map((item) => item.id)) + 1,
      name,
      tech,
      language,
      email,
      phone,
      gender,
      hobbies,
      password,
    };

    if (selectedItem) {
      onEdit(newItem);
    } else {
      onAdd(newItem);
    }

    setName("");
    setTech("");
    setLanguage("");
    setEmail("");
    setPhone("");
    setGender("");
    setHobbies([]);
    setPassword("");
  };

  const handleHobbyChange = (hobby) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter((item) => item !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="submitform">
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Technology:</label>
      <input
        type="text"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
        required
      />

      <label>Language:</label>
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {formErrors.email && (
        <div className="error" style={{ color: "red" }}>
          {formErrors.email}
        </div>
      )}

      <label>Phone No:</label>
      <input
        type="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
          type="radio"
          name="gender"
          value="Male"
          id="male"
          checked={gender === "Male"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="male">Male</label>

        <input
          type="radio"
          name="gender"
          value="Female"
          id="female"
          checked={gender === "Female"}
          onChange={(e) => setGender(e.target.value)}
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
          type="checkbox"
          name="hobbies"
          value="Gaming"
          id="gaming"
          checked={hobbies.includes("Gaming")}
          onChange={() => handleHobbyChange("Gaming")}
        />
        <label htmlFor="gaming">Gaming</label>

        <input
          type="checkbox"
          name="hobbies"
          value="Music"
          id="music"
          checked={hobbies.includes("Music")}
          onChange={() => handleHobbyChange("Music")}
        />
        <label htmlFor="music">Music</label>
        <input
          type="checkbox"
          name="hobbies"
          value="Reading"
          id="reading"
          checked={hobbies.includes("Reading")}
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
          className={buttonClassName}
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

export default demoCrud;
