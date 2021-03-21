import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProject from './components/project/AddProject';

function App() {
  return (
    <Router>
      <div width="100%">
        <Header />
        <Switch>
          <Route exact path="/add-project" component={AddProject} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
