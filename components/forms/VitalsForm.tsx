import React from 'react';
import { VitalsData } from '../../types';

interface Props {
  data: VitalsData;
  updateData: (data: Partial<VitalsData>) => void;
}

const VitalsForm: React.FC<Props> = ({ data, updateData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value ? Number(value) : undefined });
  };

  const getIndicator = (val: number | undefined, min: number, max: number) => {
      if (!val) return null;
      if (val < min) return <span className="text-xs text-blue-400">Low</span>;
      if (val > max) return <span className="text-xs text-red-400">High</span>;
      return <span className="text-xs text-emerald-400">Normal</span>;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">Vitals (Optional)</h2>
      <p className="text-gray-400 text-sm mb-4">Enter recent readings if available. Leave blank if unknown.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-300">Systolic BP (mmHg)</label>
            {getIndicator(data.systolicBP, 90, 120)}
          </div>
          <input
            type="number"
            name="systolicBP"
            value={data.systolicBP || ''}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white outline-none focus:border-cyan-500"
            placeholder="e.g. 120"
          />
        </div>

        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
           <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-300">Diastolic BP (mmHg)</label>
             {getIndicator(data.diastolicBP, 60, 80)}
          </div>
          <input
            type="number"
            name="diastolicBP"
            value={data.diastolicBP || ''}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white outline-none focus:border-cyan-500"
            placeholder="e.g. 80"
          />
        </div>

        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
           <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-300">Resting Heart Rate (bpm)</label>
            {getIndicator(data.heartRate, 60, 100)}
          </div>
          <input
            type="number"
            name="heartRate"
            value={data.heartRate || ''}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white outline-none focus:border-cyan-500"
            placeholder="e.g. 72"
          />
        </div>

        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
           <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-300">Fasting Glucose (mg/dL)</label>
            {getIndicator(data.glucose, 70, 99)}
          </div>
          <input
            type="number"
            name="glucose"
            value={data.glucose || ''}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white outline-none focus:border-cyan-500"
            placeholder="e.g. 90"
          />
        </div>

        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
           <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-300">Total Cholesterol (mg/dL)</label>
            {getIndicator(data.cholesterol, 125, 200)}
          </div>
          <input
            type="number"
            name="cholesterol"
            value={data.cholesterol || ''}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white outline-none focus:border-cyan-500"
            placeholder="e.g. 180"
          />
        </div>
      </div>
    </div>
  );
};

export default VitalsForm;
