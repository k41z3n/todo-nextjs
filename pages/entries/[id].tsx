import { capitalize, Card, CardHeader, Grid, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Layout } from "../../components/layouts";
import { StatusEntryType } from '../../interfaces';
import { ChangeEvent, useState, useMemo } from 'react';


const validStatus: StatusEntryType[] = ['pennding', 'in-progress', 'finished'];


export const entryPage = () => {


    const [inputValue, setInputValue] = useState('')
    const [status, setStatus] = useState<StatusEntryType>('pennding')
    const [touch, setTouch] = useState(false)


    const isValid = useMemo(() => inputValue.length <= 0 && touch, [inputValue, touch])

    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as StatusEntryType)
    }

    const onSave = () => {
        console.log({ inputValue, status })
    }


    return (
        <Layout title="New Entry">
            <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entry: ${inputValue}`}
                            subheader={`Created ... min`} />
                        <CardContent>
                            <TextField
                                sx={{ margin: [2, 1] }}
                                fullWidth
                                placeholder='new entry'
                                autoFocus
                                multiline
                                label="New Entry"
                                value={inputValue}
                                onChange={onChangeInputValue}
                                helperText={isValid && 'type a value'}
                                onBlur={() => setTouch(true)}
                                error={isValid}
                            />
                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChange}
                                >
                                    {validStatus.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            label={capitalize(option)}
                                            value={option}
                                            control={<Radio />} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant='contained'
                                startIcon={<SaveOutlinedIcon />}
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>

                    </Card>
                </Grid>
                <IconButton sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }} >
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Grid>
        </Layout >
    )
}


export default entryPage;