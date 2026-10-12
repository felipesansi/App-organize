import React from "react";
import { View, Text, Pressable } from "react-native";
import { estilosGlobais as styles } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import { router } from "expo-router";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};
export default function Header({ title, showBackButton = false }: HeaderProps) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            {showBackButton && (
                <Pressable
                    onPress={() => router.back()}
                    style={{ padding: 4, marginRight: 12 }}
                    accessibilityRole="button"
                    accessibilityLabel="Voltar"
                >
                    <Ionicons name="arrow-back" size={24} color={colors.Texto} />
                </Pressable>
            )}
            <Text style={styles.textoBold}>{title}</Text>
        </View>
    );
}
