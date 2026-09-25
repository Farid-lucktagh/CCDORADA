import { View, Text, ActivityIndicator } from 'react-native';

export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-50">
      <View className="mb-8">
        <Text className="text-4xl font-bold text-blue-800">CCDORADA</Text>
      </View>
      <ActivityIndicator size="large" color="#1e40af" />
      <Text className="mt-6 text-base text-slate-600">
        Cargando...
      </Text>
    </View>
  );
}
