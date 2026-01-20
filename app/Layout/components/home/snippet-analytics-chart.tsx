import { PieChart } from "@mui/x-charts/PieChart";

const settings = {
  width: 200,
  height: 200,
  hideLegend: true,
};

const languageColors: Record<string, string> = {
  javascript: "#facc15",
  typescript: "#60a5fa",
  python: "#4ade80",
  java: "#f87171",
  cpp: "#c084fc",
  go: "#22d3ee",
};

type SnippetAnalyticsChartProps = {
  language: [string, number][];
  totalSnippets: number;
};

const SnippetAnalyticsChart = ({
  language,
  totalSnippets,
}: SnippetAnalyticsChartProps) => {
  const data = language.map(([lang, count], index) => ({
    id: index,
    value: count,
    label: lang,
    color: languageColors[lang] ?? "#6b7280",
  }));

  console.log(data);

  return (

    <PieChart
      series={[
        {
          data,
          arcLabel: (item) =>
            `${Math.round((item.value / totalSnippets) * 100)}%`,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { additionalRadius: -20, color: "gray" },
          arcLabelMinAngle: 35,

          innerRadius: 30,
          arcLabelRadius: "65%",
        },
      ]}
      {...settings}
      sx={{
        "& .MuiPieArc-root": {
          stroke: "none",
          strokeWidth: 0,
        },
        "& .MuiChartsArcTooltip-root": {
          background: "#212224",
          borderRadius: "8px",
          padding: "4px 8px",
          fontFamily: "var(--font-poppins)",
          fontSize: "12px",
          color: "#ffff",
        },
        "& .MuiChartsArcLabel-root": {
          fontFamily: "var(--font-poppins)",
          fontSize: "12px",
          fill: "#ffff",
          fontWeight: "bold",
          textTransform: "uppercase",
        },
      }}
    />

  );
};

export default SnippetAnalyticsChart;
