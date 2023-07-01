import React from "react";
import useSWR from "swr";
import TeamMember from "./TeamMember";
import { useSelector } from "react-redux";
import UpdateMember from "./UpdateTeam/UpdateMember";
import MediaLens from "./MemberTeam/MediaLens";
import { LinearProgress, Tooltip } from "@mui/material";
import {
  ShareIcon,
  CheckBadgeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

const TeamWorking = () => {
  const { userInfo } = useSelector((state) => state.auth);
  //heade of society members
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    "/api/creativemember/getheadmember",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div>
        <div className="">
          {" "}
          <LinearProgress color="success" />
        </div>
      </div>
    );

  return (
    <div className="mt-5">
      <section>
        <div className="mx-auto max-w-7xl px-2 lg:px-8">
          <div className="mb-4 max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-black">
              Information Technology Society (I T S) Team.
            </p>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-black">
              CORE TEAM
            </h2>
          </div>
          <hr />
          <div className="mt-8 grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.post.map((item, index) => (
              <>
                <div
                  className="ring-2 pb-3 ring-orange-400 rounded-2xl"
                  key={index}
                >
                  <div className="flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl">
                    <img
                      src={item.image}
                      alt="loading"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="high"
                      className="h-32 w-32 m-3 bg-amber-300 object-cover rounded-full"
                    />
                  </div>
                  <hr/>
                  <div className="text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <p className="text-xl text-center font-semibold text-black">
                        {item.NAME}
                      </p>
                      <CheckBadgeIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="bg-orange-400  text-center">
                      <p className="mt-3 text-base text-white">{item.POST}</p>
                    </div>
                  </div>
                  <div className="flex justify-around pt-2">
                    <div>
                      <ShareIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                    </div>
                    <div>
                      {userInfo ? (
                        <UpdateMember item={item} mutate={mutate} />
                      ) : (
                        <Tooltip title={`${item.YEAR} Years`}>
                          <AcademicCapIcon className="h-6 w-6 cursor-pointer text-teal-500" />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>

                {/* <div
                  className="flex items-start ring-1 ring-amber-300 rounded-lg hover:bg-amber-300"
                  key={index}
                >
                  <img
                    src={item.image}
                    alt="loading"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="high"
                    className="h-32 w-32 m-3 object-cover rounded-full"
                  />
                  <div className="ml-5 m-3">
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold text-black">
                        {item.NAME}
                      </h3>
                      {userInfo ? (
                        <UpdateMember item={item} mutate={mutate} />
                      ) : (
                        ""
                      )}
                    </div>

                    <p className="mt-3 text-base text-gray-600">
                      {item.YEAR} Year
                    </p>
                    <div className="bg-red-400 w-[199px] rounded-2xl text-center">
                      <p className="mt-3 text-base text-white">{item.POST}</p>
                    </div>
                  </div>
                </div> */}
              </>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-2 lg:px-5">
        <div className="mb-4 max-w-lg">
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black">
            TEAM MEMBER
          </h2>
        </div>
        <hr />
        <div className="flex justify-center">
          <TeamMember />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-2 lg:px-5">
        <div className="mb-4 max-w-lg">
          <h2 className="mt-2 text-3xl font-bold leading-tight text-black">
            LENS / MEDIA TEAM MEMBER
          </h2>
        </div>
        <hr />
        <div className="pb-16">
          <MediaLens />
        </div>
      </div>
    </div>
  );
};

export default TeamWorking;
