import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL = process.env.REACT_APP_BACKEND_URL;
function Home() {
  let navigate = useNavigate();
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
      let res = await axios.get(`${URL}/movies`, {
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
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTMwOGU5MjYxNDkxMzA2ODI1NzQ3MWJmNjA3ZGZkZiIsInN1YiI6IjY0YTUxNTFiNWE5OTE1MDBjNjAzY2I1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ABfA9aMgkKTaxTwdT07b8rlIztl7OYd79soUcGdh1F8",
      },
    };

    fetch("https://api.themoviedb.org/3/movie/157336/videos?language=en-US", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div class="home-container">
        <div id="carouselExampleDark" class="carousel carousel-dark slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="5000">
              <img
                src="https://www.91-cdn.com/hub/wp-content/uploads/2023/01/vaathi-movie-dhanush-feat.png"
                alt="..."
                class="carousel-img"
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
              <img
                src="https://im.rediff.com/movies/2016/jan/04tamil-films5.jpg?w=670&h=900"
                alt="..."
                class="carousel-img"
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://justformoviefreaks.in/wp-content/uploads/2019/12/Darbar-Tamil-Movies-2020.jpg"
                class="carousel-img"
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div class="d-flex flex-column mt-2">
          <label class="d-flex flex-row justify-content-between">
            <h6 class="fs-6 fw-semibold text-white">Latest</h6>
            <a
              href="/genre/Latest"
              class="fs-6 fw-semibold text-decoration-none"
            >
              more
            </a>
          </label>
          <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
            {MovieList &&
              MovieList.sort((a, b) => {
                let timeA = new Date(a.time);
                let timeB = new Date(b.time);
                return timeA - timeB;
              }).map((m, i) => {
                return (
                  <>
                    <div class="col" key={i}>
                      <a class="card h-100" href={`/movie/${m.name}`}>
                        <img src={m.poster} class="card-img-top" alt="..." />
                      </a>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div class="d-flex flex-column mt-2">
          <label class="d-flex flex-row justify-content-between">
            <h6 class="fs-6 fw-semibold text-white">Thriller</h6>
            <a
              href="/genre/Thriller"
              class="fs-6 fw-semibold text-decoration-none"
            >
              more
            </a>
          </label>
          <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
            {MovieList &&
              MovieList.filter((f) => f.genre.includes("Thriller"))
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
                          <img src={m.poster} class="card-img-top" alt="..." />
                        </a>
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
        <div class="d-flex flex-column mt-2">
          <label class="d-flex flex-row justify-content-between">
            <h6 class="fs-6 fw-semibold text-white">Action</h6>
            <a
              href="/genre/Action"
              class="fs-6 fw-semibold text-decoration-none"
            >
              more
            </a>
          </label>
          <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
            {MovieList &&
              MovieList.filter((f) => f.genre.includes("Action"))
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
                          <img src={m.poster} class="card-img-top" alt="..." />
                        </a>
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
        <div class="d-flex flex-column mt-2">
          <label class="d-flex flex-row justify-content-between">
            <h6 class="fs-6 fw-semibold text-white">Romantic</h6>
            <a
              href="/genre/Romantic"
              class="fs-6 fw-semibold text-decoration-none"
            >
              more
            </a>
          </label>
          <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
            {MovieList &&
              MovieList.filter((f) => f.genre.includes("Romantic")).map(
                (m, i) => {
                  return (
                    <>
                      <div class="col" key={i}>
                        <a class="card h-100" href={`/movie/${m.name}`}>
                          <img src={m.poster} class="card-img-top" alt="..." />
                        </a>
                      </div>
                    </>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
