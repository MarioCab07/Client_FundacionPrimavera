import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#42A5F5",
  "#EC407A",
  "#66BB6A",
  "#FFA726",
  "#AB47BC",
  "#26C6DA",
  "#FF7043",
  "#9CCC65",
];

const LABEL_MAP = {
  M: "Hombres",
  F: "Mujeres",
  true: "Sí",
  false: "No",
};

const DynamicBarChart = ({ data, field1, field2 }) => {
  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center" }}>No hay datos disponibles</p>;
  }

  // 1) Crear una clave de etiqueta para el eje X, siempre string (“Sí/No”, etc.)
  const xLabelKey = `${field2}__label`;
  const prepared = data.map((d) => ({
    ...d,
    [xLabelKey]:
      d[field2] === true
        ? "Sí"
        : d[field2] === false
        ? "No"
        : String(d[field2]),
  }));

  // 2) Categorías = todas las claves salvo las del eje X (valor original y etiqueta)
  const categories = Array.from(
    new Set(
      prepared.flatMap((d) =>
        Object.keys(d).filter((k) => k !== field2 && k !== xLabelKey)
      )
    )
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={prepared}>
        <XAxis dataKey={xLabelKey} />
        <YAxis allowDecimals={false} />
        <Tooltip
          formatter={(value, name) => [value, LABEL_MAP[String(name)] ?? name]}
        />
        <Legend formatter={(value) => LABEL_MAP[String(value)] ?? value} />
        {categories.map((cat, index) => (
          <Bar
            key={cat}
            dataKey={cat}
            fill={COLORS[index % COLORS.length]}
            name={LABEL_MAP[String(cat)] ?? cat}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DynamicBarChart;
