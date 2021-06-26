import React, {useParams, useState, useEffect, useContext} from 'react';
import { getFirestore } from '../firestore/index';
import { OracionesContext } from '../context/oracionesContext';
import { Button, Label } from 'reactstrap';

export default function Anotar ( props ) {
    let id  = props.match.params.id;
    console.log(id)

    const [oraciones, setOraciones] = useState([])
    const [loading, setLoading] = useState(true)
    const [labels] = useContext(OracionesContext);
    const [procesado, setProcesado] = useState("");
    const [estado, setEstado] = useState()

    useEffect(()=> {
        const db = getFirestore();
        const data = db.collection("oraciones").limit(1);
        // 2do: aca deberia ser un random + no hay estado 

        data
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOraciones(data)
          setLoading(false)
        });
    },[])

    useEffect(()=> {
        if (loading == false) {
            let oracionRojo = oraciones[0].oracion.split("bigdata")
            document.getElementById("texto1").innerText = oracionRojo[0]
            document.getElementById("keyword").innerHTML =  "<font color=red>bigdata</font>"
            document.getElementById("texto2").innerText = oracionRojo[1]
        }
    },[loading])

    function handleSubmit(e){
        setEstado(e);
        const db = getFirestore();
        const data = db.collection("oraciones").where('id', '==', oraciones[0].id);
  
        data
          .get()
          .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
            }));
            console.log(oraciones[0].id);
            console.log(data[0].id);
            var aux = "" + e + ""
            db.collection('oraciones').doc(data[0].id).update({
              clase: aux
            })
          });   
      }
    
    return(
        <div>
            <h2>Anotar {id}</h2>

            <p>
                {oraciones.length > 0 ? 
                    oraciones.map((f,i)=>(
                        <div>
                            {/* <p>{f.oracion}</p> */}

                            <p><span id="texto1"></span><span id="keyword"></span><span id="texto2"></span></p>

                            {labels.map((l,i)=>(
                            <div>
                            <Button onClick={()=> handleSubmit(l)}> {l} </Button>
                            <br></br>
                        </div>
                    ))}

                        </div>
                    )) : 'no hay nada que mostrar'}
            </p>

                    
        </div>
    )
}
