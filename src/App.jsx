import "./App.css";
import {
  Admin,
  EditGuesser,
  ListGuesser,
  Resource,
  usePermissions,
} from "react-admin";
// import simpleRestProvider from "ra-data-simple-rest";
import customDataProvider from "./providers/dataProvider";
import customAuthProvider from "./providers/authProvider";
import { UserList, UserEdit, UserCreate } from "./components/users";
import { GroupList, GroupEdit, GroupCreate } from "./components/groups";

const dataProvider = customDataProvider("/api");
const authProvider = customAuthProvider("/api");

console.log(authProvider);

const App = () => {
  return (
    <Admin
      title="ConEnv"
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      {(permission) => [
        <Resource
          name="users"
          list={permission !== "user" ? UserList : null}
          edit={UserEdit}
          create={UserCreate}
        />,
        permission !== "user" ? (
          <Resource name="roles" list={ListGuesser} />
        ) : null,
        <Resource
          name="groups"
          list={GroupList}
          edit={GroupEdit}
          create={GroupCreate}
        />,
      ]}
    </Admin>
  );
};

export default App;
