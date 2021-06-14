import { List, Datagrid, TextField, EmailField, DateField, ReferenceField } from "react-admin";

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="name" />
            <TextField source="surname" />
            <TextField source="patronymic" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <ReferenceField source="creatorId" reference="users"><TextField source="username" /></ReferenceField>
            <ReferenceField source="groupId" reference="groups"><TextField source="name" /></ReferenceField>
            <ReferenceField source="roleId" reference="roles"><TextField source="name" /></ReferenceField>
        </Datagrid>
    </List>
);