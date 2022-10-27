const Comment = ({ commentBody, commentUserName, commentTime }) => {
  return (
    <div class="mx-4">
      <div class="flex">
        <div class="text-sm font-semibold text-gray-800">{commentUserName}</div>
        &nbsp;&nbsp;
        <div class="text-sm  text-gray-600">{commentBody}</div>
      </div>
      <div class="text-[12px] font-light">{commentTime.toString()}</div>
    </div>
  );
};
export default Comment;
