import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-slate-800 mb-4">
        CCDORADA App
      </Text>
      <Text className="text-lg text-slate-600 mb-8 text-center">
        Aplicación multiplataforma (Android, iOS, Web) con Expo y React Native.
      </Text>
      <View className="bg-blue-500 px-6 py-3 rounded-lg">
        <Link href="/" className="text-white font-semibold text-base">
          ¡Comenzar!
        </Link>
      </View>
      <View className="mt-12 flex-row gap-4">
        <View className="bg-green-100 px-4 py-2 rounded-md">
          <Text className="text-green-700 font-medium">✓ Android</Text>
        </View>
        <View className="bg-blue-100 px-4 py-2 rounded-md">
          <Text className="text-blue-700 font-medium">✓ iOS</Text>
        </View>
        <View className="bg-purple-100 px-4 py-2 rounded-md">
          <Text className="text-purple-700 font-medium">✓ Web</Text>
        </View>
      </View>
    </View>
  );
}
