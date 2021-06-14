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
import { UserList } from "./components/users";
import { GroupList, GroupEdit, GroupCreate } from "./components/groups";

const dataProvider = customDataProvider("/api");
const authProvider = customAuthProvider("/api");

console.log(authProvider);

const App = () => {
  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      {(permissions) => [
        <Resource name="users" list={UserList} />,
        <Resource name="roles" list={ListGuesser} edit={EditGuesser} />,
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
