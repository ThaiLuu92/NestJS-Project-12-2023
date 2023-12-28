import React, { useEffect, useState } from 'react';
import { format } from "date-fns-tz";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {  I_PaymentView } from "../../types/form.type";
import { getData } from '../../apis/API';
import { useNavigate } from 'react-router-dom';
import { GET_PATMENT, GET_PATMENT_ALL } from '../../apis/common';
export default function Orders() {
    const [orders, setOrders] = useState<I_PaymentView[]>([]);
    const navigate = useNavigate();
    const convertToVnTimezone = (date: any) => {
        return format(date, "HH:mm:ss dd-MM-yyyy ", {
          timeZone: "Asia/Ho_Chi_Minh",
        });
      };
    useEffect(() => {
        fetchOders()
    }, []);

    async function fetchOders() {
        const getOder = await getData(GET_PATMENT_ALL)
        setOrders(getOder)
    }

    const preventDefault = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate('/oderManagement');
    };

    return (
        <React.Fragment>
            <Title>Lịch sử mua khóa học</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'left' }}>Ngày mua</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Tên khóa học</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Tên học viên</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email học viên</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right'}}>Giá tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.slice(-10).map((order) => (
                        <TableRow key={order.id}>
                            <TableCell sx={{ textAlign: 'left' }}>{convertToVnTimezone(new Date(order.createdAt))}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{order.course_name}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{order.user_name}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{order.user_email}</TableCell>
                            <TableCell align="right">{`${order.course_price.toLocaleString()}VND`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                Xem thêm
            </Link>
        </React.Fragment>
    );
}
