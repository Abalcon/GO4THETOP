import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent'
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import {LocalizeProvider} from "react-localize-redux";
import './App.css';

const store = ConfigureStore();

function App() {
  return (
      <Provider store={store}>
          <LocalizeProvider>
              <BrowserRouter>
                  <div className="App">
                      <Main/>
                  </div>
              </BrowserRouter>
          </LocalizeProvider>
      </Provider>
  );
}

export default App;
