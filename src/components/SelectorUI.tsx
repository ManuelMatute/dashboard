import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Typography from '@mui/material/Typography'; // Añadido para mostrar el texto de abajo

// Lista de ciudades para usar en los MenuItem
const CITIES = [
  { value: "guayaquil", label: "Guayaquil" },
  { value: "quito", label: "Quito" },
  { value: "manta", label: "Manta" },
  { value: "cuenca", label: "Cuenca" },
];

export default function SelectorUI() {
  // 1. Inicialización del estado.
  const [cityInput, setCityInput] = useState('');

  // 2. Función de manejo de cambios.
  // Asegúrate de que SelectChangeEvent<string> esté importado
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCityInput(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ m: 1, minWidth: 200 }}> {/* Agregué estilos básicos */}
      {/* Etiqueta del selector */}
      <InputLabel id="city-select-label">Ciudad</InputLabel>

      {/* Selector Principal (el segundo Select estaba incompleto y no era necesario) */}
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        // 1. Conexión del ESTADO (Valor actual)
        value={cityInput} 
        // 2. Conexión de la FUNCIÓN (Acción al cambiar)
        onChange={handleChange}
      >
        {/* Opción deshabilitada o de marcador de posición (si cityInput es '') */}
        <MenuItem value="" disabled>
          <em>Seleccione una ciudad</em>
        </MenuItem>

        {/* Generación de opciones a partir de la lista de ciudades */}
        {CITIES.map((city) => (
          <MenuItem key={city.value} value={city.value}>
            {city.label}
          </MenuItem>
        ))}
      </Select>

      {/* ----------------------------------------------------- */}
      
      {/* 3. Información Condicional: Muestra el texto solo si cityInput NO está vacío */}
      {cityInput && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Información del clima en{' '}
          <span
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}
          >
            {cityInput}
          </span>
        </Typography>
      )}

    </FormControl>
  );
}