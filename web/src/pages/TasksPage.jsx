import { useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { SparklesIcon, TrashIcon, PencilSquareIcon, ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import StatusPill from '../components/StatusPill';
import { useQAStore } from '../store/useQAStore';
import { useTranslation } from '../hooks/useTranslation';

const priorityColors = {
  Alta: 'danger',
  Media: 'warning',
  Baja: 'info'
};

const columnBorders = {
  cobalt: 'border-cobalt/20',
  magenta: 'border-magenta/20',
  neon: 'border-neon/20',
  lime: 'border-lime/20'
};

const statusOptions = [
  { id: 'todo', label: 'To Do' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'done', label: 'Done' }
];

const TasksPage = () => {
  const { t } = useTranslation();
  const { taskBoard, tasks, moveTaskCard, createTaskCard, deleteTaskCard, updateTaskCard } = useQAStore((state) => ({
    taskBoard: state.taskBoard,
    tasks: state.tasks,
    moveTaskCard: state.moveTaskCard,
    createTaskCard: state.createTaskCard,
    deleteTaskCard: state.deleteTaskCard,
    updateTaskCard: state.updateTaskCard
  }));

  const [draft, setDraft] = useState({ column: 'todo', title: '', description: '', priority: 'Alta', owner: '', tags: '' });
  const [viewMode, setViewMode] = useState('kanban');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    tasks.forEach((task) => (task.tags || []).forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [tasks]);

  const handleDragEnd = async (result) => {
    await moveTaskCard(result);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!draft.title) {
      toast.error(t('Debes ingresar un título.'));
      return;
    }
    try {
      const tags = draft.tags ? draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
      await createTaskCard(draft.column, {
        title: draft.title,
        description: draft.description,
        priority: draft.priority,
        owner: draft.owner || 'QA Squad',
        estimate: '4h',
        tags
      });
      toast.success(t('Tarea creada correctamente.'));
      setDraft({ column: 'todo', title: '', description: '', priority: 'Alta', owner: '', tags: '' });
      setEditingTaskId(null);
    } catch (error) {
      toast.error(t('No se pudo crear la tarea.'));
    }
  };

  const startEditing = (columnId, card) => {
    setEditingTaskId(card.id);
    setDraft({
      column: columnId,
      title: card.title,
      description: card.description,
      priority: card.priority,
      owner: card.owner,
      tags: (card.tags || []).join(', ')
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!editingTaskId) return;
    try {
      const tags = draft.tags ? draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
      await updateTaskCard(editingTaskId, {
        title: draft.title,
        description: draft.description,
        priority: draft.priority,
        owner: draft.owner,
        status: draft.column,
        tags
      });
      toast.success(t('Tarea actualizada.'));
      setEditingTaskId(null);
      setDraft({ column: 'todo', title: '', description: '', priority: 'Alta', owner: '', tags: '' });
    } catch (error) {
      toast.error(t('No se pudo actualizar la tarea.'));
    }
  };

  const handleDelete = async (columnId, cardId) => {
    try {
      await deleteTaskCard(cardId);
      toast.success(t('Tarea eliminada.'));
      if (editingTaskId === cardId) {
        setEditingTaskId(null);
        setDraft({ column: 'todo', title: '', description: '', priority: 'Alta', owner: '', tags: '' });
      }
    } catch (error) {
      toast.error(t('No se pudo eliminar la tarea.'));
    }
  };

  const submitAction = editingTaskId ? handleUpdate : handleCreate;

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">{t('Tablero interno de tareas QA')}</h2>
          <p className="text-sm text-slate-300">
            {t('Visualiza el flujo de trabajo del squad, arrastra tarjetas y controla prioridades sin depender de herramientas externas.')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
              viewMode === 'kanban' ? 'border-neon/50 bg-neon/10 text-white' : 'border-white/10 bg-white/5 text-slate-300'
            }`}
          >
            <Squares2X2Icon className="h-4 w-4" /> {t('Kanban')}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
              viewMode === 'list' ? 'border-neon/50 bg-neon/10 text-white' : 'border-white/10 bg-white/5 text-slate-300'
            }`}
          >
            <ListBulletIcon className="h-4 w-4" /> {t('Lista')}
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid gap-6 lg:grid-cols-3">
            {taskBoard.columnOrder.map((columnId, index) => {
              const column = taskBoard.columns[columnId];
              const borderAccent = columnBorders[column.color] ?? 'border-cobalt/20';
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <motion.section
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`glass-panel flex min-h-[26rem] flex-col gap-4 ${borderAccent} ${snapshot.isDraggingOver ? 'bg-white/10' : ''}`}
                    >
                      <header className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{t(column.title)}</h3>
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                            {column.items.length} {t('tareas')}
                          </p>
                        </div>
                        <SparklesIcon className="h-6 w-6 text-neon" />
                      </header>
                      <div className="space-y-4">
                        {column.items.map((card, cardIndex) => (
                          <Draggable key={card.id} draggableId={card.id} index={cardIndex}>
                            {(dragProvided, dragSnapshot) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                className={`space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner transition ${
                                  dragSnapshot.isDragging ? 'border-neon/40 shadow-glow' : ''
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-semibold text-white">{card.title}</p>
                                  <StatusPill label={t(card.priority)} variant={priorityColors[card.priority] ?? 'info'} />
                                </div>
                                <p className="text-xs text-slate-300">{card.description}</p>
                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                                  <span>{t('Owner')}: {card.owner}</span>
                                  <span>{t('ETA')}: {card.estimate}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-neon">
                                  {(card.tags || []).map((tag) => (
                                    <span key={tag} className="rounded-full bg-neon/10 px-2 py-1 text-[10px] text-neon">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-slate-400">
                                  <button type="button" onClick={() => startEditing(columnId, card)} className="flex items-center gap-1 text-cyan-200">
                                    <PencilSquareIcon className="h-4 w-4" /> {t('Editar')}
                                  </button>
                                  <button type="button" onClick={() => handleDelete(columnId, card.id)} className="flex items-center gap-1 text-rose-300">
                                    <TrashIcon className="h-4 w-4" /> {t('Eliminar')}
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </motion.section>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      ) : (
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5 text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left">{t('ID')}</th>
                  <th className="px-4 py-3 text-left">{t('Título')}</th>
                  <th className="px-4 py-3 text-left">{t('Estado')}</th>
                  <th className="px-4 py-3 text-left">{t('Prioridad')}</th>
                  <th className="px-4 py-3 text-left">{t('Owner')}</th>
                  <th className="px-4 py-3 text-left">{t('Tags')}</th>
                  <th className="px-4 py-3 text-left">{t('Acciones')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-white/5/30">
                {tasks.map((task) => (
                  <tr key={task.id} className="transition hover:bg-white/10">
                    <td className="px-4 py-3 text-slate-400">{task.id}</td>
                    <td className="px-4 py-3 text-white">{task.title}</td>
                    <td className="px-4 py-3 text-slate-300">{t(statusOptions.find((option) => option.id === task.status)?.label ?? task.status)}</td>
                    <td className="px-4 py-3 text-slate-300">{t(task.priority)}</td>
                    <td className="px-4 py-3 text-slate-300">{task.owner}</td>
                    <td className="px-4 py-3 text-slate-300">{(task.tags || []).join(', ')}</td>
                    <td className="px-4 py-3 text-slate-200">
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]">
                        <button type="button" onClick={() => startEditing(task.status, task)} className="text-cyan-200">
                          {t('Editar')}
                        </button>
                        <button type="button" onClick={() => handleDelete(task.status, task.id)} className="text-rose-300">
                          {t('Eliminar')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      )}

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <h3 className="text-lg font-semibold text-white">{editingTaskId ? t('Actualizar tarea') : t('Nueva tarea')}</h3>
        <p className="mt-2 text-sm text-slate-300">{t('Añade tareas de regresión, automatización o coordinación rápida.')}</p>
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={submitAction}>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Título')}</label>
            <input
              value={draft.title}
              onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder={t('Revisar regresión mobile')}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Columna')}</label>
            <select
              value={draft.column}
              onChange={(event) => setDraft((prev) => ({ ...prev, column: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              {taskBoard.columnOrder.map((columnId) => (
                <option key={columnId} value={columnId} className="text-slate-900">
                  {t(taskBoard.columns[columnId].title)}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Prioridad')}</label>
            <select
              value={draft.priority}
              onChange={(event) => setDraft((prev) => ({ ...prev, priority: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              <option value="Alta" className="text-slate-900">
                {t('Alta')}
              </option>
              <option value="Media" className="text-slate-900">
                {t('Media')}
              </option>
              <option value="Baja" className="text-slate-900">
                {t('Baja')}
              </option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Owner')}</label>
            <input
              value={draft.owner}
              onChange={(event) => setDraft((prev) => ({ ...prev, owner: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder={t('Lucía QA')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Tags')}</label>
            <input
              value={draft.tags}
              onChange={(event) => setDraft((prev) => ({ ...prev, tags: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder={t('Ej: automatización, smoke')}
            />
            {allTags.length > 0 && (
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                {t('Tags sugeridos')}: {allTags.join(', ')}
              </p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Descripción')}</label>
            <textarea
              value={draft.description}
              onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
              className="h-24 w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder={t('Detalle de la tarea')}
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg"
          >
            {editingTaskId ? t('Guardar cambios') : t('Crear tarea')}
          </button>
        </form>
      </motion.section>
    </section>
  );
};

export default TasksPage;
