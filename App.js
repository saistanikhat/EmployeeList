import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const employees = [
  {
    id: "1",
    name: "Mr. X",
    city: "Delhi",
    designation: "developer"
  },
  {
    id: "2",
    name: "Mr. Y",
    city: "Madras",
    designation: "tester"
  },
  {
    id: "3",
    name: "Mr. M",
    city: "Delhi",
    designation: "Manager",
    employeesWorking: [
      {
        id: "1",
        name: "Mr. X",
        city: "Delhi",
        designation: "developer"
      },
      {
        id: "2",
        name: "Mr. Y",
        city: "Delhi",
        designation: "developer"
      }
    ]
  }
];

const cityData = ["Madras", "Mumbai", "Delhi"];

export default function App() {
  const [empList, setEmpList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cityList, setCityList] = useState(cityData);
  const [city, setCity] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [empWorking, setEmpWorking] = useState([]);

  useEffect(() => {
    axios
      .get(employees)
      .then((res) => {
        setEmpList(empList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredEmployees(employees.filter((emp) => emp.city === city));
  }, [city, empList]);

  const changeCity = (e) => {
    e.preventDefault();
    const selectedCity = e?.target?.value;
    setCity(selectedCity);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCheck = (obj) => {
    if (obj.designation === "manager") {
      setEmpWorking(obj);
    }
  };

  const EmployeesList = (props) => {
    const { name } = props;

    return (
      <>
        <div onClick={() => handleCheck(props)}>{name}</div>
      </>
    );
  };

  return (
    <div>
      <h1>Employees List</h1>
      <select value={city} onChange={changeCity}>
        <option value="">Select City</option>
        {cityList.map((city, index) => {
          return <option key={index}>{city}</option>;
        })}
      </select>
      {filteredEmployees?.map((emp, index) => (
        <EmployeesList key={index} {...emp} />
      ))}
      {empWorking &&
        Object.keys(empWorking).map((emp, index) => {
          return <div key={index}>{emp.name}</div>;
        })}
    </div>
  );
}
