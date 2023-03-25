import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="/home">
          <img src="bot.png" alt="Movie Bot" width="32" height="30" />
        </a>

        <a class="navbar-brand text-white" href="/home">
          MOVIE BOT
        </a>
        <button
          class="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active text-secondary"
                aria-current="page"
                href="/home"
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="/favorites">
                Favorites
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="/downloads">
                Downloads
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-secondary"
                href="!#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/new">
                    Add Movie
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="/login"
                    onClick={() => {
                      window.localStorage.clear();
                    }}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              onClick={() => {
                navigate("/search");
              }}
              placeholder="Search..."
              aria-label="Search"
            />
            <button
              onClick={() => {
                navigate("/search");
              }}
              class="btn btn-outline-light"
              type="button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
