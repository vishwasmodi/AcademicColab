import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dataActions from "../actions/dataActions";
import ProjectDescriptionNav from "./ProjectDescriptionNav";
import Loader from "./Loader";
import Comment from "./Comment";
import sendIcon from "../static/send.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";

const ProjectDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [expand, setExpand] = useState(false);
  const [newComment, setNewComment] = useState("");
  const project = useSelector((state) => state.getproject.project);
  const [allComments, setAllComments] = useState([]);

  const [user, error] = useAuthState(auth);

  const handleExpandComments = () => {
    setExpand(!expand);
  };

  const handleComment = () => {
    if (newComment.length > 0) {
      console.log(project);
      dispatch(dataActions.addComment(newComment, project._id));
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

  useEffect(() => {
    setLoading(true);
    dispatch(dataActions.getProject(params.projectId)).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (project) setAllComments(project.comments);
  }, [project]);

  return (
    <div>
      <div class="sticky top-0">
        <ProjectDescriptionNav />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div class="py-10 bg-[rgb(255,255,255)] h-screen">
          <div class="text-{rgb(26,14,171)} w-1/5 text-right mb-6">
            {project.name}
          </div>
          <div class="text-sm flex px-8 mb-3">
            <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
              Authors
            </div>
            <div class="flex text-black">
              {project.colaboratorsDetails
                ? project.colaboratorsDetails.map((colaborator) => {
                    return (
                      <div class="text-sm">
                        <Link to={`/profile/${colaborator.userId}`}>
                          {colaborator.name},&nbsp;&nbsp;
                        </Link>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div class="text-sm flex px-8 mb-3">
            <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
              Publication date
            </div>
            <div>18 Nov 2022</div>
          </div>
          <div class="text-sm flex px-8 mb-3">
            <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
              Journal
            </div>
            &nbsp;&nbsp;
            <div></div>
          </div>
          <div class="text-sm flex px-8 mb-3">
            <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
              Volume
            </div>
            <div></div>
          </div>
          <div class="text-sm flex px-8 mb-3">
            <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
              Pages
            </div>
            <div></div>
          </div>

          <div class="text-sm flex px-8 mb-3">
            <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
              Description
            </div>
            <div class="break-normal max-w-2xl">{project.description}</div>
          </div>
          <div class="text-sm flex px-8 mb-3">
            <div class="text-[rgb(119,119,119)] w-1/5 text-right mr-4">
              Total citations
            </div>
            <div></div>
          </div>

          {/* {alreadyContributor() ? null : (
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
          )} */}

          <div class="mt-12 max-w-3xl pl-48 align-middle ">
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
              {allComments ? (
                <div>
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
        </div>
      )}
    </div>
  );
};

export default ProjectDescription;
