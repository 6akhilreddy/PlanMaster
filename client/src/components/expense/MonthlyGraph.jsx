import CanvasJSReact from '@canvasjs/react-charts';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints = [];
const MonthlyGraph = () => {
  const chartRef = useRef();
  const { expenseByMonth } = useSelector((state) => state['expense']);
  useEffect(() => {
    if (dataPoints.length === 0) {
      for (let month in expenseByMonth) {
        dataPoints.push({ label: month, y: expenseByMonth[month] });
      }
      if (chartRef.current) {
        chartRef.current.render();
      }
    }
  }, [expenseByMonth]);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2', //"light1", "dark1", "dark2"
    title: {
      text: 'Expense By Month',
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        xValueFormatString: 'MMM YYYY',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        onRef={(ref) => (chartRef.current = ref)}
      />
    </div>
  );
};

export default MonthlyGraph;
