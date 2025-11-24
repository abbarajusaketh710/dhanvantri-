
import React, { useEffect, useState } from 'react';
import { HealthData, OverallRiskAssessment, RiskLevel } from '../types';
import DetailedRecommendations from './DetailedRecommendations';
import { getDetailedRecommendations } from '../utils/recommendationEngine';
import { AlertTriangle, Heart, Activity, Droplets, MapPin, Download, RefreshCcw, ChevronDown, CheckCircle } from 'lucide-react';

interface Props {
  data: HealthData;
  risk: OverallRiskAssessment;
  onReset: () => void;
  onFindClinics: () => void;
}

const RiskDashboard: React.FC<Props> = ({ data, risk, onReset, onFindClinics }) => {
  const [showDetails, setShowDetails] = useState(false);
  const recommendations = getDetailedRecommendations(risk, data);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.Low: return 'text-emerald-400 stroke-emerald-500';
      case RiskLevel.Moderate: return 'text-yellow-400 stroke-yellow-500';
      case RiskLevel.High: return 'text-orange-400 stroke-orange-500';
      case RiskLevel.VeryHigh: return 'text-red-500 stroke-red-500';
      default: return 'text-gray-400 stroke-gray-400';
    }
  };
  
  const getRiskBadgeColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.Low: return 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30';
      case RiskLevel.Moderate: return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30';
      case RiskLevel.High: return 'bg-orange-900/30 text-orange-400 border-orange-500/30';
      case RiskLevel.VeryHigh: return 'bg-red-900/30 text-red-400 border-red-500/30';
      default: return 'bg-gray-800 text-gray-400';
    }
  };

  const downloadJSON = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({ profile: data, riskAssessment: risk, detailedPlan: recommendations }, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `dhanvantri_health_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Circular Progress Component
  const CircularProgress = ({ score, level }: { score: number, level: RiskLevel }) => {
      const radius = 60;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (score / 100) * circumference;
      const colorClass = getRiskColor(level);

      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-800"
                />
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`${colorClass} transition-all duration-1000 ease-out`}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-5xl font-bold ${colorClass.split(' ')[0]}`}>{score}</span>
                <span className="text-gray-400 text-sm mt-1">/ 100 Risk</span>
            </div>
        </div>
      );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in-up">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Health Analysis Report</h1>
          <p className="text-gray-400 mt-1">Generated for <span className="text-white">{data.personalInfo.age}yo {data.personalInfo.gender}</span> • {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button onClick={downloadJSON} className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition border border-gray-600 shadow-lg">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
           <button onClick={onReset} className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition border border-gray-600 shadow-lg">
            <RefreshCcw className="w-4 h-4 mr-2" /> New Assessment
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Score Card */}
        <div className="col-span-1 md:col-span-1 bg-gray-900/40 border border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
            <h3 className="text-lg font-medium text-gray-300 mb-6 uppercase tracking-wider">Overall Health Risk</h3>
            <CircularProgress score={risk.overall.score} level={risk.overall.level} />
            <div className={`mt-6 px-4 py-2 rounded-full border ${getRiskBadgeColor(risk.overall.level)} font-bold uppercase tracking-wide text-sm`}>
                {risk.overall.level} Risk Profile
            </div>
        </div>

        {/* Detailed Risks Cards */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Diabetes */}
            <div className="bg-gray-800/40 border border-gray-700 p-5 rounded-2xl flex flex-col justify-between hover:bg-gray-800/60 transition duration-300">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-blue-900/20 rounded-lg">
                        <Droplets className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className={`text-sm font-bold px-2 py-1 rounded border ${getRiskBadgeColor(risk.diabetes.level)}`}>{risk.diabetes.level}</span>
                </div>
                <div>
                    <h4 className="text-gray-300 font-medium mb-1">Diabetes Risk</h4>
                    <div className="flex items-end space-x-2">
                        <span className="text-2xl font-bold text-white">{risk.diabetes.score}</span>
                        <span className="text-sm text-gray-500 mb-1">/ 100</span>
                    </div>
                    <div className="w-full bg-gray-700 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${risk.diabetes.score}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Hypertension */}
            <div className="bg-gray-800/40 border border-gray-700 p-5 rounded-2xl flex flex-col justify-between hover:bg-gray-800/60 transition duration-300">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-purple-900/20 rounded-lg">
                        <Activity className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className={`text-sm font-bold px-2 py-1 rounded border ${getRiskBadgeColor(risk.hypertension.level)}`}>{risk.hypertension.level}</span>
                </div>
                <div>
                    <h4 className="text-gray-300 font-medium mb-1">Hypertension Risk</h4>
                     <div className="flex items-end space-x-2">
                        <span className="text-2xl font-bold text-white">{risk.hypertension.score}</span>
                        <span className="text-sm text-gray-500 mb-1">/ 100</span>
                    </div>
                    <div className="w-full bg-gray-700 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${risk.hypertension.score}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Cardiovascular */}
            <div className="bg-gray-800/40 border border-gray-700 p-5 rounded-2xl flex flex-col justify-between hover:bg-gray-800/60 transition duration-300">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-red-900/20 rounded-lg">
                        <Heart className="w-6 h-6 text-red-400" />
                    </div>
                    <span className={`text-sm font-bold px-2 py-1 rounded border ${getRiskBadgeColor(risk.cardiovascular.level)}`}>{risk.cardiovascular.level}</span>
                </div>
                <div>
                    <h4 className="text-gray-300 font-medium mb-1">Heart Disease Risk</h4>
                     <div className="flex items-end space-x-2">
                        <span className="text-2xl font-bold text-white">{risk.cardiovascular.score}</span>
                        <span className="text-sm text-gray-500 mb-1">/ 100</span>
                    </div>
                    <div className="w-full bg-gray-700 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${risk.cardiovascular.score}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Key Factors Analysis */}
            <div className="col-span-1 sm:col-span-3 bg-gray-800/30 border border-gray-700/50 p-6 rounded-2xl mt-2">
                <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    identified Risk Drivers
                </h4>
                <div className="flex flex-wrap gap-3">
                    {risk.overall.factors.length > 0 ? (
                        risk.overall.factors.map((factor, i) => (
                            <span key={i} className="px-4 py-2 bg-gray-700/50 text-gray-200 text-sm rounded-lg border border-gray-600 hover:border-cyan-500/50 transition">
                                {factor}
                            </span>
                        ))
                    ) : (
                        <span className="text-emerald-400 text-sm italic flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            No significant negative risk factors identified. Great job!
                        </span>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Action Banner */}
      <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-sm z-0"></div>
        <div className="mb-6 md:mb-0 relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">Connect with Specialists</h3>
            <p className="text-blue-200">
                Based on your {risk.overall.level} risk profile, we recommend consulting a specialist near <span className="text-white font-medium">{data.personalInfo.location || 'your area'}</span>.
            </p>
        </div>
        <button 
            onClick={onFindClinics}
            className="relative z-10 flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition transform hover:-translate-y-1"
        >
            <MapPin className="w-5 h-5 mr-2" /> Find Clinics Nearby
        </button>
      </div>

      <div className="flex items-center justify-center py-4">
        <ChevronDown className="w-6 h-6 text-gray-600 animate-bounce" />
      </div>

      {/* Detailed Recommendations */}
      <DetailedRecommendations recommendations={recommendations} />

    </div>
  );
};

export default RiskDashboard;
