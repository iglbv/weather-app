import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import { GlobalStyles, theme, Toolbar, ToolbarTitle, NavLink } from './styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme.light}>
      <GlobalStyles>
        <Toolbar>
          <ToolbarTitle>Погода</ToolbarTitle>
          <nav>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/history">История</NavLink>
          </nav>
        </Toolbar>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default App;