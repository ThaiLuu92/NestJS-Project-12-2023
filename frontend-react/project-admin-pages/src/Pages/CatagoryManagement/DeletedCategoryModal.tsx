import React from 'react';
import { Box } from '@mui/material';
import { I_Category } from "../../types/form.type";
import Button from '@mui/material/Button';
import {
    Modal,
    Paper,
    Typography,
} from '@mui/material';

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    catagory: I_Category | null;
}

const DeletedCategoryModal: React.FC<CategoryModalProps> = ({  open, onClose, catagory }) => {

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Thông tin khóa học
                </Typography>

                {catagory && (<Paper sx={{ p: 2, maxWidth: '800px', maxHeight: '600px', overflow: 'auto' }}>
                    <form>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="name">Tên danh mục</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={catagory.name}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}

                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="description">Mô tả</label>
                            <textarea
                                id="description"
                                name="description"
                                value={catagory.description}
                                style={{ width: '100%', fontSize: 16, padding: 9, minHeight: '100px' }}
                            />
                        </div>
                    </form>
                </Paper>)}

                <Button variant="contained" color="primary" style={{ marginTop: 20, marginRight: 20 }} onClick={onClose}>
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
};

export default DeletedCategoryModal

