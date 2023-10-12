import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;
function Genre() {
  let navigate = useNavigate();
  let params = useParams();
  const [MovieList, setMovieList] = useState([
    {
      name: "pattathu_arasan",
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
      name: "chithirai_sevanam",
      poster:
        "https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z548461/portrait/chithiraisevaanam1920x7703ef1a0d3a90a4912a02a6a50b151f1b4.jpg",
      genre: ["Action", "Thriller"],
      time: "Wed Jun 07 2023 14:46:49 GMT+0530 (India Standard Time)",
    },
  ]);

  const getData = async () => {
    try {
      let res = await axios.get(`${URL}/genre/${params.id}`, {
        headers: { Authorization: window.localStorage.getItem("app-token") },
      });
      if (res.data.statusCode === 200) {
        setMovieList(res.data.movies);
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
      <div>
        <div class="d-flex flex-column mt-2">
          <label class="d-flex flex-row justify-content-between">
            <h6 class="fs-6 fw-semibold text-white">{params.id}</h6>
          </label>
          <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
            {MovieList &&
              MovieList.filter((f) => f.genre.includes(params.id))
                .sort((a, b) => {
                  let timeA = new Date(a.time);
                  let timeB = new Date(b.time);
                  return timeA - timeB;
                })
                .map((m, i) => {
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
      </div>
    </>
  );
}

export default Genre;
