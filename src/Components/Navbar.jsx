import { AiFillCaretRight } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import useAxios from "../hooks/useAxios";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ userId, setUserId }) => {
  const axiosSecure = useAxios();
  const [profile, setProfile] = useState(null);
  const logOutModal = useRef(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get("/api/auth/profile", {
          headers: { "x-user-id": userId },
        });

        setProfile(res.data);
      } catch (err) {
        console.log("Profile error:", err);
      }
    };

    fetchProfile();
  }, [axiosSecure, userId]);

  return (
    <div className="navbar bg-white shadow-sm px-5 md:pl-12 md:pr-8">
      <div className="flex-none lg:hidden">
        <label htmlFor="dashboard-drawer" className="px">
          <GiHamburgerMenu className="w-5 h-6" />
        </label>
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-[Inter] font-medium text-center md:text-left">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-8">
        <button className=" py-1.5 px-3 rounded-sm hidden md:flex gap-2 font-[Inter] border-2 items-center ">
          <AiFillCaretRight size={20} /> Watch Tutorial
        </button>

        <div className="flex items-center gap-2.5">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}`}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-32 shadow-md mt-1 -mr-[16px] md:-mr-[60px]"
            >
              <button
                onClick={() => {
                  logOutModal.current.showModal();
                }}
                className="flex gap-3 items-center font-[Poppins] font-medium cursor-pointer"
              >
                <CiLogin size={20} /> Log Out
              </button>
            </ul>
          </div>

          <IoIosArrowDown className="hidden md:block" size={20} />

          <div className="flex items-center gap-2 border rounded-md p-1 bg-gray-100">
            <button
              onClick={() => setUserId("u1")}
              className={`px-3 py-1 text-sm rounded ${
                userId === "u1" ? "bg-black text-white" : ""
              }`}
            >
              U1
            </button>

            <button
              onClick={() => setUserId("u2")}
              className={`px-3 py-1 text-sm rounded ${
                userId === "u2" ? "bg-black text-white" : ""
              }`}
            >
              U2
            </button>
          </div>
        </div>
      </div>
      <dialog ref={logOutModal} className="modal ">
        <div className="modal-box font-[Inter] w-72 md:w-full mx-auto">
          <h3 className="font-medium border-b pb-1 border-[#f0f0f0] text-xs md:text-xl">
            Leaving already?
          </h3>
          <p className="py-4 md:py-8 text-[8px] md:text-base font-medium">
            You can log back in anytime to continue your meetings with Hintro.
          </p>
          <div className="modal-action justify-between">
            <form method="dialog">
              <button className="px-4 md:px-5 py-2 text-[8px] md:text-xs cursor-pointer text-black font-medium border-2 border-[#00000080] bg-white rounded-sm">
                Cancel
              </button>
            </form>
            <button className="py-2 px-4 md:px-9 text-[8px] md:text-xs cursor-pointer font-medium bg-black text-white rounded-sm">
              Log out
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Navbar;