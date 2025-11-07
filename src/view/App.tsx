import { Route, Router } from "wouter";
import { Kanban } from "./Kanban/Kanban";
import { List } from "./List/List";

export const App = () => {
  return (
    <Router base="/react-template">
      <Route path="/" component={List} />
      <Route path="/kanban" component={Kanban} />
      <Route>
        <List />
      </Route>
    </Router>
  );
};
