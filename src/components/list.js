import React, {useParams, useState, useEffect} from 'react';

export default function List ( props ) {
    let label  = props.match.params.label;
    return(
        <div>
            <h2>Listado de elementos {label}</h2>

        </div>
    )
}