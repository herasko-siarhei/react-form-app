import {Validations} from 'types';

export function checkValidation(
    data: string,
    validations: Validations
): string | null {
    for (const validation in validations) {
        switch (validation) {
            case 'empty': {
                if (!data.trim()) {
                    // @ts-ignore
                    return validations[validation].message;
                }
                break;
            }
            case 'minLength': {
                // @ts-ignore
                if (data.trim().length < validations[validation].value) {
                    // @ts-ignore
                    return validations[validation].message;
                }
                break;
            }
            case 'maxLength': {
                // @ts-ignore
                if (data.trim().length > validations[validation].value) {
                    // @ts-ignore
                    return validations[validation].message;
                }
                break;
            }
            case 'regExp': {
                // @ts-ignore
                if (!validations[validation].value.test(data)) {
                    // @ts-ignore
                    return validations[validation].message;
                }
                break;
            }
            case 'callback': {
                // @ts-ignore
                if (validations[validation].value(data)) {
                    // @ts-ignore
                    return validations[validation].message;
                }
                break;
            }
        }
    }
    return null;
}