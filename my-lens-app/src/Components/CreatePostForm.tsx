import React, { useEffect, useState } from "react";
import { WizzPost } from "../common/types";

interface Props {}

function createNewWizz(e: any) {
  e.preventDefault();
}

const CreatePostForm = ({}: Props) => {
  const [newWizz, setNewWizz] = useState<WizzPost>({
    category: "",
    description: "",
    media: null,
  });

  useEffect(() => {
    console.log(newWizz);
  }, []);

  return (
    <div>
      <form
        onSubmit={createNewWizz}
        className="w-full border border-neutral-800 rounded-lg p-12 "
      >
        <div className="flex justify-center text-2xl my-2 text-emerald-400 font-semibold">
          Create a Wizz
        </div>

        <div className="my-2">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered w-full text-white  "
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
            className="textarea textarea-bordered h-48 w-full text-white"
            placeholder="Experiencing different cultures and living in remote villages as I backpacked South America, I learnt that stepping out of my comfort zone is where true growth happens. Embracing the unfamilar and ..."
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
            className="file-input file-input-bordered w-full  "
          />
        </div>
        <div className="w-full mt-5 flex justify-center">
          <button className="btn-success mt-5 btn btn-wide">Post Wizz</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
