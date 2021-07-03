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
import RichTextInput from 'ra-input-rich-text';

export const TaskList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Название" />
      {/* <TextField source="content" label="Задание"/> */}
      {/* <TextField source="answer" label="Название"/> */}
      <ReferenceField source="topicId" reference="topics" label="Тема">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="userId" reference="users" label="Создатель">
        <TextField source="username" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const TaskEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton disabled={props.pristine} />
    <DeleteButton />
  </Toolbar>
);

const TaskEditForm = (props) => {
  var auth = JSON.parse(localStorage.getItem('auth'));
  var userId = auth?.id;
  var userRole = auth?.role;
  var notOwner = userId !== props.record.userId;

  return (
    <SimpleForm
      toolbar={notOwner && userRole !== 'admin' ? null : <TaskEditToolbar />}
      {...props}
    >
      <TextInput disabled source="id" />
      <TextInput disabled={notOwner} source="name" />
      {!notOwner && <RichTextInput source="content" toolbar={null} />}
      {!notOwner && <RichTextInput source="answer" toolbar={null} />}
      <ReferenceInput disabled={notOwner} source="topicId" reference="topics">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput disabled source="userId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  );
};

export const TaskEdit = (props) => (
  <Edit {...props}>
    <TaskEditForm />
  </Edit>
);

export const TaskCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="content" />
      <TextInput source="answer" />
      <ReferenceInput source="topicId" reference="topics">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
