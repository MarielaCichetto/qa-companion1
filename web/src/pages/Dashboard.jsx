import { Grid, Paper, Typography, LinearProgress, Stack } from '@mui/material';
import testCases from '../data/testCases';
import bugs from '../data/bugs';

const Dashboard = () => {
  const total = testCases.length;
  const passed = testCases.filter((tc) => tc.status === 'Passed').length;
  const failed = testCases.filter((tc) => tc.status === 'Failed').length;
  const blocked = testCases.filter((tc) => tc.status === 'Blocked').length;
  const successRate = total ? Math.round((passed / total) * 100) : 0;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Resumen de ejecución
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">Total: {total}</Typography>
            <Typography variant="body2">Pasados: {passed}</Typography>
            <Typography variant="body2">Fallidos: {failed}</Typography>
            <Typography variant="body2">Bloqueados: {blocked}</Typography>
            <Typography variant="body2">Tasa de éxito: {successRate}%</Typography>
            <LinearProgress variant="determinate" value={successRate} />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Últimos bugs reportados
          </Typography>
          <Stack spacing={2}>
            {bugs.map((bug) => (
              <Paper key={bug.id} variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1">{bug.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Severidad: {bug.severity} • Prioridad: {bug.priority}
                </Typography>
                <Typography variant="body2">Estado: {bug.status}</Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
