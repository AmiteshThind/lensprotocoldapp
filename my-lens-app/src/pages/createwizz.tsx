import React, { useEffect, useState } from "react";
import { WizzPost } from "../common/types";

type Props = {};
const createwizz = (props: Props) => {
  const [newWizz, setNewWizz] = useState<WizzPost>({
    title: "",
    category: "",
    description: "",
    media: null,
  });

  useEffect(() => {
    console.log(newWizz);
  });

  return (
    <div className=" flex mt-24  items-center flex-col  w-full   ">
      <form className="w-4/5 md:w-3/6 border border-neutral-800 rounded-lg p-10 ">
        <div className="flex justify-center text-2xl my-2 text-emerald-400 font-semibold">
          Create a Wizz
        </div>

        <div className="my-2">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full  "
            onChange={(e) => {
              setNewWizz({ ...newWizz, title: e.target.value });
            }}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered w-full  "
            onChange={(e) => {
              setNewWizz({ ...newWizz, category: e.target.value });
            }}
          >
            <option disabled selected>
              Pick one
            </option>
            <option value={"Travel"}>Travel</option>
            <option value={"Sports"}>Sports</option>
            <option value={"Books"}>Books</option>
            <option value={"Self-Discovery"}>Self-Discovery</option>
            <option value={"Art"}>Art</option>
            <option value={"Relationships"}>Relationships</option>
            <option value={"Mentors"}>Mentors</option>
            <option value={"Other"}>Other</option>
          </select>
        </div>
        <div className="w-full">
          <label className="label">
            <span className="label-text">Whats on your mind?</span>
          </label>
          <textarea
            onChange={(e) => {
              setNewWizz({ ...newWizz, description: e.target.value });
            }}
            className="textarea textarea-bordered h-48 w-full"
            placeholder="Write about the expereince and learning you want to share ..."
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text">Media</span>
          </label>
          <input
            onChange={(e) =>
              setNewWizz({ ...newWizz, media: e.target.files[0] })
            }
            type="file"
            className="file-input file-input-bordered file-input-success w-full  "
          />
        </div>
      </form>
    </div>
  );
};

export default createwizz;
