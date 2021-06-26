import React, { useState } from 'react';
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import Botones from './botones'

const Example = (props) => {

    const labels = ['Positivo', 'Negativo', 'Neutral','Descartar']

    return (
        <div>
            <div>

            <h4>clasificar</h4>
            <Link to={{pathname: `/anotar/`}}>
                <Button color="primary">clasificar nueva frase</Button>{' '}
            </Link>

            <h4>O elija un grupo de labels para editar</h4>

            <Botones />

           <Link to={{pathname: `/listar/`}}>
            <Button color="success">No clasificado</Button>{' '}
           </Link>
            

            </div>
        </div>
    );
}

export default Example;