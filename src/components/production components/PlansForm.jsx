import { useState } from 'react';

export  function PlansForm({ onCancel ,setProductionPlans,productionPlans}) {
  const [form, setForm] = useState({
    asset: '',
    unit: 'barrels/day',
    plannedVolume: '',
    startDate: '',
    endDate: ''
  });

  const handleSubmit = () => {
    const payload = {
      assetId: form.asset,
      plannedVolume: Number(form.plannedVolume),
      unit: form.unit,
      startDate: form.startDate,
      endDate: form.endDate
    };
    // setProductionPlans(...productionPlans,payload);

    console.log('Plan Payload:', payload);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
  <h3 className="text-xl font-bold text-black mb-6 border-b border-gray-100 pb-4">
    Create Production Plan
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

    {/* Planned Volume */}
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
        Planned Volume
      </label>
      <input
        type="number"
        placeholder="e.g., 5000"
        value={form.plannedVolume}
        onChange={(e) => setForm({ ...form, plannedVolume: e.target.value })}
        className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg
                   focus:bg-white focus:border-black focus:ring-0 transition-all"
      />
    </div>

    {/* Start Date */}
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
        Start Date
      </label>
      <input
        type="date"
        value={form.startDate}
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg
                   focus:bg-white focus:border-black focus:ring-0 transition-all"
      />
    </div>

    {/* End Date */}
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
        End Date
      </label>
      <input
        type="date"
        value={form.endDate}
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg
                   focus:bg-white focus:border-black focus:ring-0 transition-all"
      />
    </div>

    {/* Unit */}
    <div className="md:col-span-2">
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
        Unit
      </label>
      <select
        value={form.unit}
        onChange={(e) => setForm({ ...form, unit: e.target.value })}
        className="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-lg
                   focus:border-black focus:ring-0 transition-all appearance-none cursor-pointer"
      >
        <option value="barrels/day">Barrels per Day</option>
        <option value="barrels">Barrels</option>
      </select>
    </div>
  </div>

  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
    <button
      onClick={handleSubmit}
      className="flex-1 md:flex-none px-8 py-3 bg-black text-white font-bold rounded-lg
                 hover:bg-gray-800 active:bg-gray-900 transition-all shadow-lg shadow-gray-200"
    >
      Create Plan
    </button>
    <button
      onClick={onCancel}
      className="flex-1 md:flex-none px-8 py-3 bg-white text-black font-bold rounded-lg
                 border-2 border-black hover:bg-gray-50 transition-all"
    >
      Cancel
    </button>
  </div>
</div>
    </>
  );
}