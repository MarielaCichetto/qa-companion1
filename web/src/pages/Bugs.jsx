import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import bugsData from '../data/bugs';

const defaultBug = {
  id: '',
  title: '',
  severity: 'Media',
  priority: 'Media',
  status: 'Abierto',
  stepsToReproduce: '',
  expected: '',
  actual: '',
  notes: ''
};

const selectOptions = ['Baja', 'Media', 'Alta'];

const Bugs = () => {
  const [bugs, setBugs] = useState(bugsData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultBug);

  const handleOpen = (bug) => {
    setForm(bug || defaultBug);
    setOpen(true);
  };

  const handleClose = () => {
    setForm(defaultBug);
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setBugs((prev) => {
      const exists = prev.some((bug) => bug.id === form.id);
      if (exists) {
        return prev.map((bug) => (bug.id === form.id ? form : bug));
      }
      return [...prev, form];
    });
    handleClose();
  };

  const handleDelete = (id) => setBugs((prev) => prev.filter((bug) => bug.id !== id));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Gestión de Bugs</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>
          Nuevo Bug
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {bugs.map((bug) => (
          <Grid item xs={12} md={6} key={bug.id}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid #e5e7eb' }}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">{bug.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Severidad: {bug.severity} • Prioridad: {bug.priority}
                </Typography>
                <Typography variant="body2">Estado: {bug.status}</Typography>
                <Typography variant="body2">Esperado: {bug.expected}</Typography>
                <Typography variant="body2">Actual: {bug.actual}</Typography>
                <Typography variant="body2">Notas: {bug.notes}</Typography>
                <Stack direction="row" spacing={1}>
                  <Button size="small" onClick={() => handleOpen(bug)}>
                    Editar
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(bug.id)}>
                    Eliminar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{form.id ? 'Editar Bug' : 'Nuevo Bug'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="ID" name="id" value={form.id} onChange={handleChange} required />
            <TextField label="Título" name="title" value={form.title} onChange={handleChange} required />
            <TextField label="Severidad" name="severity" value={form.severity} onChange={handleChange} select>
              {selectOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Prioridad" name="priority" value={form.priority} onChange={handleChange} select>
              {selectOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Estado" name="status" value={form.status} onChange={handleChange} />
            <TextField
              label="Pasos para Reproducir"
              name="stepsToReproduce"
              value={form.stepsToReproduce}
              onChange={handleChange}
              multiline
              minRows={3}
            />
            <TextField label="Resultado Esperado" name="expected" value={form.expected} onChange={handleChange} />
            <TextField label="Resultado Actual" name="actual" value={form.actual} onChange={handleChange} />
            <TextField label="Notas" name="notes" value={form.notes} onChange={handleChange} multiline minRows={2} />
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

export default Bugs;
