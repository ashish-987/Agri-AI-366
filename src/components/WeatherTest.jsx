import { useState } from 'react';

import { getWeather } from '../services/api';


export default function WeatherTest() {

  const [weather, setWeather] = useState(null);

  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');


  // ==========================================
  // GET FARMER LOCATION
  // ==========================================

  const getFarmerLocation = () => {

    return new Promise((resolve, reject) => {

      if (!navigator.geolocation) {

        reject(
          new Error(
            'Geolocation is not supported by this browser.'
          )
        );

        return;
      }


      navigator.geolocation.getCurrentPosition(

        (position) => {

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;


          resolve({
            latitude,
            longitude
          });

        },


        (error) => {

          let message =
            'Unable to get your location.';


          if (error.code === 1) {

            message =
              'Location permission was denied. Please allow location access.';

          } else if (error.code === 2) {

            message =
              'Your location could not be determined.';

          } else if (error.code === 3) {

            message =
              'Location request timed out. Please try again.';

          }


          reject(
            new Error(message)
          );

        },


        {
          enableHighAccuracy: true,

          timeout: 10000,

          maximumAge: 300000
        }

      );

    });

  };


  // ==========================================
  // GET LIVE WEATHER
  // ==========================================

  const loadWeather = async () => {

    try {

      setLoading(true);

      setError('');

      setWeather(null);


      // Get farmer's real location
      const coordinates =
        await getFarmerLocation();


      setLocation(
        coordinates
      );


      // Get weather for that location
      const result =
        await getWeather(
          coordinates.latitude,
          coordinates.longitude
        );


      console.log(
        'Weather response:',
        result
      );


      setWeather(result);


    } catch (err) {

      console.error(
        'Weather error:',
        err
      );


      setError(
        err.message
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="p-6 mt-6 bg-white rounded-3xl border border-blue-200">

      {/* =====================================
          HEADER
      ====================================== */}

      <h2 className="text-xl font-bold">
        🌦️ Local Weather
      </h2>


      <p className="text-gray-500 mt-2">
        Get live weather for your current farm location.
      </p>


      {/* =====================================
          BUTTON
      ====================================== */}

      <button
        onClick={loadWeather}
        disabled={loading}
        className="mt-4 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold disabled:opacity-50 cursor-pointer"
      >

        {loading
          ? 'Getting Your Location...'
          : '📍 Get My Local Weather'}

      </button>


      {/* =====================================
          ERROR
      ====================================== */}

      {error && (

        <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-700">

          <strong>
            Location / Weather Error
          </strong>

          <p className="mt-1">
            {error}
          </p>

        </div>

      )}


      {/* =====================================
          LOCATION
      ====================================== */}

      {location && (

        <div className="mt-5 p-4 rounded-xl bg-blue-50">

          <p className="font-bold">
            📍 Your Location
          </p>

          <p className="text-sm mt-1">
            Latitude: {location.latitude.toFixed(6)}
          </p>

          <p className="text-sm">
            Longitude: {location.longitude.toFixed(6)}
          </p>

        </div>

      )}


      {/* =====================================
          WEATHER
      ====================================== */}

      {weather?.data?.current && (

        <div className="mt-5">

          <p className="font-bold text-green-700 mb-4">
            Live weather received ✅
          </p>


          <div className="grid grid-cols-2 gap-3">

            {/* Temperature */}

            <div className="p-4 bg-gray-100 rounded-xl">

              <p className="text-sm text-gray-500">
                🌡 Temperature
              </p>

              <p className="text-2xl font-bold">
                {weather.data.current.temperature_2m}
                °C
              </p>

            </div>


            {/* Humidity */}

            <div className="p-4 bg-gray-100 rounded-xl">

              <p className="text-sm text-gray-500">
                💧 Humidity
              </p>

              <p className="text-2xl font-bold">
                {weather.data.current.relative_humidity_2m}
                %
              </p>

            </div>


            {/* Rain */}

            <div className="p-4 bg-gray-100 rounded-xl">

              <p className="text-sm text-gray-500">
                🌧 Rain
              </p>

              <p className="text-2xl font-bold">
                {weather.data.current.rain}
                mm
              </p>

            </div>


            {/* Wind */}

            <div className="p-4 bg-gray-100 rounded-xl">

              <p className="text-sm text-gray-500">
                💨 Wind
              </p>

              <p className="text-2xl font-bold">
                {weather.data.current.wind_speed_10m}
                km/h
              </p>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}
