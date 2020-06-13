import React from "react";

const Nomatch = () => {
  return (
    <div id="layoutError">
      <div id="layoutError_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="text-center mt-4">
                  {/* <img
                    class="mb-4 img-error"
                    src="assets/img/error-404-monochrome.svg"
                  /> */}
                  <p class="lead">Error 404: Url not found!</p>
                  <a href="/home">
                    <i class="fas fa-arrow-left mr-1"></i>Return to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Nomatch;
