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
                  <p class="lead">Error 404: Url not found!</p>
                  <a href="/chart">
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
