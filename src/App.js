import './App.css';
import NavHeader from './components/navheader'
import {Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home'
import List from './components/list'
import Anotar from './components/anotar'
import OracionesContextProvider from './context/oracionesContext';

function App() {

  const labels = ['Positivo', 'Negativo', 'Neutral','Descartar']

  return (
    <div>
      <NavHeader />
      <OracionesContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/listar/:label' component={List} />
          <Route path='/anotar/' component={Anotar} />
          <Route path='/editar/:id' component={Anotar} />
        </Switch>
      </BrowserRouter>
      </OracionesContextProvider>
      
      <p>pie de App</p>
    </div>
  );
}

export default App;
