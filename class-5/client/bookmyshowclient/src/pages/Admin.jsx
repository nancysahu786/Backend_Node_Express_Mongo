import { useState, useEffect, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// date-fns utility library for date formating
import { format } from "date-fns";
import { duration } from "@mui/material/styles";
const Admin = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    // poster: null,
    // title: "",
    // description: "",
    // duration: "",
    // genre: "",
    // language: "",
    // releaseDate: "",
  });

  const handleInputChange = (e) => {
    // e.stopPropagation();
    // e.preventdefault();

    const { name, value } = e.target;
    console.log(name, value);

    if (name == "poster") {
      // value = e.target.files[0];
      setNewMovie({ ...newMovie, [name]: e.target.files[0] });
    }
    if (name == "genre" || name == "language") {
      // value = value.split(",");
      setNewMovie({ ...newMovie, [name]: value.split(",") });
    }
    setNewMovie({ ...newMovie, [name]: value });
    // console.log(newMovie);
  };
  const openModal = () => {
    setOpen(true);
  };

  // get all movies
  const fetchMovies = async () => {
    const response = await fetch("http://localhost:5000/api/movie/");
    const data = await response.json();
    setMovies(data);
  };

  //add movie
  const handleAddMovie = async () => {
    console.log(newMovie);

    const addMovieResponse = await fetch("http://localhost:5000/api/movie/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    console.log("addMovieResponse-->", addMovieResponse);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Movies
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="w-[30vw]">
          <div className="flex flex-col gap-4 w-[30vw] overflow-y-auto">
            <div className="flex flex-col gap-2 w-[20vw]">
              {/* <label htmlFor="poster">Poster Image</label> */}
              <input
                type="file"
                onChange={handleInputChange}
                name="poster"
                // id="poster"
              />
              {newMovie.poster && (
                <>
                  <img
                    src={URL.createObjectURL(newMovie.poster)}
                    width={50}
                    height={50}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[20vw]">
              {/* <label htmlFor="title">Title</label> */}
              <input
                type="text"
                placeholder="Enter Movie Tiltle"
                // id="title"
                name="title"
                onChange={handleInputChange}
                value={newMovie.title}
              />
            </div>
            <div className="flex flex-col gap-2 w-[20vw]">
              {/* <label htmlFor="description">Description</label> */}
              <textarea
                type="text"
                placeholder="Enter Description"
                // id="description"
                name="description"
                onChange={handleInputChange}
                value={newMovie.description}
              />
            </div>
            <div className="flex flex-col gap-2 w-[20vw]">
              {/* <label htmlFor="duration">Duration</label> */}
              <input
                type="number"
                placeholder="Enter Duration"
                // id="duration"
                name="duration"
                onChange={handleInputChange}
                value={newMovie.duration}
              />
            </div>
            <div className="flex flex-col gap-2 w-[20vw]">
              {/* <label htmlFor="genre">Genre</label> */}
              {/* <DropdownButton
                id="dropdown-basic-button"
                title="Select Genres"
                name="genre"
                onChange={handleInputChange}
              >
                <Dropdown.Item href="#/action-1">Thriller</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Fantasy</Dropdown.Item>
              </DropdownButton> */}
              <input
                type="text"
                placeholder="Enter Genres"
                // id="genre"
                name="genre"
                onChange={handleInputChange}
                value={newMovie.genre}
              />
            </div>
            <div className="flex flex-col gap-2 w-[20vw]">
              {/* <label htmlFor="language">Language</label> */}
              {/* <DropdownButton
                id="dropdown-basic-button"
                title="Select Language"
                name="language"
                onChange={handleInputChange}
              >
                <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Hindi</Dropdown.Item>
              </DropdownButton> */}
              <input
                type="text"
                placeholder="Enter Language"
                // id="language"
                name="language"
                onChange={handleInputChange}
                value={newMovie.language}
              />
            </div>
            {/* <div className="flex flex-col gap-2 w-[20vw]">
              <label htmlFor="releaseDate"> Release Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Controlled picker"
                  name="releaseDate"
                  onChange={handleInputChange}
                />
              </LocalizationProvider>
            </div> */}
            <div>
              <Button type="button" onClick={handleAddMovie}>
                Add Movie
              </Button>

              <Button onClick={props.onHide}>Close</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  const memoizeModal = useMemo(() => {
    return (
      <MyVerticallyCenteredModal show={open} onHide={() => setOpen(false)} />
    );
  }, [open]);

  return (
    <>
      <div>
        <div>
          <div className="mt-2 flex flex-row mt-[16px] ml-[20px] gap-[10px]">
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Search by theatre name"
              className="flex-[0.7] rounded-[10px] p-7 shadow-[0_4px_20px_rgba(16,1,1,0.9)] bg-[white] border-white-100"
            />
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded "
              onClick={openModal}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <table className="table-auto text-left text-sm w-[92vw] px-4 py 6 rounded-[10px] mx-[20px] my-[20px] shadow-[0_4px_20px_rgba(16,1,1,0.9)] bg-[white] text-[black] p-[10px] ">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Poster</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Genere</th>
            <th className="px-4 py-2">Language</th>
            <th className="px-4 py-2">Release Date</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <>
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    width={50}
                    height={50}
                  />
                </td>
                <td className="px-4 py-2">{movie.title}</td>
                <td className="px-4 py-2">{movie.description}</td>
                <td className="px-4 py-2">{movie.genre?.join(", ")}</td>
                <td className="px-4 py-2">{movie.language?.join(", ")}</td>
                <td className="px-4 py-2">
                  {format(movie.releaseDate, "dd-MM-yyyy")}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      {memoizeModal}
    </>
  );
};

export default Admin;
