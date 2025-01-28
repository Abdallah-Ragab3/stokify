import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1a237e 0%, #0d47a1 100%)',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Stockify
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="لوحة التحكم" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white' }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="المخزون" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white' }}>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="التقارير" />
        </ListItem>
      </List>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="الإعدادات" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white' }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="الملف الشخصي" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
