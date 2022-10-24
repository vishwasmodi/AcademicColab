import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dataActions from "../actions/dataActions";
import Comment from "./Comment";

const ProjectCard = ({
  id,
  name,
  description,
  link,
  comments,
  userName,
  requests,
  colaboratorsDetails,
}) => {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [expand, setExpand] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const handleExpandComments = () => {
    setExpand(!expand);
  };

  const handleComment = () => {
    if (newComment.length > 0) {
      dispatch(dataActions.addComment(newComment, id));

      setAllComments([
        ...allComments,
        {
          comment: newComment,
          userId: user._id,
          userName: user.username,
          commentTime: new Date(),
        },
      ]);
    }
  };

  const handleJoinProject = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isLoggedIn) {
      navigate(`/register`);
      setLoading(false);
    } else {
      dispatch(dataActions.joinProject(id)).then(setLoading(false));
      setRequested(true);
    }
  };

  return (
    <div class="rounded overflow-hidden shadow-lg pb-4 mb-4">
      <div class="px-6 py-4">
        <div class="text-[rgb(26,14,171)] text-xl">
          <Link to={`/projects/${id}`}>{name}</Link>
        </div>
        <div>
          {colaboratorsDetails.map((colaborator) => {
            return (
              <div class="text-[rgb(119,119,119)] text-sm">
                <Link to={`/profile/${colaborator.username}`}>
                  {colaborator.name},&nbsp;&nbsp;
                </Link>
              </div>
            );
          })}
        </div>
        <p class="text-[rgb(119,119,119)] text-sm">{description}</p>
        <h2 class="text-gray-700 mt-3 text-sm">
          Link:
          <Link to={`${link}`}> {link}</Link>{" "}
        </h2>
      </div>
      <div class="flex justify-end mr-6">
        <button
          onClick={handleJoinProject}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          <span>Join Project</span>
          {loading === true ? (
            <svg
              class=" bg-blue-500 border-t-white border-2 rounded-full animate-spin h-5 w-5 mr-3  ..."
              viewBox="0 0 24 24"
            ></svg>
          ) : null}
        </button>
      </div>

      <div class="flex flex-row mt-2 mx-4 w-full text-gray-500 ">
        <button onClick={handleExpandComments}>View all comments</button>
      </div>

      <div class="">
        {expand ? (
          <div>
            <form class="flex">
              <textarea
                type="text"
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                placeholder="Add a comment..."
                class="border-2 border-gray-200 rounded-md w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
              <button
                type="button"
                class="border-2 rounded-md px-2 ml-2"
                onClick={handleComment}
              >
                Post
              </button>
            </form>
            {allComments.map((comment) => (
              <div>
                <Comment
                  commentBody={comment.comment}
                  commentUserName={comment.userName}
                  commentTime={comment.commentTime}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default ProjectCard;
