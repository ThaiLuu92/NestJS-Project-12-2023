import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';
import { I_UserPay } from '../../Types/formData.type';

export default function PaymentForm({ setFormData, formData }: { setFormData: Function, formData: I_UserPay }) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
   
   
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Thanh toán bằng thẻ
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        name="cardName"

                        label="Tên thẻ"
                        fullWidth
                        value={formData?.cardName}
                        onChange={handleInputChange}
                        autoComplete="cc-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="numberCard"
                        name="numberCard"

                        label="Số thẻ"
                        fullWidth
                        value={formData?.numberCard}
                        onChange={handleInputChange}
                        autoComplete="cc-number"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                    value={formData?.expDate}
                    onChange={handleInputChange}
                        required
                        id="expDate"
                        name="expDate"

                        label="Ngày hết hạn"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Ba chữ số cuối trên dải chữ ký"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}