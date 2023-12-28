import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import PublicIcon from '@mui/icons-material/Public';


function Footer() {
    return (
        <footer>
            <Container sx={{ maxWidth: 'lg' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box sx={{ flexBasis: '15%', padding: '10px' }}>
                        <img src="./" alt="Logo" width="100%" />
                    </Box>
                    <Box sx={{ flexBasis: '25%', flexDirection: 'column', display: 'flex', padding: '10px' }}>
                        <Typography variant="h6">Liên hệ</Typography>
                        <Link sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none','&:hover': { color: 'black' } }} href="#">
                            <IconButton>
                                <LocationOnIcon />
                            </IconButton>
                            Trụ sở 1: Tòa nhà A, Đường B, Phường C, Quận D, Hà Nội
                        </Link>
                        <Link sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">
                            <IconButton>
                                <LocalPhoneIcon />
                            </IconButton>
                            Hotline: 0901 456 111
                        </Link>
                        <Link sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">
                            <IconButton>
                                <LocationOnIcon />
                            </IconButton>
                            Trụ sở 2: Tòa nhà A, Đường B, Phường C, Quận D, Hồ Chí Minh
                        </Link>
                        <Link sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">
                            <IconButton>
                                <LocalPhoneIcon />
                            </IconButton>
                            Hotline: 0901 456 111
                        </Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">
                            <IconButton>
                                <EmailIcon />
                            </IconButton>
                            Email: kakehashicenter@gmail.com
                        </Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">
                            <IconButton>
                                <PublicIcon />
                            </IconButton>
                            Website: www.kakehashicenter.vn
                        </Link>
                        {/* Thêm thông tin khác tương tự ở đây */}
                    </Box>
                    <Box sx={{
                        flexBasis: '18%', padding: '10px', display: 'flex',
                        flexDirection: 'column', '& > *': {
                            margin: '5px 0',
                        },
                    }}>
                        <Typography variant="h6">Chương trình</Typography>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Tiếng Nhật Online chủ động</Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Lớp Online Có Giáo Viên</Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Tiếng Nhật OFFLINE</Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Chính sách học viên</Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Chính sách bảo mật thông tin</Link>
                        {/* Thêm chương trình khác tương tự ở đây */}
                    </Box>
                    <Box sx={{
                        flexBasis: '18%', padding: '10px', display: 'flex',
                        flexDirection: 'column', '& > *': {
                            margin: '5px 0',
                        }, }}>
                        <Typography variant="h6">Thông tin</Typography>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Giới thiệu</Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Từ vựng tiếng Nhiệt</Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Ngữ pháp tiếng Nhiệt</Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Tài liệu bổ sung</Link>
                        <Link sx={{ textDecoration: 'none', '&:hover': { color: 'black' } }} href="#">Tin tức</Link>
                        {/* Thêm thông tin khác tương tự ở đây */}
                    </Box>
                    <Box sx={{ flexBasis: '15%', padding: '10px' }}>
                        <Typography variant="h6">Kết nối</Typography>
                        <Grid container>
                            <Grid item>
                                <IconButton>
                                    <FacebookIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <InstagramIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <YouTubeIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <TwitterIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Box
                sx={{
                    textAlign: 'center',
                    backgroundColor: '#B1E5F8',
                    padding: '10px 0',
                    borderTop: '5px solid #F5F5F5',
                }}
            >
                <Typography variant="body2">
                    Copyright 2023 © by <span>KAKEHASHI ACADEMY</span>
                </Typography>
            </Box>
        </footer>
    );
}

export default Footer;

