import { useMemo, useState } from 'react';
import StatusPill from '../components/StatusPill';
import { useTranslation } from '../hooks/useTranslation';

const initialChecklists = [
  {
    id: 'CHK-001',
    name: 'Smoke Release',
    description: 'Validación esencial post-deploy',
    items: [
      { id: '1', label: 'Login básico', checked: true },
      { id: '2', label: 'Dashboard métricas', checked: false },
      { id: '3', label: 'Reportes CSV', checked: false }
    ]
  },
  {
    id: 'CHK-002',
    name: 'Regresión API',
    description: 'Endpoints críticos de facturación',
    items: [
      { id: '1', label: 'GET /reports', checked: true },
      { id: '2', label: 'POST /reports/export', checked: false },
      { id: '3', label: 'Auth tokens', checked: false }
    ]
  },
  {
    id: 'CHK-003',
    name: 'UX Exploratorio',
    description: 'Recorrido libre en mobile',
    items: [
      { id: '1', label: 'Accesibilidad', checked: false },
      { id: '2', label: 'Animaciones', checked: false },
      { id: '3', label: 'Modo oscuro', checked: true }
    ]
  }
];

const ChecklistsPage = () => {
  const [checklists, setChecklists] = useState(initialChecklists);
  const [selected, setSelected] = useState(initialChecklists[0].id);
  const { t } = useTranslation();

  const activeChecklist = useMemo(
    () => checklists.find((checklist) => checklist.id === selected) ?? checklists[0],
    [checklists, selected]
  );

  const toggleItem = (checklistId, itemId) => {
    setChecklists((prev) =>
      prev.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              )
            }
          : checklist
      )
    );
  };

  const completion = Math.round(
    (activeChecklist.items.filter((item) => item.checked).length / activeChecklist.items.length) * 100
  );

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-white">{t('Checklists dinámicos')}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          {t('Organiza tus listas de smoke, regresión y exploratorias con una visual moderna. Próximamente podrás colaborar en tiempo real con otros analistas.')}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
          <h3 className="text-lg font-semibold text-white">{t('Tus checklists')}</h3>
          <div className="space-y-3">
            {checklists.map((checklist) => {
              const total = checklist.items.length;
              const done = checklist.items.filter((item) => item.checked).length;
              const percentage = Math.round((done / total) * 100);
              return (
                <button
                  key={checklist.id}
                  onClick={() => setSelected(checklist.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selected === checklist.id
                      ? 'border-aurora/60 bg-aurora/20 text-white shadow shadow-aurora/30'
                      : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{checklist.name}</span>
                    <StatusPill label={`${percentage}%`} variant={percentage > 60 ? 'success' : 'info'} />
                  </div>
                  <p className="mt-1 text-xs text-white/70">{checklist.description}</p>
                </button>
              );
            })}
          </div>
          <button className="w-full rounded-2xl border border-dashed border-white/20 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40 hover:text-white">
            {t('+ Crear checklist (próximamente)')}
          </button>
        </aside>

        <section className="lg:col-span-2">
          <article className="space-y-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{activeChecklist.name}</h3>
                <p className="text-sm text-slate-300">{activeChecklist.description}</p>
              </div>
              <div className="min-w-[200px] rounded-2xl border border-white/10 bg-white/5 p-4 text-right">
                <p className="text-xs uppercase tracking-wide text-white/60">{t('Progreso')}</p>
                <p className="mt-1 text-3xl font-semibold text-white">{completion}%</p>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-aurora to-ocean"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            </div>
            <ul className="space-y-3">
              {activeChecklist.items.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                    item.checked
                      ? 'border-emerald-400/60 bg-emerald-400/20 text-white'
                      : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleItem(activeChecklist.id, item.id)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition ${
                        item.checked
                          ? 'border-emerald-400/80 bg-emerald-400 text-white'
                          : 'border-white/20 text-white/70 hover:border-white/50'
                      }`}
                    >
                      {item.checked ? '✓' : ''}
                    </button>
                    <span className={`${item.checked ? 'line-through text-white/70' : 'text-white'}`}>{item.label}</span>
                  </div>
                  <StatusPill label={item.checked ? t('Done') : t('Pending')} variant={item.checked ? 'success' : 'info'} />
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-aurora/20 via-blossom/20 to-ocean/20 p-5 text-sm text-white/80">
              <p className="font-semibold text-white">{t('Siguiente evolución')}</p>
              <p className="mt-2">
                {t('Agrega recordatorios automáticos, adjunta notas por ítem y comparte listas con stakeholders directamente desde la app.')}
              </p>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
};

export default ChecklistsPage;
