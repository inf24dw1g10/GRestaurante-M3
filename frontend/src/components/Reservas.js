// src/components/Reservas.js
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    NumberField,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    DateTimeInput,
    NumberInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    TextInput,
    required,
    minValue,
    maxValue
} from 'react-admin';

const validateReservation = (values) => {
    const errors = {};
    if (!values.customerId) errors.customerId = 'Cliente é obrigatório';
    if (!values.tableId) errors.tableId = 'Mesa é obrigatória';
    if (!values.date) errors.date = 'Data e hora são obrigatórios';
    if (!values.numberOfGuests) errors.numberOfGuests = 'Número de pessoas é obrigatório';
    return errors;
};

const ReservaForm = () => (
    <SimpleForm validate={validateReservation}>
        <ReferenceInput source="customerId" reference="customers" label="Cliente">
            <SelectInput 
                optionText="name" 
                validate={required()}
                fullWidth
            />
        </ReferenceInput>
        
        <ReferenceInput source="tableId" reference="tables" label="Mesa">
            <SelectInput 
                optionText="number"
                validate={required()}
                helperText="Selecione uma mesa disponível"
                fullWidth
            />
        </ReferenceInput>
        
        <DateTimeInput 
            source="date" 
            label="Data e Hora"
            validate={required()}
            fullWidth
        />
        
        <NumberInput 
            source="numberOfGuests" 
            label="Nº de Pessoas"
            validate={[required(), minValue(1), maxValue(20)]}
            min={1}
            max={20}
            fullWidth
        />
        
        <SelectInput 
            source="status" 
            label="Estado" 
            choices={[
                { id: 'pending', name: 'Pendente' },
                { id: 'confirmed', name: 'Confirmada' },
                { id: 'cancelled', name: 'Cancelada' }
            ]}
            defaultValue="pending"
            fullWidth
        />
        
        <ArrayInput source="dishes" label="Pratos">
            <SimpleFormIterator>
                <ReferenceInput source="id" reference="dishes" label="Prato">
                    <SelectInput 
                        optionText="name"
                        fullWidth
                    />
                </ReferenceInput>
                <NumberInput 
                    source="quantity" 
                    label="Quantidade"
                    min={1}
                    defaultValue={1}
                    fullWidth
                />
                <TextInput 
                    source="notes" 
                    label="Observações"
                    multiline
                    fullWidth
                />
            </SimpleFormIterator>
        </ArrayInput>
    </SimpleForm>
);

export const ReservaList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="customerId" reference="customers" label="Cliente">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="tableId" reference="tables" label="Mesa">
                <TextField source="number" />
            </ReferenceField>
            <DateField source="date" label="Data" showTime />
            <NumberField source="numberOfGuests" label="Nº de Pessoas" />
            <TextField source="status" label="Estado" />
        </Datagrid>
    </List>
);

export const ReservaEdit = () => (
    <Edit>
        <ReservaForm />
    </Edit>
);

export const ReservaCreate = () => (
    <Create>
        <ReservaForm />
    </Create>
);