//import { useState } from 'react'
import Grid from '@mui/material/Grid'  // <- Grid v2
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Bienvenido al Dashboard</h1>
      </div>

      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Gráfico (oculto en xs, visible desde md) */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: Gráfico
        </Grid>

        {/* Tabla (oculta en xs, visible desde md) */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: Tabla
        </Grid>
      </Grid>
    </>
  )
}

export default App
