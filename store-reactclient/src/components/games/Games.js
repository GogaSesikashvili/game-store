import React, { useState, useEffect } from "react";
import "./games.css";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { Link } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

function Games() {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGenreNames, setSelectedGenreNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [fetchCount, setfetchCount] = useState(0);
  const { cart, setCart } = useAuth();

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.GAMES)
      .fetchAll()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [fetchCount]);

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.GENRES)
      .fetchAll()
      .then((res) => {
        setGenres(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedGenre.length === 0 && searchTerm.length < 3) {
      setFilteredGames(data);
    } else if (selectedGenre.length !== 0 && searchTerm.length < 3) {
      setFilteredGames(
        data.filter((game) =>
          selectedGenre.some((category) =>
            [game.genres.map((x) => x.id)].flat().includes(parseInt(category))
          )
        )
      );
    } else if (selectedGenre.length === 0 && searchTerm.length > 2) {
      setFilteredGames(
        data.filter((game) =>
          [searchTerm.toLowerCase()].some((category) =>
            game.name.toLowerCase().includes(category.toLowerCase())
          )
        )
      );
    } else {
      setFilteredGames(
        data
          .filter((game) =>
            [searchTerm.toLowerCase()].some((category) =>
              game.name.toLowerCase().includes(category.toLowerCase())
            )
          )
          .filter((game) =>
            selectedGenre.some((category) =>
              [game.genres.map((x) => x.id)].flat().includes(parseInt(category))
            )
          )
      );
    }
  }, [selectedGenre, searchTerm, data]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedGenre([...selectedGenre, e.target.value.split(",")[0]]);
      setSelectedGenreNames([
        ...selectedGenreNames,
        e.target.value.split(",")[1],
      ]);
    } else {
      setSelectedGenre(
        selectedGenre.filter((id) => id !== e.target.value.split(",")[0])
      );
      setSelectedGenreNames(
        selectedGenreNames.filter((id) => id !== e.target.value.split(",")[1])
      );
    }
  };

  const handleClick = (event) => {
    let checkbox =
      event.target.parentElement.parentElement.nextSibling.nextSibling;
    if (checkbox.style.display !== "flex") {
      checkbox.style.display = "flex";
    } else {
      checkbox.style.display = "none";
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteGameHandler = (event) => {
    let isExecuted = window.confirm(
      "Are you sure you want to delete the game?"
    );

    if (isExecuted) {
      createApiEndpoint(ENDPOINTS.GAMES)
        .delete(event.target.value)
        .catch((err) => console.log(err));

      alert("Game deleted!");

      setfetchCount(fetchCount + 1);
    }
  };

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => product.id === item.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  if (data.length === 0) {
    return <h1> loading... </h1>;
  }

  return (
    <div className="container">
      <div className="genre-search-wrapper">
        <div className="top-genre">
          <button className="add-genre-button" onClick={handleClick}>
            ➕ Add genre
          </button>
        </div>
        <div className="checkedgenres">
          {selectedGenreNames.map((s) => (
            <div key={s} className="checkedboxdiv">
              {s}
            </div>
          ))}
        </div>
        <input
          className="search"
          type="text"
          placeholder="🔍"
          name="searchGame"
          value={searchTerm}
          onChange={handleSearch}
        ></input>
      </div>
      <div className="add-game-div">
        <Link className="add-game-link" to={`/addgame/`}>
          <button className="add-game-button">Add Game</button>
        </Link>
      </div>
      <div className="add-genre-checkbox-wrapper">
        <div className="add-genre-checkbox">
          {genres.map((genre) => {
            if (genre.parentId === 0) {
              return (
                <div key={genre.id}>
                  <input
                    type="checkbox"
                    value={[genre.id, genre.name]}
                    onChange={handleChange}
                  />
                  {" " + genre.name}
                </div>
              );
            } else {
              return (
                <div key={genre.id}>
                  {" - "}
                  <input
                    type="checkbox"
                    value={[genre.id, genre.name]}
                    onChange={handleChange}
                  />
                  {" " + genre.name}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="games">
        {filteredGames.map((game) => (
          <div key={game.id} className="game">
            <div className="image">
              <img src={game.image} alt=""></img>
              <div className="edit-delete-div">
                <Link className="edit-game-link" to={`/editgame/${game.id}`}>
                  <button className="edit-game-button">Edit Game</button>
                </Link>
                <div className="delete-game-div">
                  <button
                    className="delete-game-button"
                    value={game.id}
                    onClick={deleteGameHandler}
                  >
                    Delete Game
                  </button>
                </div>
              </div>
            </div>
            <div className="price-info">
              <p className="price">${game.price}</p>
              <button className="button" onClick={() => addToCart(game)}>
                BUY
              </button>
            </div>
            <div className="game-info">
              <p className="genre">
                {game.genres.map((genre) => {
                  return genre.name + " ";
                })}
              </p>
              <Link className="name-link" to={`/gamedetail/${game.id}`}>
                <p className="name">{game.name}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
