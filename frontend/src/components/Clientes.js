// src/components/Clientes.js
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    required,
    email,
    EditButton,
    DeleteButton,
} from 'react-admin';

export const ClienteList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" label="Nome" />
            <EmailField source="email" />
            <TextField source="phone" label="Telefone" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const ClienteForm = () => (
    <SimpleForm>
        <TextInput source="name" label="Nome" validate={[required()]} />
        <TextInput source="email" validate={[required(), email()]} />
        <TextInput source="phone" label="Telefone" validate={[required()]} />
    </SimpleForm>
);

export const ClienteEdit = () => (
    <Edit>
        <ClienteForm />
    </Edit>
);

export const ClienteCreate = () => (
    <Create>
        <ClienteForm />
    </Create>
);