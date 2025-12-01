//import { useState } from 'react'
import Grid from '@mui/material/Grid'  // <- Grid v2
import './App.css'
import HeaderUI from './components/HeaderUI'
import AlertUI from './components/AlertUI'
import SelectorUI from './components/SelectorUI'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      
      <div>
        <h1>Bienvenido al Dashboard</h1>
      </div>

      <Grid container spacing={5} justifyContent="center" alignItems="center">

          {/* Alertas */}
         <Grid container spacing={10} justifyContent="center" alignItems="center">

             <AlertUI description="No se preveen lluvias"/>

         </Grid>


         {/* selector */}
         <Grid size={{ xs: 12, md: 10 }} sx={{ display: { xs: 'none', md: 'block' } }} >
             <SelectorUI/>
         </Grid>



        {/* Encabezado */}
         <Grid size={{ xs: 12, md: 10 }} sx={{ display: { xs: 'none', md: 'block' } }} >
             <HeaderUI/>
         </Grid>


        {/* Gráfico (oculto en xs, visible desde md) */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: Gráfico
        </Grid>

        {/* Tabla (oculta en xs, visible desde md) */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: Tabla
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: elm1
        </Grid>



      </Grid>
    </>
  )
}

export default App
