import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import MovieList from "./pages/MovieList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Owner from "./pages/Owner";
import PageNotFound from "./pages/PageNotFound";
import Shows from "./pages/Shows";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/movieslist" element={<Admin />} />
          <Route path="/owner/theatres" element={<Owner />} />
          <Route path="/owner/theatres/:theatreId/shows" element={<Shows />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
