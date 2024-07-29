import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { StoreContext } from './store/store'; 
import Header from './components/Header';
import Footer from './components/Footer';
import OnlineHelp from './components/OnlineHelp';
import Home from './pages/Home.js';
import Map from './pages/Map.js';
import Travels from './pages/Travels.js';
import Routes from './pages/Routes.js';
import Account from './pages/Account.js';
import Help from './pages/Help.js';
import Rules from './pages/Rules.js';
import InfoAboutUs from './pages/InfoAboutUs.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
import Authorisation from './pages/Authorisation.js'; 
import Registration from './pages/Registration.tsx'; 
import SearchTickets from './pages/SearchTickets.js';
import BuyTicket from './pages/BuyTicket.js';
import AdminPanel from './pages/AdminPanel';
import PageTitle from './components/PageTitle'; // Импортируйте новый компонент
import { HelmetProvider } from 'react-helmet-async'; // Импортируйте HelmetProvider
import './i18n';

function App() {
  const store = useContext(StoreContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }

    // Fetch data from your server on Heroku
    fetch('https://bus-travel-4dba9713d4f4.herokuapp.com/api/endpoint')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  }, [store]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<><PageTitle /><Home /></>} />
        <Route path="/map" element={<><PageTitle /><Map /></>} />
        <Route path="/travels" element={<><PageTitle /><Travels /></>} />
        <Route path="/routes" element={<><PageTitle /><Routes /></>} />
        <Route path="/account" element={<><PageTitle /><Account /></>} />
        <Route path="/help" element={<><PageTitle /><Help /></>} />
        <Route path="/rules" element={<><PageTitle /><Rules /></>} />
        <Route path="/info-about-us" element={<><PageTitle /><InfoAboutUs /></>} />
        <Route path="/privacy-policy" element={<><PageTitle /><PrivacyPolicy /></>} />
        <Route path="/registration" element={<><PageTitle /><Registration /></>} />
        <Route path="/authorisation" element={<><PageTitle /><Authorisation /></>} />
        <Route path="/search" element={<><PageTitle /><SearchTickets /></>} />
        <Route path="/buy-ticket" element={<><PageTitle /><BuyTicket /></>} />
        <Route path="/adminPanel" element={<><PageTitle /><AdminPanel /></>} />
      </>
    )
  );

  return (
    <StoreContext.Provider value={store}>
      <HelmetProvider>
        <div className="App">
          <Header />
          <div className="content">
            <RouterProvider router={router} />
          </div>
          <OnlineHelp />
          <Footer />
        </div>
      </HelmetProvider>
    </StoreContext.Provider>
  );
}

export default observer(App);
