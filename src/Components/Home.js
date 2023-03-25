import React, { useState } from "react";
import Navbar from "./Navbar";
function Home() {
  
  return (
    <>
      <Navbar />
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundPosition: "center",
              }}
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundPosition: "center",
              }}
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundPosition: "center",
              }}
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

      <div class="d-flex flex-column mt-2 gap-1">
        <label class="fs-6 fw-semibold text-white">Recently Uploaded</label>
        <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://static.toiimg.com/photo/95766245.cms?imgsize=53532"
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

          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://images.jdmagicbox.com/movies/centralized_154413752023_02_09_05_37_10_220.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z548461/portrait/chithiraisevaanam1920x7703ef1a0d3a90a4912a02a6a50b151f1b4.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://static.toiimg.com/photo/95766245.cms?imgsize=53532"
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

          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://images.jdmagicbox.com/movies/centralized_154413752023_02_09_05_37_10_220.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z548461/portrait/chithiraisevaanam1920x7703ef1a0d3a90a4912a02a6a50b151f1b4.jpg"
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
        </div>
      </div>
      <div class="d-flex flex-column mt-2 gap-1">
        <label class="fs-6 fw-semibold text-white">Thriller</label>
        <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://static.toiimg.com/photo/95766245.cms?imgsize=53532"
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

          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://images.jdmagicbox.com/movies/centralized_154413752023_02_09_05_37_10_220.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z548461/portrait/chithiraisevaanam1920x7703ef1a0d3a90a4912a02a6a50b151f1b4.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://static.toiimg.com/photo/95766245.cms?imgsize=53532"
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

          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://images.jdmagicbox.com/movies/centralized_154413752023_02_09_05_37_10_220.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z548461/portrait/chithiraisevaanam1920x7703ef1a0d3a90a4912a02a6a50b151f1b4.jpg"
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
        </div>
      </div>
      <div class="d-flex flex-column mt-2 gap-1">
        <label class="fs-6 fw-semibold text-white">Action</label>
        <div class="row row-cols-6 row-cols-md-3 g-2 h-100">
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://static.toiimg.com/photo/95766245.cms?imgsize=53532"
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

          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://images.jdmagicbox.com/movies/centralized_154413752023_02_09_05_37_10_220.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z548461/portrait/chithiraisevaanam1920x7703ef1a0d3a90a4912a02a6a50b151f1b4.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://static.toiimg.com/photo/95766245.cms?imgsize=53532"
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

          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://images.jdmagicbox.com/movies/centralized_154413752023_02_09_05_37_10_220.jpg"
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
          <div class="col">
            <a class="card h-100" href={`/movie`}>
              <img
                src="https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z548461/portrait/chithiraisevaanam1920x7703ef1a0d3a90a4912a02a6a50b151f1b4.jpg"
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
        </div>
      </div>

      
    </>
  );
}

export default Home;
