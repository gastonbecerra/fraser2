import React, {useParams, useState, useEffect} from 'react';
import { getFirestore } from '../firestore/index';
import { Link } from 'react-router-dom';

export default function List ( props ) {

    let label  = props.match.params.label;

    const [oraciones, setOraciones] = useState(false);
    const db = getFirestore();

    useEffect(()=> {
        loadOraciones()
    },[])

    function loadOraciones() {
        const data = db.collection("oraciones").where('estado', '==', label);

        data
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setOraciones(data)
        });
    }

    return(
        <div>
            <h2>Listado de elementos {label}</h2>

            { !oraciones ?
                <div>cargando</div>
            :
                <div>
                    {oraciones.map((o,i)=>(
                        <div key={i}>
                            <p> {o.link} </p>
                            <p> {o.oraciones}  </p>
                            <p><Link 
                                to={{
                                        pathname: `/editar/${o.id}`,
                                        state: { 
                                                redirected: true 
                                            }
                                    }}
                                >
                                    <button>reclasificar</button>{' '}
                                </Link>                               
</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}