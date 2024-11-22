import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./sectionsStyle.css";

function ImagesPage() {
  const MySwal = withReactContent(Swal);
  const [getImages, setGetImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    file: null,
  });

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://145.223.33.75/api/getImages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setGetImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImage = (_id) => {
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
        fetch(`http://145.223.33.75/api/deleteImage/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            setGetImages((prevImages) =>
              prevImages.filter((Image) => Image._id !== _id)
            );
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

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({
      name: "",
      category: "",
      file: null,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://145.223.33.75/api/addImage";

      // Create a FormData object to handle the form data and file upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error while submitting the form.");
      }

      closeModal();
      fetchImages(); // Fetch updated image list after adding/updating
    } catch (error) {
      console.error("Error occurred while submitting data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  const searchInput = useRef();
  const Search = async (e) => {
    e.preventDefault();
    const searchValue = searchInput.current.value;

    try {
      const response = await fetch(
        `http://145.223.33.75/api/searchDrink?q=${encodeURIComponent(
          searchValue
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch drinks");
      }

      const data = await response.json();
      if (data.length === 0) {
        console.log("no results found");
      }
      setGetImages(data);
    } catch (error) {
      console.error("Error fetching drinks:", error);
      setSearchError("Error fetching results. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const Image = getImages.map((Image) => (
    <tr key={Image._id}>
      <td className="categorys-info">
        <img
          src={`http://145.223.33.75/uploads/${Image.image}`}
          height={150}
          width={150}
        />
      </td>
      <td className="categorys-info">{Image.name}</td>
      <td className="categorys-info">{Image.category}</td>
      <td className="d-flex flex-row-reverse align-items-center gap-2 justify-content-start">
        <div
          className="d-block btn btn-danger pt-1 pb-1"
          onClick={() => deleteImage(Image._id)}
        >
          <svg
            xmlns="https://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </div>
        {/* <div
          className="d-block btn btn-warning pt-1 pb-1"
          onClick={() => openEditModal(Image)}
        >
          <svg
            xmlns="https://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
          </svg>
        </div> */}
      </td>
    </tr>
  ));

  Modal.setAppElement("#root");

  return (
    <>
      <div className="d-flex justify-content-center pt-3">
        <h1 className="text-decoration-underline">الصور</h1>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-start ps-3">
          <button className="addButton" onClick={() => setModalIsOpen(true)}>
            اضافة صنف
          </button>
        </div>
        {/* <div className="search-container">
          <form onSubmit={Search}>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              ref={searchInput}
              className="border-bottom border-dark me-1"
            />
            <button className="btn btn-secondary" type="submit">
              <svg
                xmlns="https://www.w3.org/2000/svg"
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
        </div> */}
      </div>
      <table
        className="table table-hover table-striped border-top mt-3"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="text-end">الصور</th>
            <th className="text-end">القسم</th>
            <th className="text-end">الصنف</th>
            <th className="text-start">الاعدادات</th>
          </tr>
        </thead>
        <tbody>{Image}</tbody>
      </table>
      {isLoading ? (
        <div className="dot-spinner">
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={"Add Image"}
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="d-flex justify-content-center mb-2 pb-2">Add Image</h2>
        <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3">
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
            <label>: الصورة</label>
            <input
              type="file"
              name="file"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-success">
              Submit
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
  );
}

export default ImagesPage;
