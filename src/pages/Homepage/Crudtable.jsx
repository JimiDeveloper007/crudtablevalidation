import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import RecordForm from "../../components/Form/RecordForm";

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
    phone: "+911234567890",
    gender: "Male",
    hobbies: ["Reading", "Gaming","Music"],
    password: "password123",
  },
  {
    name: "Darshit",
    id: 2,
    tech: "full stack",
    language: "React + Dotnet",
    email: "darshit@example.com",
    phone: "+911357902468",
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
    phone: "+911324576809",
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
    phone: "+9114826037485",
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
    phone: "+910147852369",
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
    phone: "+919510378462",
    gender: "Male",
    hobbies: ["Gaming", "Music"],
    password: "react@123",
  },
];
 

function Crudtable() {
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

  function hideshowForm(value) {
    if (value === "true") {
      setSelectedItem(null);
      setShowForm(value);
    } else {
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
              <button
                className="btn btn-primary"
                onClick={() => hideshowForm(true)}
              >
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


export default Crudtable;
