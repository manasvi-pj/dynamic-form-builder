import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FieldEditor from './FieldEditor';
import {
  createField,
  hasDuplicateFieldLabel,
  hasEmptyFieldLabel,
} from '../../utils/schema';

const FormBuilder = ({ schema = [], onSchemaChange }) => {
  const [showMessage, setShowMessage] = useState(null);
  const [messageType, setMessageType] = useState('empty');
  const [focusFieldId, setFocusFieldId] = useState(null);

  const duplicateFields = hasDuplicateFieldLabel(schema);

  const handleAddField = () => {
    if (hasEmptyFieldLabel(schema)) {
      setMessageType('empty');
      setShowMessage(true);
      return;
    }

    if (duplicateFields) {
      setMessageType('duplicate');
      setShowMessage(true);
      return;
    }

    const newField = createField();
    setFocusFieldId(newField.id);
    onSchemaChange?.([...schema, newField]);
  };

  const handleUpdateField = (updatedField) => {
    const updatedData = schema?.map((field) =>
      field.id === updatedField.id ? { ...field, ...updatedField } : field,
    );
    onSchemaChange?.(updatedData);
  };

  const handleDeleteField = (id) => {
    const updatedData = schema?.filter((field) => field.id !== id);
    onSchemaChange?.(updatedData);
  };

  const handleMove = (index, direction) => {
    if (index < 0 || index >= schema.length) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= schema.length) return;

    const updatedData = [...schema];
    const [movedField] = updatedData.splice(index, 1);
    updatedData.splice(targetIndex, 0, movedField);
    onSchemaChange?.(updatedData);
  };

  useEffect(() => {
    if (duplicateFields) {
      setMessageType('duplicate');
      setShowMessage(true);
    }
  }, [duplicateFields]);

  return (
    <Box>
      <Stack
        direction='row'
        sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant='h6'>Form fields ({schema.length})</Typography>
        <Button variant='contained' onClick={handleAddField}>
          Add field
        </Button>
      </Stack>

      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='error' onClick={() => setShowMessage(false)}>
          {messageType === 'duplicate'
            ? 'Field labels must be unique. Please use a different label.'
            : 'Please fill the existing field label before adding another field.'}
        </Alert>
      </Snackbar>

      {schema.length === 0 ? (
        <Paper
          variant='outlined'
          sx={{
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant='body1' sx={{ mb: 1 }}>
            No fields yet. Click "Add field" to add fields.
          </Typography>
        </Paper>
      ) : (
        schema.map((field, index) => (
          <Box key={field.id}>
            <FieldEditor
              field={field}
              index={index}
              totalFields={schema?.length}
              onUpdate={handleUpdateField}
              onMoveUp={() => handleMove(index, 'up')}
              onMoveDown={() => handleMove(index, 'down')}
              onDelete={() => handleDeleteField(field.id)}
              shouldFocus={focusFieldId === field.id}
              onFocusHandled={() => setFocusFieldId(null)}
            />
          </Box>
        ))
      )}
    </Box>
  );
};

export default FormBuilder;
