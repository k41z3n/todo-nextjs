import { Box, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  // const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [inputValue, setinputValue] = useState(' ');
  const [isTouched, setisTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setinputValue(event.target.value);
  };

  const onSaveEntry = () => {
    if (inputValue.length <= 0) return;

    addNewEntry(inputValue);

    setIsAddingEntry(false);
    setisTouched(false);
    setinputValue('');
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginBottom: 1, marginTop: 2 }}
            multiline
            label="New entry"
            placeholder="write a entry"
            autoFocus
            helperText={inputValue.length <= 0 && isTouched && 'need a value'}
            error={inputValue.length <= 0 && isTouched}
            value={inputValue}
            onChange={onChangeInputValue}
            onBlur={() => setisTouched(true)}
          ></TextField>

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<SaveIcon />}
              onClick={onSaveEntry}
            >
              Guardar
            </Button>
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<AddCircleIcon />}
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar
        </Button>
      )}
    </Box>
  );
};
