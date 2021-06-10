import "./App.css";
import { Admin, ListGuesser, Resource } from "react-admin";
// import simpleRestProvider from "ra-data-simple-rest";
import customDataProvider from "./providers/dataProvider";

const dataProvider = customDataProvider("http://localhost:8080/api");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
    <Resource name="roles" list={ListGuesser} />
  </Admin>
);

export default App;