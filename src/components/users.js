import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  ReferenceField,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  Create,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  ReferenceArrayInput,
  SelectArrayInput,
  PasswordInput,
} from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="name" />
      <TextField source="surname" />
      <TextField source="patronymic" />
      <ReferenceField source="creatorId" reference="users">
        <TextField source="username" />
      </ReferenceField>
      <ReferenceArrayField label="Группы" reference="groups" source="groups">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceField source="roleId" reference="roles">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export const UserEdit = (props) => {
  var auth = JSON.parse(localStorage.getItem("auth"));
  var userRole = auth?.role;

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="username" />
        <TextInput source="email" />
        <TextInput source="password" />
        <TextInput source="name" />
        <TextInput source="surname" />
        <TextInput source="patronymic" />
        <ReferenceInput source="creatorId" reference="users">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="roleId" reference="roles">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceArrayInput reference="groups" source="groups">
          <SelectArrayInput>
            <ChipField source="name" />
          </SelectArrayInput>
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};

const choices = [
  {
    id: 1,
    name: "Пользователь",
    disabled: true,
  },
  {
    id: 2,
    name: "Преподаватель",
    disabled: true,
  },
];

export const UserCreate = (props) => {
  var auth = JSON.parse(localStorage.getItem("auth"));
  var userRole = auth?.role;
  var initialValue;

  if (userRole === "admin") {
    initialValue = 2;
    choices[1].disabled = false;
  } else if (userRole === "teacher") {
    initialValue = 1;
    choices[0].disabled = false;
  }

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Логин" source="username" required />
        <TextInput label="Электронная почта" source="email" required />
        <PasswordInput label="Пароль" source="password" required />
        <TextInput label="Имя" source="name" required />
        <TextInput label="Фамилия" source="surname" required />
        <TextInput label="Отчество" source="patronymic" />
        <SelectInput
          source="roleId"
          choices={choices}
          optionText="name"
          optionValue="id"
          initialValue={initialValue}
        />
        {userRole === "teacher" ? (
          <ReferenceArrayInput
            label="Группы"
            source="groups"
            reference="groups"
          >
            <SelectArrayInput>
              <ChipField source="name" />
            </SelectArrayInput>
          </ReferenceArrayInput>
        ) : null}
      </SimpleForm>
    </Create>
  );
};
