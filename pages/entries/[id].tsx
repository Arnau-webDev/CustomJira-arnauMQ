import { useState, ChangeEvent } from 'react';
import { NextPage } from "next";

import { Layout } from "../../components/layouts";

import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export const EntryPage: NextPage = () => {

    const [ inputValue, setInputValue ] = useState('');
    const [ status, setStatus ] = useState<EntryStatus>('pending');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus);
    };

    const handleClick = () => {
        console.log(inputValue, status);
    };

  return (
    <Layout title="asdasdasdas">
        <Grid 
            container
            justifyContent="center"
            sx={{marginTop: 2}}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader 
                        title={`Entry: ${ inputValue }`}
                        subheader={"Created 12 min ago"}
                    />
                    <CardContent>
                        <TextField 
                            sx={{marginBottom: 4}}
                            fullWidth
                            placeholder="New Entry"
                            autoFocus
                            multiline
                            label="New Entry"
                            value={inputValue}
                            onChange={handleInputChange}
                        />

                        <FormControl>
                            <FormLabel>State:</FormLabel>
                            <RadioGroup row value={status} onChange={onStatusChange}>
                                {validStatus.map( option => (
                                    <FormControlLabel 
                                        key={option} 
                                        value={option} 
                                        control={ <Radio />}
                                        label={capitalize(option)}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={ <SaveIcon />}
                            variant="contained"
                            fullWidth
                            onClick={handleClick}
                            disabled={inputValue.length <= 0}
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'
        }}>
            <DeleteIcon />
        </IconButton>


    </Layout>
  )
};


