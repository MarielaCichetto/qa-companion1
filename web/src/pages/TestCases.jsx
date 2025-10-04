import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import testCasesData from '../data/testCases';

const defaultTestCase = {
  id: '',
  title: '',
  status: 'Passed',
  set: '',
  userStory: '',
  steps: '',
  expectedResult: ''
};

const TestCases = () => {
  const [testCases, setTestCases] = useState(testCasesData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultTestCase);

  const handleOpen = (testCase) => {
    setForm(testCase || defaultTestCase);
    setOpen(true);
  };

  const handleClose = () => {
    setForm(defaultTestCase);
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setTestCases((prev) => {
      const exists = prev.some((tc) => tc.id === form.id);
      if (exists) {
        return prev.map((tc) => (tc.id === form.id ? { ...form, steps: form.steps.split('\n') } : tc));
      }
      return [...prev, { ...form, steps: form.steps.split('\n') }];
    });
    handleClose();
  };

  const handleDelete = (id) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  const statusColor = {
    Passed: 'success',
    Failed: 'error',
    Blocked: 'warning'
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Casos de Prueba</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>
          Nuevo Caso de Prueba
        </Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Set</TableCell>
            <TableCell>Historia de Usuario</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCases.map((testCase) => (
            <TableRow key={testCase.id} hover>
              <TableCell>{testCase.id}</TableCell>
              <TableCell>{testCase.title}</TableCell>
              <TableCell>{testCase.set}</TableCell>
              <TableCell>{testCase.userStory}</TableCell>
              <TableCell>
                <Chip label={testCase.status} color={statusColor[testCase.status]} size="small" />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button size="small" onClick={() => handleOpen({ ...testCase, steps: testCase.steps.join('\n') })}>
                    Editar
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(testCase.id)}>
                    Eliminar
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{form.id ? 'Editar Caso de Prueba' : 'Nuevo Caso de Prueba'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="ID" name="id" value={form.id} onChange={handleChange} fullWidth required />
            <TextField label="Título" name="title" value={form.title} onChange={handleChange} fullWidth required />
            <TextField label="Set" name="set" value={form.set} onChange={handleChange} fullWidth />
            <TextField label="Historia de Usuario" name="userStory" value={form.userStory} onChange={handleChange} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select name="status" value={form.status} label="Estado" onChange={handleChange}>
                <MenuItem value="Passed">Passed</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
                <MenuItem value="Blocked">Blocked</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Pasos"
              name="steps"
              value={form.steps}
              onChange={handleChange}
              multiline
              minRows={3}
              helperText="Separar cada paso con Enter"
            />
            <TextField
              label="Resultado Esperado"
              name="expectedResult"
              value={form.expectedResult}
              onChange={handleChange}
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestCases;
