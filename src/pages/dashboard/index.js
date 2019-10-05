import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';

export default function Dashboard({history}){
    const [ spots, setSpots ] = useState([]);
    useEffect(() =>{
        async function loadSpots(){
            const userid = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { userid }
            })

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <>
            <h1>Dashboard </h1>
            <button className="logout" onClick={handleLogout}>Sair</button>
            <ul className="spot-list">
                {spots.map(spot=>(
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}} />
                        <p className="company-name"><strong>{spot.company} </strong> - {spot.location}</p> 
                        <span style={spot.price ? {color: ''}: {color: 'green'}}> 
                        {spot.price ? 'R$: '+spot.price : 'Gratuito'}
                        </span>

                    </li>
                ))}
            </ul>
            <Link to="/spot">
                <button className="btn">Novo Spot</button>
            </Link>
        </>
    );
}