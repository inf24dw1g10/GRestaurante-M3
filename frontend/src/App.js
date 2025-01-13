// src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { ClienteList, ClienteEdit, ClienteCreate } from './components/Clientes';
import { MesaList, MesaEdit, MesaCreate } from './components/Mesas';
import { PratoList, PratoEdit, PratoCreate } from './components/Pratos';
import { ReservaList, ReservaEdit, ReservaCreate } from './components/Reservas';
import { RestaurantMenu, TableRestaurant, Group, EventAvailable } from '@mui/icons-material';
import { theme } from './theme';
import Dashboard from './components/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dataProvider from './dataProvider';

const App = () => {
  const muiTheme = createTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <Admin 
        theme={theme}
        dashboard={Dashboard} 
        dataProvider={dataProvider}
        title="Sistema de Gestão de Restaurante"
      >
        <Resource 
          name="customers" 
          list={ClienteList}
          edit={ClienteEdit}
          create={ClienteCreate}
          icon={Group}
          options={{ label: 'Clientes' }}
        />
        <Resource 
          name="tables" 
          list={MesaList}
          edit={MesaEdit}
          create={MesaCreate}
          icon={TableRestaurant}
          options={{ label: 'Mesas' }}
        />
        <Resource 
          name="dishes" 
          list={PratoList}
          edit={PratoEdit}
          create={PratoCreate}
          icon={RestaurantMenu}
          options={{ label: 'Pratos' }}
        />
        <Resource 
          name="reservations" 
          list={ReservaList}
          edit={ReservaEdit}
          create={ReservaCreate}
          icon={EventAvailable}
          options={{ label: 'Reservas' }}
        />
      </Admin>
    </ThemeProvider>
  );
};

export default App;