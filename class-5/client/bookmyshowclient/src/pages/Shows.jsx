import { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useNavigate, useParams } from "react-router-dom";
const Shows = () => {
  const [open, setOpen] = useState(false);
  const [shows, setShows] = useState([]);
  const [newTheatre, setNewTheatre] = useState({
    name: "",
    movie: "",
    date: "",
    time: "",
    totalSeats: 0,
    ticketPrice: 0,
  });
  const navigate = useNavigate();
  const { theatreId } = useParams();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewTheatre({ ...newTheatre, [name]: value });
  };

  const openModal = () => {
    setOpen(true);
  };

  // get all movies
  const fetchShows = async () => {
    const response = await fetch(
      `http://localhost:5000/api/show?theatre=${theatreId}`,
      {
        headers: {
          jwttoken: window.localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setShows(data.filterDetails);
  };

  const handleAddTheatre = async () => {
    try {
      const payload = {
        name: newTheatre.name,
        location: newTheatre.location,
        email: newTheatre.email,
        phone: newTheatre.phone,
      };

      // console.log("payload", payload);
      const addTheatreResponse = await fetch(
        "http://localhost:5000/api/theatre/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            jwttoken: window.localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await addTheatreResponse.json();
      if (data && data.success == true) {
        console.log("Theatre data added-->", data);
        window.alert(data.message);
        setTheatres((prevTheatre) => [...prevTheatre, data.data]);
        setNewTheatre({
          name: "",
          location: "",
          email: "",
          phone: "",
          isActive: "",
        });
        setOpen(false);
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      window.alert("Error adding Theatre:", error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const customStyles = {
    content: {
      top: "8%",
      left: "50%",
      bottom: "auto",
      transform: "translateX(-50%)",
      maxWidth: "30vw",
      width: "100%",
      position: "relative",
    },
    overlay: {
      overflowY: "auto", // 👈 enable scroll on OVERLAY instead of content
    },
  };

  return (
    <>
      <div>
        <div>
          <div className="mt-2 flex flex-row mt-[16px] ml-[20px] gap-[10px]">
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Search by Show "
              className="flex-[0.7] rounded-[10px] p-7 shadow-[0_4px_20px_rgba(16,1,1,0.9)] bg-[white] border-white-100"
            />
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded "
              onClick={openModal}
            >
              Add Show
            </button>
          </div>
        </div>
      </div>

      <table className="table-auto text-left text-sm w-[92vw] px-4 py 6 rounded-[10px] mx-[20px] my-[20px] shadow-[0_4px_20px_rgba(16,1,1,0.9)] bg-[white] text-[black] p-[10px] ">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Movie</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Total Seats</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((show, index) => (
            <>
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">{show.name}</td>
                <td className="px-4 py-2">{show.movie}</td>
                <td className="px-4 py-2">{show.date}</td>
                <td className="px-4 py-2">{show.time}</td>
                <td className="px-4 py-2">{show.totalSeats}</td>
                <td className="px-4 py-2">{show.ticketPrice}</td>

                <td className="flex gap-2">
                  <button className="bg-yellow-400 text-white">Edit</button>
                  <button className="background-color: Red">Delete</button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h1 className="text-center text-black">Add Theatre</h1>

          <div className="flex flex-col gap-4 w-[25vw] justify-center align-center">
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="name">Name</label>

              <TextField
                type="text"
                label="Enter Theatre Name"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={newTheatre.name}
                multiline
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="location">Location</label>
              <TextareaAutosize
                type="text"
                multiline
                placeholder="Enter Location"
                id="location"
                name="location"
                onChange={handleInputChange}
                value={newTheatre.location}
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="email">Email</label>
              <TextField
                type="email"
                label="Enter Email"
                id="email"
                name="email"
                onChange={handleInputChange}
                value={newTheatre.email}
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="phone">Phone</label>

              <TextField
                type="number"
                label="Enter phone"
                id="phone"
                name="phone"
                onChange={handleInputChange}
                value={newTheatre.phone}
                multiline
                required
              />
            </div>

            <div className="flex flex-row justify-between">
              <Button type="button" onClick={handleAddTheatre}>
                Add Theatre
              </Button>

              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Shows;
