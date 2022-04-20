import React, { useParams, useState, useEffect, useContext } from "react";
import { getFirestore } from "../firestore/index";
import { OracionesContext } from "../context/oracionesContext";
import { Button, Label } from "reactstrap";

export default function Anotar(props) {

  const db = getFirestore();
  let edit_id = props.match.params.id;
  const [oracion, setOracion] = useState(false);
  const [labels] = useContext(OracionesContext);
  const [id, setId] = useState(null);
  const [estado, setEstado] = useState("");
  const [palabras, setPalabras] = useState([]);

  useEffect(() => { loadFrase(); }, []);      // Ejecuta la carga inicial de la primera frase a través del método correspondiente
  useEffect(() => { return null }, [id]);                 // Actualiza la frase en pantalla después de clasificada la anteriormente cargada
  useEffect(() => { return null }, [palabras]);
  useEffect(() => { return null }, [estado]);

  //Trae de la base de datos la primera oración sin clasificar (linea 41)
  function loadFrase() {
    if (edit_id) {
      const data = db.collection("oraciones").doc(edit_id);
      data.get().then((snapshot) => {
        const data = snapshot.data();
        setOracion(data.oraciones);
        setId(edit_id);
        setEstado(data.estado);
        setPalabras(data.palabras);
      });
    } else {
      const data = db
        .collection("oraciones")
        .where("estado", "==", "")
        .limit(1);
      data.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOracion(data[0].oraciones);
        setId(data[0].id);
        setPalabras([]);
        setEstado(null);
      });
    }
  }

  //Actualiza la nueva clasificación en base datos y dispara luego la nueva captura de la próxima oración sin clasificar
  function handleSubmit(e) {
    const data = db.collection("oraciones").doc(id);
    data
      .update({
        estado: e,
        palabras: palabras,
      })
      .then(() => {
        setEstado(e);
      })
      .then(() => {
        if (edit_id) {
          props.history.goBack();
        } else {
          loadFrase();
        }
      });
    setEstado(false);
    // setPalabras(false);
  }

  const handlePalabras = (w) => {
    try {
      if (!palabras.includes(w)) {
        setPalabras([...palabras, w]);
      } else {
        palabras.splice(
          palabras.findIndex((p) => p === w),
          1
        );
        setPalabras([...palabras]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clickableWord = () => {
    return (
      <div style={{ padding: "5vh" }}>
        {oracion.split(" ").map((w, i) =>
          w.length > 3 ? (
            w === "data" ? (
              <span style={{ color: "red", margin: "4px", fontWeight: "bolder" }}>{w + " "}</span> 
            ) : (
              <span
              style={{
                margin: '4px',
                backgroundColor: !palabras.includes(w) ? "lightgrey" : "yellow",
              }}
              onClick={(e) => handlePalabras(w)} >
              {w}
            </span>
            )

          ) : w === "big" ? (
            <span style={{ color: "red", margin: "4px", fontWeight: "bolder" }}>{w + " "}</span> 
          ) : (
            <span>{w + " "}</span>
          )
        )}
      </div>
    );
  };

  return (
    <div style={{textAlign: "center"}}>
      <h2>Antar oración</h2>

      <h5>ID: {id}</h5>

      <em>Las palabras en gris se pueden seleccionar para dar una pista del sentido de la oración (positivo, negativo).</em>

      <div>
        {oracion.length > 0 ? (
          <div style={{ margin: "5vh", fontSize: "20px"}}>
            
            {clickableWord()}

            <div style={{ marginTop: "5vh" , fontStyle: "italic",  fontSize: "15px" }}>
              Palabras al lexicon: {
                palabras.map((w, i) => 
                  <span>{w + ' '}</span>
                )
              }
            </div>

            <div style={{ marginTop: "5vh" }}>
              {labels.map((l, i) =>
                l !== estado ? (
                  <Button style={{ margin: "1vh", padding: "15px" }} onClick={() => handleSubmit(l)}> {l} </Button>
                ) : (
                  <Button color="danger" onClick={() => handleSubmit(l)}>
                    {" "}
                    {l}{" "}
                  </Button>
                )
              )}
            </div>
          </div>
        ) : (
          "Cargando datos..."
        )}
      </div>
    </div>
  );
}