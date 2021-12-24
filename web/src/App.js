
import './App.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import url from './core/index'


function App() {

  const [data, setdata] = useState([]);
  const [realTime, setRealTime] = useState(false) // real time data
  const [update, setUpdate] = useState(null); // update
  const [textData, settextData] = useState(""); // text
  const [editemail, seteditemail] = useState(""); // email
  const [editadress, setadress] = useState(""); // address

  let name = useRef();
  let email = useRef();
  let adress = useRef();

  // sumbit
  function submit() {
    axios({
      method: 'post',
      url: url + '/profile',
      data: {
        name: name.current.value,
        email: email.current.value,
        address: adress.current.value,
      }
    }).then((response) => { setRealTime(!realTime) })
      .catch((err) => { console.log(err, "SumbitError") })
  }

  // realtime
  useEffect(() => {
    axios({
      method: "get",
      url: url + "/profiles"
    }).then((res) => { setdata(res.data) })
      .catch((err) => { console.log(err, "getError") })
  }, [realTime])

  // delet
  function delet(e) {

    axios({
      method: 'delete',
      url: url + `/profile/${e}`,

    }).then((res) => { setRealTime(!realTime) })
      .catch((err) => { console.log(err,"DeletError") })
  }
  // updateData
  const updateData = (id) => {

    var name = textData
    var email = editemail
    var address = editadress
    axios({
      method: 'put',
      url: url + `/profile/${id}`,
      data: {
        name: name,
        email: email,
        address: address
      },
    }).then((res) => { setRealTime(!realTime) })
      .catch((err) => { console.log(err, "UpdateError") })
    setUpdate()
    settextData()
    seteditemail()
    setadress()
  };


  return (
    <div className="App">
      <h1>Axios</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}>

        <input type="text" ref={name} placeholder="name" /><br />
        <input type="text" ref={email} placeholder="email" /><br />
        <input type="text" ref={adress} placeholder="adress" /><br />
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* allData */}

      <div>
        <div>
          <h1>Home</h1>
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
              <tr key={index}>
                <td>{v._id}</td>
                <td>
                  {update === v._id ? (
                    <input value={textData} placeholder={v.name} onChange={(e) => settextData(e.target.value)} />
                  ) : (
                    v.name
                  )}
                </td>
                <td>
                  {update === v._id ? (
                    <input value={editemail} placeholder={v.email} onChange={(e) => seteditemail(e.target.value)} />
                  ) : (
                    v.email
                  )}
                </td>

                <td>{update === v._id ? (
                  <input value={editadress} placeholder={v.address} onChange={(e) => setadress(e.target.value)} />) : (
                  v.address
                )}</td>

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
    </div>
  );
}

export default App;
