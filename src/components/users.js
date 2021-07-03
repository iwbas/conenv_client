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
  Toolbar,
  SaveButton,
  DeleteButton,
  required,
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

const UserTitle = ({ record }) => {
  return <span>Пользователь {record ? `${record.username}` : ""}</span>;
};

export const UserEdit = (props) => {
  // var auth = JSON.parse(localStorage.getItem("auth"));
  // var userRole = auth?.role;

  return (
    <Edit title={<UserTitle />} {...props}>
      <UserEditForm />
    </Edit>
  );
};

const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton disabled={props.pristine} />
    <DeleteButton disabled={props.record.id === 1} />
  </Toolbar>
);

const UserEditForm = (props) => {
  var auth = JSON.parse(localStorage.getItem("auth"));
  var userId = auth?.id;
  var userRole = auth?.role;

  // Поле disabled если Преподаватель не ответственный за пользователя и если он не админ
  // Поле также disabled для самой учетной записи администратора
  var NotCreatorOrAdmin = props.record.creatorId !== userId && userRole !== "admin";

  console.log(props.record.id);
  var isDisabled = NotCreatorOrAdmin || props.record.id === 1;

  return (
    <SimpleForm
      toolbar={NotCreatorOrAdmin ? null : <UserEditToolbar />}
      {...props}
    >
      <TextInput disabled={isDisabled} source="username" label="Логин" />
      <TextInput
        disabled={isDisabled}
        source="email"
        label="Электронная почта"
      />
      <TextInput
        disabled={NotCreatorOrAdmin}
        source="password"
        label="Новый пароль"
      />
      <TextInput disabled={isDisabled} source="name" label="Имя" />
      <TextInput disabled={isDisabled} source="surname" label="Фамилия" />
      <TextInput disabled={isDisabled} source="patronymic" label="Отчество" />
      <ReferenceInput
        // disabled={isDisabled}
        disabled
        source="creatorId"
        reference="users"
        label="Ответственный"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput
        disabled
        source="roleId"
        reference="roles"
        label="Роль"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceArrayInput
        disabled={isDisabled || props.record.roleId === 2}
        reference="groups"
        source="groups"
        label="Группа"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  );
};

var choices = [
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
  var userType;

  if (userRole === "admin") {
    initialValue = 2;
    choices[1].disabled = false;
    userType = choices[1].name;
  } else if (userRole === "teacher") {
    initialValue = 1;
    choices[0].disabled = false;
    userType = choices[0].name;
  }

  return (
    <Create
      title={
        "Создание " + (userRole === "admin" ? "преподавателя" : "пользователя")
      }
      {...props}
    >
      <SimpleForm>
        <TextInput label="Логин" source="username" validate={required()} />
        <TextInput
          label="Электронная почта"
          source="email"
          validate={required()}
        />
        <PasswordInput label="Пароль" source="password" validate={required()} />
        <TextInput label="Имя" source="name" validate={required()} />
        <TextInput label="Фамилия" source="surname" validate={required()} />
        <TextInput label="Отчество" source="patronymic" />
        <SelectInput
          source="roleId"
          choices={choices}
          optionText="name"
          optionValue="id"
          disabled
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
