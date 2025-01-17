import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Rollbar from 'rollbar';
import { Provider, ErrorBoundary, useRollbar } from '@rollbar/react';
import Test from './Test';

const _rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  handleUncaughtException: true,
  enabled: true,
  source_map_enabled: true,
  addErrorContext: true,
  autoInstrument: true,
  contentSecurityPolicy: true,
  errorOnContentSecurityPolicy: true,
  context: 'home#index',
  server: {
    root: 'https://github.com/dolphen05/using-Rollbar-with-React/build'
  },
  payload: {
    environment: process.env.REACT_APP_ENVIROMENT,
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: process.env.REACT_APP_GIT_SHA,
        guess_uncaught_frames: true
      }
    },
    person: {
      id: Math.random().toString(), // required
      username: 'Ahmed',
      email: 'test@example.com'
    }
  }
};
Rollbar.init(_rollbarConfig);
// const rollbar = new Rollbar(_rollbarConfig);
// Rollbar.configure();

function App() {
  // const [rollbar, setRollbar] = useState(
  //   new Rollbar({
  //     accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  //     captureUncaught: true,
  //     captureUnhandledRejections: true,
  //     environment: 'development12'
  //   })
  // );
  useEffect(() => {
    //   setRollbar(
    //     new Rollbar({
    //       accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    //       captureUncaught: true,
    //       captureUnhandledRejections: true
    //     })
    //   );
    console.log(process.env.REACT_APP_GIT_SHA);
    console.log(process.env.REACT_APP_ENVIROMENT);
  }, []);
  // const rollbar = useRollbar();
  // useRollbar(rollbar);
  return (
    <Provider config={_rollbarConfig}>
      <ErrorBoundary>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Test />
            <button
              onClick={() => {
                try {
                  console.log('Clicked');
                  throw new Error(
                    'This is Testing Error For Last Time Clicking'
                  );
                } catch (e) {
                  // rollbar.error('data provider   error', e);
                  Rollbar.error('message', e);
                  // console.log('🚀 ~ file: App.js ~ line 63 ~ App ~ Error', e);
                }
              }}
            >
              click
            </button>
          </header>
        </div>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
