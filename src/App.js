import React, { useContext } from 'react';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Offerings from './components/Offerings';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import RFCExemptionForm from './components/RFCExemptionForm';
import { FormProvider } from './contexts/FormContext';
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardsPage from './components/DashboardsPage';

// Create Home component
const Home = () => {
  const { darkTheme } = useContext(ThemeContext);
  
  return (
    <div className={darkTheme ? 'dark-theme' : 'light-theme'}>
      <Header />
      <main>
        <Hero />
        <Offerings />
        <Roadmap />
      </main>
      <Footer />
      <RFCExemptionForm />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <FormProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/dashboards" 
              element={
                <>
                  <Header />
                  <DashboardsPage />
                  <Footer />
                </>
              } 
            />
          </Routes>
        </Router>
      </FormProvider>
    </ThemeProvider>
  );
}

export default App; 