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
} from 'react-admin';

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

// export const UserEdit = (props) => {
//   var auth = JSON.parse(localStorage.getItem("auth"));
//   var userRole = auth?.role;

//   return (
//     <Edit {...props}>
//       <SimpleForm>
//         <TextInput disabled source="id" />
//         <TextInput source="username" />
//         <TextInput source="email" />
//         <TextInput source="password" />
//         <TextInput source="name" />
//         <TextInput source="surname" />
//         <TextInput source="patronymic" />
//         <ReferenceInput source="creatorId" reference="users">
//           <SelectInput optionText="name" />
//         </ReferenceInput>
//         <ReferenceInput source="roleId" reference="roles">
//           <SelectInput optionText="name" />
//         </ReferenceInput>
//         <ReferenceArrayInput reference="groups" source="groups">
//           <SelectArrayInput>
//             <ChipField source="name" />
//           </SelectArrayInput>
//         </ReferenceArrayInput>
//       </SimpleForm>
//     </Edit>);
// const UserEditToolbar = (props) => (
//   <Toolbar {...props}>
//     <SaveButton disabled={props.pristine} />
//     <DeleteButton />
//   </Toolbar>
// );

// const UserEditForm = (props) => {
//   var auth = JSON.parse(localStorage.getItem('auth'));
//   var userId = auth?.id;
//   var userRole = auth?.role;
//   var isDisabled = userId !== props.record.creatorId && userRole !== 'admin';

//   return (
//     <SimpleForm toolbar={isDisabled ? null : <UserEditToolbar />} {...props}>
//       <TextInput disabled source="id" />
//       <TextInput disabled={isDisabled} source="username" />
//       <TextInput disabled={isDisabled} source="email" />
//       <TextInput disabled={isDisabled} source="password" />
//       <TextInput disabled={isDisabled} source="name" />
//       <TextInput disabled={isDisabled} source="surname" />
//       <TextInput disabled={isDisabled} source="patronymic" />
//       <ReferenceInput
//         disabled={isDisabled}
//         source="creatorId"
//         reference="users"
//       >
//         <SelectInput optionText="name" />
//       </ReferenceInput>
//       <ReferenceInput disabled={userRole !== 'admin'} source="roleId" reference="roles">
//         <SelectInput optionText="name" />
//       </ReferenceInput>
//       <ReferenceArrayInput
//         disabled={isDisabled}
//         source="groups"
//         reference="groups"
//       >
//         <SelectArrayInput>
//           <ChipField source="name" />
//         </SelectArrayInput>
//       </ReferenceArrayInput>
//     </SimpleForm>
//   );
// };

// export const UserEdit = (props) => {
//   return (
//     <Edit {...props}>
//       <UserEditForm />
//     </Edit>
//   );
// };

// var choices = [
//   {
//     id: 1,
//     name: "Пользователь",
//     disabled: true,
//   },
//   {
//     id: 2,
//     name: "Преподаватель",
//     disabled: true,
//     name: 'user',
//     disabled: false,
//   },
//   {
//     id: 2,
//     name: 'teacher',
//     disabled: false,
//   },
// ]

// export const UserCreate = (props) => {
//   var auth = JSON.parse(localStorage.getItem("auth"));
//   var userRole = auth?.role;
//   var initialValue;

//   if (userRole === "admin") {
//     initialValue = 2;
//     choices[1].disabled = false;
//   } else if (userRole === "teacher") {
//     initialValue = 1;
//     choices[0].disabled = false;
//   }

//   return (
//     <Create {...props}>
//       <SimpleForm>
//         <TextInput label="Логин" source="username" required />
//         <TextInput label="Электронная почта" source="email" required />
//         <PasswordInput label="Пароль" source="password" required />
//         <TextInput label="Имя" source="name" required />
//         <TextInput label="Фамилия" source="surname" required />
//         <TextInput label="Отчество" source="patronymic" />
//         <SelectInput
//           source="roleId"
//           choices={choices}
//           optionText="name"
//           optionValue="id"
//           initialValue={initialValue}
//         />
//         {userRole === "teacher" ? (
//           <ReferenceArrayInput
//             label="Группы"
//             source="groups"
//             reference="groups"
//           >
//             <SelectArrayInput>
//               <ChipField source="name" />
//             </SelectArrayInput>
//           </ReferenceArrayInput>
//         ) : null}
//       </SimpleForm>
//     </Create>
//   );
// };
// const UserCreateForm = (props) => {
//   var auth = JSON.parse(localStorage.getItem('auth'));
//   var userRole = auth?.role;

//   var isAdmin = userRole === 'admin'

//   if (!isAdmin) choices[1].disabled = true;

//   return (
//     <SimpleForm {...props}>
//       <TextInput label="Логин" source="username" validate={[required()]} />
//       <TextInput
//         label="Электронная почта"
//         source="email"
//         validate={[required()]}
//       />
//       <PasswordInput label="Пароль" source="password" validate={[required()]} />
//       <TextInput label="Имя" source="name" validate={[required()]} />
//       <TextInput label="Фамилия" source="surname" validate={[required()]} />
//       <TextInput label="Отчество" source="patronymic" />
//       <SelectInput
//         source="roleId"
//         choices={choices}
//         optionText="name"
//         optionValue="id"
//         initialValue="1"
//         disabled={!isAdmin}
//       />
//       <ReferenceArrayInput label="Группы" source="groups" reference="groups">
//         <SelectArrayInput>
//           <ChipField source="name" />
//         </SelectArrayInput>
//       </ReferenceArrayInput>
//     </SimpleForm>
//   );
// };

// export const UserCreate = (props) => (
//   <Create {...props}>
//     <UserCreateForm />
//   </Create>
// );
