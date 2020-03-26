import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import "./styles.css";

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {

    function formatMoney(money) {
        return `R$${money.toFixed(2).replace('.', ',')}`
    }

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, { headers: {
                Authorization: ongId
            } });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novament')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    const [incidents, setIncidents] = useState([])

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem("ongName");

    const history = useHistory();

    useEffect( () => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />   
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map( incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{formatMoney(incident.value)}</p>

                    <button onClick={ () => { handleDelete(incident.id) } } type="button">
                        <FiTrash2 size={20} color="a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>

        </div>
    );
}
