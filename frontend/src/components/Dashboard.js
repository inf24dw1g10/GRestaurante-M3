import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNotify } from 'react-admin';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const notify = useNotify();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/dashboard/stats');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        notify('Erro ao carregar dados do dashboard', { type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [notify]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!stats) return null;

  const formatCurrency = (value) => 
    new Intl.NumberFormat('pt-PT', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(value);

  return (
    <Box py={3} px={2}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Cards Informativos */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              color: 'white',
              height: '100%'
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <RestaurantIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="overline">
                    Total de Reservas
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalReservations}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: theme.palette.secondary.main,
              color: 'white',
              height: '100%'
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TableRestaurantIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="overline">
                    Mesas Disponíveis
                  </Typography>
                  <Typography variant="h4">
                    {stats.availableTables}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: theme.palette.success.main,
              color: 'white',
              height: '100%'
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="overline">
                    Receita Mensal
                  </Typography>
                  <Typography variant="h4">
                    {formatCurrency(stats.monthlyRevenue[stats.monthlyRevenue.length - 1]?.revenue || 0)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Receita */}
        <Grid item xs={12}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Receita Mensal
              </Typography>
              <Box height={400}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis 
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Receita"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pratos Populares */}
        <Grid item xs={12} md={6}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pratos Mais Pedidos
              </Typography>
              <Box>
                {stats.popularDishes.map((dish, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      mb: 1,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Typography
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          fontSize: '0.875rem',
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Typography>{dish.name}</Typography>
                    </Box>
                    <Typography fontWeight="bold">
                      {dish.orders} pedidos
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;