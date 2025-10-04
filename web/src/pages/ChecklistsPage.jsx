import { useState } from 'react';

const defaultChecklists = [
  {
    id: 'CHK-001',
    name: 'Smoke Suite',
    items: [
      { id: '1', label: 'Login básico', checked: true },
      { id: '2', label: 'Navegación principal', checked: false },
      { id: '3', label: 'Carga de dashboard', checked: false }
    ]
  },
  {
    id: 'CHK-002',
    name: 'Regresión API',
    items: [
      { id: '1', label: 'Endpoint /users', checked: false },
      { id: '2', label: 'Endpoint /reports', checked: false }
    ]
  }
];

const ChecklistsPage = () => {
  const [checklists, setChecklists] = useState(defaultChecklists);

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

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-3xl font-semibold text-slate-900">Checklists</h2>
        <p className="text-slate-500">Controla rápidamente smoke y regresiones. Integra sincronización en la nube posteriormente.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-4">
        {checklists.map((checklist) => (
          <div key={checklist.id} className="bg-white rounded shadow p-4 space-y-3">
            <h3 className="font-semibold text-lg">{checklist.name}</h3>
            <ul className="space-y-2">
              {checklist.items.map((item) => (
                <li key={item.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(checklist.id, item.id)}
                    className="h-4 w-4"
                  />
                  <span className={item.checked ? 'line-through text-slate-400' : 'text-slate-600'}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChecklistsPage;
