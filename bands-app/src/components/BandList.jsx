import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export function BandList() {
    const [bands, setBands] = useState([]);

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', bands => {
            setBands(bands);
        })
        return ()=> socket.off('current-bands');
    }, [socket])

    function changeName(event, id) {
        const newName = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName;
            }

            return band;
        }))

    }

    function onBlurField(id, name) {
        socket.emit('cambiar-nombre-banda', {
            id,
            name
        });
    }

    function vote(id) {
        socket.emit('votar-banda', id);
    }

    function deleteBand(id) {
        socket.emit('borrar-banda', id);
    }

    function createRows() {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button className='btn btn-primary' onClick={() => vote(band.id)}>+1</button>
                    </td>
                    <td>
                        <input
                            type="text"
                            className='form-control'
                            value={band.name}
                            onChange={(event) => changeName(event, band.id)}
                            onBlur={() => onBlurField(band.id, band.name)}
                        />
                    </td>
                    <td><h3>{band.votes}</h3></td>
                    <td>
                        <button
                            onClick={() => deleteBand(band.id)}
                            className='btn btn-danger'>borrar</button>
                    </td>
                </tr>
            ))

        )
    }


    return (
        <>
            <h3>Bandas actuales</h3>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                {createRows()}
                <tbody>

                </tbody>
            </table>
        </>
    )
}
