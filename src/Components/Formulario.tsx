import React, { useState } from "react";
import { useForm } from "react-hook-form";

type PersonScore = {
  name: string;
  email: string;
  score: number;
  editar: boolean;
};

export const PersonaFormulario = () => {
  const { register, handleSubmit, errors } = useForm<PersonScore>();

  const onSubmit = (data: PersonScore, e: any) => {
    console.log("data", data);
    addPersona(data);
    e.target.reset();
  };

  const [coleccionPersonas, setColeccionPersonas] = useState<PersonScore[]>([]);

  const addPersona = (dato: PersonScore) => {
    const name = dato.name;
    const email = dato.email;
    const score = dato.score;
    const editar = dato.editar;
    console.log(name + "|" + email + "|" + score);

    const addPersona: PersonScore[] = [
      ...coleccionPersonas,
      { name, email, score, editar },
    ];
    setColeccionPersonas(addPersona);
  };

  const eliminarItem = (name: string) => {
    const newList = coleccionPersonas.filter((item) => item.name !== name);
    setColeccionPersonas(newList);
  };

  const guardarModificacion = (event:any,i:number) =>{

    event.preventDefault();
    let coleccion_person = [...coleccionPersonas];

    if(event.target.name ="namef")
    {
      coleccion_person[i].name = event.target.value;
    }
    
    console.log(event.target.value);
    setColeccionPersonas(coleccion_person);

  }

  const editarItem = (i: number) => {
    let coleccion_person:PersonScore[] = [...coleccionPersonas];
    coleccion_person[i].editar = !coleccion_person[i].editar;
    setColeccionPersonas(coleccion_person);
    console.log(coleccion_person[i].editar + "|" + coleccion_person[i].name);
  };

  return (
    <div className="container p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <legend className="display-3">Formulario</legend>
        <div className="form-group">
          <label htmlFor="field">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            ref={register({ required: true })}
            aria-describedby="namehelp"
            placeholder="Ingrese Nombre"
          />
          {errors.name && errors.name.type === "required" && (
            <div
              className="badge badge-danger mt-1"
              style={{ fontSize: "12px" }}
            >
              Ingresa tu nombre, debe ser cool
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            ref={register({ required: true })}
            aria-describedby="namehelp"
            placeholder="Ingrese Correo"
          />
          {errors.email && errors.email.type === "required" && (
            <div
              className="badge badge-danger mt-1"
              style={{ fontSize: "12px" }}
            >
              Ingresa tu correo, no podremos avisarte
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="score">Puntaje</label>
          <input
            type="number"
            className="form-control"
            id="score"           
            name="score"
            ref={register({ required: true })}
          />
          {errors.score && errors.score.type === "required" && (
            <div
              className="badge badge-danger mt-1"
              style={{ fontSize: "12px" }}
            >
              Ingresa el puntaje, todos merecemos la verdad
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-warning btn-block mt-2">
          Guardar
        </button>
      </form>
      {coleccionPersonas.map((p: PersonScore, i: number) => {
        return (
          <div className="card border-danger mb-3 mb-3 mt-3" key={i}>
            {!p.editar && <div>
              <h4 className="card-title ml-3 mt-2">{p.name}</h4>
              <p className="card-text ml-3 ">{p.email}</p>
              <p
                className="card-text ml-3 mb-2 font-weight-bold"
                style={{ color: p.score > 5 ? "green" : "red" }}
              >
                {"Nota: " + p.score}
              </p>   
            </div>}

            {p.editar && 
            
            <div className="mt-2 ml-4 mr-4">
            <div className="form-group row">
             <input type="text" className="form-control"  id="nameM"
            name="nameM" onChange={(e) => guardarModificacion(e, i)} value={p.name} />
             </div>
              <div className="form-group row">
             <input type="email" className="form-control" id="emailM"
            name="emailM"  />
             </div>
             <div className="form-group row">
             <input type="number" className="form-control"  id="scoreM"           
            name="scoreM"/>
            </div>
            </div>
            }
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => eliminarItem(p.name)}
              >
                Eliminar
              </button>
              {!p.editar && <button
                type="button"
                className="btn btn-info"
                onClick={() => editarItem(i)}
              >
                Editar
              </button>}
              {p.editar && <button
                type="button"
                className="btn btn-info"
                onClick={() => editarItem(i)}
              >
                Guardar Modificación
              </button>}
          </div>
        );
      })}
    </div>
  );
};
