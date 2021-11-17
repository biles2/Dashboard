/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Button, CircularProgress, Alert,
} from '@mui/material';
import Refresh from '@mui/icons-material/Refresh';
import Close from '@mui/icons-material/Close';
import request from '../api/request';
import CityTemperature from './services/weather/CityTemperature';
import CityWeather from './services/weather/CityWeather';
import Gpa from './services/epitech/Gpa';
import Credits from './services/epitech/Credits';
import Netsoul from './services/epitech/Netsoul';
import Stock from './services/exchange/Stock';
import Currency from './services/exchange/Currency';

const InstanceSwitch = ({ instance, data }) => {
  const services = {
    weather: {
      cityTemperature: CityTemperature,
      cityWeather: CityWeather,
    },
    epitech: {
      gpa: Gpa,
      credits: Credits,
      netsoul: Netsoul,
    },
    exchange: {
      stock: Stock,
      currency: Currency,
    },
  };

  const service = services[instance.service];
  if (service === undefined) { return null; }

  const Widget = service[instance.widget];
  if (Widget === undefined) { return null; }

  return <Widget data={data} />;
};

const Instance = ({ instance, deleteInstance }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const res = await request(`/instances/${instance.service}/${instance.widget}/${instance._id}`);
    if (res.status) {
      setData(res);
      setIsLoading(false);
    } else {
      setError(res.error);
      setIsLoading(false);
    }
  };

  const onRefreshClick = async () => {
    await loadData();
  };

  const onDeleteClick = async () => {
    deleteInstance(instance._id);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, instance.params.refreshRate * 1000);
    return () => (clearInterval(interval));
  }, []);

  let cardContent = null;
  if (isLoading) {
    cardContent = <CircularProgress />;
  } else if (error !== null) {
    cardContent = <Alert severity="error">{error}</Alert>;
  } else {
    cardContent = <InstanceSwitch instance={instance} data={data} />;
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%', position: 'relative',
    }}
    >
      <div style={{ display: 'block', padding: '8px' }}>
        {cardContent}
      </div>
      <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
        <Button size="small" onClick={onRefreshClick}><Refresh /></Button>
        <Button size="small" onClick={onDeleteClick}><Close /></Button>
      </div>
    </div>
  );
};

export default Instance;
