import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthState, logout } from "../../Redux/Slice/appSlice";
import { useLocation } from "react-router-dom";


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SlideBar() {
    const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const toggle = useSelector(
    (state: { app: { toggle: boolean } }) => state.app.toggle
  );
  const handleCloseUserMenu = (acction: string) => {
    if (acction === "Logout") {
      dispatch(logout());
      localStorage.removeItem("X-API-Key");
      navigate("/Login");
    }
  };
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={toggle}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation("/")}
            selected={location.pathname === "/"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: location.pathname === "/" ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Trang chủ"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation("/userManagement")}
            selected={location.pathname === "/userManagement"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: location.pathname === "/userManagement" ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText
                primary="Học Viên"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation("/catagoryManagement")}
            selected={location.pathname === "/catagoryManagement"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: location.pathname === "/catagoryManagement" ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText
                primary="Danh Mục"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation("/coursesManagement")}
            selected={location.pathname === "/coursesManagement"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: location.pathname === "/coursesManagement" ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <BookIcon />
              </ListItemIcon>
              <ListItemText
                primary="Khóa học"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation("/courseLessonManagement")}
            selected={location.pathname === "/courseLessonManagement"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: location.pathname === "/courseLessonManagement" ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PlayLessonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Bài học"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation("/quesionManagement")}
            selected={location.pathname === "/quesionManagement"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: location.pathname === "/quesionManagement" ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <QuizIcon />
              </ListItemIcon>
              <ListItemText
                primary="Câu hỏi"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation("/answerManagement")}
            selected={location.pathname === "/answerManagement"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: location.pathname === "/answerManagement" ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText
                primary="Câu trả lời"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation("/oderManagement")}
            selected={location.pathname === "/oderManagement"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: location.pathname === "/oderManagement" ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText
                primary="Đơn hàng"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleCloseUserMenu("Logout")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
    </Box>
  );
}
