import React, { useEffect, useState } from "react";
import { WizzPost, WizzPostFormError } from "../common/types";
import { BiErrorCircle } from "react-icons/bi";
import { Web3Button } from "@thirdweb-dev/react";
import { LENS_CONTRACT_ADDRESS, LENS_CONTRACT_ABI } from "../const/contracts";
import { useCreatePost } from "../lib/auth/usePost";
interface Props {}

const CreateWizzForm = ({}: Props) => {
  const { mutateAsync: createPost } = useCreatePost();
  const [newWizz, setNewWizz] = useState<WizzPost>({
    category: "",
    description: "",
    media: null,
  });

  const [errorMessages, setErrorMessages] = useState<WizzPostFormError>({
    categoryError: "",
    descriptionError: "",
  });

  function createNewWizz(e: any): void {
    e.preventDefault();

    if (newWizz.description.length < 250 && newWizz.category == "") {
      setErrorMessages({
        ...errorMessages,
        descriptionError: "Description must contain atleast 250 characters",
        categoryError: "Select a category",
      });
      return;
    }

    if (newWizz.category == "") {
      console.log("er");
      setErrorMessages({
        ...errorMessages,
        categoryError: "Select a category",
        descriptionError: "",
      });
      console.log(errorMessages);
      return;
    }
    console.log(newWizz.description.length);
    if (newWizz.description.length < 250) {
      console.log(errorMessages);
      setErrorMessages({
        ...errorMessages,
        descriptionError: "Description must contain atleast 250 characters",
        categoryError: "",
      });
      return;
    }

    setErrorMessages({
      ...errorMessages,
      descriptionError: "",
      categoryError: "",
    });

    //proceed with logic to add
  }

  return (
    <div className="w-full">
      <form
        onSubmit={createNewWizz}
        className="w-full border border-neutral-800 rounded-lg p-12 "
      >
        <div className="flex justify-center text-2xl my-2 text-emerald-400 font-semibold">
          Create a Wizz
        </div>
        <div>
          {errorMessages.categoryError ? (
            <span className="text-red-500 my-2 flex">
              <BiErrorCircle className="h-6 w-4" />
              <span className="ml-1">{errorMessages.categoryError}</span>
            </span>
          ) : (
            <></>
          )}
        </div>
        <div>
          {errorMessages.descriptionError ? (
            <span className="text-red-500 my-2 flex">
              <BiErrorCircle className="h-6 w-4" />
              <span className="ml-1">{errorMessages.descriptionError}</span>
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="my-2">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className=" select select-bordered w-full text-white"
            onChange={(e) => {
              setNewWizz({ ...newWizz, category: e.target.value });
            }}
          >
            <option value={""} disabled selected>
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
            className="textarea textarea-bordered border-2 h-48 w-full text-white"
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
            accept="image/*, video/mp4"
          />
        </div>
        <div className="w-full mt-5 flex justify-center">
          <Web3Button
            contractAddress={LENS_CONTRACT_ADDRESS}
            contractAbi={LENS_CONTRACT_ABI}
            action={async () => await createPost(newWizz)}
            className="btn-success rounded-xl mt-5 btn btn-wide"
          >
            Post Wizz
          </Web3Button>
        </div>
      </form>
    </div>
  );
};

export default CreateWizzForm;
