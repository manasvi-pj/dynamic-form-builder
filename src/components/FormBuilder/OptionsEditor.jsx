import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  createOption,
  hasDuplicateFieldLabel,
  hasEmptyFieldLabel,
} from '../../utils/schema';

const OptionsEditor = ({ options = [], onChange }) => {
  const [validationMessage, setValidationMessage] = useState('');
  const [showMessage, setShowMessage] = useState(null);
  const [messageType, setMessageType] = useState('empty');

  const duplicateFields = hasDuplicateFieldLabel(options);

  const normalizeOptionValue = (value = '') =>
    value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]+/g, '');

  const hasEmptyOption = (options ?? []).some(
    (option) => (option?.label ?? '').trim() === '',
  );

  const normalizedLabels = (options ?? [])
    .map((option) => (option?.label ?? '').trim().toLowerCase())
    .filter(Boolean);

  const hasDuplicateOptionLabel =
    new Set(normalizedLabels).size !== normalizedLabels.length;

  const canAddOption = !hasEmptyOption && !hasDuplicateOptionLabel;

  const handleOptionLabelChange = (index, event) => {
    const nextLabel = event.target.value.replace(/ {2,}/g, ' ');
    const trimmedLabel = nextLabel.trim().toLowerCase();
    const nextOptions = (options ?? []).map((option, optionIndex) =>
      optionIndex === index
        ? {
            ...option,
            label: nextLabel,
            value: normalizeOptionValue(nextLabel),
          }
        : option,
    );

    onChange?.(nextOptions);
  };

  const handleAddOption = () => {
    if (hasEmptyFieldLabel(options)) {
      setMessageType('empty');
      setShowMessage(true);
      return;
    }

    if (duplicateFields) {
      setMessageType('duplicate');
      setShowMessage(true);
      return;
    }

    setValidationMessage('');
    onChange?.([...options, createOption()]);
  };

  const handleRemoveOption = (index) => {
    const nextOptions = (options ?? []).filter(
      (_, optionIndex) => optionIndex !== index,
    );
    onChange?.(nextOptions);
  };

  useEffect(() => {
    if (duplicateFields) {
      setMessageType('duplicate');
      setShowMessage(true);
    }
  }, [duplicateFields]);

  return (
    <Box
      sx={{
        mt: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 1.5,
      }}
    >
      <Typography variant='subtitle2' sx={{ mb: 1 }}>
        Dropdown options
      </Typography>

      <Stack spacing={1}>
        {options.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>
            No options yet.
          </Typography>
        ) : (
          options.map((option, optionIndex) => (
            <Stack
              key={option?.id ?? `${optionIndex}-${option?.label ?? 'option'}`}
              direction='row'
              spacing={1}
              sx={{ alignItems: 'center' }}
            >
              <TextField
                label='Option name'
                size='small'
                fullWidth
                value={option?.label ?? ''}
                onChange={(event) =>
                  handleOptionLabelChange(optionIndex, event)
                }
              />

              <Tooltip title='Remove option' arrow>
                <IconButton
                  onClick={() => handleRemoveOption(optionIndex)}
                  color='error'
                  aria-label={`remove option ${optionIndex + 1}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          ))
        )}
      </Stack>

      <Button
        variant='outlined'
        size='small'
        sx={{ mt: 1.5 }}
        onClick={handleAddOption}
      >
        Add option
      </Button>

      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='error' onClick={() => setShowMessage(false)}>
          {messageType === 'duplicate'
            ? 'Remove duplicate option names before adding another one.'
            : 'Fill the current option name before adding another one.'}
        </Alert>
      </Snackbar>

      {validationMessage ? (
        <Typography
          variant='caption'
          color='error'
          sx={{ mt: 1, display: 'block' }}
        >
          {validationMessage}
        </Typography>
      ) : null}
    </Box>
  );
};

export default OptionsEditor;
