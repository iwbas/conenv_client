import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Create,
  Toolbar,
  SaveButton,
  DeleteButton,
} from 'react-admin';

export const TopicList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Название"/>
      <ReferenceField source="userId" reference="users" label="Создатель">
        <TextField source="username" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const TopicEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton disabled={props.pristine} />
    <DeleteButton />
  </Toolbar>
);

const TopicEditForm = (props) => {
  var auth = JSON.parse(localStorage.getItem('auth'));
  var userId = auth?.id;
  var userRole = auth?.role;
  var notOwner = userId !== props.record.userId;

  return (
    <SimpleForm
      toolbar={notOwner && userRole !== 'admin' ? null : <TopicEditToolbar />}
      {...props}
    >
      <TextInput disabled source="id" />
      <TextInput disabled={notOwner} source="name" />
      {/* ={notOwner} */}
      <ReferenceInput disabled  source="userId" reference="users" label="Создатель">
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  );
};

export const TopicEdit = (props) => (
  <Edit {...props}>
    <TopicEditForm />
  </Edit>
);

export const TopicCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      {/* <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="id" />
      </ReferenceInput> */}
    </SimpleForm>
  </Create>
);
