import React from "react";

function Search() {
  function handleChange(params) {
    console.log(params);
  }
  return (
    <>
      <div class="m-4">
        <div class="input-group mb-3 ">
          <input
            type="text"
            class="form-control "
            placeholder="Search..."
            onChange={(event) => {
              handleChange(event.target.value);
            }}
            aria-label="Search"
            aria-describedby="button-addon2"
          />
        </div>
      </div>
      {/* <div class="d-flex justify-content-center algin-center">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div> */}
    </>
  );
}

export default Search;
