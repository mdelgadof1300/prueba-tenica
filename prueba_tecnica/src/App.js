import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddUserForm from "./Components/AddUserForm";
import UserList from "./Components/UserList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={AddUserForm} />
          <Route path="/list" exact component={UserList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
