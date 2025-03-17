import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react-native';

const DkycOne = () => {
  const [selectedOption, setSelectedOption] = useState('Send and manage money');

  const options = [
    'Spend or save daily',
    'Spend while travelling',
    'Send and manage money',
    'Gain exposure to financial assets',
    'Others',
  ];

  return (
    <View className="flex-1 bg-white px-5 py-10">
      <Text className="text-2xl font-bold">Get started</Text>
      <Text className="text-gray-500 mt-2">Tell us the main reason for using the FintechX application please.</Text>
      
      <View className="mt-5 space-y-3">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`border rounded-lg px-4 py-4 flex-row items-center ${selectedOption === option ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
            onPress={() => setSelectedOption(option)}
          >
            <View className={`w-6 h-6 rounded border flex items-center justify-center mr-3 ${selectedOption === option ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`}>
              {selectedOption === option && <CheckIcon color="white" size={14} />}
            </View>
            <Text className="text-gray-900">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between mt-10">
        <TouchableOpacity className="px-5 py-3 border border-gray-300 rounded-lg">
          <Text className="text-gray-700">SKIP</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-5 py-3 bg-blue-600 rounded-lg">
          <Text className="text-white">CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DkycOne;
