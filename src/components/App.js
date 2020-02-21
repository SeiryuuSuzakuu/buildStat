import React, { Component } from 'react';
import '../styles/App.css';
import { getFoldersData } from '../api/buildsUrls';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BuildPage from './BuildPage';
import SearchPage from './SearchPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      folders: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getFoldersData().then(data => {
      this.setState({ folders: data.value, loading: false });
    });
  }

  render() {
    const routes = this.state.folders.map(folder => {
      let link = folder.path.replace(/[\\]/g, '/');
      return <Route exact key={link} path={link} component={() => <BuildPage path={folder.path}/>} />
    });

    return (
      <div>
        <div>{this.state.loading && 'Loading...'}</div>
        <Router>
          <Switch>
            <Route path="/" exact component={() => <SearchPage folders={this.state.folders}/>} />
            {routes}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
