import React, {  } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Botones from './botones'

const Example = () => {

    return (
        <div id="nueva">
            <div>

            <h4>clasificar</h4>
            <Link to={{pathname: `/anotar/`}}>
                <Button color="primary">Clasificar nueva frase</Button>{' '}
            </Link>

            <h4>O elija un grupo de labels para editar</h4>

            <Botones />

           <Link to={{pathname: `/listar/`}}>
            <button color="success">no clasificado</button>{' '}
           </Link>

            </div>
        </div>
    );
}

export default Example;