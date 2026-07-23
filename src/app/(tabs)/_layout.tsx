import React, { useEffect, useRef } from "react";
import { Tabs } from "expo-router";
import { View, StyleSheet, Platform, Animated } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

function AnimatedTabIcon({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.18 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      {children}
    </Animated.View>
  );
}

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
          elevation: 0,
          shadowOpacity: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 85 : 65,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 10,
        },
      }}
    >
      {/* 1. Aba Início */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Feather name="home" size={size} color={color} />
            </AnimatedTabIcon>
          ),
        }}
      />

      {/* 2. Aba Relatórios */}
      <Tabs.Screen
        name="reports/index"
        options={{
          title: "Relatórios",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Entypo name="circular-graph" size={size} color={color} />
            </AnimatedTabIcon>
          ),
        }}
      />

      {/* 3. Botão Central de Adicionar (+) */}
      <Tabs.Screen
        name="add/index"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon focused={focused}>
              <View style={styles.addButton}>
                <Feather name="plus" size={28} color={colors.gray[950]} />
              </View>
            </AnimatedTabIcon>
          ),
        }}
      />

      {/* 4. Aba Fixos */}
      <Tabs.Screen
        name="fixed/index"
        options={{
          title: "Fixos",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Feather name="repeat" size={size} color={color} />
            </AnimatedTabIcon>
          ),
        }}
      />

      {/* 5. Aba Perfil */}
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Feather name="user" size={size} color={color} />
            </AnimatedTabIcon>
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
    borderRadius: 50,
    backgroundColor: colors.gray[100],
    justifyContent: "center",
    alignItems: "center",
    top: Platform.OS === "ios" ? -13 : -10,
    shadowColor: colors.gray[500],
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 20,
  },
});