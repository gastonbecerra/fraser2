import React, { useState , useContext } from 'react';
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { OracionesContext } from '../context/oracionesContext';

export default function Botones ( ) {
       
    const [labels] = useContext(OracionesContext);

    return (
        <div>
            <div>

            {labels.map((l,i)=>(
                <Link key={i} to={{pathname: `/listar/${l}`}}>
                    <Button> {l} </Button>
                    <br></br>
                </Link>
            ))}

            </div>
        </div>
    );
}