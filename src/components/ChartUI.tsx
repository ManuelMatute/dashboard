import { Paper, Typography, Box } from '@mui/material';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import type { MetricKey } from './SelectorUI';

const METRIC_LABEL: Record<MetricKey, string> = {
  temperature_2m: 'Temperatura (2m)',
  apparent_temperature: 'Temperatura aparente',
  wind_speed_10m: 'Velocidad del viento',
  relative_humidity_2m: 'Humedad relativa',
};

interface ChartUIProps {
  data: OpenMeteoResponse;
  metric: MetricKey;
  points?: number;
}

export default function ChartUI({ data, metric, points = 24 }: ChartUIProps) {
  const { hourly, hourly_units } = data;

  const valuesAll = hourly[metric];
  const timesAll = hourly.time;

  const total = valuesAll.length;
  const start = Math.max(0, total - points);

  const values = valuesAll.slice(start);
  const times = timesAll.slice(start);

  if (values.length === 0) {
    return <Typography>No hay datos para graficar.</Typography>;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const width = 600;
  const height = 200;
  const padding = 20;

  const xStep = (width - padding * 2) / Math.max(1, values.length - 1);

  const pointsStr = values
    .map((v, i) => {
      const x = padding + i * xStep;
      const normalized = (v - min) / range;
      const y = padding + (1 - normalized) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  const unit = hourly_units[metric as keyof typeof hourly_units] ?? '';

  return (
    <Box>
      <Typography variant="subtitle1" className="chart-title">
        {METRIC_LABEL[metric]}
      </Typography>

      <Paper variant="outlined" className="chart-paper">
        <Typography variant="body2" className="chart-meta">
          Últimas {values.length} horas · Min: {min} · Max: {max} {unit}
        </Typography>

        <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img">
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="currentColor"
            strokeWidth="1"
          />
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points={pointsStr}
          />
        </svg>

        <Typography variant="caption" className="chart-range">
          {times[0]} → {times[times.length - 1]}
        </Typography>
      </Paper>
    </Box>
  );
}
