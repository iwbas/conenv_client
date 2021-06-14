import { List, Datagrid, TextField, ReferenceField, Edit, SimpleForm, TextInput, Create } from "react-admin";

export const GroupList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="creatorId" reference="users"><TextField source="username" /></ReferenceField>
        </Datagrid>
    </List>
);

export const GroupEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const GroupCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='name' />
      </SimpleForm>
    </Create>
  );