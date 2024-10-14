import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./sectionsStyle.css";
function FoodsPage() {
  const MySwal = withReactContent(Swal);
  const [getFoods, setGetFoods] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchFoods = () => {
    setIsLoading(true);
    console.log(isLoading);
    fetch("http://localhost:5000/api/getFoods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setGetFoods(data);
      });
    console.log(isLoading);
    setIsLoading(false);
  };
  const deleteFood = (_id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/deleteFood/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setGetFoods(getFoods.filter((food) => food._id !== _id));
            MySwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFoodId, setEditFoodId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
  });

  // Loading and feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Open the modal for adding a new food item
  const openAddModal = () => {
    resetForm();
    setIsEditMode(false);
    setModalIsOpen(true);
  };

  // Open the modal for editing an existing food item
  const openEditModal = (food) => {
    console.log(food);
    setFormData({
      name: food.name,
      category: food.category,
      price: food.price,
    });
    setEditFoodId(food._id);
    setIsEditMode(true);
    setModalIsOpen(true);
  };

  // Close the modal and reset form states
  const closeModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
    });
    setFeedbackMessage("");
    setEditFoodId(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const { name, category, price } = formData;
    return name.trim() !== "" && category.trim() !== "" && price.trim() !== "";
  };

  // Add or update food item
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setFeedbackMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    const url = isEditMode
      ? `http://localhost:5000/api/updateFood/${editFoodId}`
      : "http://localhost:5000/api/addFood";

    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        closeModal();
        fetchFoods(); // Fetch updated food list after adding/updating
        setFeedbackMessage(
          isEditMode ? "Food updated successfully!" : "Food added successfully!"
        );
      })
      .catch((error) => {
        setIsSubmitting(false);
        setFeedbackMessage("Error occurred while submitting data.");
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    // setIsLoading(true);
    fetchFoods();
    // setIsLoading(false);
  }, []);
  const onItemSearch = () => {};
  const Food = getFoods.map((Food, index) => (
    <tr>
      {/* <script>{Food}</script> */}
      {/* className="border rounded d-flex flex-row-reverse gap-2 p-2" */}
      <td className="categorys-info">{Food.name}</td>
      <td className="categorys-info">{Food.category}</td>
      <td className="categorys-info">{Food.price}</td>
      <td className="d-flex flex-row-reverse align-items-center gap-2 justify-content-start">
        <div
          className="d-block btn btn-danger pt-1 pb-1"
          onClick={() => deleteFood(Food._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </div>
        <div
          className="d-block btn btn-warning pt-1 pb-1"
          onClick={() => openEditModal(Food)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
          </svg>
        </div>
      </td>
    </tr>
  ));

  Modal.setAppElement("#root");
  return (
    <>
      {/* <div>{Project}</div> <button onClick={addProject}>Add</button> */}
      <>
        <div className="d-flex justify-content-center pt-3">
          <h1 className="text-decoration-underline">المأكولات</h1>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start ps-3">
            <button className="addButton" onClick={openAddModal}>
              اضافة صنف
            </button>
          </div>
          <div class="search-container">
            <form onSubmit={onItemSearch}>
              <input
                type="text"
                placeholder="Search.."
                name="search"
                className="border-bottom border-dark me-1"
              />
              <button className="btn btn-secondary" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* <div className="d-flex flex-wrap gap-3 flex-row-reverse p-3 justify-content-between">
          {Food}
        </div> */}
        <table
          className="table table-hover table-striped border-top mt-3"
          dir="rtl"
        >
          <thead>
            <tr>
              <th className="text-end">الصنف</th>
              <th className="text-end">القسم</th>
              <th className="text-end">السعر</th>
              <th className="text-start">الاعدادات</th>
            </tr>
          </thead>
          <tbody>{Food}</tbody>
        </table>
        {isLoading == true ? (
          <div class="dot-spinner">
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
          </div>
        ) : (
          <div></div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel={isEditMode ? "Edit Food" : "Add Food"}
          className="modal"
          overlayClassName="overlay"
        >
          <h2 className="d-flex justify-content-center mb-2 pb-2">
            {isEditMode ? "Edit Food" : "Add Food"}
          </h2>

          {/* Display feedback message */}
          {feedbackMessage && (
            <div className="alert alert-info">{feedbackMessage}</div>
          )}

          <form
            onSubmit={handleFormSubmit}
            className="d-flex flex-column gap-3"
          >
            <div className="d-flex flex-row-reverse gap-3">
              <label>: الاسم</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex flex-row-reverse gap-3">
              <label>: الصنف</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex flex-row-reverse gap-3">
              <label>: السعر</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="d-flex gap-3">
              <button
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : isEditMode
                  ? "Update"
                  : "Submit"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-danger"
              >
                Close
              </button>
            </div>
          </form>
        </Modal>
      </>
    </>
  );
}
export default FoodsPage;
