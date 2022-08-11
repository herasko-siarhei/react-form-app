export type FeedbackData = {
    nameAndSurname: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
}

export type FeedbackResponse = {
    status: 'success' | 'error';
    message: string;
}

export type Validations = {
    empty?: {
        value: boolean;
        message: string;
    };
    minLength?: {
        value: number;
        message: string;
    };
    maxLength?: {
        value: number;
        message: string;
    };
    regExp?: {
        value: RegExp;
        message: string;
    };
    callback?: {
        value: () => boolean;
        message: string;
    };
}