import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState("");

  // get data as card
  async function getData() {
    const response = await fetch("http://localhost:5000/api/users");

    const result = await response.json();
    if (!response.ok) {
      seterror(result.error);
    } else {
      setdata(result);
    }
  }

  // delete data
  const deleteData = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/duser/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    if (!response.ok) {
      seterror(result.error);
    } else {
      seterror("Data Deleted");
      setTimeout(() => {
        seterror("");
        getData();
      }, 1000);
    }
  };

// update data
const updateData = async (id) => {
  const response = await fetch(
    `http://localhost:5000/api/upuser/${id}`,
    {
      method: "PATCH",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    seterror(result.error);
  } else {
    seterror("Data Updated");
    setTimeout(() => {
      seterror("");
      getData();
    }, 1000);
  }
}

  useEffect(() => {
    getData();
  }, []);

  // console.log(data);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">All Post</h2>
      <div className="row">
        {data?.map((item, index) => (
          <div key={index} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.email}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{item.age}</h6>
                <Link
                  to="#"
                  className="card-link"
                  onClick={() => deleteData(item._id)}
                >
                  Delete
                </Link>
                <Link to={`/${item._id}`} className="card-link" onClick={() => updateData(item._id)}>
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
