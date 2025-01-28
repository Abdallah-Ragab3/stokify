import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box
              sx={{
                bgcolor: `${color}.light`,
                borderRadius: 2,
                p: 1,
                display: 'flex',
              }}
            >
              <Icon sx={{ color: `${color}.main` }} />
            </Box>
          </Grid>
          <Grid item xs>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        لوحة التحكم
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="إجمالي المبيعات"
            value="٥٤,٥٠٠ ريال"
            icon={AttachMoneyIcon}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="المنتجات"
            value="١٢٣"
            icon={InventoryIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="نمو المبيعات"
            value="١٥٪+"
            icon={TrendingUpIcon}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="تنبيهات المخزون"
            value="٥"
            icon={WarningIcon}
            color="warning"
          />
        </Grid>

        {/* Low Stock Items */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              المنتجات منخفضة المخزون
            </Typography>
            {[
              { name: 'قهوة عربية', current: 5, min: 10 },
              { name: 'شاي أخضر', current: 8, min: 15 },
              { name: 'سكر', current: 12, min: 20 },
            ].map((item) => (
              <Box key={item.name} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.current}/{item.min}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(item.current / item.min) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
