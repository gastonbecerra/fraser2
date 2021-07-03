import React, {useParams, useState, useEffect, useContext} from 'react';
import { getFirestore } from '../firestore/index';
import { OracionesContext } from '../context/oracionesContext';
import { Button, Label } from 'reactstrap';
// import '../index.css'

export default function Anotar ( props ) {

    /*----Variables del estado del componente----*/
    const [oracion, setOracion] = useState(false)
    const [labels] = useContext(OracionesContext);
    const [id, setId] = useState(null)
    const [estado, setEstado] = useState('')
    const db = getFirestore();
    let edit_id  = props.match.params.id;

    /*----Estados del componente----*/

    //Ejecuta la carga inicial de la primera frase a través del método correspondiente
    useEffect(()=> {
      loadFrase()
    },[])

    //Actualiza la frase en pantalla después de clasificada la anteriormente cargada
    useEffect(()=> {
      if(oracion){
        displayFrase()
      }
    },[id])

    /*----Funciones del componente----*/

    //Trae de la base de datos la primera oración sin clasificar (linea 41)
    function loadFrase(){
      
      if (edit_id) {
        const data = db.collection("oraciones").doc(edit_id);
        data
        .get()
        .then((snapshot)=>{
            const data = snapshot.data()
            setOracion(data.oracion)
            setId(edit_id)  
            setEstado(data.estado)
        })
        
      } else {
        const data = db.collection("oraciones").where('estado', '==', '').limit(1);
        data
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setOracion(data[0].oracion)
          setId(data[0].id)
        });
  
      }

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
          if (edit_id) {
            props.history.goBack();
          } else {
            loadFrase()
          }
        
        })
    }

    //Muestra la frase en pantalla con big data en rojo en el medio
    function displayFrase(){
      // let oracionRojo = oracion[0].oracion.split("bigdata")
      let oracionRojo = oracion.split("bigdata")
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
                      {
                        estado != false ?
                        <p className="estado_actual">estado actual {estado}</p>
                        :
                        <span></span>
                      }
                      {labels.map((l,i)=>(
                        <span key={i}>
                            <Button onClick={()=> handleSubmit(l)}> {l} </Button>
                        </span>
                      ))}
                    </div>
                    : 
                    'Cargando datos...'}
            </div>

                    
        </div>
    )
}
