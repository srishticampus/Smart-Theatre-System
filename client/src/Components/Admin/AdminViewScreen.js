import React from 'react';
import "../../Assets/Styles/AdminViewScreen.css";

function AdminViewScreen() {
  return (
    <div>
      <p className='admin-view-screen-head'>View Screen</p>

      <div className="row">
        <div className="col-sm-12">
          <div className='admin-view-screen-table'>
            <table className='table table-responsive admin-view-screen-table table-bordered'>
              <thead>
                <tr className='bg-danger text-white'>
                  <th>SI No:</th>
                  <th>Screen Name</th>
                  <th>Format</th>
                  <th>Screen Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Screen 1</td>
                  <td>2D</td>
                  <td>64ft × 101.6ft</td>
                  <td>
                    <span><i className="fa-solid fa-eye" style={{ color: '#f10404' }}></i></span>
                    <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></span>
                    <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Screen 2</td>
                  <td>3D</td>
                  <td>64ft × 101.6ft</td>
                  <td>
                    <span><i className="fa-solid fa-eye" style={{ color: '#f10404' }}></i></span>
                    <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></span>
                    <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Screen 3</td>
                  <td>IMAX</td>
                  <td>64ft × 101.6ft</td>
                  <td>
                    <span><i className="fa-solid fa-eye" style={{ color: '#f10404' }}></i></span>
                    <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></span>
                    <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Screen 4</td>
                  <td>2D</td>
                  <td>64ft × 101.6ft</td>
                  <td>
                    <span><i className="fa-solid fa-eye" style={{ color: '#f10404' }}></i></span>
                    <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></span>
                    <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewScreen;
