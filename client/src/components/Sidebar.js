import React from "react";
const Sidebar = () => {
  return (
    <div class="w-1/4 sticky top-12 h-[90vh]">
      <div class="bg-white rounded-xl ml-4 mr-8 mt-4 h-full shadow-lg text-black">
        <div class="ml-10 text-sm">
          <div class="mb-2 pt-4">Field</div>
          <div class="flex flex-col">
            <ul>
              <li>
                <input type="radio" value="Item 1" name="filter1" /> ML
              </li>
              <li>
                <input type="radio" value="Item 2" name="filter1" /> Automation
              </li>
              <li>
                <input type="radio" value="Item 3" name="filter1" /> Computer
                Vision
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
