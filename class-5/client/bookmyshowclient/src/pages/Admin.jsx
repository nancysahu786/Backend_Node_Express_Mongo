import { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";

// date-fns utility library for date formating
import { format } from "date-fns";
import { duration } from "@mui/material/styles";
import Modal from "react-modal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    poster: null,
    title: "",
    description: "",
    duration: "",
    genre: "",
    language: "",
    releaseDate: "",
  });

  // const handleInputChange = (e) => {
  //   // e.stopPropagation();
  //   // e.preventdefault();

  //   let { name, value } = e.target;
  //   console.log(name, value);

  //   if (name == "poster") {
  //     value = e.target.files[0];
  //   }
  //   if (name == "genre" || name == "language") {
  //     value = value.split(",");
  //   }
  //   setNewMovie({ ...newMovie, [name]: value });
  // };

  const handleInputChange = (e) => {
    console.log(e);
    if (e && e.target) {
      const { name, value, files } = e.target;

      if (name === "poster") {
        setNewMovie({ ...newMovie, poster: files[0] });
      } else {
        setNewMovie({ ...newMovie, [name]: value });
      }
    } else {
      setNewMovie({ ...newMovie, releaseDate: e });
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  // get all movies
  const fetchMovies = async () => {
    const response = await fetch("http://localhost:5000/api/movie/", {
      headers: {
        jwttoken: window.localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setMovies(data);
  };

  //add movie
  // const handleAddMovie = async () => {
  //   console.log("newMovie", newMovie);

  //   const addMovieResponse = await fetch("http://localhost:5000/api/movie/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newMovie),
  //   });
  //   console.log("addMovieResponse-->", addMovieResponse);
  // };

  const handleAddMovie = async () => {
    try {
      const formData = new FormData();
      formData.append("poster", newMovie.poster);
      formData.append("title", newMovie.title);

      formData.append("description", newMovie.description);

      formData.append("duration", newMovie.duration);

      formData.append("releaseDate", newMovie.releaseDate);

      newMovie.genre
        .split(",")
        .forEach((g) => formData.append("genre", g.trim()));
      newMovie.language
        .split(",")
        .forEach((g) => formData.append("language", g.trim()));

      // console.log("payload", payload);
      const addMovieResponse = await fetch("http://localhost:5000/api/movie/", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          jwttoken: window.localStorage.getItem("token"),
        },
        body: formData,
      });
      const data = await addMovieResponse.json();
      if (data && data.success == true) {
        console.log("movie data added-->", data);
        window.alert(data.message);
        setMovies((prevMovies) => [...prevMovies, data.data]);
        setNewMovie({
          poster: null,
          title: "",
          description: "",
          duration: "",
          genre: "",
          language: "",
          releaseDate: "",
        });
        setOpen(false);
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      window.alert("Error adding movie:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const customStyles = {
    // content: {
    //   top: "50%",
    //   left: "50%",
    //   right: "auto",
    //   bottom: "auto",
    //   marginRight: "-50%",
    //   transform: "translate(-50%, -50%)",
    //   maxHeight: "80vh",
    //   overflowY: "auto",
    // },

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
              placeholder="Search by Movie name"
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
                    src={`http://localhost:5000/${movie.poster}`}
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

      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h1 className="text-center text-black">Add Movies</h1>

          <div className="flex flex-col gap-4 w-[25vw] justify-center align-center">
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="poster">Poster Image</label>
              <input
                type="file"
                onChange={handleInputChange}
                name="poster"
                id="poster"
                className="background-color:white"
                required
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
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="title">Title</label>

              <TextField
                type="text"
                label="Enter Movie Title"
                id="title"
                name="title"
                onChange={handleInputChange}
                value={newMovie.title}
                multiline
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="description">Description</label>
              <TextareaAutosize
                type="text"
                multiline
                placeholder="Enter Description"
                id="description"
                name="description"
                onChange={handleInputChange}
                value={newMovie.description}
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="duration">Duration</label>
              <TextField
                type="number"
                label="Enter Duration"
                id="duration"
                name="duration"
                onChange={handleInputChange}
                value={newMovie.duration}
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="genre">Genre</label>
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
              <TextField
                type="text"
                label="Enter Genres"
                id="genre"
                name="genre"
                onChange={handleInputChange}
                value={newMovie.genre}
                multiline
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="language">Language</label>
              {/* <DropdownButton
                id="dropdown-basic-button"
                title="Select Language"
                name="language"
                onChange={handleInputChange}
              >
                <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Hindi</Dropdown.Item>
              </DropdownButton> */}
              <TextField
                type="text"
                label="Enter Language"
                id="language"
                name="language"
                onChange={handleInputChange}
                value={newMovie.language}
                multiline
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[100]">
              <label htmlFor="releaseDate"> Release Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Controlled picker"
                  name="releaseDate"
                  onChange={(newValue) => handleInputChange(newValue)}
                  value={
                    newMovie.releaseDate ? dayjs(newMovie.releaseDate) : null
                  }
                  id="releaseDate"
                  required
                />
              </LocalizationProvider>
            </div>
            <div className="flex flex-row justify-between">
              <Button type="button" onClick={handleAddMovie}>
                Add Movie
              </Button>

              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Admin;
