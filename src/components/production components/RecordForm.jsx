import { useState } from 'react';

export function RecordForm({ onCancel }) {
  const [form, setForm] = useState({
    asset: '',
    unit: 'barrels',
    actualVolume: '',
    date: ''
  });

  const handleSubmit = () => {
    const payload = {
      assetId: form.asset,
      actualVolume: Number(form.actualVolume),
      unit: form.unit,
      date: form.date
    };

    console.log('Record Payload:', payload);
    // axios.post('/api/records', payload)
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-black mb-6 border-b border-gray-100 pb-4">
          Add Production Record
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Asset */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Asset
            </label>
            <select
              value={form.asset}
              onChange={(e) => setForm({ ...form, asset: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-lg text-gray-900
                   focus:border-black focus:ring-0 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Asset</option>
              <option value="RIG-001">RIG-001 - North Sea Rig Alpha</option>
              <option value="RIG-002">RIG-002 - West Texas Rig Beta</option>
            </select>
          </div>

          {/* Actual Volume */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Actual Volume
            </label>
            <input
              type="number"
              placeholder="e.g., 4980"
              value={form.actualVolume}
              onChange={(e) => setForm({ ...form, actualVolume: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg
                   focus:bg-white focus:border-black focus:ring-0 transition-all"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg
                   focus:bg-white focus:border-black focus:ring-0 transition-all"
            />
          </div>

          {/* Unit */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Unit
            </label>
            <select
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-lg
                   focus:border-black focus:ring-0 transition-all appearance-none cursor-pointer"
            >
              <option value="barrels">Barrels</option>
              <option value="mcf">MCF (Natural Gas)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={handleSubmit}
            className="flex-1 md:flex-none px-8 py-3 bg-black text-white font-bold rounded-lg
                 hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg shadow-gray-200"
          >
            Add Record
          </button>
          <button
            onClick={onCancel}
            className="flex-1 md:flex-none px-8 py-3 bg-white text-black font-bold rounded-lg
                 border-2 border-black hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}