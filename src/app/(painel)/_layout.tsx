import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../constants/Colors';


export default function PainelLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.blue,
                tabBarInactiveTintColor: colors.grayStrong,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopWidth: 1,
                    borderTopColor: colors.gray,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
                    paddingTop: 5,
                    height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="tarefas"
                options={{
                    tabBarLabel: 'Tarefas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-outline" size={size = 34} color={color === colors.blue ? colors.green : color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="listacompra"
                options={{
                    tabBarLabel: 'Lista de Compras',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" size={size = 34} color={color === colors.blue ? colors.green : color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="senha"
                options={{
                    tabBarLabel: 'Senha',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="lock-closed-outline" size={size = 34} color={color === colors.blue ? colors.green : color} />
                    ),
                }}
            />
        </Tabs>
    );
}
