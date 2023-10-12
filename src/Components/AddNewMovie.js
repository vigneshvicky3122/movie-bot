import axios from "axios";
import React, { useState } from "react";
const url = process.env.REACT_APP_BACKEND_URL;
function AddNewMovie() {
  const [Name, setName] = useState("");
  const [Release, setRelease] = useState("");
  const [Genre, setGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [Cast, setCast] = useState("");
  const [Language, setLanguage] = useState("");
  const [Duration, setDuration] = useState("");
  const [Movie, setMovie] = useState("");
  const [Poster, setPoster] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("movie", Movie);
    formData.append("name", Name);
    console.log(formData);
    try {
      let res = await axios.post(`${url}/new-movie`, formData);
      if (res.data.statusCode === 200) {
      }
      if (res.data.statusCode === 200) {
      }
      if (res.data.statusCode === 500) {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div class="add-movie-from">
        <form
          class="contain-new"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div class="mb-1">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Movie Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={Name}
            />
          </div>
          <div class="mb-1">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Release Year
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="2000"
              onChange={(event) => {
                setRelease(event.target.value);
              }}
              value={Release}
            />
          </div>
          <div class="mb-1">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Genre
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(event) => {
                setGenre(event.target.value);
              }}
              value={Genre}
            />
          </div>
          <div class="mb-1">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Duration
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(event) => {
                setDuration(event.target.value);
              }}
              value={Duration}
            />
          </div>

          <div class="mb-1">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Language
            </label>
            <input
              type="email"
              class="form-control"
              onChange={(event) => {
                setLanguage(event.target.value);
              }}
              value={Language}
            />
          </div>
          <div class="mb-1">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Castings
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(event) => {
                setCast(event.target.value);
              }}
              value={Cast}
            />
          </div>
          <div class="mb-1">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Description
            </label>
            <textarea
              class="form-control"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              value={Description}
              rows="3"
              placeholder="name@example.com"
            />
          </div>
          <div class="mb-1">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Select Movie
            </label>
            <input
              type="file"
              accept=".mov,.mp4,mkv,.avi,.webm,*"
              class="form-control"
              onChange={(e) => {
                let file = e.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", (event) => {
                  setMovie(event.target.result);
                });
                reader.readAsDataURL(file);
              }}
            />
          </div>
          <div class="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              class="form-label text-white"
            >
              Select Poster
            </label>
            <input
              type="file"
              accept="image/*"
              class="form-control"
              onChange={(e) => {
                let file = e.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", (event) => {
                  setPoster(event.target.result);
                });
                reader.readAsDataURL(file);
              }}
            />
          </div>
          <div class="mb-1">
            <button type="submit" class="btn btn-primary">
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewMovie;
