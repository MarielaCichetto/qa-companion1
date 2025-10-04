const StatsCard = ({ title, value, accent = 'text-indigo-500' }) => (
  <div className="bg-white shadow rounded p-6">
    <p className="text-sm text-slate-500">{title}</p>
    <p className={`text-2xl font-semibold mt-2 ${accent}`}>{value}</p>
  </div>
);

export default StatsCard;
