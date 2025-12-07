import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
  data: OpenMeteoResponse;
  rows?: number;
}

export default function TableUI({ data, rows = 12 }: TableUIProps) {
  const { hourly, hourly_units } = data;

  const total = hourly.time.length;
  const start = Math.max(0, total - rows);

  const sliceTime = hourly.time.slice(start);
  const sliceTemp = hourly.temperature_2m.slice(start);
  const sliceApp = hourly.apparent_temperature.slice(start);
  const sliceWind = hourly.wind_speed_10m.slice(start);
  const sliceHum = hourly.relative_humidity_2m.slice(start);

  return (
    <>
      <Typography variant="body2" className="table-subtitle">
        Datos más recientes registrados por hora
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Hora</TableCell>
              <TableCell align="right">Temp (2m) ({hourly_units.temperature_2m})</TableCell>
              <TableCell align="right">Temp aparente ({hourly_units.apparent_temperature})</TableCell>
              <TableCell align="right">Viento ({hourly_units.wind_speed_10m})</TableCell>
              <TableCell align="right">Humedad ({hourly_units.relative_humidity_2m})</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sliceTime.map((t, i) => (
              <TableRow key={`${t}-${i}`}>
                <TableCell>{t}</TableCell>
                <TableCell align="right">{sliceTemp[i]}</TableCell>
                <TableCell align="right">{sliceApp[i]}</TableCell>
                <TableCell align="right">{sliceWind[i]}</TableCell>
                <TableCell align="right">{sliceHum[i]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
