import Heading from './components/Heading/Heading';

import { Routes, Route,  Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, } from "react-redux";
//import { fetchBaseCurrency } from './redux/operations.js';
import {getUserInfo} from './service/opencagedataApi.js'

const HomePage = lazy(() => import ("./pages/Home.jsx"));
const RatesPage = lazy (() => import ("./pages/Rates.jsx"));

export const App = () => {

  const dispatch = useDispatch();

useEffect(() => {const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  getUserInfo({ latitude: crd.latitude, longitude: crd.longitude })
      .then(data => {
        console.log("Дані з opencagedata:", data);
      })
      .catch(error => {
        console.error("Помилка отримання даних про локацію:", error);
      });

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);},[dispatch, ]); 

  return (
    <div>
      <Heading title="Just do it!" />
       <h1>Currency converter</h1>
       <Suspense fallback={<div>Loading...</div>}> 
      <Routes>
        <Route index element={<HomePage/>}></Route>
        <Route path="/rates" element={<RatesPage/>}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
      </Suspense>
    </div>
  )
};
