import React from 'react'
import "../../Assets/Styles/AdminViewScreen.css"


function AdminViewScreen() {
  return (
    <div>
     <p className='admin-view-screen-head'>View Screen</p>
      
      <div className="row">
        <div className="col-sm-12">
        <div className='admin-view-screen-table'>
       <table className='table table-responsive admin-view-screen-table table-bordered'>
        <tr className='bg-danger text-white '>
            <th>SI No:</th>
            <th>Screen Name</th>
            <th>Format</th>
            <th>Screen Size</th>
            <th>Action</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Screen 1</td>
            <td>2D</td>
            <td>64ft &times; 101.6ft</td>
            <td>icon</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Screen 2</td>
            <td>3D</td>
            <td>64ft &times; 101.6ft</td>
            <td>icon</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Screen 3</td>
            <td>IMAX</td>
            <td>64ft &times; 101.6ft</td>
            <td>icon</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Screen 4</td>
            <td>2D</td>
            <td>64ft &times; 101.6ft</td>
            <td>icon</td>
        </tr>
       </table>
     </div>
        </div>
      </div>

    </div>
  )
}

export default AdminViewScreen
