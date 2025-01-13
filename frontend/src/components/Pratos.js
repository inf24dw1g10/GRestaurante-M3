import {
    List,
    Datagrid,
    TextField,
    NumberField,
    BooleanField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    SelectInput,
    required,
    EditButton,
    DeleteButton
} from 'react-admin';

const categoriaOpcoes = [
    { id: 'starter', name: 'Entrada' },
    { id: 'main', name: 'Prato Principal' },
    { id: 'dessert', name: 'Sobremesa' },
    { id: 'beverage', name: 'Bebida' },
];

export const PratoList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" label="Nome" />
            <TextField source="description" label="Descrição" />
            <NumberField 
                source="price" 
                label="Preço" 
                options={{ style: 'currency', currency: 'EUR' }}
            />
            <TextField source="category" label="Categoria" />
            <BooleanField source="isAvailable" label="Disponível" />
            <EditButton label="Editar" />
            <DeleteButton label="Eliminar" />
        </Datagrid>
    </List>
);

export const PratoEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Nome" validate={[required()]} />
            <TextInput source="description" label="Descrição" multiline />
            <NumberInput 
                source="price" 
                label="Preço" 
                validate={[required()]} 
            />
            <SelectInput source="category" label="Categoria" choices={categoriaOpcoes} validate={[required()]} />
            <BooleanInput source="isAvailable" label="Disponível" />
        </SimpleForm>
    </Edit>
);

export const PratoCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Nome" validate={[required()]} />
            <TextInput source="description" label="Descrição" multiline />
            <NumberInput 
                source="price" 
                label="Preço" 
                validate={[required()]} 
            />
            <SelectInput source="category" label="Categoria" choices={categoriaOpcoes} validate={[required()]} />
            <BooleanInput source="isAvailable" label="Disponível" defaultValue={true} />
        </SimpleForm>
    </Create>
);