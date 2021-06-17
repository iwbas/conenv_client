import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  Toolbar,
  SaveButton,
  DeleteButton,
  ReferenceInput,
  SelectInput,
  required,
} from "react-admin";

export const GroupList = (props) => {
  console.log(props);
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <ReferenceField source="ownerId" reference="users">
          <TextField source="username" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};

const GroupEditToolbar = (props) => {
  // problem with Received `true` for a non-boolean attribute
  // and React does not recognize the `isDisabled` prop on a DOM element.
  // temporary
  var auth = JSON.parse(localStorage.getItem("auth"));
  var userId = auth?.id;
  var userRole = auth?.role;
  var isDisabled = userId !== props.record.ownerId && userRole !== "admin";

  console.log("ISDISABLED");
  console.log(props.isDisabled);

  return (
    <Toolbar {...props}>
      <SaveButton disabled={props.pristine} />
      <DeleteButton disabled={isDisabled} />
    </Toolbar>
  );
};
const GroupEditForm = (props) => {
  var auth = JSON.parse(localStorage.getItem("auth"));
  var userId = auth?.id;
  var userRole = auth?.role;
  var isDisabled = userId !== props.record.ownerId && userRole !== "admin";

  return (
    <SimpleForm toolbar={<GroupEditToolbar/>} {...props}>
      <TextInput disabled source="id" />
      <TextInput disabled={isDisabled} label="Название" source="name" />
      <ReferenceInput
        disabled={isDisabled}
        label="Владелец"
        source="ownerId"
        reference="users"
      >
        <SelectInput optionText="username" resettable />
      </ReferenceInput>
    </SimpleForm>
  );
};

export const GroupEdit = (props) => {
  return (
    <Edit {...props}>
      <GroupEditForm />
    </Edit>
  );
};

export const GroupCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
