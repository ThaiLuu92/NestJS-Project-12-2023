import React, { useState, useEffect } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { I_PaymentView } from "../../types/form.type";
import { getData } from '../../apis/API';
import { GET_PATMENT, GET_PATMENT_ALL } from '../../apis/common';

export default function BasicPie() {
  const [orderData, setOrderData] = useState<I_PaymentView[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const response = await getData(GET_PATMENT_ALL);
      setOrderData(response);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  const calculatePercentage = (count: number, total: number): string => {
    const percentage = (count / total) * 100;
    return percentage.toFixed(0) + '%';
  };

  const categoryCounts: { [key: string]: number } = {};

  // Lặp qua mảng orderData để đếm số lượng của từng category_name
  orderData.forEach((order) => {
    const category = order.category_name;
    // Tăng giá trị cho category tương ứng hoặc gán giá trị 1 nếu chưa tồn tại
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  // Lấy tất cả các category_name hiện có
  const uniqueCategories = Object.keys(categoryCounts);

  // Đếm số lượng các category_name
  const totalOrders = orderData.length;

  const data = uniqueCategories.map((category) => ({
    id: category,
    value: categoryCounts[category],
    label: `${category} (${calculatePercentage(categoryCounts[category], totalOrders)})`,
  }));

  const size = {
    width: 650,
    height: 300,
  };

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => (item.label ? String(item.label) : ''),
          arcLabelMinAngle: 45,
          data: data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'balck',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}
