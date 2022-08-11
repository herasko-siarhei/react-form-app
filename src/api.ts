import {dateOfBirthRegExp, emailRegExp, nameAndSurnameRegExp, phoneNumberRegExp} from 'configs';
import {checkValidation} from 'utils';
import {FeedbackData, FeedbackResponse} from 'types';

const api = {
    sendFeedback: (data: FeedbackData) => new Promise<FeedbackResponse>((res, rej) => {
        setTimeout(() => {
            const {nameAndSurname, email, phoneNumber, dateOfBirth} = data;
            const nameAndSurnameValidation = checkValidation(nameAndSurname, {
                empty: {
                    value: true,
                    message: 'Name and surname cannot be empty.'
                },
                regExp: {
                    value: nameAndSurnameRegExp,
                    message: 'Name and surname must be in Latin, at least 3 characters and no more than 30 characters.'
                }
            });
            const emailValidation = checkValidation(email, {
                empty: {
                    value: true,
                    message: 'Email cannot be empty'
                },
                regExp: {
                    value: emailRegExp,
                    message: 'Incorrect email.'
                }
            });
            const phoneNumberValidation = checkValidation(phoneNumber, {
                empty: {
                    value: true,
                    message: 'Phone number cannot be empty'
                },
                regExp: {
                    value: phoneNumberRegExp,
                    message: 'Incorrect phone number.'
                }
            });
            const dateOfBirthValidation = checkValidation(dateOfBirth, {
                empty: {
                    value: true,
                    message: 'Date of birth cannot be empty'
                },
                regExp: {
                    value: dateOfBirthRegExp,
                    message: 'Incorrect date of birth.'
                }
            });
            const errors = [nameAndSurnameValidation, emailValidation, phoneNumberValidation, dateOfBirthValidation].filter(validation => !!validation);
            res({
                status: errors.length ? 'error' : 'success',
                message: errors.length ? errors.join('; ') : `${nameAndSurname.split(' ')[0]}, form submitted successfully.`
            });
        }, 3000);
    })
};

export default api;