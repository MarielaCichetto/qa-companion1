import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, LinkIcon } from '@heroicons/react/24/outline';
import StatusPill from '../components/StatusPill';
import { useTranslation } from '../hooks/useTranslation';
import { useQAStore } from '../store/useQAStore';

const statusVariants = {
  'In Progress': 'info',
  'To Do': 'warning',
  Done: 'success'
};

const UserStoriesPage = () => {
  const { t } = useTranslation();
  const { userStories, testCases, addUserStory, linkTestCaseToStory } = useQAStore((state) => ({
    userStories: state.userStories,
    testCases: state.testCases,
    addUserStory: state.addUserStory,
    linkTestCaseToStory: state.linkTestCaseToStory
  }));

  const [form, setForm] = useState({ title: '', description: '', priority: 'Media', acceptanceCriteria: '', status: 'To Do' });
  const [selectedStory, setSelectedStory] = useState(userStories[0]?.id ?? '');
  const [selectedTestCase, setSelectedTestCase] = useState(testCases[0]?.id ?? '');

  const stats = useMemo(() => ({
    total: userStories.length,
    linked: userStories.reduce((acc, story) => acc + story.linkedTestCases.length, 0)
  }), [userStories]);

  const handleCreate = (event) => {
    event.preventDefault();
    if (!form.title) return;
    addUserStory({
      title: form.title,
      description: form.description,
      priority: form.priority,
      acceptanceCriteria: form.acceptanceCriteria.split('\n').filter(Boolean),
      linkedTestCases: [],
      status: form.status,
      owner: 'QA Squad'
    });
    setForm({ title: '', description: '', priority: 'Media', acceptanceCriteria: '', status: 'To Do' });
  };

  const handleLink = (event) => {
    event.preventDefault();
    if (!selectedStory || !selectedTestCase) return;
    linkTestCaseToStory(selectedStory, selectedTestCase);
  };

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">{t('Backlog y User Stories')}</h2>
          <p className="text-sm text-slate-300">{t('Gestiona historias priorizadas, criterios de aceptación y relación directa con casos de prueba.')}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-slate-300">
          <span className="rounded-2xl border border-white/10 px-3 py-2">{stats.total} {t('historias')}</span>
          <span className="rounded-2xl border border-white/10 px-3 py-2">{stats.linked} {t('vínculos')}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel lg:col-span-2">
          <header className="flex items-center gap-3">
            <BookOpenIcon className="h-6 w-6 text-neon" />
            <div>
              <h3 className="text-lg font-semibold text-white">{t('Historias activas')}</h3>
              <p className="text-sm text-slate-300">{t('Prioriza por impacto y cubre criterios antes del cierre de sprint.')}</p>
            </div>
          </header>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {userStories.map((story) => (
              <article key={story.id} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{story.id}</p>
                    <p className="text-sm text-slate-200">{story.title}</p>
                  </div>
                  <StatusPill label={t(story.status)} variant={statusVariants[story.status] ?? 'info'} />
                </div>
                <p className="text-xs text-slate-300">{story.description}</p>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{t('Criterios')}</p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {story.acceptanceCriteria.map((criterion) => (
                      <li key={criterion} className="flex gap-2">
                        <span className="text-neon">✧</span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
                  {t('Test cases vinculados')}: {story.linkedTestCases.length ? story.linkedTestCases.join(', ') : t('Ninguno')}
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{t('Owner')} · {story.owner}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <div className="space-y-6">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
            <h3 className="text-lg font-semibold text-white">{t('Crear historia')}</h3>
            <p className="mt-2 text-sm text-slate-300">{t('Define título, prioridad y criterios clave.')}</p>
            <form className="mt-4 space-y-3" onSubmit={handleCreate}>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Título')}</label>
                <input
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
                  placeholder={t('Como usuario quiero...')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Descripción')}</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  className="h-20 w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
                  placeholder={t('Breve explicación del objetivo')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Prioridad')}</label>
                <select
                  value={form.priority}
                  onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
                >
                  <option value="Alta">{t('Alta')}</option>
                  <option value="Media">{t('Media')}</option>
                  <option value="Baja">{t('Baja')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Estado')}</label>
                <select
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
                >
                  <option value="To Do">{t('To Do')}</option>
                  <option value="In Progress">{t('In Progress')}</option>
                  <option value="Done">{t('Done')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Criterios de aceptación')}</label>
                <textarea
                  value={form.acceptanceCriteria}
                  onChange={(event) => setForm((prev) => ({ ...prev, acceptanceCriteria: event.target.value }))}
                  className="h-24 w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
                  placeholder={t('Cada criterio en una línea')}
                />
              </div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg">
                {t('Crear historia')}
              </button>
            </form>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
            <h3 className="text-lg font-semibold text-white">{t('Vincular test case')}</h3>
            <p className="mt-2 text-sm text-slate-300">{t('Relaciona un caso existente para asegurar cobertura.')}</p>
            <form className="mt-4 space-y-3" onSubmit={handleLink}>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Historia')}</label>
                <select
                  value={selectedStory}
                  onChange={(event) => setSelectedStory(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
                >
                  {userStories.map((story) => (
                    <option key={story.id} value={story.id}>
                      {story.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{t('Test case')}</label>
                <select
                  value={selectedTestCase}
                  onChange={(event) => setSelectedTestCase(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
                >
                  {testCases.map((testCase) => (
                    <option key={testCase.id} value={testCase.id}>
                      {testCase.id} · {testCase.title}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg">
                <LinkIcon className="h-4 w-4" /> {t('Vincular')}
              </button>
            </form>
          </motion.section>
        </div>
      </div>
    </section>
  );
};

export default UserStoriesPage;
