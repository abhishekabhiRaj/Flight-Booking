import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <Stack className="min-h-screen">
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton 
            edge="start" 
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowLeft />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Stack className="flex-1 p-4">
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default AdminLayout; 