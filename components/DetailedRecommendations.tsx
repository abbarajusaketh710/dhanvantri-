import React, { useState } from 'react';
import { FullRecommendation, DietMeal } from '../types';
import { Utensils, Dumbbell, Moon, Clock, Flame, ShieldAlert } from 'lucide-react';

interface Props {
  recommendations: FullRecommendation;
}

const DetailedRecommendations: React.FC<Props> = ({ recommendations }) => {
  const [activeTab, setActiveTab] = useState<'diet' | 'workout' | 'lifestyle'>('diet');

  const { diet, workout, lifestyle } = recommendations;

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden shadow-2xl mt-8">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
            onClick={() => setActiveTab('diet')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'diet' ? 'bg-gray-800/80 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'}`}
        >
            <div className="flex items-center justify-center space-x-2">
                <Utensils className="w-5 h-5" />
                <span>Diet Plan</span>
            </div>
        </button>
        <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'workout' ? 'bg-gray-800/80 text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'}`}
        >
             <div className="flex items-center justify-center space-x-2">
                <Dumbbell className="w-5 h-5" />
                <span>Workout</span>
            </div>
        </button>
        <button
            onClick={() => setActiveTab('lifestyle')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'lifestyle' ? 'bg-gray-800/80 text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'}`}
        >
             <div className="flex items-center justify-center space-x-2">
                <Moon className="w-5 h-5" />
                <span>Lifestyle</span>
            </div>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 animate-fade-in">
        
        {/* Diet Tab */}
        {activeTab === 'diet' && (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800/40 p-4 rounded-xl border border-gray-700">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{diet.type}</h3>
                        <p className="text-cyan-400 font-medium">Daily Target: {diet.calories} kcal</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                        {diet.restrictions.map((r, i) => (
                            <span key={i} className="px-2 py-1 text-xs bg-red-900/30 text-red-300 rounded border border-red-800">No {r}</span>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {(Object.entries(diet.meals) as [string, DietMeal][]).map(([key, meal]) => (
                        <div key={key} className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
                            <h4 className="text-lg font-semibold text-gray-200 capitalize mb-2">{meal.name}</h4>
                            <ul className="list-disc list-inside text-gray-300 mb-2">
                                {meal.food.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                            <p className="text-sm text-gray-500 italic">Tip: {meal.notes}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Workout Tab */}
        {activeTab === 'workout' && (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-900/40 to-gray-900 p-4 rounded-xl border border-emerald-800/30 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-white">Level: {workout.level}</h3>
                        <p className="text-emerald-400">{workout.frequency} • {workout.durationPerSession}/session</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {workout.exercises.map((ex, i) => (
                        <div key={i} className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 hover:border-emerald-500/50 transition">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-semibold text-gray-200">{ex.name}</h4>
                                <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">{ex.type}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {ex.duration}</span>
                                <span className="flex items-center"><Flame className="w-3 h-3 mr-1"/> {ex.intensity}</span>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{ex.description}</p>
                            <p className="text-xs text-emerald-400/80">Benefit: {ex.benefits}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/50">
                    <h4 className="flex items-center text-yellow-500 font-semibold mb-2">
                        <ShieldAlert className="w-4 h-4 mr-2" /> Safety Guidelines
                    </h4>
                    <ul className="list-disc list-inside text-sm text-yellow-200/70">
                        {workout.safetyGuidelines.map((g, i) => <li key={i}>{g}</li>)}
                    </ul>
                </div>
            </div>
        )}

        {/* Lifestyle Tab */}
        {activeTab === 'lifestyle' && (
            <div className="space-y-6">
                {lifestyle.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">No major lifestyle changes required. Keep up the good work!</div>
                ) : (
                    lifestyle.map((change, i) => (
                        <div key={i} className="flex flex-col md:flex-row bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700">
                             <div className="bg-gray-800 p-4 md:w-48 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-gray-700">
                                <span className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-1">{change.category}</span>
                                <span className="text-xs text-gray-500">{change.timeline}</span>
                             </div>
                             <div className="p-5 flex-1">
                                <h4 className="text-lg font-bold text-white mb-2">{change.title}</h4>
                                <p className="text-gray-300 text-sm mb-4">{change.description}</p>
                                <div>
                                    <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Action Steps</h5>
                                    <ul className="space-y-1">
                                        {change.actionSteps.map((step, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-300">
                                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             </div>
                        </div>
                    ))
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default DetailedRecommendations;