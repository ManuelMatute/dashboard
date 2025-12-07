import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IndicatorUIProps {
  title: string;
  description: string;
}

export default function IndicatorUI(props: IndicatorUIProps) {
  return (
    <Card className="indicator-card" elevation={2}>
      <CardContent className="indicator-content">
        <Typography variant="h4" className="indicator-value">
          {props.description}
        </Typography>
        <Typography variant="body2" className="indicator-title">
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
