import { useState, ChangeEvent, useContext } from 'react';
import { NextPage } from "next";
import { GetServerSideProps } from 'next';

import { Layout } from "../../components/layouts";

import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { dbEntries } from '../../database';

import { Entry, EntryStatus } from "../../interfaces";
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface EntryPageProps {
    entry: Entry
}

export const EntryPage: NextPage<EntryPageProps> = ({ entry }) => {

    console.log(entry);

    const { updateEntry } = useContext(EntriesContext);

    const [ inputValue, setInputValue ] = useState(entry.description);
    const [ status, setStatus ] = useState<EntryStatus>(entry.status);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus);
    };

    const handleClick = () => {
        if(inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        } 
        updateEntry(updatedEntry, true);
    };

  return (
    <Layout title='Single Entry'>
        <Grid 
            container
            justifyContent="center"
            sx={{marginTop: 2}}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader 
                        title={`Entry`}
                        subheader={`Created ${dateFunctions.getFormatDistanceToNow(entry.createdAt)} ago`}
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;
