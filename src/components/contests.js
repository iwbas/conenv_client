import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  Create,
  ReferenceArrayInput,
  SelectArrayInput,
  ChipField,
} from 'react-admin';

export const ContestList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <DateField showTime source="start" />
      <DateField showTime source="end" />
      <ReferenceField source="taskId" reference="tasks">
        <TextField source="id" />
      </ReferenceField>
      <ReferenceField source="groupId" reference="groups">
        <TextField source="id" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export const ContestEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <TextInput source="name" />
      <DateTimeInput source="start" />
      <DateTimeInput source="end" />
      <ReferenceInput source="taskId" reference="tasks">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="groupId" reference="groups">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const ContestCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <DateTimeInput source="start" />
      <DateTimeInput source="end" />
      <ReferenceInput source="taskId" reference="tasks">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="groupId" reference="groups">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
