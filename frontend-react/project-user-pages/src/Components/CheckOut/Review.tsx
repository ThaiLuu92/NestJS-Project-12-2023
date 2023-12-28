import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { I_Course, I_UserPay } from '../../Types/formData.type'; // Import your interfaces
import { useLocation } from 'react-router-dom';


export default function Review({ setFormData, formData, japaneseCourses }: { setFormData: Function, formData: I_UserPay , japaneseCourses: I_Course }){
    const navigate = useNavigate(); 
    const location = useLocation();
    return (
        <React.Fragment>
            {japaneseCourses && (
                <Typography variant="h6" gutterBottom>
                    Thông tin khóa học
                </Typography>
            )}
            <List disablePadding>
                {japaneseCourses && (
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Tên khóa học"  />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{japaneseCourses?.name}</Typography>
                    </ListItem>
                )}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Giá" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {japaneseCourses?.price.toLocaleString()} VND
                    </Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Tên người mua" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {formData.user_name} 
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Mã số thẻ" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {formData.numberCard} 
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Ngầy hết hạn" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {formData.expDate} 
                    </Typography>
                </ListItem>
            </List>
            
        </React.Fragment>
    );
}
