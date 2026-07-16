import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { getDefaultValues, getValidFields } from '../../utils/schema';
import FieldRenderer from './FieldRenderer';

const FormRender = ({ schema = [] }) => {
  const [submittedData, setSubmittedData] = useState(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: getDefaultValues(schema),
  });

  const validFields = getValidFields(schema);
  const hasValidFields = validFields.length > 0;

  const onSubmit = (data) => {
    if (!hasValidFields) {
      setSubmittedData(null);
      return;
    }

    const renderedFieldKeys = new Set(
      validFields.map((field) =>
        field?.label?.trim().replace(/\s+/g, '_').toLowerCase(),
      ),
    );

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => renderedFieldKeys.has(key)),
    );

    setSubmittedData(filteredData);
  };

  useEffect(() => {
    reset(getDefaultValues(schema));
    setSubmittedData(null);
  }, [schema, reset]);

  if (schema.length === 0 || !hasValidFields) {
    return (
      <Paper variant='outlined' sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant='body1' sx={{ mb: 1 }}>
          {schema.length === 0
            ? 'No form to fill yet. Switch to the "Form Builder" tab to add some fields first.'
            : 'No valid fields are available to render yet.'}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Fill out the form
      </Typography>

      <Paper variant='outlined'>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ p: 2 }}>
            {validFields.map((field) => (
              <FieldRenderer key={field.id} field={field} control={control} />
            ))}
          </Stack>

          <Button type='submit' variant='contained' sx={{ m: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>

      {submittedData && (
        <Box sx={{ mt: 3 }}>
          <Alert severity='success'>Form submitted successfully</Alert>

          <Paper
            variant='outlined'
            sx={{
              p: 2,
              mt: 2,
              backgroundColor: 'black',
              color: 'background.default',
            }}
          >
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default FormRender;
