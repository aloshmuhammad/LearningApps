import {React,useState} from 'react'
import { styled, alpha,useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import './Navba.css'
import { useMediaQuery } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const Navba = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleSearchInputChange = (event) => {
    const query = event.target.value
      setSearchQuery(query);
    };
  
    const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
    const userToken = localStorage.getItem('userToken');
  
    const handleLogout = () => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('UserInfo');
      navigate('/user/login');
    };
  
    return (
      <div className='Container'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static' sx={{ backgroundColor: 'black' }}>
            <Toolbar>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                sx={{ mr: 2 }}
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{
                  flexGrow: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  [theme.breakpoints.down('sm')]: {
                    justifyContent: isMobile ? 'center' : 'flex-start',
                  },
                }}
              >
                Learn-X
              </Typography>
              <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search...'
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchInputChange}
                
                
              />
            </Search>
              {isMobile ? (
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                  {userToken ? (
                    <>
                    <MenuItem onClick={handleMenuClose}>
                      {userInfo.firstName}
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={RouterLink} to="/user/my-courses"> My Courses</MenuItem>
                    
                    </>
                    
                  ) : (
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    
                  )}
                  <MenuItem onClick={handleMenuClose}>Courses</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Wanna Teach Join Learn-X</MenuItem>
                  {userInfo ? (
                    <MenuItem  onClick={handleLogout}>Logout</MenuItem>
                    
                  ) : (
                    <MenuItem onClick={handleMenuClose}>Login</MenuItem>
                  )}
                </Menu>
              ) : (
                <div style={{ display: 'flex' }}>
                  <MenuItem key='home'>Home</MenuItem>
                  {userToken ? (
                    <>
                    <MenuItem key='profile'>{userInfo.firstName}</MenuItem>
                    <MenuItem   key='my-courses'  component={RouterLink} to="/user/my-courses">My-Courses</MenuItem>
                    </>
                  ) : (
                    ''
                  )}
                  <MenuItem key='courses'>Courses</MenuItem>
                  <MenuItem onClick={()=>navigate('/tutorapply')}>Wanna Teach Join Learn-X</MenuItem>
                  {userInfo ? (
                    <MenuItem key='logout' onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  ) : (
                    
                    <MenuItem onClick={()=>navigate('/user/login')} key='login'>Login</MenuItem>
                    
                  )}
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  };
  
  export default Navba;