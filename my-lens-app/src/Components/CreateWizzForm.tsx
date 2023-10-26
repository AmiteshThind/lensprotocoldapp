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
  const postContentText = document.getElementById("postContentText");

  const [errorMessages, setErrorMessages] = useState<WizzPostFormError>({
    categoryError: "",
    descriptionError: "",
  });

  function resetForm(): void {
    if (postContentText) {
      postContentText.innerText = "";
    }
    setErrorMessages({
      ...errorMessages,
      descriptionError: "",
      categoryError: "",
    });
    setNewWizz({ ...newWizz, category: "", description: "", media: null });
  }

  function validateWizzFormInputs(): void {
    if (newWizz.description.length < 250 && newWizz.category == "") {
      setErrorMessages({
        ...errorMessages,
        descriptionError: "Description must contain atleast 250 characters",
        categoryError: "Select a category",
      });
      return;
    }

    if (newWizz.category == "") {
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
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box p-8">
        <form method="dialog">
          <button
            onClick={() => resetForm()}
            className="btn btn-xs mx-1 my-1 btn-circle btn-ghost absolute right-1 top-1"
          >
            ✕
          </button>
        </form>
        <div className="w-full">
          <form className="w-full border border-neutral-800 rounded-xl p-12 ">
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
                value={newWizz.category}
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
              <div
                id="postContentText"
                contentEditable
                onInput={(e) => {
                  const input = e.target as HTMLElement;
                  setNewWizz({ ...newWizz, description: input.innerText });
                }}
                className=" cursor-pointer textarea textarea-bordered border-2 min-h-16  w-full text-white"
                data-text="Eg. Living in remote villages as I backpacked South America, I learnt that stepping out of my comfort zone is where true growth happens. Embracing the unfamilar and ..."
              ></div>
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Media</span>
              </label>
              <input
                onChange={(e) => {
                  if (e.target.files)
                    setNewWizz({ ...newWizz, media: e.target.files[0] });
                }}
                type="file"
                className="file-input file-input-bordered w-full  "
                accept="image/*, video/mp4"
              />
            </div>
            <div className="w-full mt-5 flex justify-center">
              <Web3Button
                contractAddress={LENS_CONTRACT_ADDRESS}
                contractAbi={LENS_CONTRACT_ABI}
                action={async () => {
                  validateWizzFormInputs();
                  if (
                    !(
                      newWizz.description.length < 250 || newWizz.category == ""
                    )
                  ) {
                    console.log("reached this time");
                    console.log(errorMessages.categoryError);
                    console.log(errorMessages.descriptionError);
                    await createPost(newWizz).then(() => {
                      setNewWizz({
                        category: "",
                        description: "",
                        media: null,
                      });
                      if (postContentText?.innerText)
                        postContentText.innerText = "";
                      document
                        .getElementById("my_modal_4" + publication.id)
                        .close();
                    });
                  }
                }}
                className="btn-success rounded-xl mt-5 btn btn-wide"
              >
                Post Wizz
              </Web3Button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateWizzForm;
