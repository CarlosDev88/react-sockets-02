import { useEffect, useState } from "react"
import BandAdd from "./components/BandAdd"
import { BandList } from "./components/BandList"
import { io } from "socket.io-client";

function connectSocketServer() {
  const socket = io.connect('http://localhost:3000/', {
    transports: ['websocket']
  });
  return socket;
}

function App() {

  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    })

  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    })

  }, [socket])

  useEffect(() => {

    socket.on('current-bands',bands=>{
      console.log(bands);
      setBands(bands);
      
    })
    
  }, [socket])

  function vote(id){
    socket.emit('votar-banda',id);
  }

  function deleteBand(id){
    socket.emit('borrar-banda',id);
  }

  function changeNameEvent(id,name){    
    socket.emit('cambiar-nombre-banda',{
      id,
      name
    });
  }

  function createBand(name){
    socket.emit('nueva-banda',{name});
  }


  return (
    <div className="container">
      <div className="alert">
        <p>
          Srrvice Status:
          {
            online
              ? <span className="text-success">Online</span>
              : <span className="text-danger">Offline</span>
          }


        </p>
      </div>

      <h1>Band names</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <BandList 
            data={bands} 
            vote={vote}
            deleteBand={deleteBand}
            changeNameEvent={changeNameEvent}
            />
        </div>

        <div className="col-4">
          <BandAdd createBand={createBand} />
        </div>
      </div>

    </div>


  )
}

export default App
