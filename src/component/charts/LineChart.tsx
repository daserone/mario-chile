import { ResponsiveLine } from "@nivo/line";

const LineChart = () => {
  //   [
  //     {
  //       id: "japan",
  //       color: "hsl(165, 70%, 50%)",
  //       data: [
  //         {
  //           x: "plane",
  //           y: 282,
  //         },
  //         {
  //           x: "helicopter",
  //           y: 79,
  //         },
  //         {
  //           x: "boat",
  //           y: 193,
  //         },
  //         {
  //           x: "train",
  //           y: 232,
  //         },
  //         {
  //           x: "subway",
  //           y: 169,
  //         },
  //         {
  //           x: "bus",
  //           y: 226,
  //         },
  //         {
  //           x: "car",
  //           y: 73,
  //         },
  //         {
  //           x: "moto",
  //           y: 56,
  //         },
  //         {
  //           x: "bicycle",
  //           y: 127,
  //         },
  //         {
  //           x: "horse",
  //           y: 125,
  //         },
  //         {
  //           x: "skateboard",
  //           y: 46,
  //         },
  //         {
  //           x: "others",
  //           y: 74,
  //         },
  //       ],
  //     },
  //     {
  //       id: "france",
  //       color: "hsl(142, 70%, 50%)",
  //       data: [
  //         {
  //           x: "plane",
  //           y: 55,
  //         },
  //         {
  //           x: "helicopter",
  //           y: 180,
  //         },
  //         {
  //           x: "boat",
  //           y: 216,
  //         },
  //         {
  //           x: "train",
  //           y: 178,
  //         },
  //         {
  //           x: "subway",
  //           y: 296,
  //         },
  //         {
  //           x: "bus",
  //           y: 3,
  //         },
  //         {
  //           x: "car",
  //           y: 240,
  //         },
  //         {
  //           x: "moto",
  //           y: 28,
  //         },
  //         {
  //           x: "bicycle",
  //           y: 42,
  //         },
  //         {
  //           x: "horse",
  //           y: 120,
  //         },
  //         {
  //           x: "skateboard",
  //           y: 116,
  //         },
  //         {
  //           x: "others",
  //           y: 256,
  //         },
  //       ],
  //     },
  //     {
  //       id: "us",
  //       color: "hsl(6, 70%, 50%)",
  //       data: [
  //         {
  //           x: "plane",
  //           y: 138,
  //         },
  //         {
  //           x: "helicopter",
  //           y: 130,
  //         },
  //         {
  //           x: "boat",
  //           y: 295,
  //         },
  //         {
  //           x: "train",
  //           y: 145,
  //         },
  //         {
  //           x: "subway",
  //           y: 115,
  //         },
  //         {
  //           x: "bus",
  //           y: 150,
  //         },
  //         {
  //           x: "car",
  //           y: 243,
  //         },
  //         {
  //           x: "moto",
  //           y: 51,
  //         },
  //         {
  //           x: "bicycle",
  //           y: 168,
  //         },
  //         {
  //           x: "horse",
  //           y: 102,
  //         },
  //         {
  //           x: "skateboard",
  //           y: 165,
  //         },
  //         {
  //           x: "others",
  //           y: 147,
  //         },
  //       ],
  //     },
  //     {
  //       id: "germany",
  //       color: "hsl(90, 70%, 50%)",
  //       data: [
  //         {
  //           x: "plane",
  //           y: 12,
  //         },
  //         {
  //           x: "helicopter",
  //           y: 183,
  //         },
  //         {
  //           x: "boat",
  //           y: 223,
  //         },
  //         {
  //           x: "train",
  //           y: 258,
  //         },
  //         {
  //           x: "subway",
  //           y: 60,
  //         },
  //         {
  //           x: "bus",
  //           y: 159,
  //         },
  //         {
  //           x: "car",
  //           y: 75,
  //         },
  //         {
  //           x: "moto",
  //           y: 242,
  //         },
  //         {
  //           x: "bicycle",
  //           y: 123,
  //         },
  //         {
  //           x: "horse",
  //           y: 258,
  //         },
  //         {
  //           x: "skateboard",
  //           y: 199,
  //         },
  //         {
  //           x: "others",
  //           y: 264,
  //         },
  //       ],
  //     },
  //     {
  //       id: "norway",
  //       color: "hsl(32, 70%, 50%)",
  //       data: [
  //         {
  //           x: "plane",
  //           y: 256,
  //         },
  //         {
  //           x: "helicopter",
  //           y: 227,
  //         },
  //         {
  //           x: "boat",
  //           y: 243,
  //         },
  //         {
  //           x: "train",
  //           y: 85,
  //         },
  //         {
  //           x: "subway",
  //           y: 200,
  //         },
  //         {
  //           x: "bus",
  //           y: 276,
  //         },
  //         {
  //           x: "car",
  //           y: 74,
  //         },
  //         {
  //           x: "moto",
  //           y: 119,
  //         },
  //         {
  //           x: "bicycle",
  //           y: 159,
  //         },
  //         {
  //           x: "horse",
  //           y: 117,
  //         },
  //         {
  //           x: "skateboard",
  //           y: 82,
  //         },
  //         {
  //           x: "others",
  //           y: 192,
  //         },
  //       ],
  //     },
  //   ];

  //last month pedidos/entregados/utilidad

  const data = [
    {
      id: "Pedidos generados",
      color: "hsl(165, 70%, 50%)",
      data: [
        {
          x: "Enero",
          y: 282,
        },
        {
          x: "Febrero",
          y: 79,
        },
        {
          x: "Marzo",
          y: 193,
        },
        {
          x: "Abril",
          y: 232,
        },
        {
          x: "Mayo",
          y: 169,
        },
        {
          x: "Junio",
          y: 226,
        },
        {
          x: "Julio",
          y: 73,
        },
        {
          x: "Agosto",
          y: 56,
        },
        {
          x: "Septiembre",
          y: 127,
        },
        {
          x: "Octubre",
          y: 125,
        },
        {
          x: "Noviembre",
          y: 46,
        },
        {
          x: "Diciembre",
          y: 74,
        },
      ],
    },
    {
      id: "Pedidos entregados",
      color: "hsl(142, 70%, 50%)",
      data: [
        {
          x: "Enero",
          y: 55,
        },
        {
          x: "Febrero",
          y: 180,
        },
        {
          x: "Marzo",
          y: 216,
        },
        {
          x: "Abril",
          y: 178,
        },
        {
          x: "Mayo",
          y: 296,
        },
        {
          x: "Junio",
          y: 3,
        },
        {
          x: "Julio",
          y: 240,
        },
        {
          x: "Agosto",
          y: 28,
        },
        {
          x: "Septiembre",
          y: 42,
        },
        {
          x: "Octubre",
          y: 120,
        },
        {
          x: "Noviembre",
          y: 116,
        },
        {
          x: "Diciembre",
          y: 256,
        },
      ],
    },
    {
      id: "Utilidad",
      color: "hsl(6, 70%, 50%)",
      data: [
        {
          x: "Enero",
          y: 138,
        },
        {
          x: "Febrero",
          y: 130,
        },
        {
          x: "Marzo",
          y: 295,
        },
        {
          x: "Abril",
          y: 145,
        },
        {
          x: "Mayo",
          y: 115,
        },
        {
          x: "Junio",
          y: 150,
        },
        {
          x: "Julio",
          y: 243,
        },
        {
          x: "Agosto",
          y: 51,
        },
        {
          x: "Septiembre",
          y: 168,
        },
        {
          x: "Octubre",
          y: 102,
        },
        {
          x: "Noviembre",
          y: 165,
        },
        {
          x: "Diciembre",
          y: 147,
        },
      ],
    },
  ];

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Meses",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Cantidad",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
