import { VictoryPie } from 'victory';

const PieChart = ({ data }: any) => {
  return (
    <VictoryPie
      data={data}
      x="status"
      y="count"
      labels={({ datum }) => `${datum.status}: ${datum.count}`}
      labelRadius={60}
      innerRadius={50}
      colorScale={ [ '#e19f5c', '#5d56bb' ] }
      style={{
        labels: {
          fill: ({ datum }: any) => (datum.status === 'completed' ? '#e19f5c': '#e8e7fd'),
        },
      }}
    />
  );
};
export default PieChart;