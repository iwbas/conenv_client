import './App.css';
import {
  Admin,
  EditGuesser,
  ListGuesser,
  Resource,
  usePermissions,
} from 'react-admin';
// import simpleRestProvider from "ra-data-simple-rest";
import customDataProvider from './providers/dataProvider';
import customAuthProvider from './providers/authProvider';
import { UserList, UserEdit, UserCreate } from './components/users';
import { GroupList, GroupEdit, GroupCreate } from './components/groups';
import { TopicList, TopicEdit, TopicCreate } from './components/topics';
import { TaskList, TaskEdit, TaskCreate } from './components/tasks';
import { ContestList, ContestEdit, ContestCreate } from './components/contests';

const dataProvider = customDataProvider('/api');
const authProvider = customAuthProvider('/api');

console.log(authProvider);

const App = () => {
  return (
    <Admin
      title="ConEnv"
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      {(permission) => [
        // Admin
        <Resource
          name="roles"
          options={{ label: 'Роли' }}
          list={permission==="teacher" ? ListGuesser : null}
        />,
        <Resource
          name="groups"
          options={{ label: 'Группы' }}
          list={permission==="teacher" ? GroupList : null}
          edit={permission==="teacher" ? GroupEdit : null}
          create={permission==="teacher" ? GroupCreate : null}
        />,
        <Resource
          name="users"
          options={{ label: 'Пользователи' }}
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
        />,
        <Resource
          name="topics"
          options={{ label: 'Темы' }}
          list={permission==="teacher" ? TopicList : null}
          edit={permission==="teacher" ? TopicEdit : null}
          create={permission==="teacher" ? TopicCreate : null}
        />,
        <Resource
          name="tasks"
          options={{ label: 'Задания' }}
          list={permission==="teacher" ? TaskList : null}
          edit={permission==="teacher" ? TaskEdit : null}
          create={permission==="teacher" ? TaskCreate : null}
        />,
        // <Resource
        //   name="contests"
        //   options={{ label: 'Контрольные работы' }}
        //   list={permission==="teacher" ? ContestList : null}
        //   edit={permission==="teacher" ? ContestEdit : null}
        //   create={permission==="teacher" ? ContestCreate : null}
        // />,

        // <Resource
        //   name="users"
        //   list={permission !== "user" ? UserList : null}
        //   edit={UserEdit}
        //   create={UserCreate}
        // />,
        // permission !== "user" ? (
        //   <Resource name="roles" list={ListGuesser} />
        // ) : null,
        // <Resource
        //   name="groups"
        //   list={GroupList}
        //   edit={GroupEdit}
        //   create={GroupCreate}
        // />,
        // <Resource
        //   name="topics"
        //   list={TopicList}
        //   edit={TopicEdit}
        //   create={TopicCreate}
        // />
      ]}
    </Admin>
  );
};

export default App;
