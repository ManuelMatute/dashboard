import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

export type CityValue = 'guayaquil' | 'quito' | 'manta' | 'cuenca';

const CITY_COORDS: Record<CityValue, { latitude: number; longitude: number }> = {
  guayaquil: { latitude: -2.1894, longitude: -79.8891 },
  quito: { latitude: -0.1807, longitude: -78.4678 },
  manta: { latitude: -0.9677, longitude: -80.7089 },
  cuenca: { latitude: -2.9001, longitude: -79.0059 },
};

interface UseFetchDataState {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

const useFetchData = (city: CityValue | ''): UseFetchDataState => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const { latitude, longitude } = CITY_COORDS[city];

    const URL =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation` +
      `&timezone=America%2FChicago`;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const json: OpenMeteoResponse = await response.json();
        if (isMounted) setData(json);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Error desconocido';
        if (isMounted) {
          setError(message);
          setData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [city]);

  return { data, loading, error };
};

export default useFetchData;
