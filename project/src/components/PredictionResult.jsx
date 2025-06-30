import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, IndianRupee, BarChart3 } from 'lucide-react';

const PredictionResult = ({ result }) => {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-1">Prediction Error</h3>
            <p className="text-red-600">{result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 mt-8 border border-emerald-200/50 shadow-lg">
      <div className="text-center mb-6">
        <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Price Prediction Complete</h3>
        <p className="text-gray-600">Based on market analysis and ML algorithms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center">
          <IndianRupee className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Predicted Price</h4>
          <p className="text-3xl font-bold text-blue-600">{result.predicted_price}</p>
        </div>

        {result.confidence && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center">
            <BarChart3 className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Confidence Range</h4>
            <p className="text-2xl font-bold text-emerald-600">{result.confidence}</p>
          </div>
        )}
      </div>

      {result.market_analysis && (
        <div className="mt-6 p-4 bg-white/50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Market Analysis
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {result.market_analysis.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          * This prediction is based on historical data and market trends. Actual selling price may vary based on condition, negotiation, and local market factors.
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;