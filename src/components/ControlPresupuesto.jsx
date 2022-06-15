import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import { formatearCantidad } from "../helpers"

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() =>{
        const totalGastado = gastos.reduce((acc, gasto) => acc + gasto.cantidad, 0);
        const totalDisponible = presupuesto - totalGastado
        const totalPorcentaje = ((totalGastado * 100)/presupuesto).toFixed(2)
        setGastado(totalGastado);
        setDisponible(totalDisponible)
        setPorcentaje(totalPorcentaje);
    }, [gastos])

    function handleReset(){
        swal({
            title: "¿Deseas reiniciar el presupuesto y los gastos?",
/*             text: "Once deleted, you will not be able to recover this imaginary file!", */
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
                swal("Se ha reiniciado correctamente", {
                    icon: "success",
                });
            } /* else {
              swal("Your imaginary file is safe!");
            } */
          });
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    value={porcentaje} 
                    text={`${porcentaje} % Gastado`}
                    styles={buildStyles({
                        pathColor: porcentaje >= 100 ? 'rgba(255, 0, 0, 0.751)' : '#3b82f6',
                        textColor: porcentaje >= 100 ? 'rgba(255, 0, 0, 0.751)' : '#3b82f6',
                        trailColor: '#f5f5f5'
                    })}
                />
            </div>

            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleReset}>
                    Reiniciar App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>

                <p className={`${porcentaje >= 100 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
