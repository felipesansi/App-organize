import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';

import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export default function RouterLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(painel)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(auth)/cadastro/page"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(auth)/login/page"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(auth)/splash/page"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/password/page"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}