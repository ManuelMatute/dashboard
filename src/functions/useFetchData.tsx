// src/functions/useFetchData.tsx
import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

// El hook devuelve los datos de la API o null mientras carga
const useFetchData = (): OpenMeteoResponse | null => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);

  useEffect(() => {
    // URL: usa exactamente el endpoint que configuraste en Open-Meteo
    const URL =
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const json: OpenMeteoResponse = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error al obtener datos de Open-Meteo', error);
      }
    };

    fetchData();
  }, []); // <= arreglo de dependencias vacío: se ejecuta solo una vez al montar el componente

  return data;
};

export default useFetchData;
