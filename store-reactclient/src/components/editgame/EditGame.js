import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";

export default function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameBeingEdited, setGameBeingEdited] = useState([]);
  const [GenresBeingEdited, setGenresBeingEdited] = useState([]);
  const [formData, setFormData] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    setFormData(gameBeingEdited);
  }, [gameBeingEdited]);

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.GAMES)
      .fetchById(id)
      .then((res) => {
        setGameBeingEdited(res.data);
        setGenresBeingEdited(res.data.genres);
      })
      .catch((err) => console.log(err));
  }, [id]);

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
        setAllGenres(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const gameToEdit = {
      id: gameBeingEdited.id,
      name: formData.name,
      description: formData.description,
      image: formData.image,
      price: formData.price,
      genres: selectedGenres,
    };

    if (isValid) {
      createApiEndpoint(ENDPOINTS.GAMES)
        .edit(id, gameToEdit)
        .catch((err) => console.log(err));

      alert("Game edited!");

      navigate(`/gamedetail/${id}`);
    }
  };

  let allGenreOptions = [];

  allGenres.forEach((element) => {
    allGenreOptions.push({ label: `${element.name}`, value: element });
  });

  let tempGenreHolder = [];
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    setSelectedGenres(GenresBeingEdited);
  }, [GenresBeingEdited]);

  var genreHandle = (e) => {
    for (let x of e) {
      tempGenreHolder.push(x.value);
    }

    setSelectedGenres(tempGenreHolder);
    tempGenreHolder = [];
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
          <h1>Edit game: "{gameBeingEdited.name}"</h1>
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
            defaultValue={selectedGenres}
            styles={colorStyles}
            className="select-ganres"
            isMulti
            options={allGenreOptions}
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
                  ? "Add new game"
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
