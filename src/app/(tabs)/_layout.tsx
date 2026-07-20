import { Tabs } from "expo-router";
import { View, StyleSheet, Platform } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.green[300],
                tabBarInactiveTintColor: colors.gray[400],
                tabBarStyle: {
                    backgroundColor: colors.gray[900], 
                    borderTopWidth: 0,
                    height: Platform.OS === "ios" ? 85 : 65,
                    paddingBottom: Platform.OS === "ios" ? 30 : 10,
                    paddingTop: 10,
                },
            }}
        >
            {/* 1. Aba Início */}
            <Tabs.Screen
                name="home"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" size={size} color={color} />
                    ),
                }}
            />

            {/* 2. Aba Relatórios */}
            <Tabs.Screen
                name="reports"
                options={{
                    title: "Relatórios",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="circular-graph" size={size} color={color} />
                    ),
                }}
            />

            {/* 3. Botão Central de Adicionar (+) */}
            <Tabs.Screen
                name="add"
                options={{
                    title: "",
                    tabBarIcon: () => (
                        <View style={styles.addButton}>
                            <Feather name="plus" size={28} color="#000000" />
                        </View>
                    ),
                }}
            />

            {/* 4. Aba Fixos */}
            <Tabs.Screen
                name="fixed"
                options={{
                    title: "Fixos",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="repeat" size={size} color={color} />
                    ),
                }}
            />

            {/* 5. Aba Perfil */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    addButton: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#FFFFFF", // Círculo branco igual ao layout
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Platform.OS === "ios" ? 25 : 20, // Faz o botão saltar levemente para cima
        // Sombra para dar profundidade
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});