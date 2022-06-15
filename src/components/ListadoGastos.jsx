import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, gastosFiltrados, filtro}) => {
  return (
    <div className="listado-gastos contenedor">

        {
          filtro ? 
          <>
          <h2 className={gastosFiltrados.length ? '' : 'centrar-texto'}>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos Filtrados'}</h2>

          {gastosFiltrados.map(gasto =>
            <Gasto
                key = {gasto.id}
                gasto = {gasto}
                setGastoEditar = {setGastoEditar}
                eliminarGasto = {eliminarGasto}
            />
          )}</>: 
          <>
          <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos Aún'}</h2>
          {gastos.map(gasto => 
                <Gasto
                    key = {gasto.id}
                    gasto = {gasto}
                    setGastoEditar = {setGastoEditar}
                    eliminarGasto = {eliminarGasto}
                />
             )}</>
        }
    </div>
  )
}

export default ListadoGastos