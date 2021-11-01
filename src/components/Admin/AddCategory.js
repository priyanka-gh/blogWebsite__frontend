import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../index";
import { createCategory, getCategories, deleteThisCategory } from "../apicalls";
import './AddCategory.css'
const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name }).then(data => {
      if (data && data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
        preload()
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="typeCat my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Travel"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );
  
  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  const deleteCategory = categoryId => {
    deleteThisCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        
        console.log(data);
      } else {
        preload();
      }
    });
  };

  return (
      <div className="row bg-white rounded AddCategory">
        <div className="col-md-8 offset-md-2 addCatForm">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
        </div>
        <div>
          <div className="lowerAdd">
          {categories.map((category) => {
            return (
              <div  className="catDiv">
                <h3>{category.name}</h3>
                  <div>
                  <button
                    onClick={() => {
                        deleteCategory(category._id);
                    }}
                  >
                    Delete
                  </button>
                  </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
  );
};

export default AddCategory;
