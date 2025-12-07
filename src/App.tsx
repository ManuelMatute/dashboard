import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, Typography, Box } from '@mui/material';
import './App.css';

import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI, { type MetricKey } from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

import useFetchData, { type CityValue } from './functions/useFetchData';

function App() {
  const [city, setCity] = useState<CityValue | ''>('');
  const [metric, setMetric] = useState<MetricKey>('temperature_2m');

  const { data, loading, error } = useFetchData(city);

  const getAlertConfig = () => {
    if (!city) {
      return { description: 'Selecciona una ciudad para ver alertas.', severity: 'info' as const };
    }

    if (loading) {
      return { description: 'Cargando alerta del clima...', severity: 'info' as const };
    }

    if (error) {
      return { description: `No se pudo calcular la alerta: ${error}`, severity: 'warning' as const };
    }

    if (!data) {
      return { description: 'No hay datos para generar alertas.', severity: 'info' as const };
    }

    const { hourly, hourly_units } = data;

    const index = Math.max(0, hourly.time.length - 1);
    const lastPrecip = hourly.precipitation[index] ?? 0;
    const unit = hourly_units.precipitation ?? '';

    if (lastPrecip > 0) {
      return {
        description: `Se registran lluvias recientes (${lastPrecip} ${unit}).`,
        severity: 'warning' as const
      };
    }

    return { description: 'No se preveen lluvias.', severity: 'success' as const };
  };

  const renderIndicators = () => {
    if (!city) {
      return (
        <Typography variant="body1">
          Selecciona una ciudad para ver el clima.
        </Typography>
      );
    }

    if (loading) {
      return (
        <Typography variant="body1">
          Cargando datos del clima...
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography variant="body1">
          Error al cargar datos: {error}
        </Typography>
      );
    }

    if (!data) {
      return (
        <Typography variant="body1">
          No hay datos disponibles.
        </Typography>
      );
    }

    const { hourly, hourly_units } = data;
    const index = Math.max(0, hourly.time.length - 1);

    return (
      <Grid container spacing={2} justifyContent="center" size={{ xs: 12, md: 10 }}>
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
    );
  };

  const renderChartAndTable = () => {
    if (!city || loading || error || !data) return null;

    return (
      <>
        <Grid size={{ xs: 12, md: 10 }}>
          <Paper className="section-paper">
            <Typography variant="h6" className="section-title">
              Gráfico
            </Typography>
            <ChartUI data={data} metric={metric} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <Paper className="section-paper">
            <Typography variant="h6" className="section-title">
              Tabla
            </Typography>
            <TableUI data={data} rows={12} />
          </Paper>
        </Grid>
      </>
    );
  };

  const alertConfig = getAlertConfig();

  return (
    <Box className="app-shell">
      <Box className="app-header">
        <Typography variant="h3" className="app-title">
          Panel Meteorológico
        </Typography>
        <Typography variant="body1" className="app-subtitle">
          Monitoreo de métricas climáticas por ciudad
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        <Grid size={{ xs: 12, md: 10 }}>
          <Paper className="section-paper section-center">
            <AlertUI description={alertConfig.description} severity={alertConfig.severity} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <Paper className="section-paper">
            <Typography variant="h6" className="section-title">
              Filtros
            </Typography>
            <SelectorUI
              city={city}
              onCityChange={setCity}
              metric={metric}
              onMetricChange={setMetric}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Paper className="section-paper">
            <HeaderUI />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <Paper className="section-paper">
            <Typography variant="h6" className="section-title">
              Indicadores
            </Typography>
            {renderIndicators()}
          </Paper>
        </Grid>

        {renderChartAndTable()}
      </Grid>
    </Box>
  );
}

export default App;
