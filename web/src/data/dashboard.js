export const velocityTrendSeed = [
  { sprint: 'S-6', executed: 48, passed: 42 },
  { sprint: 'S-7', executed: 56, passed: 50 },
  { sprint: 'S-8', executed: 62, passed: 55 },
  { sprint: 'S-9', executed: 68, passed: 60 },
  { sprint: 'S-10', executed: 74, passed: 68 },
  { sprint: 'S-11', executed: 80, passed: 72 },
  { sprint: 'S-12', executed: 86, passed: 78 }
];

export const coverageSeed = [
  { module: 'Autenticación', coverage: 92 },
  { module: 'Pagos', coverage: 76 },
  { module: 'Reportes', coverage: 81 },
  { module: 'Notificaciones', coverage: 68 }
];

export const qualityPulseSeed = [
  { label: 'Bloqueados', value: 4, color: '#f97316' },
  { label: 'Críticos', value: 7, color: '#ef4444' },
  { label: 'Reabiertos', value: 5, color: '#a855f7' }
];

export const kpiSeed = [
  {
    id: 'kpi-1',
    title: 'Casos totales',
    value: 186,
    delta: '+12 vs sprint anterior',
    accent: 'cobalt'
  },
  {
    id: 'kpi-2',
    title: 'Bugs abiertos',
    value: 24,
    delta: '5 críticos',
    accent: 'magenta'
  },
  {
    id: 'kpi-3',
    title: 'Cobertura',
    value: '82%',
    delta: '+6% mes actual',
    accent: 'neon'
  },
  {
    id: 'kpi-4',
    title: 'Velocidad',
    value: '68 TC/sprint',
    delta: '+8 vs promedio',
    accent: 'lime'
  }
];
