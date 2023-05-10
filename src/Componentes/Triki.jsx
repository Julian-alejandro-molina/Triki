import { useState } from "react";
import confetti from "canvas-confetti";
import "../Estilos/Triki.css";


//const triki = Array(9).fill(); /*creamos un arreglo con valor estatico(fill())*/
const TURNO = {
  x: "×",
  o: "o",
};
const Square = ({ children, selecionado,actualizarTriki,index}) => {
  const className = `uno ${selecionado ? "es-selecionado" : ""}`;
  const handelClick=()=>{
        actualizarTriki(index);
  }
  return (
  <div onClick={handelClick}
   className={className}>
  {children}</div>);
};

// posiciones gannadoras
const comboGanador=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

const Triki = () => {
  const [triki, setTriki] = useState(Array(9).fill()); //valor inicial(Array triki)
  const [turno, setTurno] = useState(TURNO.x); //valor inicial(turno)
  const[ganador,setGanador]=useState(null);

  const checGanador = comprobarTablero =>{
    for(const combo of comboGanador){
      const [a,b,c]=combo
      if(
        comprobarTablero[a]&&
        comprobarTablero[a]===comprobarTablero[b]&&
        comprobarTablero[a]===comprobarTablero[c] 
        ){
          return comprobarTablero[a]
        }
      }
      return null
  }

  const reseteraJuego=()=>{//Para resetear el juego se devuelven los estados a suvalor pretermido(valor inicial ),esta misma logica se usa para resetear formularios 
    setTriki(Array(9).fill());
    setTurno(TURNO.x);
    setGanador(null)
  }

  const finalJuego = nuevoTriki =>{
    return nuevoTriki.every((square) => square!= null)
  }
  
  const actualizarTriki=(index)=>{
    //no  actualiza la posicion si ya tiene algo
    if(triki[index] || ganador) return
    //Actulizar el tablero
    const nuevoTriki=[...triki]
    nuevoTriki[index]=turno
    setTriki(nuevoTriki)
    //cambiar el turno 
    const nuevoTurno= turno===TURNO.x? TURNO.o:TURNO.x
    setTurno(nuevoTurno)
    // revisar si hay  ganador
    const nuevoGanador=checGanador(nuevoTriki)
    if(nuevoGanador){
      confetti()
      setGanador(nuevoGanador)
    }else if(finalJuego(nuevoTriki)){
      setGanador(false)// En caso de empate
    }
  }
  return (
    <section>
      <h1>TRIKI</h1>
      <button className="empate" onClick={reseteraJuego}>NUEVO JUEGO</button>
      <div className=" dos">
        {triki.map((_, index) => {
          return (
            <Square key={index}
             index={index}
             actualizarTriki={actualizarTriki}>{/*Si se pasa la función ejecutada (función ()), se renderizara una vez por cada posición del arry, ósea 9 veces y no cada que yo lo solicite */}
              {triki[index]}
            </Square>
          );
        })}
      </div>
      <section className="turno">
        <Square selecionado={turno === TURNO.x}>{TURNO.x}</Square>
        <Square selecionado={turno === TURNO.o}>{TURNO.o}</Square>
      </section>

      {
        ganador!=null &&(
          <section className="gadador">
            <div className="=text">
              <h2>
                {
                ganador=== false ?'Empate':'GANADOR'
                }
                </h2>
                <header className="win">
                  {ganador && <Square>{ganador}</Square>}
                </header>
                <footer>
                  <button className="nuevo-juego" onClick={reseteraJuego}>NUEVO JUEGO</button>
                </footer>
            </div>
            </section>
          
        )
      }
    </section>
    
  );
};

export default Triki;
