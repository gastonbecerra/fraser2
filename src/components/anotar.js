import React, {useParams, useState, useEffect, useContext} from 'react';
import { getFirestore } from '../firestore/index';
import { OracionesContext } from '../context/oracionesContext';
import { Button, Label } from 'reactstrap';

export default function Anotar ( props ) {

    /*----Variables del estado del componente----*/
    const [oracion, setOracion] = useState(false)
    const [loading, setLoading] = useState(true)
    const [labels] = useContext(OracionesContext);
    const [id, setId] = useState(null)
    const [estado, setEstado] = useState('')
    const db = getFirestore();

    /*----Estados del componente----*/

    //Ejecuta la carga inicial de la primera frase a través del método correspondiente
    useEffect(()=> {
      loadFrase()
    },[])

    //Carga en el estado una nueva frase de la base de datos después de clasificar la anterior
    useEffect(() => {
      if(estado != ''){
        loadFrase()
      }
    }, [estado])

    //Actualiza la frase en pantalla después de clasificada la anteriormente cargada
    useEffect(()=> {
      if(oracion){
        displayFrase()
      }
    },[id])

    /*----Funciones del componente----*/

    //Trae de la base de datos la primera oración sin clasificar (linea 41)
    function loadFrase(){
      const data = db.collection("oraciones").where('estado', '==', '').limit(1);

      data
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOracion(data)
        setId(data[0].id)
      });
    }

    //Actualiza la nueva clasificación en base datos y dispara luego la nueva captura de la próxima oración sin clasificar
    function handleSubmit(e){
        const data = db.collection("oraciones").doc(id)
        data.update({
          estado: e
        })
        .then(()=>{
          setEstado(e)
        })
        .then(()=>{
          loadFrase()
        })
    }

    //Muestra la frase en pantalla con big data en rojo en el medio
    function displayFrase(){
      let oracionRojo = oracion[0].oracion.split("bigdata")
      document.getElementById("texto1").innerText = oracionRojo[0]
      document.getElementById("keyword").innerHTML =  "<font color=red>bigdata</font>"
      document.getElementById("texto2").innerText = oracionRojo[1]
    }
    
    return(
        <div>
            <h2>Anotar {id}</h2>

            <div>
                    {oracion.length > 0 ? 
                    <div>
                      <p><span id="texto1"></span><span id="keyword"></span><span id="texto2"></span></p>
                      {labels.map((l,i)=>(
                            <div>
                            <Button onClick={()=> handleSubmit(l)}> {l} </Button>
                            <br></br>
                        </div>
                      ))}
                    </div>
                    : 
                    'Cargando datos...'}
            </div>

                    
        </div>
    )
}
