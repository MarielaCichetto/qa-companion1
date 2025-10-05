import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { SparklesIcon, TrashIcon } from '@heroicons/react/24/outline';
import StatusPill from '../components/StatusPill';
import { useQAStore } from '../store/useQAStore';

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

const TasksPage = () => {
  const { taskBoard, moveTaskCard, createTaskCard, deleteTaskCard } = useQAStore((state) => ({
    taskBoard: state.taskBoard,
    moveTaskCard: state.moveTaskCard,
    createTaskCard: state.createTaskCard,
    deleteTaskCard: state.deleteTaskCard
  }));

  const [draft, setDraft] = useState({ column: 'todo', title: '', description: '', priority: 'Alta', owner: '' });

  const handleDragEnd = (result) => {
    moveTaskCard(result);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (!draft.title) return;
    createTaskCard(draft.column, {
      title: draft.title,
      description: draft.description,
      priority: draft.priority,
      owner: draft.owner || 'QA Squad',
      estimate: '4h'
    });
    setDraft({ column: 'todo', title: '', description: '', priority: 'Alta', owner: '' });
  };

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Board de tareas estilo Trello</h2>
          <p className="text-sm text-slate-300">
            Visualiza el flujo de trabajo del squad QA, arrastra tarjetas y prioriza entregables críticos por sprint.
          </p>
        </div>
        <StatusPill label="drag & drop" variant="info" />
      </div>

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
                        <h3 className="text-lg font-semibold text-white">{column.title}</h3>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{column.items.length} tareas</p>
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
                                <StatusPill label={card.priority} variant={priorityColors[card.priority] ?? 'info'} />
                              </div>
                              <p className="text-xs text-slate-300">{card.description}</p>
                              <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>Owner: {card.owner}</span>
                                <span>ETA: {card.estimate}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => deleteTaskCard(columnId, card.id)}
                                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-rose-300"
                              >
                                <TrashIcon className="h-4 w-4" /> Remove
                              </button>
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

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <h3 className="text-lg font-semibold text-white">Nueva tarjeta</h3>
        <p className="mt-2 text-sm text-slate-300">Añade tareas de regresión, automatización o coordinación rápida.</p>
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleCreate}>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Título</label>
            <input
              value={draft.title}
              onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder="Revisar regresión mobile"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Columna</label>
            <select
              value={draft.column}
              onChange={(event) => setDraft((prev) => ({ ...prev, column: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              {taskBoard.columnOrder.map((columnId) => (
                <option key={columnId} value={columnId}>
                  {taskBoard.columns[columnId].title}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Prioridad</label>
            <select
              value={draft.priority}
              onChange={(event) => setDraft((prev) => ({ ...prev, priority: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Owner</label>
            <input
              value={draft.owner}
              onChange={(event) => setDraft((prev) => ({ ...prev, owner: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder="Lucía QA"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Descripción</label>
            <textarea
              value={draft.description}
              onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
              className="h-24 w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder="Detalle de la tarea"
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg"
          >
            Crear tarjeta
          </button>
        </form>
      </motion.section>
    </section>
  );
};

export default TasksPage;
