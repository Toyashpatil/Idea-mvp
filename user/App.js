import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className="bg-slate-400 flex items-center justify-center h-[100vh] w-[100vw] ">
      <Text className=" text-red-500 " >Open up App.js helloooo to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
