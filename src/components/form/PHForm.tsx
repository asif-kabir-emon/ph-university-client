import React from 'react';
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form';

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: React.ReactNode;
};

const PHForm = ({ onSubmit, children }: TFormProps) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default PHForm;
