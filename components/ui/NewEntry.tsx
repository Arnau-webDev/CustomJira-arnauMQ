import { useState, ChangeEvent, useContext } from 'react';

import { UIContext } from '../../context/ui';
import { EntriesContext } from '../../context/entries';

import { Box, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveAltOutlined';
import CancelIcon from '@mui/icons-material/DoDisturbAltOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry: React.FC = () => {

  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const handleAddTask = () => setIsAddingEntry(true);
  const handleCancelTask = () => setIsAddingEntry(false);
  const handleSaveEntry = () => {
    if(inputValue.length <= 0) setHasError(true);
    if(inputValue.length === 0) return;

    addNewEntry(inputValue);
    setInputValue('');
    setIsAddingEntry(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasError(false);
    setInputValue(e.target.value);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1.5}}>
        {
            isAddingEntry ? (
                <>
                    <TextField 
                        fullWidth 
                        sx={{ marginTop: 2, marginBottom: 1}} 
                        placeholder='Type here...'
                        autoFocus
                        multiline
                        label='New Entry'
                        helperText={hasError ? 'Field cannot be empty' : null}
                        error={hasError}
                        value={inputValue}
                        onChange={(e) => handleInputChange(e)}
                    />    

                    <Box display={'flex'} justifyContent={'space-between'} marginTop={2}>
                        <Button variant='contained' endIcon={ <CancelIcon /> } onClick={handleCancelTask}>
                            Cancel
                        </Button>
                        <Button variant='contained' color='secondary' endIcon={ <SaveIcon /> } onClick={handleSaveEntry}>
                            Save
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    startIcon={ <AddIcon />}
                    fullWidth
                    variant='outlined'
                    onClick={handleAddTask}
                > 
                    Add new task
                </Button>
            )
        }
    </Box>
  )
}
