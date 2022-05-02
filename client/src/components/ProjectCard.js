import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dataActions from "../actions/dataActions";
import Comment from "./Comment";

const ProjectCard = ({
  id,
  name,
  description,
  githubRepo,
  techStack,
  comments,
  colaborators,
  votes,
  colaboratorsLimit,
  userName,
  requests,
  colaboratorsUsername,
}) => {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [expand, setExpand] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showCommentButton, setShowCommentButton] = useState(false);
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
          commentBody: newComment,
          commentUserId: user._id,
          commentUserName: user.username,
        },
      ]);

      setNewComment("");
      setShowCommentButton(false);
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

  const already = colaborators.find((colaborator) => {
    return user && colaborator.toString() === user.userId;
  });
  let req = null;
  if (user) {
    let req = requests.find((req) => req === user.userId);
  }
  return (
    <div class="rounded overflow-hidden shadow-lg pb-4 mb-4">
      <div class="px-6 py-4">
        <div class="flex space-between">
          <Link to={`/projects/${id}`}>
            <div class="font-bold text-xl mb-2">{name}</div>
          </Link>
          <div class="text-l ml-10">{userName}</div>
        </div>
        <p class="text-gray-700 text-base">{description}</p>
        <h2 class="text-gray-700 text-base mt-3">
          Github Repo:
          <Link to={`${githubRepo}`}> {githubRepo}</Link>{" "}
        </h2>
      </div>
      <div class="px-6 pt-4 pb-2">
        {techStack.map((tech) => {
          return (
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tech}
            </span>
          );
        })}
      </div>
      {!already && !requested && !req ? (
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
      ) : (
        <></>
      )}
      <div class="flex ml-8">
        <h1>Colaborators: &nbsp;</h1>
        {colaboratorsUsername.map((username) => {
          return (
            <div class="text-blue-600">
              <Link to={`/profile/${username}`}>{username},&nbsp;&nbsp;</Link>
            </div>
          );
        })}
      </div>
      <div class="flex flex-row mt-2 mx-4 w-full justify-evenly">
        <div class="px-6 border-blue-500 text-blue rounded-md mr-6 py-1 flex align-middle">
          <h1>Like</h1>
        </div>
        <div class="w-px bg-blue-400"></div>
        <div class="px-6 border-blue-500 text-blue rounded-md py-1 flex align-middle">
          <button onClick={handleExpandComments}>Comments</button>
        </div>
      </div>

      <div class="">
        {expand ? (
          allComments.map((comment) => (
            <Comment
              commentBody={comment.comment}
              commentUserId={comment.userId}
              commentUserName={comment.userName}
            />
          ))
        ) : allComments && allComments.length > 0 ? (
          <Comment
            commentBody={allComments[0].comment}
            commentUserId={allComments[0].userId}
            commentUserName={allComments[0].userName}
          />
        ) : null}
      </div>
      <form class="">
        <textarea
          type="text"
          onChange={(e) => {
            setNewComment(e.target.value);
            setShowCommentButton(true);
          }}
          placeholder="Add a comment..."
          class="border-2 border-gray-200 rounded-md w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        />
        {showCommentButton ? (
          <button
            type="button"
            class="border-2 border-blue-600 rounded-md px-2 ml-2"
            onClick={handleComment}
          >
            Post
          </button>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};
export default ProjectCard;
