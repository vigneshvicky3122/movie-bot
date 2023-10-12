import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;
function Movie() {
  // const [isMedia, setMedia] = useState("");
  let navigate = useNavigate();
  let params = useParams();
  const [MovieList, setMovieList] = useState([
    {
      name: "Pattathu_Arasan",
      poster: "https://static.toiimg.com/photo/95766245.cms?imgsize=53532",
      genre: ["Action", "Drama"],
      description:
        "Exercitation elit id elit ea fugiat commodo labore. Nostrud in nulla velit id culpa. Veniam irure nulla dolore quis eu mollit eiusmod duis ad ut velit commodo. Non consequat laboris tempor adipisicing.",
      languages: ["Tamil", "Malayalam", "Telugu", "Hindi"],
      castings: ["Adharva", "Rajkiran", "Sowmya Agarval"],
      release_year: "2021",
      time: "Wed Jun 07 2023 14:45:00 GMT+0530 (India Standard Time)",
      movie_url: "https://dsi7l54lkpffe.cloudfront.net/Aga Naga.mp4",
    },
  ]);
  const [RecMovieList, setRecMovieList] = useState([
    {
      name: "Pattathu_Arasan",
      poster: "https://static.toiimg.com/photo/95766245.cms?imgsize=53532",
      genre: ["Action", "Drama"],
      time: "Wed Jun 07 2023 14:45:00 GMT+0530 (India Standard Time)",
    },
    {
      name: "Dada",
      poster:
        "https://images.jdmagicbox.com/movies/centralized_154413752023_02_09_05_37_10_220.jpg",
      genre: ["Love", "Romantic"],
      time: "Wed Jun 07 2023 14:48:19 GMT+0530 (India Standard Time)",
    },
    {
      name: "Chithirai_Sevanam",
      poster:
        "https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z548461/portrait/chithiraisevaanam1920x7703ef1a0d3a90a4912a02a6a50b151f1b4.jpg",
      genre: ["Action", "Thriller"],
      time: "Wed Jun 07 2023 14:46:49 GMT+0530 (India Standard Time)",
    },
  ]);
  const getData = async () => {
    try {
      let res = await axios.get(`${URL}/movie/${params.id}`, {
        headers: { Authorization: window.localStorage.getItem("app-token") },
      });
      if (res.data.statusCode === 200) {
        setMovieList(res.data.movies);
        setRecMovieList(res.data.rec);
      }
      if (res.data.statusCode === 400) {
        navigate("/login");
      }
      if (res.data.statusCode === 500) {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getData();
  }, []);
  return (
    <>
      <Navbar />

      <video
        src={MovieList && MovieList[0].movie_url}
        id="sampleMovie"
        width="100%"
        height="100%"
        preload
        controls
      ></video>
      {/* <input
        type="file"



        
        accept=".mp4"
        onChange={(e) => {
          let file = e.target.files[0];
          const reader = new FileReader();
          reader.addEventListener("load", (event) => {
            setMedia(event.target.result);
          });
          reader.readAsDataURL(file);
        }}
      /> */}
      <div class="d-flex gap-2 p-2">
        {MovieList &&
          MovieList.map((m) => {
            return (
              <>
                <div class="d-flex flex-column gap-3 align-items-center">
                  <img src={m.poster} alt="..." width="90px" height="160px" />
                  <h6 class="fs-small fw-normal text-white">
                    IMDB
                    <br />
                    <span class="fs-6 fw-semibold text-white">7.5</span>
                  </h6>
                  <h6 class="fs-small fw-normal text-white">2.36 min</h6>
                </div>

                <div>
                  <h5 class="fs-5 fw-semibold text-white">
                    {m.name.replace("_", " ")}
                  </h5>

                  <ul class="d-flex flex-row gap-5">
                    {m.genre.map((g, i) => {
                      return (
                        <>
                          <li class="fs-6 text-white" key={i}>
                            {g}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                  <p class="fs-6 text-white text-justify">{m.description}</p>
                  {/* <ul class="d-flex flex-row gap-5">
                    {m.languages.map((l, i) => {
                      return (
                        <>
                          <li class="fs-6 text-white" key={i}>
                            {l}
                          </li>
                        </>
                      );
                    })}
                  </ul> */}
                  <p class="fs-5 fw-semibold text-white">
                    Languages:
                    <span class="fs-6 fw-normal text-white">
                      {" "}
                      {m.languages.join(",")}
                    </span>
                  </p>
                </div>
              </>
            );
          })}
      </div>
      <div class="d-flex flex-column mt-2">
        <label class="d-flex flex-row justify-content-between">
          <h6 class="fs-6 fw-semibold text-white">Recommended Movies</h6>
          <a href="/genre" class="fs-6 fw-semibold text-decoration-none">
            more
          </a>
        </label>
        <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
          {RecMovieList &&
            RecMovieList.sort((a, b) => {
              let timeA = new Date(a.time);
              let timeB = new Date(b.time);
              return timeA - timeB;
            }).map((m, i) => {
              return (
                <>
                  <div class="col" key={i}>
                    <a class="card h-100" href={`/movie/${m.name}`}>
                      <img
                        src={m.poster}
                        class="card-img-top"
                        alt="..."
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </a>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Movie;
