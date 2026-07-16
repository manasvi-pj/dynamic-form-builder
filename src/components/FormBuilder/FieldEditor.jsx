import React, { useEffect, useRef } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { FIELD_TYPE_OPTIONS, FIELD_TYPES } from '../../utils/constants';
import OptionsEditor from './OptionsEditor';

export default function FieldEditor({
  field,
  index,
  totalFields,
  onUpdate,
  onMoveUp,
  onMoveDown,
  onDelete,
  shouldFocus = false,
  onFocusHandled,
}) {
  const { label = '', type, required = false, options, id } = field || {};
  const cardRef = useRef(null);
  const labelInputRef = useRef(null);

  const handleLabelChange = (event) => {
    const nextLabel = event.target.value.replace(/ {2,}/g, ' ');
    onUpdate?.({ ...field, id, label: nextLabel });
  };

  const handleTypeChange = (event) => {
    onUpdate?.({ ...field, id, type: event.target.value });
  };

  const handleRequiredChange = (event) => {
    onUpdate?.({ ...field, id, required: event.target.checked });
  };

  const handleOptionsChange = (nextOptions) => {
    onUpdate?.({ ...field, id, options: nextOptions });
  };

  const hasValidDropdownOptions =
    type !== FIELD_TYPES.DROPDOWN ||
    (options ?? []).some((option) => (option?.label ?? '').trim() !== '');

  useEffect(() => {
    if (!shouldFocus) return;

    const frame = window.requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) {
        onFocusHandled?.();
        return;
      }

      const rect = card.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY - 88;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      window.setTimeout(() => {
        labelInputRef.current?.focus();
        onFocusHandled?.();
      }, 120);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [shouldFocus, onFocusHandled]);

  return (
    <Paper
      ref={cardRef}
      variant='outlined'
      sx={{ p: 2, mb: 2, scrollMarginTop: 88 }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{ alignItems: 'flex-start' }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              inputRef={labelInputRef}
              label='Field label'
              size='small'
              fullWidth
              value={label}
              onChange={handleLabelChange}
            />

            <TextField
              select
              label='Field Type'
              size='small'
              value={type}
              onChange={handleTypeChange}
              sx={{ minWidth: 150 }}
            >
              {FIELD_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack
            direction='row'
            spacing={2}
            sx={{ mt: 1, alignItems: 'center' }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(required)}
                  onChange={handleRequiredChange}
                  disabled={!hasValidDropdownOptions}
                />
              }
              label='Required'
            />
          </Stack>

          {type === FIELD_TYPES.DROPDOWN && (
            <OptionsEditor options={options} onChange={handleOptionsChange} />
          )}
        </Box>

        <Stack direction='row' spacing={0.5}>
          <Tooltip title='Move Up' arrow>
            <IconButton
              onClick={onMoveUp}
              aria-label='move up'
              disabled={index === 0}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Move Down' arrow>
            <IconButton
              onClick={onMoveDown}
              aria-label='move down'
              disabled={index === totalFields - 1}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Delete' arrow>
            <IconButton onClick={onDelete} color='error' aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}
