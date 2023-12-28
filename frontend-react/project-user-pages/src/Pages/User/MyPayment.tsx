import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { AuthState } from '../../Redux/Slice/AuthSlice';
import { I_PaymentView } from '../../Types/formData.type';
import { useEffect, useState } from 'react';
import { getDataByCondition, getDataById } from '../../Apis/API';
import { PAYMENT, USER_PAYMENT } from '../../Apis/common';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 15,
    fontWeight: theme.palette.secondary
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function MyPayment() {
  const userLogin = useSelector(
    (state: { auth: AuthState }) => state.auth.user
  );
  const [payment, setPayment] = useState<I_PaymentView[]>([]);

useEffect(()=>{
  const fetchPayment = async () => {
    const id = userLogin?.id
    console.log(222222,id);
    
    if (userLogin) {
      const payments = await getDataById(USER_PAYMENT,id)
      console.log(111111,payments);
      
      setPayment(payments)
    }
  };
  fetchPayment()
},[userLogin])


  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Tên khóa học</StyledTableCell>
          <StyledTableCell align="center">Tên danh mục</StyledTableCell>
          <StyledTableCell align="center">Giá</StyledTableCell>
          <StyledTableCell align="center">Ngày mua</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payment && payment?.map((pay) => (
          <StyledTableRow key={pay.id}>
            <StyledTableCell align="center" component="th" scope="row">
              {pay.course_name}
            </StyledTableCell>
            <StyledTableCell align="center">{pay.category_name}</StyledTableCell>
            <StyledTableCell align="center">{pay.course_price.toLocaleString()} VND</StyledTableCell>
            <StyledTableCell align="center">{pay.createdAt.split("T")[0]}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default MyPayment
