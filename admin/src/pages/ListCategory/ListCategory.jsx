import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ListCategory.css";
import { Link } from "react-router-dom";

const ListCategory = ({ url }) => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const fetchCategories = async () => {
    const response = await axios.get(`${url}/api/category/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching categories");
    }
  };

  const removeCategory = async (id) => {
    const response = await axios.post(`${url}/api/category/remove`, { id });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchCategories();
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="list-category add flex-col">
      <p>All Categories List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Edit</b>
          <b>Delete</b>
        </div>
        {currentItems.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <Link to={`/edit-category/${item._id}`} className="cursor edit-btn">
                Edit
              </Link>
              <p className="cursor delete-btn" onClick={() => removeCategory(item._id)}>
                Delete
              </p>
            </div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>&lt;</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default ListCategory;
