import React from 'react';
import Menu from '../containers/Menu';
import Content from '../containers/Content';
import { app } from '../styles/app.scss';

const App = () =>
    <div className={app}>
        <Menu/>
        <Content/>
    </div>;

export default App;
