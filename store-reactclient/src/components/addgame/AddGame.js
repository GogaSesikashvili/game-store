import React, { useState, useEffect } from "react";
import "./addgame.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function AddGame() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [genres, setGenres] = useState([]);

  const isValid = Boolean(formData.name && formData.description);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.GENRES)
      .fetchAll()
      .then((res) => {
        setGenres(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postToCreate = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      price: formData.price,
      genres: selectedGenres,
    };

    if (isValid) {
      createApiEndpoint(ENDPOINTS.GAMES)
        .post(postToCreate)
        .catch((err) => console.log(err));

      alert("Movie added!");

      navigate("/");
    }
  };

  let tempGenres = [];

  genres.forEach((element) => {
    tempGenres.push({ label: `${element.name}`, value: element });
  });

  formData.genres = [];
  let tempGenreData = [];
  const [selectedGenres, setSelectedGenres] = useState([]);

  var genreHandle = (e) => {
    for (let x of e) {
      tempGenreData.push(x.value);
    }

    setSelectedGenres(tempGenreData);
    tempGenreData = [];
  };

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles) => ({ ...styles, color: "black" }),
    dropdownIndicator: (styles) => ({ ...styles, backgroundColor: "#348f34" }),
  };
  return (
    <>
      <Header />
      <div className="add-game-form-wrapper">
        <form className="form">
          <h1>Add new game</h1>
          <div>
            <label className="label">Game name</label>
            <input
              className="form-control"
              onChange={handleChange}
              value={formData.name}
              name="name"
              type="text"
              autoComplete="off"
            />
          </div>
          <label className="label">Game Genre</label>
          <Select
            styles={colorStyles}
            className="select-ganres"
            isMulti
            options={tempGenres}
            onChange={genreHandle}
          ></Select>
          <div>
            <label className="label">Game description</label>
            <textarea
              cols="40"
              rows="5"
              className="form-control"
              onChange={handleChange}
              value={formData.description}
              name="description"
              type="multitext"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="label">Image url</label>
            <input
              className="form-control"
              onChange={handleChange}
              value={formData.image}
              name="image"
              type="text"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="label">Price in decimal (ex. 2.22)</label>
            <input
              className="form-control"
              onChange={handleChange}
              value={formData.price}
              name="price"
              type="number"
              autoComplete="off"
            />
          </div>
          <div className="submit-button">
            <button
              className="submit-btn"
              disabled={!isValid}
              onClick={handleSubmit}
              title={
                isValid
                  ? "Add new movie"
                  : "Name & Description must be filled out."
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
