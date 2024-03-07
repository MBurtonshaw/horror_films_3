import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import withContext, { Provider } from './contexts/context';
import Title from './components/Title';
import TitlePage from './components/TitlePage';
import Genre from './components/Genre';
import GenrePage from './components/GenrePage';

import Results from './components/Results';
import Decades from './components/Decades';
import DecadesPage from './components/DecadesPage';
import Register from './components/Register';
import NotFound from './components/NotFound';
import List from './components/List';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Cookies from 'js-cookie';

/**************************************************************************************
    WRAPPING COMPONENTS IN CONTEXT
***************************************************************************************/

const DecadesWithContext = withContext(Decades);
const GenreWithContext = withContext(Genre);
const TitleWithContext = withContext(Title);
const TitlePageWithContext = withContext(TitlePage);
const GenrePageWithContext = withContext(GenrePage);
const ResultsWithContext = withContext(Results);
const DecadesPageWithContext = withContext(DecadesPage);
const ListWithContext = withContext(List);
const LoginWithContext = withContext(Login);
const LogoutWithContext = withContext(Logout);
const RegisterWithContext = withContext(Register);
const MainWithContext = withContext(Main);

function App() {
  /**************************************************************************************
      STATE AND ASYNC FUNCTIONS
  ***************************************************************************************/
  let [user, setUser] = useState('');
  let [isLoading, setIsLoading] = useState(true);


   function getData() {
      if (!document.cookie) {
      setUser('');
    } else {
      let logger = Cookies.get('signedIn?');
      if (logger === undefined) {
        return null;
      } else {
        let newLogger = JSON.parse(logger);
        if (newLogger === '') {
          setUser('');
        } else {
          setUser(newLogger);
        }
      }
    }
  } 

  useEffect(() => { getData() }, [ setUser ]) 

  // used below in the NotFound component
  let url = window.location.pathname;

  /**************************************************************************************
      ROUTING
  ***************************************************************************************/

  return (
    <div id='app_div' className='my-5 w-75 mx-auto'>
      {/* passing user state to Header as props */}
      <Header user={user}/>
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route
              strict path='/'
              element={
                <MainWithContext user={user} />
              }
            />
            <Route
              path='/titles/:url'
              element={
                <TitleWithContext user={user} />
              }
            />
            <Route
              path='/titles'
              element={
                <TitlePageWithContext user={user} />
              }
            />
            <Route
              path='/genres/:url'
              element={
                <GenreWithContext user={user} />
              }
            />
            <Route
              path='/genres'
              element={
                <GenrePageWithContext user={user} />
              }
            />
            <Route
              path='/results/:url'
              element={
                <ResultsWithContext user={user} />
              }
            />
            <Route
              path='/decades'
              element={
                <DecadesPageWithContext user={user}
                />
              }
            />
            <Route
              path='/decades/:url'
              element={
                <DecadesWithContext user={user} />
              }
            />
            <Route
              path='/list'
              element={
                <ListWithContext user={user} />
              }
            />
            <Route
              path='/login'
              element={
                <LoginWithContext user={user} />
              }
            />
            <Route
              path='/logout'
              element={
                <LogoutWithContext user={user} />
              }
            />
            <Route
              path='/register'
              element={
                <RegisterWithContext user={user} />
              }
            />
            <Route
              path='*'
              element={
                <div className='py-5 my-5 mx-auto'>
                  <NotFound message={url} user={user} />
                </div>
              }
            />
          </Routes>
        </Provider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
