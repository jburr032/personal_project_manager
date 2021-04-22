import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProject from './components/project/AddProject';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProjectBoard from './components/projectBoard/ProjectBoard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div width="100%">
          <Header />
          <Switch>
            <Route exact path="/add-project" component={AddProject} />
            <Route exact path="/update/:projectId" component={AddProject} />
            <Route exact path="/projectBoard/:id" component={ProjectBoard} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
