import React from "react";

const Footer = () => {
  return (
    <footer class="py-4 bg-light mt-auto">
      <div class="container-fluid">
        <div class="d-flex align-items-center justify-content-between small">
          <div class="text-muted">Thực tập đồ án đa ngành HK192</div>
          <div>
            <a href="#" onClick={()=> window.open("https://gitlab.com/quangtranthanh", "_blank")}>Gitlab Project</a>
          </div>
          <div>
          <a href="#" onClick={()=> window.open("http://40.87.101.198:4000/docs.api/", "_blank")}>Bộ API</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
