//import { useState } from 'react'
import Grid from '@mui/material/Grid'  // <- Grid v2
import './App.css'
import HeaderUI from './components/HeaderUI'
import AlertUI from './components/AlertUI'
import SelectorUI from './components/SelectorUI'
import IndicatorUI from './components/IndicatorUI'
import useFetchData from './functions/useFetchData';

function App() {
  const dataFetcherOutput = useFetchData();

  if (!dataFetcherOutput) {
    return <p>Cargando datos del clima...</p>;
  }

  // Sacamos hourly y hourly_units para usar más cómodo
  const { hourly, hourly_units } = dataFetcherOutput;

  // Tomamos el último valor disponible (podría ser 0 si prefieres el primero)
  const index = Math.max(0, hourly.time.length - 1);

  return (
    <>
      <div>
        <h1>Bienvenido al Dashboard</h1>
      </div>

      <Grid container spacing={5} justifyContent="center" alignItems="center">

        {/* Alertas */}
        <Grid container spacing={10} justifyContent="center" alignItems="center">
          <AlertUI description="No se preveen lluvias" />
        </Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 10 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <SelectorUI />
        </Grid>

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 10 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <HeaderUI />
        </Grid>

        {/* === Indicadores === */}
        <Grid
          container
          spacing={2}
          justifyContent="center"
          size={{ xs: 12, md: 10 }}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title="Temperatura (2m)"
              description={`${hourly.temperature_2m[index]} ${hourly_units.temperature_2m}`}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title="Temperatura aparente"
              description={`${hourly.apparent_temperature[index]} ${hourly_units.apparent_temperature}`}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title="Velocidad del viento"
              description={`${hourly.wind_speed_10m[index]} ${hourly_units.wind_speed_10m}`}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title="Humedad relativa"
              description={`${hourly.relative_humidity_2m[index]} ${hourly_units.relative_humidity_2m}`}
            />
          </Grid>
        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: Gráfico
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: Tabla
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: elm1
        </Grid>
      </Grid>
    </>
  );
}

export default App;