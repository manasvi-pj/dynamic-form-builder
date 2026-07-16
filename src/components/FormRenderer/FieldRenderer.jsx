import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { FIELD_TYPES } from '../../utils/constants';
import { getValidFields } from '../../utils/schema';

const FieldRenderer = ({ field, control }) => {
  const fieldName = field?.label?.trim().replace(/\s+/g, '_').toLowerCase();
  const isRequired = Boolean(field?.required);
  const rules = {};

  if (isRequired) {
    if (field?.type === FIELD_TYPES.CHECKBOX) {
      rules.validate = (value) => value === true || 'This must be checked';
    } else {
      rules.required = 'This field is required';
    }
  }

  if (field?.type === FIELD_TYPES.NUMBER) {
    rules.pattern = { value: /^\d+$/, message: 'Please enter a valid number' };
  }

  if (!fieldName) return null;

  const validOptions = getValidFields(field?.options);
  const renderOptions = (validOptions ?? []).filter(
    (option) => (option?.label ?? '').trim() !== '',
  );

  return (
    <Controller
      key={field.id}
      name={fieldName}
      control={control}
      defaultValue={field?.type === FIELD_TYPES.CHECKBOX ? false : ''}
      rules={rules}
      render={({ field: controllerField, fieldState }) => {
        const errorMessage = fieldState.error?.message;

        switch (field?.type) {
          case FIELD_TYPES.CHECKBOX:
            return (
              <FormControl error={Boolean(fieldState.error)}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(controllerField.value)}
                      onChange={(event) =>
                        controllerField.onChange(event.target.checked)
                      }
                      name={controllerField.name}
                    />
                  }
                  label={field.label}
                />
                {fieldState.error && (
                  <FormHelperText>{errorMessage}</FormHelperText>
                )}
              </FormControl>
            );

          case FIELD_TYPES.DROPDOWN:
            if (renderOptions.length === 0) {
              return null;
            }

            return (
              <TextField
                {...controllerField}
                select
                label={field.label}
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={errorMessage}
              >
                {renderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            );

          case FIELD_TYPES.NUMBER:
            return (
              <TextField
                {...controllerField}
                label={field.label}
                fullWidth
                type='number'
                error={Boolean(fieldState.error)}
                helperText={errorMessage}
              />
            );

          default:
            return (
              <TextField
                {...controllerField}
                label={field.label}
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={errorMessage}
              />
            );
        }
      }}
    />
  );
};

export default FieldRenderer;
