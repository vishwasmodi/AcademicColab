const Comment = ({ commentBody, commentUserId, commentUserName }) => {
  return (
    <div class="">
      <div class="">{commentUserName}</div>
      <div class="">{commentBody}</div>
    </div>
  );
};
export default Comment;
