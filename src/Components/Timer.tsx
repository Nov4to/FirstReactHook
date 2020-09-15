import React,{ useState, useEffect } from 'react';



export function TimerF(){

const [isOn, setIsOn] = useState<boolean>(false);
const [timer, setTimer]  = useState<number>(0);


useEffect(() => {
  let intervalo:any;
 console.log("Efecto se ejecuta valor: " + isOn );

 if(isOn)
 {
  intervalo =  setInterval(()=> setTimer( (timer) => timer + 1),1000) 
 }
  
  return ()=> clearInterval(intervalo);

},[isOn])

const Onreset = () => {
  setIsOn(false);
  setTimer(0);
}

return (
    <div>
      <h1>{timer}</h1>
      {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Start
        </button>
      )}
 
      {
        isOn&&
          <button type="button" onClick={() => setIsOn(false)}>
          Stop
        </button>
      }
      <button type="button" disabled = {timer === 0} onClick = {Onreset} >Reinicio</button>
    </div>
  );


}

