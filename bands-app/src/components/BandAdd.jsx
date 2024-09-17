import React, { useState } from "react";

function BandAdd({createBand}) {
    const [value, setvalue] = useState('');

    function onSubmit(ev){
        ev.preventDefault();
    
        if(value.trim().length > 0){
            createBand(value);
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
