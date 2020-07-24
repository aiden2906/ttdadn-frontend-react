import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import avatar4 from '../assets/4-avatar.jpg';
import avatar3 from '../assets/3-avatar.jpg';
import avatar2 from '../assets/2-avatar.jpg';
import avatar1 from '../assets/1-avatar.jpg';
import avatar5 from '../assets/5-avatar.jpg';
import '../css/about.css';

export default function About() {
  return (
    <div className="container">
      <div className="row mt-3" style={{ background: 'white', borderRadius: '10px' }}>
        <div className="col">
          <img src={avatar2} className="img-ava" />
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div>Đào Duy Long</div>
          <div>MSSV : 1712004</div>
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          Tính năng hiện thực : Hiện thực giao diện biểu đồ, vẽ biểu đồ với ChartJS của cảm biến theo thời gian và trung bình
        </div>
      </div>
      <div className="row mt-3" style={{ background: 'white', borderRadius: '10px' }}>
        <div className="col">
          <img src={avatar3} className="img-ava" />
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div>Lê Thị Thanh Thảo</div>
          <div>MSSV : 1713177</div>
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        Tính năng hiện thực : Hiện thực giao diện phòng, bộ điều khiển thiết bị, ráp API điều khiển thiết bị
        </div>
      </div>
      <div className="row mt-3" style={{ background: 'white', borderRadius: '10px' }}>
        <div className="col">
          <img src={avatar1} className="img-ava" />
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div>Thái Tiểu Phương</div>
          <div>MSSV : 1710250</div>
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        Tính năng hiện thực : Hiện thực giao diện thông báo, triển khai nhận thông báo thông qua socket
        </div>
      </div>
      <div className="row mt-3" style={{ background: 'white', borderRadius: '10px' }}>
        <div className="col">
          <img src={avatar5} className="img-ava" />
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div>Nguyễn Minh Tiến</div>
          <div>MSSV : 1713484</div>
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        Tính năng hiện thực : Thiết kế giao diện chung, hiện thực giao diện login, forgot password, validate các trường nhập bởi người dùng.

        </div>
      </div>
      <div className="row mt-3" style={{ background: 'white', borderRadius: '10px' }}>
        <div className="col">
          <img src={avatar4} className="img-ava" />
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div>Trần Thanh Quang</div>
          <div>MSSV : 1712902</div>
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div>Tính năng hiện thực : Tạo broker kiểm nghiệm, xậy dựng server và bộ API</div>

        </div>
      </div>
    </div>
  );
}
