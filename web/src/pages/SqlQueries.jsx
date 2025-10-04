import { useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';

const mockResults = [
  { id: 1, name: 'Smoke Suite', owner: 'QA Team' },
  { id: 2, name: 'Regresión API', owner: 'Backend QA' }
];

const SqlQueries = () => {
  const [query, setQuery] = useState('SELECT * FROM checklists;');
  const [results, setResults] = useState(mockResults);

  const handleExecute = () => {
    // Futuro: integrar con backend que exponga sandbox DB via REST/WebSocket
    if (query.toLowerCase().includes('select')) {
      setResults(mockResults);
    } else {
      setResults([]);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Mini SQL Client
      </Typography>
      <Stack spacing={2}>
        <TextField value={query} onChange={(event) => setQuery(event.target.value)} multiline minRows={4} />
        <Button variant="contained" onClick={handleExecute} sx={{ alignSelf: 'flex-start' }}>
          Ejecutar
        </Button>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Resultados
          </Typography>
          {results.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Sin resultados. Solo se permiten consultas SELECT en este MVP.
            </Typography>
          ) : (
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
              <Box component="thead" sx={{ bgcolor: 'grey.100' }}>
                <Box component="tr">
                  {Object.keys(results[0]).map((key) => (
                    <Box key={key} component="th" sx={{ border: '1px solid #e5e7eb', p: 1, textAlign: 'left' }}>
                      {key}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {results.map((row) => (
                  <Box key={row.id} component="tr">
                    {Object.values(row).map((value, index) => (
                      <Box key={index} component="td" sx={{ border: '1px solid #e5e7eb', p: 1 }}>
                        {value}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

export default SqlQueries;
