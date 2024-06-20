import CanvasJSReact from '@canvasjs/react-charts';
import { useSelector } from 'react-redux';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CategoryGraph = () => {
  const { expenseByCategory } = useSelector((state) => state['expense']);

  const dataPoints = [];

  for (let expense in expenseByCategory) {
    dataPoints.push({ label: expense, y: expenseByCategory[expense] });
  }

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: 'Expense By Category',
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: ₹{y}',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - ₹{y}',
        dataPoints,
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default CategoryGraph;
