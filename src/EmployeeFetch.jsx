import React, { useEffect, useState } from "react";
import { EmployeeData } from "./EmployeeData";

const EmployeeFetch = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setFirstName(dt[0].firstname);
      setLastName(dt[0].lastname);
      setAge(dt[0].age);
      setId(dt[0].id);
      setIsUpdate(true);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this records")) {
        const data1 = data.filter((item) => item.id != id);
        setData(data1);
      }
    }
  };
  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setAge(0);
    setId(0);
    setIsUpdate(false);
  };
  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].firstname = firstName;
    dt[index].lastname = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };
  const handleSave = (e) => {
    const dt = [...data];
    const newObject = {
      id: EmployeeData.length + 1,
      firstname: firstName,
      lastname: lastName,
      age: age,
    };
    dt.push(newObject);
    setData(dt);
    handleClear();
  };

  return (
    <>
      <div className="App">
        <h1>Employee Management System CRUD Operations Project</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <label>
              First Name
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name
              <input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              age
              <input
                type="text"
                placeholder="Enter age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </label>
          </div>
          {!isUpdate ? (
            <div>
              {" "}
              <button
                className="btn btn-primary"
                onClick={(e) => handleSave(e)}
              >
                Save
              </button>
              &nbsp;
            </div>
          ) : (
            <div>
              {" "}
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate()}
              >
                Update
              </button>
              &nbsp;
            </div>
          )}

          <div>
            <button className="btn btn-danger" onClick={() => handleClear()}>
              Clear
            </button>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.age}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeFetch;
