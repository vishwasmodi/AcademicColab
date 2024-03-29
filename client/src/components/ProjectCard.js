import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dataActions from "../actions/dataActions";
import Comment from "./Comment";
import sendIcon from "../static/send.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";

const ProjectCard = ({
  id,
  name,
  description,
  link,
  comments,
  userName,
  requests,
  interests,
  colaboratorsDetails,
}) => {
  const [requested, setRequested] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [expand, setExpand] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments);

  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
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
          userId: user.uid,
          userName: user.displayName,
          commentTime: new Date().toLocaleString(),
        },
      ]);
    }
  };

  const alreadyContributor = () => {
    if (!user) return false;
    const res = colaboratorsDetails.find((colaborator) => {
      return colaborator.userId === user.uid;
    });
    return res || requested;
  };

  const handleJoinProject = (e) => {
    e.preventDefault();
    dispatch(dataActions.joinProject(id)).then(() => {
      setRequested(true);
    });
  };

  return (
    <div class="rounded overflow-hidden shadow-lg pb-4 mb-4 bg-[rgb(255,255,255)]">
      <div class="px-6 py-4">
        <div class="text-[rgb(26,14,171)] text-xl">
          <Link to={`/projects/${id}`}>{name}</Link>
        </div>
        <div class="flex">
          {colaboratorsDetails.map((colaborator) => {
            return (
              <div class="text-[rgb(119,119,119)] text-sm">
                <Link to={`/profile/${colaborator.userId}`}>
                  {colaborator.name},&nbsp;&nbsp;
                </Link>
              </div>
            );
          })}
        </div>
        <p class="text-[rgb(119,119,119)] text-sm">{description}</p>
      </div>
      <div class="flex text-gray-600 text-sm mx-6">
        Fields:&nbsp;
        {interests.map((interest) => {
          return <div class="text-gray-600 text-sm">{interest},&nbsp;</div>;
        })}
      </div>
      <div class="flex justify-between">
        <div class="text-gray-600 text-sm mx-6">
          Link:
          <Link to={`${link}`}> {link}</Link>{" "}
        </div>
        {loading || alreadyContributor() ? null : (
          <div class="mr-6">
            <button
              onClick={handleJoinProject}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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
        )}
      </div>

      <div class="flex flex-row mt-2 mx-6 w-full text-gray-500 ">
        <button onClick={handleExpandComments}>View all comments</button>
      </div>

      <div class="mt-2">
        {expand ? (
          <div>
            <form class="flex mx-2 my-2">
              <textarea
                type="text"
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                placeholder="Add a comment..."
                class="border-2 border-gray-100 rounded-md w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 max-h-10 px-2 pt-2"
              />
              <button
                type="button"
                class="rounded-md px-2 ml-2"
                onClick={handleComment}
              >
                <img src={sendIcon} alt="send" class="h-8 w-8 font-light" />
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
