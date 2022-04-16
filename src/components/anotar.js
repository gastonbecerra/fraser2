import React, { useParams, useState, useEffect, useContext } from "react";
import { getFirestore } from "../firestore/index";
import { OracionesContext } from "../context/oracionesContext";
import { Button, Label } from "reactstrap";
// import '../index.css'

export default function Anotar(props) {
  const [oracion, setOracion] = useState(false);
  const [labels] = useContext(OracionesContext);
  const [id, setId] = useState(null);
  const [estado, setEstado] = useState("");
  const db = getFirestore();
  let edit_id = props.match.params.id;
  const [palabras, setPalabras] = useState([]);
  const [reclasificar, setReclasificar] = useState(false);

  //Ejecuta la carga inicial de la primera frase a través del método correspondiente
  useEffect(() => {
    loadFrase();
  }, []);

  //Actualiza la frase en pantalla después de clasificada la anteriormente cargada
  useEffect(() => {}, [id]);

  useEffect(() => {
    console.log(palabras);
  }, [palabras]);

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
  }

  //Muestra la frase en pantalla con big data en rojo en el medio
  function displayFrase() {
    // let oracionRojo = oracion[0].oracion.split("bigdata")
    let oracionRojo = oracion.split("bigdata");
    document.getElementById("texto1").innerText = oracionRojo[0];
    document.getElementById("keyword").innerHTML =
      "<font color=red>bigdata</font>";
    document.getElementById("texto2").innerText = oracionRojo[1];
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
      <div style={{ paddingLeft: "19px" }}>
        {oracion.split(" ").map((w, i) =>
          w.length > 3 ? (
            <span
              style={{
                backgroundColor: !palabras.includes(w) ? "lightgrey" : "yellow",
              }}
              onClick={(e) => handlePalabras(w)}
            >
              {w + " "}
            </span>
          ) : w === ("big" || "data") ? (
            <span style={{ color: "red" }}>{w + " "}</span>
          ) : (
            <span>{w + " "}</span>
          )
        )}
      </div>
    );
  };

  return (
    <div>
      <h2>Anotar {id}</h2>

      <div>
        {oracion.length > 0 ? (
          <div>
            <p>
              <span id="texto1"></span>
              <span id="keyword"></span>
              <span id="texto2"></span>
            </p>

            {oracion && clickableWord()}

            <div style={{ marginTop: "5vh" }}>
              {labels.map((l, i) =>
                l !== estado ? (
                  <Button onClick={() => handleSubmit(l)}> {l} </Button>
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
