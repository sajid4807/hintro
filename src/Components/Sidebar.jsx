import { useRef, useState } from "react";
import { BsChatSquareTextFill, BsGiftFill } from "react-icons/bs";
import { FaChartBar, FaFileAlt, FaInbox } from "react-icons/fa";
import { HiGlobeAlt, HiOutlineInformationCircle } from "react-icons/hi";
import { IoCallSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const Sidebar = () => {
  const feedBackModal = useRef();
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");

  const saveFeedback = () => {
    if (!feedbackText.trim()) return;

    const newFeedback = {
      id: Date.now(),
      text: feedbackText,
      createdAt: new Date().toISOString(),
    };

    const updated = [newFeedback, ...feedbacks];

    setFeedbacks(updated);
    localStorage.setItem("hintro_feedbacks", JSON.stringify(updated));

    setFeedbackText("");
  };
  return (
    <div className="drawer-side font-[Inter] bg-white shadow-sm">
      <label
        htmlFor="dashboard-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <aside className="w-72 min-h-full bg-base-100 flex flex-col">
        {/* Logo */}
        <div className="py-4 px-5 bg-white md:shadow-sm flex items-center justify-between lg:justify-center">
          {/* Mobile Close Button */}
          <label
            htmlFor="dashboard-drawer"
            className="lg:hidden cursor-pointer"
          >
            <MdClose size={28} />
          </label>

          <h1 className="text-2xl font-[Inter] font-medium hidden md:block">
            Hintro
          </h1>
        </div>

        {/* Menu */}
        <ul className="menu w-full p-5 text-sm font-medium text-[#202224] flex-1 gap-2">
          <li>
            <a
              className="active md:bg-[#6686ff1f] md:text-[#6686ff] font-medium text-sm
               rounded-lg "
            >
              <FaChartBar size={20} /> Dashboard
            </a>
          </li>

          <li>
            <a>
              <IoCallSharp size={20} /> Call Insights
            </a>
          </li>

          <li>
            <a>
              <FaFileAlt size={20} /> Knowledge Base{" "}
              <HiOutlineInformationCircle
                size={20}
                className="hidden md:inline"
              />{" "}
            </a>
          </li>

          <li>
            <a>
              <BsChatSquareTextFill size={20} /> Prompts{" "}
              <HiOutlineInformationCircle
                size={20}
                className="hidden md:inline"
              />{" "}
            </a>
          </li>

          <li>
            <a>
              <HiGlobeAlt size={20} /> Boxy Controls{" "}
              <HiOutlineInformationCircle
                size={20}
                className="hidden md:inline"
              />{" "}
            </a>
          </li>
        </ul>

        {/* Bottom Section */}
        <div className="p-8 border-t border-[#e2e2e8] space-y-5">
          <button
            className="flex items-center gap-3 text-[#202224]
    text-sm font-medium w-full"
          >
            <FaInbox size={20} className="text-[#555]" />
            <span>Feedback History</span>
          </button>
          <button
            onClick={() => {
              feedBackModal.current.showModal();
            }}
            className="flex items-center gap-3 text-[#202224] text-sm font-medium w-full"
          >
            <BsGiftFill size={20} className="text-[#555] cursor-pointer" />
            <span className="cursor-pointer">Feedback</span>
          </button>

          {/* Upgrade Button */}
          <button
            className="px-16 bg-[#00000080]
    text-white rounded-lg py-2 text-sm ml-2 mt-5"
          >
            Upgrade
          </button>
        </div>
      </aside>
      {/* feedback modal */}
      <dialog ref={feedBackModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Give Feedback</h3>

          <textarea
            className="textarea textarea-bordered w-full mt-3"
            placeholder="Write your feedback..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />

          <div className="modal-action">
            <button
              onClick={() => {
                feedBackModal.current.close();
              }}
              className="btn"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                saveFeedback();
                {
                  feedBackModal.current.close();
                }
              }}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Sidebar;
