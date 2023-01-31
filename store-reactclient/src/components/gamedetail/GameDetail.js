import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./gamedetail.css";
import useAuth from "./../../hooks/useAuth";

export default function GameDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const { auth } = useAuth();
  const [fetchCount, setfetchCount] = useState(0);
  const [comment, setComment] = useState([]);
  const [IsEdited, setIsEdited] = useState(false);
  const [restoreComment, setRestoreComment] = useState({});
  const { cart, setCart } = useAuth();

  const isValid = Boolean(
    comment?.text?.length > 0 && comment?.text?.length <= 600
  );

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.GAMES)
      .fetchById(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.COMMENTS)
      .fetchCommentsByGameId(id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, fetchCount]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!IsEdited) {
      const commentToAdd = {
        text: comment.text,
        userName: auth.user,
        gameId: id,
        replyId: comment.replyId,
      };

      if (isValid) {
        createApiEndpoint(ENDPOINTS.COMMENTS)
          .post(commentToAdd)
          .catch((err) => console.log(err));
      }
    } else {
      if (isValid) {
        const commentToEdit = {
          id: comment.id,
          text: comment.text,
          userName: auth.user,
        };

        createApiEndpoint(ENDPOINTS.COMMENTS)
          .edit(comment.id, commentToEdit)
          .catch((err) => console.log(err));
      }

      setIsEdited(false);
    }

    alert("Comment saved!");

    setfetchCount(fetchCount + 1);
    setComment({
      text: "",
      replyId: 0,
    });

    const signIn = document.querySelector(".add-comment");
    signIn.classList.toggle("show");
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setComment({
      text: "",
      replyId: 0,
    });
    setIsEdited(false);

    const signIn = document.querySelector(".add-comment");
    signIn.classList.toggle("show");
  };

  const commentHandler = () => {
    const signIn = document.querySelector(".add-comment");
    signIn.classList.toggle("show");
  };

  const editCommentHandler = (comment) => () => {
    setComment({
      id: comment.id,
      text: comment.text,
    });
    setIsEdited(true);

    const signIn = document.querySelector(".add-comment");
    signIn.classList.toggle("show");
  };

  const commentDeleteHandler = (comment) => (event) => {
    setRestoreComment({
      date: comment.date,
      gameId: comment.gameId,
      replyId: comment.replyId,
      text: comment.text,
      userName: comment.userName,
    });

    let isExecuted = window.confirm(
      "Are you sure you want to delete the comment?"
    );

    if (isExecuted) {
      createApiEndpoint(ENDPOINTS.COMMENTS)
        .delete(event.target.value)
        .catch((err) => console.log(err));

      alert("Comment deleted!");

      setfetchCount(fetchCount + 1);
    }
  };

  const commentRestoreHandler = () => {
    const commentToRestore = {
      date: restoreComment.date,
      gameId: restoreComment.gameId,
      replyId: restoreComment.replyId,
      text: restoreComment.text,
      userName: restoreComment.userName,
    };

    createApiEndpoint(ENDPOINTS.COMMENTS)
      .post(commentToRestore)
      .catch((err) => console.log(err));

    alert("Comment restored!");

    setRestoreComment({});
    setfetchCount(fetchCount + 1);
  };

  const commentReplyHandler = (cmnt) => () => {
    if (cmnt.replyId > 0) {
      setComment({
        replyId: cmnt.replyId,
      });
    } else {
      setComment({
        replyId: cmnt.id,
      });
    }

    const signIn = document.querySelector(".add-comment");
    signIn.classList.toggle("show");
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
    <>
      <Header />
      <div className="details-wrapper">
        <div className="details-img">
          <img src={data.image} alt="" />
          <Link to={`/editgame/${id}`}>
            <button className="button-edit">Edit</button>
          </Link>
        </div>
        <div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <div className="genres-wrapper-details">
            {data.genres.map((item) => (
              <div key={item.id} className="checkedboxdiv">
                {item.name}
              </div>
            ))}
          </div>
          <hr />
          <div className="price-info">
            <p className="price">${data.price}</p>
            <button className="button" onClick={() => addToCart(data)}>
              BUY
            </button>
          </div>
        </div>
      </div>
      <div className="comments">
        {auth.user ? (
          <div className="add-comment-wrapper">
            <button className="comment-button" onClick={commentHandler}>
              Comment
            </button>
            {restoreComment.text ? (
              <>
                <button
                  className="comment-restore-btn"
                  onClick={commentRestoreHandler}
                >
                  Restore deleted comment.
                </button>
              </>
            ) : (
              <></>
            )}
            <div className="add-comment">
              <textarea
                cols="40"
                rows="5"
                className="form-control"
                onChange={handleChange}
                value={comment.text}
                name="text"
                type="multitext"
                autoComplete="off"
              />
              <button
                className="comment-save"
                onClick={handleSubmit}
                disabled={!isValid}
                title={
                  isValid
                    ? "Add comment"
                    : "Comment must be from 1 to 600 characters"
                }
              >
                Save
              </button>
              <button className="comment-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="login-request">Please, sign in to comment.</div>
        )}
        {comments.map((comment) => {
          return (
            <div
              key={comment.id}
              className={comment.replyId === 0 ? "comment" : "comment-sub"}
            >
              <div className="comment-header">
                <h6>{comment.userName}</h6>
                {comment.date.split("T")[0] +
                  " " +
                  comment.date.split("T")[1].split(":")[0] +
                  ":" +
                  comment.date.split("T")[1].split(":")[1]}
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-control-wrapper">
                <button
                  className="comment-reply-btn"
                  onClick={commentReplyHandler(comment)}
                >
                  Reply
                </button>
                {comment.userName === auth.user ? (
                  <div className="comment-control">
                    <button
                      className="comment-delete-btn"
                      value={comment.id}
                      onClick={commentDeleteHandler(comment)}
                    >
                      Delete
                    </button>
                    <button
                      className="comment-edit-btn"
                      value={comment.id}
                      onClick={editCommentHandler(comment)}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
