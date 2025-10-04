import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';

const ApiTester = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('http://localhost:4000/api/test-cases');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [headers, setHeaders] = useState('');

  const handleSend = async () => {
    try {
      const parsedHeaders = headers
        ? headers
            .split('\n')
            .filter(Boolean)
            .reduce((acc, line) => {
              const [key, value] = line.split(':');
              if (key && value) acc[key.trim()] = value.trim();
              return acc;
            }, {})
        : {};

      const config = {
        method,
        url,
        headers: parsedHeaders
      };

      if (method !== 'GET' && body) {
        config.data = JSON.parse(body);
      }

      const res = await axios(config);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(JSON.stringify({ error: error.message }, null, 2));
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        API Tester (Postman-lite)
      </Typography>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Método</InputLabel>
            <Select value={method} label="Método" onChange={(event) => setMethod(event.target.value)}>
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
            </Select>
          </FormControl>
          <TextField label="URL" fullWidth value={url} onChange={(event) => setUrl(event.target.value)} />
          <Button variant="contained" onClick={handleSend}>
            Enviar
          </Button>
        </Stack>
        <TextField
          label="Headers (uno por línea, formato Key: Value)"
          value={headers}
          onChange={(event) => setHeaders(event.target.value)}
          multiline
          minRows={2}
        />
        {method !== 'GET' && (
          <TextField
            label="Body (JSON)"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            multiline
            minRows={4}
            placeholder='{"title": "Bug"}'
          />
        )}
        <TextField label="Respuesta" value={response} multiline minRows={10} InputProps={{ readOnly: true }} />
      </Stack>
    </Box>
  );
};

export default ApiTester;
