import React, { useState } from 'react';
import { Sparkles, Brain, TrendingUp } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';

function App() {
  const [predictionResult, setPredictionResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2 mr-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">CarPredict</h1>
                <p className="text-sm text-gray-600">AI-Powered Price Intelligence</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-600">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                Machine Learning Powered
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                Real-time Market Analysis
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Discover Your Car's
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> True Value</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Leverage advanced machine learning algorithms trained on thousands of car sales to get accurate, real-time price predictions for your used car.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="text-3xl font-bold text-blue-600 mb-2">20K+</div>
              <div className="text-gray-600">Cars Analyzed</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="text-3xl font-bold text-emerald-600 mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600">Predictions Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <PredictionForm onPredictionResult={setPredictionResult} />
        <PredictionResult result={predictionResult} />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 CarPredict. Powered by Machine Learning & Real Market Data.</p>
            <p className="text-sm">Built with React, Python Flask, and advanced ML algorithms for accurate price predictions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;