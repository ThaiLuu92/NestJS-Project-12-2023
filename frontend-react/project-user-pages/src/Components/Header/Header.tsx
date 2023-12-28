import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthState, logout } from '../../Redux/Slice/AuthSlice';
import { fetchData, useFetchData } from '../../hooks/fetchUser';
import { I_User } from '../../Types/formData.type';


const settings = ['Tài khoản', 'Đăng xuất'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const userLogin = useSelector((state: { auth: AuthState }) => state.auth.user);
    // const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(userLogin.user?.avatar);

    React.useEffect(() => {
      // Khi userLogin thay đổi, cập nhật state local
    //   fetchData()
    //   setAvatarSrc(userLogin.user?.avatar);
    }, [userLogin]);
    const dispatch = useDispatch();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleMenuItemClick = (setting:string) => {
        if (setting === 'Tài khoản') {
            navigate('/User');
        } else if (setting === 'Đăng xuất') {
            dispatch(logout());
            localStorage.removeItem("X-API-Key");
            navigate('/Login'); 
        }
        handleCloseUserMenu()

    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

   
    return (
        <AppBar position="static" >
            <Container >
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => navigate('/')}
                    >
                      KAKEHASHI ACADEMY
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            
                                <MenuItem onClick={() => navigate('/Courses')} >
                                <Typography textAlign="center">Danh sách khóa học</Typography>
                                </MenuItem>
                           
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        KAKEHASHI
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      
                            <Button
                               
                                onClick={() => navigate('')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                            Giới thiệu
                            </Button>
                        <Button

                            onClick={() => navigate('/Courses')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Danh sách khóa học
                        </Button>   
                        <Button

                            onClick={() => navigate('')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Liên hệ
                        </Button>   
                       
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {!userLogin ? (
                            <>
                                <Button
                                    sx={{ marginRight: '20px' }}
                                    variant="contained"
                                    color="warning"
                                    onClick={() => navigate('/Register')}
                                >
                                    Đăng Ký
                                </Button>
                                <Button variant="contained" color="success" onClick={() => navigate('/Login')}>
                                    Đăng Nhập
                                </Button>
                            </>
                        ) : (
                            <>

                                    <Tooltip title="Open settings">

                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src={userLogin.avatar}/>
                                        </IconButton>
                                    </Tooltip>
                            </>
                        )}
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;