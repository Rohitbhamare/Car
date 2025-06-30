import React, { useState, useEffect } from 'react';
import { Car, Calendar, Fuel, Settings, MapPin, Gauge, Users, Loader } from 'lucide-react';
import { predictCarPrice, getCarMakes, getCarModels, getLocations } from '../api/carApi';

const PredictionForm = ({ onPredictionResult }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    fuel: '',
    kms_driven: '',
    transmission: '',
    owner: '',
    location: ''
  });

  const [loading, setLoading] = useState(false);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});

  const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric'];
  const transmissionTypes = ['Manual', 'Automatic'];
  const ownerTypes = ['First Owner', 'Second Owner', 'Third Owner', 'Fourth & Above Owner'];

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.make) {
      loadModels(formData.make);
    }
  }, [formData.make]);

  const loadInitialData = async () => {
    try {
      const [makesData, locationsData] = await Promise.all([
        getCarMakes(),
        getLocations()
      ]);
      setMakes(makesData.makes || []);
      setLocations(locationsData.locations || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
      // Fallback data if API is not available
      setMakes(['Maruti', 'Hyundai', 'Honda', 'Toyota', 'Tata', 'Mahindra', 'Ford', 'Volkswagen']);
      setLocations(['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Kolkata', 'Hyderabad', 'Ahmedabad']);
    }
  };

  const loadModels = async (make) => {
    try {
      const modelsData = await getCarModels(make);
      setModels(modelsData.models || []);
    } catch (error) {
      console.error('Error loading models:', error);
      // Fallback models based on make
      const fallbackModels = {
        'Maruti': ['Swift', 'Baleno', 'Alto', 'Wagon R', 'Dzire', 'Vitara Brezza'],
        'Hyundai': ['i20', 'Creta', 'Verna', 'Grand i10', 'Santro', 'Venue'],
        'Honda': ['City', 'Amaze', 'Jazz', 'WR-V', 'Civic', 'CR-V'],
        'Toyota': ['Innova', 'Fortuner', 'Corolla', 'Camry', 'Etios', 'Yaris']
      };
      setModels(fallbackModels[make] || []);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.year || formData.year < 1990 || formData.year > new Date().getFullYear()) {
      newErrors.year = 'Valid year is required';
    }
    if (!formData.fuel) newErrors.fuel = 'Fuel type is required';
    if (!formData.kms_driven || formData.kms_driven < 0) {
      newErrors.kms_driven = 'Valid kilometers driven is required';
    }
    if (!formData.transmission) newErrors.transmission = 'Transmission type is required';
    if (!formData.owner) newErrors.owner = 'Owner type is required';
    if (!formData.location) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const result = await predictCarPrice(formData);
      onPredictionResult(result);
    } catch (error) {
      console.error('Prediction error:', error);
      onPredictionResult({
        error: 'Failed to predict car price. Please try again.',
        predicted_price: null
      });
    } finally {
      setLoading(false);
    }
  };

  const FormField = ({ icon: Icon, label, name, type = "text", options = null, placeholder }) => (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <Icon className="w-4 h-4 mr-2 text-blue-600" />
        {label}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Predict Your Car's Value</h2>
        <p className="text-gray-600">Enter your car details for an AI-powered price prediction</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            icon={Car}
            label="Make"
            name="make"
            options={makes}
          />
          
          <FormField
            icon={Car}
            label="Model"
            name="model"
            options={models}
          />
          
          <FormField
            icon={Calendar}
            label="Year"
            name="year"
            type="number"
            placeholder="e.g. 2018"
          />
          
          <FormField
            icon={Fuel}
            label="Fuel Type"
            name="fuel"
            options={fuelTypes}
          />
          
          <FormField
            icon={Gauge}
            label="Kilometers Driven"
            name="kms_driven"
            type="number"
            placeholder="e.g. 45000"
          />
          
          <FormField
            icon={Settings}
            label="Transmission"
            name="transmission"
            options={transmissionTypes}
          />
          
          <FormField
            icon={Users}
            label="Owner Type"
            name="owner"
            options={ownerTypes}
          />
          
          <FormField
            icon={MapPin}
            label="Location"
            name="location"
            options={locations}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Predicting Price...
            </>
          ) : (
            'Predict Price'
          )}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;