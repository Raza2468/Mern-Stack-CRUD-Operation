
import './App.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
// import Home from './home'


function App() {

  const [data, setdata] = useState([]);
  const [name1, setName] = useState();
  const [update, setUpdate] = useState(null); // todoedditing
  const [editData, seteditData] = useState(""); // editting

  let idnum = useRef();
  let name = useRef();
  let email = useRef();
  let adress = useRef();

  function submit() {
    // console.log(name.current.value,);
    axios({
      method: 'post',
      url: 'http://localhost:3030/profile',
      data: {
        name: name.current.value,
        email: email.current.value,
        address: adress.current.value,
      }
    }).then((response) => {
      console.log(response, "RES");
    }).catch((error) => {
      console.log(error, "ERROR");
    });

  }
  const getData = () => {
    // console.log("e");
    axios({
      method: "get",
      url: " http://localhost:3030/profiles"
    }).then((res) => {
      // console.log(res, "getData");
      setdata(res.data)

    }).catch((err) => {

      console.log(err, "getError");
    })
    // console.log(data,"_id");
    // getId()
  }
  // function edit(e) {
  //     console.log(e, "e");
  //     axios({
  //         method: 'put',
  //         url: `http://localhost:3030/profile/${e}`,

  //       }).then((res) => {
  //         console.log(res);
  //       }).catch((err) => {
  //         console.log(err);
  //       })


  function delet(e) {
    axios({
      method: 'delete',
      url: `http://localhost:3030/profile/${e}`,

    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  function edit(e) {
    console.log(e);
    axios({
      method: 'get',
      url: `http://localhost:3030/profile/${e}`,

    }).then((res) => {
      // console.log(res,"res");
      seteditData(res)
    }).catch((err) => {
      console.log(err);
    })

  }
  const updateData = (id) => {
    const updatedata = [...data].map((v, i) => {
      if (v._id === id) {
        var name = v.name = editData
        // console.log(name, "123");
        axios({
          method: 'put',
          url: `http://localhost:3030/profile/${id}`,
          data: {
            name: name
          },
        }).then((res) => {
          // setdata(res)
          console.log(res, "res");
          // seteditData(res)
        }).catch((err) => {
          console.log(err);
        })
      }
      return data
    })
    // setdata(updatedata)
    seteditData("")
    setUpdate(null)
    // Axios.post("http://localhost:5000/update", data).then((res) => {
    //   window.location.reload();
    // });
    // console.log(updatedata, "data1");
  };

  console.log(name, "name");

  { console.log(editData, "editData") }

  return (
    <div className="App">
      <h1>Axios</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}>
        {/* <input type="text" ref={idnum} placeholder="Id Num" /><br /> */}
        <input type="text" ref={name} placeholder="name" /><br />
        <input type="text" ref={email} placeholder="email" /><br />
        <input type="text" ref={adress} placeholder="adress" /><br />
        <br />
        <button type="submit">Submit</button>
      </form>
      {/* <button type="put" onClick={() => put()}>Edit</button>
      <button type="del" onClick={() => del()}>Delet</button> */}
      <div>
        <div>
          <h1>Home</h1>
          <button onClick={() => getData()}>All Data</button>

          <table id="customers">
            <tr>
              <th>S no : </th>
              <th>Name : </th>
              <th>Emai : </th>
              <th>address : </th>
              <th></th>
              <th></th>
            </tr>
            {data.map((v, index) => (
              // console.log(v._id),
              <tr key={index}>
                <td>{v._id}</td>

                {update === v._id ? (
                  <input value={editData} onChange={(e) => seteditData(e.target.value)} />
                ) : (
                  v.name
                )}

                {/* <td>{v.name}</td> */}
                <td>{v.email}</td>
                <td>{v.address}</td>

                {/* {update ? <button onClick={() => updateData()}>Update</button> :               
                <td> <button onClick={() => setUpdate(true, v._id)}>Edit</button></td>} */}

                {update === v._id ?
                  (<button onClick={() => updateData(v._id)}>Sumbit Edit</button>) :
                  (<button onClick={() => setUpdate(v._id)}>Edit</button>)
                }

                <td><button onClick={() => delet(v._id)}>Delet</button></td>

              </tr>
            ))}
          </table>

        </div>
      </div>
      {/* <Home /> */}
    </div>
  );
}

export default App;
