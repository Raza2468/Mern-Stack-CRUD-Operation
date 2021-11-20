// import React from 'react';
// import axios from 'axios';
// import './App.css';
// import { useEffect, useRef, useState } from "react";


// function Home() {

//     const [data, setdata] = useState([]);
//     const [editData, setedit] = useState([]);

//     const getData = () => {
//         // console.log("e");
//         axios({
//             method: "get",
//             url: " http://localhost:3030/profiles"
//         }).then((res) => {
//             // console.log(res, "getData");
//             setdata(res.data)

//         }).catch((err) => {

//             console.log(err, "getError");
//         })
//         // console.log(data,"_id");
//         // getId()
//     }
//     // function edit(e) {
//     //     console.log(e, "e");
//     //     axios({
//     //         method: 'put',
//     //         url: `http://localhost:3030/profile/${e}`,
    
//     //       }).then((res) => {
//     //         console.log(res);
//     //       }).catch((err) => {
//     //         console.log(err);
//     //       })

//     // }
//     function delet(e) {
//         axios({
//             method: 'delete',
//             url: `http://localhost:3030/profile/${e}`,
    
//           }).then((res) => {
//             console.log(res);
//         }).catch((err) => {
//             console.log(err);
//           })
//         }
        
//         function edit(e) {
//             // console.log(e);
//             axios({
//                 method: 'get',
//                 url: `http://localhost:3030/profile/${e}`,
                
//             }).then((res) => {
//                 // console.log(res,"res");
//                 setedit(res)
//             }).catch((err) => {
//                 console.log(err);
//           })
    
//     }
//     console.log(editData,"editData");
//     return (
//         <div>
//             <h1>Home</h1>
//             <button onClick={() => getData()}>All Data</button>

//             <table id="customers">
//                 <tr>
//                     <th>S no : </th>
//                     <th>Name : </th>
//                     <th>Emai : </th>
//                     <th>address : </th>
//                     <th></th>
//                     <th></th>
//                 </tr>
//                 {data.map((v, index) => (
//                     // console.log(v._id),
//                     <tr key={index}>
//                         <td>{v._id}</td>
//                         <td>{v.name}</td>
//                         <td>{v.email}</td>
//                         <td>{v.address}</td>

//                         <td><button onClick={()=>edit(v._id)}>edit</button></td>
//                         {/* <td><button onClick={()=>edit(v._id)}>Edit</button></td> */}
//                         <td><button onClick={()=>delet(v._id)}>Delet</button></td>
//                     </tr>
//                 ))}
//             </table>

//         </div>
//     );

// }

// export default Home;