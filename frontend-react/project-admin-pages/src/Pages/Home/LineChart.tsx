import React, { useState, useEffect } from 'react';
import { I_PaymentView } from '../../types/form.type';
import { getData } from '../../apis/API';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { GET_PATMENT, GET_PATMENT_ALL } from '../../apis/common';
// import {
//   LineChart,
// } from '@mui/x-charts';

const BasicLineChart: React.FC = () => {
  const [orderData, setOrderData] = useState<I_PaymentView[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getData(GET_PATMENT_ALL);
      console.log(111111,response);
      
      setOrderData(response);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Tạo đối tượng để lưu trữ số lượng bán theo ngày
  const salesByDay: { [date: string]: number } = {};

  // Lặp qua mảng orderData để đếm số lượng bán theo ngày
  orderData.forEach((order) => {
    const createdAtDate = new Date(order.createdAt);
    const dateOnly = new Date(
      createdAtDate.getFullYear(),
      createdAtDate.getMonth(),
      createdAtDate.getDate()
    );
    const dateString = dateOnly.toISOString();
    salesByDay[dateString] = (salesByDay[dateString] || 0) + 1;
  });

  // Chuyển đổi dữ liệu thành mảng các đối tượng { x: ngày, y: số lượng bán }
  const lineChartData = Object.entries(salesByDay).map(([date, sales]) => ({
    x: new Date(date),
    y: sales,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={lineChartData}
        margin={{ top: 16, right: 16, bottom: 0, left: 24 }}
      >
        <XAxis
          dataKey="x"
          tickFormatter={(tick) => format(new Date(tick), 'MM/dd')}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BasicLineChart;
