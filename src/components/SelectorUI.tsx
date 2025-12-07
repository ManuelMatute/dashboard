import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import type { CityValue } from '../functions/useFetchData';

export type MetricKey =
  | 'temperature_2m'
  | 'apparent_temperature'
  | 'wind_speed_10m'
  | 'relative_humidity_2m';

const CITIES: { value: CityValue; label: string }[] = [
  { value: "guayaquil", label: "Guayaquil" },
  { value: "quito", label: "Quito" },
  { value: "manta", label: "Manta" },
  { value: "cuenca", label: "Cuenca" },
];

const METRICS: { value: MetricKey; label: string }[] = [
  { value: "temperature_2m", label: "Temperatura (2m)" },
  { value: "apparent_temperature", label: "Temperatura aparente" },
  { value: "wind_speed_10m", label: "Velocidad del viento" },
  { value: "relative_humidity_2m", label: "Humedad relativa" },
];

interface SelectorUIProps {
  city: CityValue | '';
  onCityChange: (city: CityValue) => void;

  metric: MetricKey;
  onMetricChange: (metric: MetricKey) => void;
}

export default function SelectorUI({
  city,
  onCityChange,
  metric,
  onMetricChange
}: SelectorUIProps) {
  const handleCityChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as CityValue;
    onCityChange(value);
  };

  const handleMetricChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as MetricKey;
    onMetricChange(value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="city-select-label">Ciudad</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-simple-select"
              label="Ciudad"
              value={city}
              onChange={handleCityChange}
            >
              <MenuItem value="" disabled>
                <em>Seleccione una ciudad</em>
              </MenuItem>

              {CITIES.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="metric-select-label">Métrica del gráfico</InputLabel>
            <Select
              labelId="metric-select-label"
              id="metric-simple-select"
              label="Métrica del gráfico"
              value={metric}
              onChange={handleMetricChange}
            >
              {METRICS.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {city && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Información del clima en{' '}
          <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
            {city}
          </span>
        </Typography>
      )}
    </>
  );
}
