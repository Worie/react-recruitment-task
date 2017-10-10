import React from 'react';
import { render } from 'react-dom';
import { configureStore } from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

store.subscribe(() =>
  console.log(store.getState())
);

render(
    <Root store={store} />,
    document.getElementById('root')
);
