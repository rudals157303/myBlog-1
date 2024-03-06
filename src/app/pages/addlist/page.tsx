"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import axios from "axios";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export interface Idata {
  link: string;
  title: string;
  category: string;
  description: string;
  photo: string;
  type?: boolean;
}

export default function Portfolio() {
  const [data, setData] = useState<Idata>({
    link: "",
    title: "",
    category: "web",
    description: "",
    photo: "",
    type: false,
  });
  const [image, setImage] = useState("");

  // 타이틀 체인지
  const handleChageTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, props: string) => {
      setData(prev => ({ ...prev, [props]: e.target.value }));
    },
    [data.title],
  );
  // 카테고리 체인지
  const handleChageCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, props: string) => {
      setData(prev => ({ ...prev, [props]: e.target.value }));
    },
    [data],
  );
  // 디스크립션 체인지
  const handleChageDescription = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>, props: string) => {
      setData(prev => ({ ...prev, [props]: e.target.value }));
    },
    [data],
  );

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setData(prev => ({ ...prev, type: selectedFile.type.includes("video") }));

      setFile(selectedFile);
    }
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = new FormData();
    if (file === null) return;
    formData.append("image", file);

    try {
      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(file?.name);
      setData(prev => ({ ...prev, photo: file?.name }));
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  // 포스트 데이타
  const postData = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const res = await axios.post("/api/test", data);
      try {
        console.log(res);
      } catch (error) {
        console.log(error);
      }

      console.log(data, "data");
    },
    [data],
  );

  return (
    <>
      <div className="container" style={{ background: "#FFF" }}>
        <div className="pd20">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        value={data.title}
                        onChange={e => {
                          handleChageTitle(e, "title");
                        }}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        onChange={e => {
                          handleChageCategory(e, "category");
                        }}
                        value={data.category}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>web</option>
                        <option>mobile</option>
                        <option>about</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      onChange={e => {
                        handleChageDescription(e, "description");
                      }}
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {!image && (
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <form onSubmit={handleSubmit}>
                          {image !== "" ? (
                            <div style={{ position: "relative" }}>
                              {data.type ? (
                                <video width={400} autoPlay>
                                  <source
                                    src={`/images/${image}`}
                                    type="video/mp4"
                                  />
                                </video>
                              ) : (
                                <img src={`/images/${image}`} alt="Uploaded" />
                              )}
                              <TrashIcon
                                onClick={() => {
                                  setImage("");
                                  setFile(null);
                                }}
                                style={{
                                  position: "absolute",
                                  right: "0",
                                  cursor: "pointer",
                                }}
                                className="mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                            </div>
                          ) : (
                            <input type="file" onChange={handleFileChange} />
                          )}
                          {file && <button type="submit">Upload</button>}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link
              href={`/pages/portfolio`}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
            <button
              onClick={e => {
                postData(e);
              }}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
