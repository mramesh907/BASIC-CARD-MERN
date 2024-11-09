import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Update = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState(0);
  const [error, seterror] = useState("");
  const { id } = useParams();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/api/user/${id}`);

    const result = await response.json();
    if (!response.ok) {
      seterror(result.error);
    } else {
      seterror("");
      setname(result.name);
      setemail(result.email);
      setage(result.age);
    }
  };

  // send edited data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateUser = { name, email, age };
    const response = await fetch(`http://localhost:5000/api/upuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });
    const result = await response.json();

    if (!response.ok) {
      // console.log(result.error)
      seterror(result.error);
    } else {
      seterror("");
      setname("");
      setemail("");
      setage(0);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}

      <h2 className="text-center">Edit the details</h2>

      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
