import {
    List,
    Datagrid,
    TextField,
    NumberField,
    Edit,
    Create,
    SimpleForm,
    NumberInput,
    SelectInput,
    required,
    EditButton
} from 'react-admin';

const statusOpcoes = [
    { id: 'available', name: 'Disponível' },
    { id: 'reserved', name: 'Reservada' },
    { id: 'occupied', name: 'Ocupada' },
];

export const MesaList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <NumberField source="number" label="Número" />
            <NumberField source="capacity" label="Capacidade" />
            <TextField source="status" label="Estado" />
            <EditButton label="Editar" />
        </Datagrid>
    </List>
);

export const MesaEdit = () => (
    <Edit>
        <SimpleForm>
            <NumberInput source="number" label="Número" validate={[required()]} />
            <NumberInput source="capacity" label="Capacidade" validate={[required()]} min={1} max={20} />
            <SelectInput source="status" label="Estado" choices={statusOpcoes} />
        </SimpleForm>
    </Edit>
);

export const MesaCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="number" label="Número" validate={[required()]} />
            <NumberInput source="capacity" label="Capacidade" validate={[required()]} min={1} max={20} />
            <SelectInput source="status" label="Estado" choices={statusOpcoes} defaultValue="available" />
        </SimpleForm>
    </Create>
);