import axios from 'axios'
import { useEffect, useState } from 'react'

export const Usuarios = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/usuario', {headers: {Authorization: `Bearer ${localStorage.getItem('firebaseToken')}`}}).then(response => {
            setUsers(response.data.usuarios)
        }).catch(error => {
            console.error(error)
        })
        
    }, [])
    
    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>MAIL</th>    
                </thead>

                <tbody>
                    {users.map(user => {
                        return (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}