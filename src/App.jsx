import { useState, useEffect } from 'react'
import swal from 'sweetalert';
import Header from './components/Header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import NuevoGasto from './img/nuevo-gasto.svg'

function App() {

    const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ??[])

    const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarForm, setAnimarForm] = useState(false);

    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro, setFiltro] = useState('')
    const [gastosFiltrados, setGastosFiltrados] = useState([])

    useEffect(() =>{
        if(Object.keys(gastoEditar).length > 0){
            handleModal();
        }
    }, [gastoEditar])

    useEffect(() =>{
        localStorage.setItem('presupuesto', presupuesto)
    }, [presupuesto])

    useEffect(() =>{
        localStorage.setItem('gastos', JSON.stringify(gastos))
    }, [gastos])

    useEffect(() =>{
        if(filtro){
            const gastosFilter = gastos.filter(gasto => gasto.categoria === filtro)
            setGastosFiltrados(gastosFilter)
        }
    }, [filtro])

    useEffect(() =>{
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
        if(presupuestoLS > 0){
            setIsValidPresupuesto(true)
        }
    }, [])


    function handleModal(){
        setModal(true);
        setTimeout(() =>{
            setAnimarForm(true);
        }, 200)
    }

    function guardarGasto(gasto){
        if(gasto.id){
            const gastosActualizados = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState)
            setGastos(gastosActualizados);
        }else{
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto])
        }
        setAnimarForm(false);
        setTimeout(() =>{
            setModal(false);
            setGastoEditar({})
        }, 350)
    }

    function eliminarGasto(id){
        const gastosActualizados = gastos.filter(gastoState => gastoState.id != id);
        setGastos(gastosActualizados);
    }

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos = {gastos}
                setGastos = {setGastos}
                presupuesto = {presupuesto}
                setPresupuesto = {setPresupuesto}
                isValidPresupuesto = {isValidPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />

            {isValidPresupuesto &&
                <>
                    <main>
                        <Filtros
                            filtro = {filtro}
                            setFiltro = {setFiltro}
                        />

                        <ListadoGastos
                            gastos = {gastos}
                            setGastoEditar = {setGastoEditar}
                            eliminarGasto = {eliminarGasto}
                            gastosFiltrados = {gastosFiltrados}
                            filtro = {filtro}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img 
                            src={NuevoGasto} 
                            alt="Nuevo gasto" 
                            onClick={handleModal}
                        />
                    </div>
                </>
            }

            {modal && 
                <Modal
                    setModal = {setModal}
                    animarForm = {animarForm}
                    setAnimarForm = {setAnimarForm}
                    guardarGasto = {guardarGasto}
                    gastoEditar = {gastoEditar}
                    setGastoEditar = {setGastoEditar}
                />
            }
        </div>
    )
}

export default App
