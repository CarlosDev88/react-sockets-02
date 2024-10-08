import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

function BandAdd() {
    const [value, setvalue] = useState('');
    const { socket } = useContext(SocketContext);

    function onSubmit(ev){
        ev.preventDefault();
    
        if(value.trim().length > 0){   
            socket.emit('nueva-banda', { name:value });
            setvalue('');
        }
    }


    return (
        <>
            <h3>Agregar Banda</h3>

            <form onSubmit={onSubmit}>
                <input
                    className="form-control"
                    placeholder="Nuevo nombre de la banda"
                    type="text" 
                    value={value}
                    onChange={(e)=>setvalue(e.target.value)}
                    />
            </form>

        </>
    )
}

export default BandAdd;
