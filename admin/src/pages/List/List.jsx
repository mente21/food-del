import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./List.css";
import { Link } from "react-router-dom";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success("Food removed successfully");
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      toast.error("Error removing food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods list</p>

      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Edit</b>
        <b>Delete</b>
      </div>

      {currentItems.map((item, index) => {
        return (
          <div key={index} className="list-table-format">
            <img src={Array.isArray(item.image) ? (item.image[0].startsWith("http") ? item.image[0] : `${url}/images/${item.image[0]}`) : (item.image.startsWith("http") ? item.image : `${url}/images/${item.image}`)} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <Link to={`/edit-food/${item._id}`} className="cursor edit-btn">
              Edit
            </Link>
            <p className="cursor delete-btn" onClick={() => removeFood(item._id)}>
              Delete
            </p>
          </div>
        );
      })}

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

export default List;
