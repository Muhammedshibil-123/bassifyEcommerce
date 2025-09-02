import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './users.css'


function Users() {
  const [users,setUsers]=useState([])
 const userId = localStorage.getItem('id')

  useEffect(()=>{
    axios.get("http://localhost:3001/users")
    .then((res)=>setUsers(res.data))
    .catch((err)=>console.error(err))
  },[userId])

  function toggleusersStatus(id) {
    const user = users.find((p) => p.id === id)
    if (!user) return

    const newStatus = user.status === "active" ? "inactive" : "active"

    setUsers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    )

    axios
      .patch(`http://localhost:3001/users/${id}`, { status: newStatus })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div style={{ marginLeft: '290px' }}>
      <div className='main-users-container'>
        <div className="first-part">
          <h1>Users</h1>
          <div className="serach">
            <input type="text" />
          </div>
        </div>
        <div className="tableheadline">
          <h4 className='tableId'>Id</h4>
          <h4 className='tableTitle'>Username</h4>
          <h4 className='tableBrand'>Email</h4>
          <h4 className='tablemobile'>Mobile</h4>
           <h4 className='tablestatus'>Status</h4>
          <h4 className='tableblock'>Block/Unblock</h4>
        </div>

        <div className="products-container">
          {users.map((users, index) => (
            <div className="product-row" key={index}>
              <p className='Id'>{users.id}</p>


              <h3 className='username'>{users.username}</h3>
              <p className='email'>{users.email}</p>
              <p className='mobile'>{users.mobile}</p>
              <p className='status'>{users.status}</p>


              <p className='status'>
                <button
                  onClick={() => toggleusersStatus(users.id)}
                  className={`toggle-btn ${users.status === "active" ? "active" : ""}`}
                >
                  <div className={`toggle-circle ${users.status === "active" ? "active" : ""}`}></div>
                </button>
              </p>

            </div>
          ))}
        </div>
   </div>

 </div>
  )
}

export default Users