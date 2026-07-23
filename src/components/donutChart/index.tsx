import React from "react";
import { View, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

import { styles } from "./style";

interface CategoryData {
    category: string;
    amount: number;
    percentage: number;
}

interface DonutChartProps {
    data: CategoryData[];
    colors: string[];
    totalAmount: number;
    size?: number;
    strokeWidth?: number;
}

export function DonutChart({
    data,
    colors,
    totalAmount,
    size = 170,
    strokeWidth = 20,
}: DonutChartProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedAngle = 0;

    const formatCurrency = (val: number) =>
        val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    {/* Trilha de fundo escura */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#1A2733"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />

                    {/* Arcos circulares de cada categoria */}
                    {data.map((item, index) => {
                        if (item.percentage <= 0) return null;

                        const strokeDashoffset =
                            circumference - (circumference * item.percentage) / 100;
                        const rotation = (accumulatedAngle * 360) / 100;

                        accumulatedAngle += item.percentage;

                        return (
                            <Circle
                                key={item.category}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                stroke={colors[index % colors.length]}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
                            />
                        );
                    })}
                </G>
            </Svg>

            {/* Centro da Rosca com Total e Quantidade de Categorias */}
            <View style={styles.centerContainer}>
                <Text style={styles.centerSubtext}>Total Gasto</Text>
                <Text style={styles.centerText}>{formatCurrency(totalAmount)}</Text>
                <Text style={styles.centerCategoryCount}>
                    {data.length} {data.length === 1 ? "categoria" : "categorias"}
                </Text>
            </View>
        </View>
    );
}