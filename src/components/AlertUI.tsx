import Alert from '@mui/material/Alert';

interface AlertConfig {
  description: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
}

export default function AlertUI(config: AlertConfig) {
  return (
    <Alert variant="standard" severity={config.severity ?? 'success'}>
      {config.description}
    </Alert>
  );
}
