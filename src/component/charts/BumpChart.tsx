import { ResponsiveAreaBump } from "@nivo/bump";

const BumpChart = () => {
  const data = [
    {
      id: "JavaScript",
      data: [
        {
          x: 2000,
          y: 11,
        },
        {
          x: 2001,
          y: 15,
        },
        {
          x: 2002,
          y: 12,
        },
        {
          x: 2003,
          y: 29,
        },
        {
          x: 2004,
          y: 19,
        },
        {
          x: 2005,
          y: 24,
        },
      ],
    },
    {
      id: "ReasonML",
      data: [
        {
          x: 2000,
          y: 19,
        },
        {
          x: 2001,
          y: 12,
        },
        {
          x: 2002,
          y: 26,
        },
        {
          x: 2003,
          y: 10,
        },
        {
          x: 2004,
          y: 16,
        },
        {
          x: 2005,
          y: 14,
        },
      ],
    },
    {
      id: "TypeScript",
      data: [
        {
          x: 2000,
          y: 18,
        },
        {
          x: 2001,
          y: 24,
        },
        {
          x: 2002,
          y: 14,
        },
        {
          x: 2003,
          y: 20,
        },
        {
          x: 2004,
          y: 13,
        },
        {
          x: 2005,
          y: 27,
        },
      ],
    },
    {
      id: "Elm",
      data: [
        {
          x: 2000,
          y: 12,
        },
        {
          x: 2001,
          y: 26,
        },
        {
          x: 2002,
          y: 11,
        },
        {
          x: 2003,
          y: 19,
        },
        {
          x: 2004,
          y: 22,
        },
        {
          x: 2005,
          y: 30,
        },
      ],
    },
    {
      id: "CoffeeScript",
      data: [
        {
          x: 2000,
          y: 14,
        },
        {
          x: 2001,
          y: 11,
        },
        {
          x: 2002,
          y: 19,
        },
        {
          x: 2003,
          y: 23,
        },
        {
          x: 2004,
          y: 16,
        },
        {
          x: 2005,
          y: 22,
        },
      ],
    },
  ];
  return (
    <ResponsiveAreaBump
      data={data}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      spacing={8}
      colors={{ scheme: "pastel1" }}
      blendMode="multiply"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "CoffeeScript",
          },
          id: "dots",
        },
        {
          match: {
            id: "TypeScript",
          },
          id: "lines",
        },
      ]}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -36,
        truncateTickAt: 0,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
    />
  );
};

export default BumpChart;
