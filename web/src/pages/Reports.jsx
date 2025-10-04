import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { CSVLink } from 'react-csv';
import testCases from '../data/testCases';
import bugs from '../data/bugs';

const Reports = () => {
  const [reportStatus, setReportStatus] = useState('');

  const handleDownloadPdf = () => {
    // Extensible: usar pdfmake/jsPDF para generar reporte detallado
    setReportStatus('Generación de PDF simulada. Integrar librería en iteraciones futuras.');
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Reportes
      </Typography>
      <Stack spacing={2} alignItems="flex-start">
        <CSVLink data={testCases} filename="test-cases.csv" target="_blank" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Exportar Casos de Prueba (CSV)</Button>
        </CSVLink>
        <CSVLink data={bugs} filename="bugs.csv" target="_blank" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">Exportar Bugs (CSV)</Button>
        </CSVLink>
        <Button variant="outlined" onClick={handleDownloadPdf}>
          Exportar Reporte PDF (placeholder)
        </Button>
        {reportStatus && (
          <Typography variant="body2" color="text.secondary">
            {reportStatus}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Reports;
