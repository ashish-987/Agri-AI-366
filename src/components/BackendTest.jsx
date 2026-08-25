import { useState } from 'react';

import {
  checkBackend
} from '../services/api';


export default function BackendTest() {

  const [status, setStatus] =
    useState('Not tested');

  const [loading, setLoading] =
    useState(false);


  const testBackend = async () => {

    try {

      setLoading(true);

      setStatus(
        'Connecting to FastAPI...'
      );


      const data =
        await checkBackend();


      console.log(
        'FastAPI response:',
        data
      );


      if (
        data?.status === 'healthy'
      ) {

        setStatus(
          'Backend Connected ✅'
        );

      } else {

        setStatus(
          'Backend responded ⚠️'
        );

      }


    } catch (error) {

      console.error(
        'Backend connection error:',
        error
      );


      setStatus(
        `Connection failed ❌: ${error.message}`
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="p-6 bg-white rounded-3xl border border-emerald-200">

      <h2 className="text-xl font-bold">
        AgriAI Backend
      </h2>


      <p className="text-gray-500 mt-2">
        Test React → FastAPI connection.
      </p>


      <button
        onClick={testBackend}
        disabled={loading}
        className="mt-4 px-5 py-3 rounded-2xl bg-[#006c49] text-white font-bold disabled:opacity-50"
      >

        {loading
          ? 'Connecting...'
          : 'Test Backend Connection'}

      </button>


      <p className="mt-4 font-bold">
        {status}
      </p>

    </div>

  );

}
