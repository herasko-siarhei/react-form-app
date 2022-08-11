import React, {ChangeEvent, FC} from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import {Alert, Paper, Stack, TextField, Typography} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LoadingButton} from '@mui/lab';

import api from 'api';
import {dateOfBirthRegExp, emailRegExp, nameAndSurnameRegExp, phoneNumberRegExp} from 'configs';
import {useInput, useRequest, useValidation} from 'hooks';

const Form: FC = () => {
        const {data, loading, run} = useRequest(api.sendFeedback);
        const nameAndSurname = useInput('');
        const nameAndSurnameValidation = useValidation(nameAndSurname.value, {
            empty: {
                value: true,
                message: 'The field must not be empty.'
            },
            regExp: {
                value: nameAndSurnameRegExp,
                message: 'The field must contain the name and surname in Latin, from 3 to 30 characters long.'
            }
        });
        const email = useInput('');
        const emailValidation = useValidation(email.value, {
            empty: {
                value: true,
                message: 'The field must not be empty.'
            },
            regExp: {
                value: emailRegExp,
                message: 'Incorrect email.'
            }
        });
        const phoneNumber = useInput('');
        const phoneNumberValidation = useValidation(phoneNumber.value, {
            empty: {
                value: true,
                message: 'The field must not be empty.'
            },
            regExp: {
                value: phoneNumberRegExp,
                message: 'Incorrect phone number.'
            }
        });
        const dateOfBirth = useInput('');
        const dateOfBirthValidation = useValidation(dateOfBirth.value, {
            empty: {
                value: true,
                message: 'The field must not be empty.'
            },
            regExp: {
                value: dateOfBirthRegExp,
                message: 'Incorrect date of birth.'
            }
        });

        function sendFeedback() {
            run({
                nameAndSurname: nameAndSurname.value,
                email: email.value,
                phoneNumber: phoneNumber.value,
                dateOfBirth: dateOfBirth.value
            });
        }

        return (
            <Stack minHeight="100vh" justifyContent="center" alignItems="center">
                <Stack component={Paper} width="320px" variant="outlined" padding={1} spacing={1}>
                    <Typography variant="h1" fontSize="1.5rem" fontWeight="bold" align="center">
                        Feedback
                    </Typography>
                    <TextField
                        value={nameAndSurname.value}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => nameAndSurname.setValue(e.target.value.toUpperCase())}
                        error={!!nameAndSurnameValidation}
                        helperText={nameAndSurnameValidation}
                        placeholder="Name and surname"
                        size="small"
                    />
                    <TextField
                        value={email.value}
                        onChange={email.changeValue}
                        error={!!emailValidation}
                        helperText={emailValidation}
                        placeholder="Email"
                        size="small"
                    />
                    <NumberFormat
                        value={phoneNumber.value}
                        //@ts-ignore
                        onChange={phoneNumber.changeValue}
                        error={!!phoneNumberValidation}
                        helperText={phoneNumberValidation}
                        customInput={TextField}
                        format="+7 ### ### ## ##"
                        placeholder="Phone number"
                        size="small"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={moment(dateOfBirth.value, 'MM/DD/YYYY')}
                            onChange={(newValue) => {
                                dateOfBirth.setValue(moment(newValue).format('MM/DD/YYYY'));
                            }}
                            openTo="year"
                            views={['year', 'month', 'day']}
                            disableFuture
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={!!dateOfBirthValidation}
                                    helperText={dateOfBirthValidation}
                                    placeholder="Date of birth"
                                    size="small"
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <LoadingButton loading={loading} onClick={sendFeedback} variant="contained">
                        Submit
                    </LoadingButton>
                    {data && (
                        <Alert severity={data.status}>
                            {data.message}
                        </Alert>
                    )}
                </Stack>
            </Stack>
        );
    }
;

export default Form;