import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, Stack, TextField, Typography } from '@mui/material';

const initialChecklists = [
  {
    id: 'CHK-001',
    name: 'Smoke Suite',
    items: [
      { id: '1', text: 'Login básico', done: true },
      { id: '2', text: 'Crear test case', done: false },
      { id: '3', text: 'Generar reporte CSV', done: false }
    ]
  },
  {
    id: 'CHK-010',
    name: 'Regresión API',
    items: [
      { id: '1', text: 'GET /health', done: true },
      { id: '2', text: 'POST /bugs', done: false }
    ]
  }
];

const Checklists = () => {
  const [checklists, setChecklists] = useState(initialChecklists);
  const [newChecklist, setNewChecklist] = useState({ name: '', item: '' });

  const toggleItem = (checklistId, itemId) => {
    setChecklists((prev) =>
      prev.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              )
            }
          : checklist
      )
    );
  };

  const handleAddChecklist = () => {
    if (!newChecklist.name || !newChecklist.item) return;
    setChecklists((prev) => [
      ...prev,
      {
        id: `CHK-${prev.length + 1}`,
        name: newChecklist.name,
        items: [{ id: '1', text: newChecklist.item, done: false }]
      }
    ]);
    setNewChecklist({ name: '', item: '' });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Checklists de Pruebas
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Nombre de Checklist"
                value={newChecklist.name}
                onChange={(event) => setNewChecklist((prev) => ({ ...prev, name: event.target.value }))}
              />
              <TextField
                label="Primer ítem"
                value={newChecklist.item}
                onChange={(event) => setNewChecklist((prev) => ({ ...prev, item: event.target.value }))}
              />
              <Button variant="contained" onClick={handleAddChecklist}>
                Crear Checklist
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {checklists.map((checklist) => (
              <Paper key={checklist.id} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {checklist.name}
                </Typography>
                <Stack spacing={1}>
                  {checklist.items.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={<Checkbox checked={item.done} onChange={() => toggleItem(checklist.id, item.id)} />}
                      label={item.text}
                    />
                  ))}
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checklists;
