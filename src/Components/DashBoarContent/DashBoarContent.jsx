import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { IoCalendar } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { RiPieChartFill, RiUser3Fill } from "react-icons/ri";
import useAxios from "../../hooks/useAxios";

const DashBoarContent = ({ userId }) => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const lastSession = stats?.lastSession?.[0];
  const [callSessions, setCallSessions] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!axiosSecure) return;

      try {
        setLoading(true);

        const statsRes = await axiosSecure.get("/api/call-sessions/stats", {
          headers: { "x-user-id": userId },
        });

        const profileRes = await axiosSecure.get("/api/auth/profile", {
          headers: { "x-user-id": userId },
        });

        const callsRes = await axiosSecure.get("/api/call-sessions?limit=4", {
          headers: { "x-user-id": userId },
        });

        setStats(statsRes.data);
        setProfile(profileRes.data);
        setCallSessions(callsRes.data.callSessions);
      } catch (err) {
        console.log("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  const groupedCalls = callSessions.reduce((acc, call) => {
    const date = new Date(call.started_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(call);
    return acc;
  }, {});

  return (
    <div className="px-5 md:pl-20 md:pr-24 pt-6 space-y-6">
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-lg md:text-xl font-[Inter] font-medium">
            Hi, {profile?.firstName} 👋 Welcome to Hintro
          </h2>

          <p className="text-sm md:text-base text-gray-500 mt-1">
            Ready to make your next call smarter?
          </p>
        </div>

        <button className=" text-white font-[Roboto] text-sm bg-black w-[85px] h-8 md:w-[137px] md:h-[38px] rounded-sm">
          Start <span className="hidden md:inline">New</span> Call
        </button>
      </div>

      <div className="mb-10 md:mb-14 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-2.5 md:py-3.5 md:pl-4 md:pr-10 border border-[#00000033] bg-white rounded-xl">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="bg-[#ffe1e1] p-3 rounded-xl text-red-500 text-xl">
              <RiPieChartFill size={24} />
            </div>

            <div>
              <p className="font-[Inter] font-medium text-[8px] md:text-base text-[#000000cc]">
                Total Sessions
              </p>
              <h2 className="text-xs md:text-xl text-[#000000cc] font-[Inter] font-bold">
                {stats?.totalSessions ?? 0}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-2.5 md:py-3.5 md:pl-4 md:pr-6 border border-[#00000033] bg-white rounded-xl">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="bg-[#e1fcff] p-3 rounded-xl text-[#4c9da6] text-xl">
              <FaClock size={24} />
            </div>

            <div>
              <p className="font-[Inter] font-medium text-[8px] md:text-base text-[#000000cc]">
                Average Duration
              </p>
              <h2 className="text-xs md:text-lg text-[#000000cc] font-[Inter] font-bold">
                {stats?.averageDuration
                  ? `${Math.floor(stats.averageDuration / 60)} min ${stats.averageDuration % 60} sec`
                  : "0"}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-2.5 md:py-3.5 md:pl-4 md:pr-10 border border-[#00000033] bg-white rounded-xl">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="bg-[#e1ffe4] p-3 rounded-xl text-[#499955] text-xl">
              <HiSparkles size={24} />
            </div>

            <div>
              <p className="font-[Inter] font-medium text-[8px] md:text-base text-[#000000cc]">
                AI Used
              </p>
              <h2 className="text-xs md:text-xl text-[#000000cc] font-[Inter] font-bold">
                {" "}
                {stats?.totalAIInteractions
                  ? `${stats.totalAIInteractions} times`
                  : "0"}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-2.5 md:py-3.5 md:pl-4 md:pr-10 border border-[#00000033] bg-white rounded-xl">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="bg-[#ebe1ff] p-3 rounded-xl text-[#7B57C2] text-xl">
              <IoCalendar />
            </div>

            <div>
              <p className="font-[Inter] font-medium text-[8px] md:text-base text-[#000000cc]">
                Last Session
              </p>
              <h2 className="text-xs md:text-lg font-bold">
                {lastSession
                  ? `${Math.floor(
                      (Date.now() - new Date(lastSession).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )} days ago`
                  : "-"}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-center mb-3 font-[Inter] text-base font-semibold">
          Recent Calls
        </h2>

        {callSessions.length > 0 ? (
          <div className="md:w-10/12 mx-auto bg-white rounded-2xl  space-y-6">
            {Object.entries(groupedCalls).map(([date, calls]) => (
              <div key={date}>
                <p className="text-[#00000066] font-medium text-xs mb-3">
                  {date}
                </p>

                {calls.map((call) => (
                  <div
                    key={call._id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-[#8a38f5] text-black flex items-center justify-center">
                        {call.client?.charAt(0)}
                      </div>

                      <div>
                        <h3 className="">{call.client}</h3>

                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <RiUser3Fill /> {call.participants?.length}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-7">
                      <p className="text-xs font-medium">
                        {new Date(call.started_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <span>
                        <BsThreeDotsVertical />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center md:border md:border-[#f0f0f0] rounded-2xl py-10 w-10/12 mx-auto">
            <div className="w-12 h-12 bg-[#6686ff1f] rounded-lg flex items-center justify-center text-2xl shadow-sm mx-auto">
              <MdOutlineCalendarToday color="#6686ff" />
            </div>

            <p className="font-semibold mt-3 text-xs md:text-sm">
              No Recent Calls
            </p>

            <p className="text-[8px] md:text-xs text-[#00000066] mt-1">
              Connect your Google Calendar to see upcoming meetings,
              <br />
              get reminders, and join calls directly from Hintro.
            </p>

            <button className="px-3 mt-5 py-1.5 bg-white text-black text-[10px] border rounded-sm">
              Start a Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoarContent;