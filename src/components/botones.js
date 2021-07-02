import React, {  useContext } from 'react';
import { Link } from 'react-router-dom';
import { OracionesContext } from '../context/oracionesContext';

export default function Botones ( ) {
       
    const [labels] = useContext(OracionesContext);

    return (
        <div id="botonera">
            <div>

            {labels.map((l,i)=>(
                <Link key={i} to={{pathname: `/listar/${l}`}}>
                    <button type="button"> {l} </button>
                    <br></br>
                </Link>
            ))}

            </div>
        </div>
    );
}