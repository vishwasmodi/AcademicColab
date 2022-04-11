// import { format } from "timeago.js";
import dp from "../static/avatar.png";

export default function Message({ message, own }) {
  return (
    <div
      class={
        own
          ? "w-full flex justify-end text-green-900 max-w-xs "
          : " w-full flex justify-start text-blue-900  max-w-xs"
      }
    >
      <div class={"bg-blue-300 border-2 rounded-3xl max-w-sm px-4"}>
        <div>
          <div class=" rounded-full shadow-3xl border-2  border-black w-6 h-6">
            <img class="flex w-3 h-3 mt-1 ml-1" src={dp} alt="" />
          </div>
          <p class="flex ml-2  ">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
