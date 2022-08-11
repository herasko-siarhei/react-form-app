import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Validations} from 'types';
import {checkValidation} from 'utils';

export function useInput(initialValue: string): {
    value: string;
    setValue: (newValue: string) => void;
    changeValue: (event: ChangeEvent<HTMLTextAreaElement>) => void;
} {
    const [value, setValue] = useState<string>(initialValue);

    function changeValue(event: ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value);
    }

    return {value, setValue, changeValue};
}

export function useValidation(value: string, validations: Validations) {
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        setError(checkValidation(value, validations));
    }, [value, validations]);
    return error;
}

export function useRequest<TData, TParams extends any[]>(promise: (...args: TParams) => Promise<TData>): {
    data: TData | null;
    setData: (data: TData | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: Error | null;
    setError: (error: Error | null) => void;
    run: (...args: TParams) => void;
} {
    const [data, setData] = useState<TData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const run = useCallback((...args: TParams) => {
        setData(null);
        setLoading(true);
        setError(null);
        promise(...args)
            .then((response) => {
                setData(response);
                setError(null);
            })
            .catch((error: Error) => {
                setData(null);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [promise]);
    return {data, setData, loading, setLoading, error, setError, run};
}