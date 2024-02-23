import { Form, Select } from 'antd';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

type TPHSelectProps = {
    name: string;
    label: string;
    placeholder?: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: 'multiple' | undefined;
    onValueChange: (value: string) => void;
};

const PHSelectWithWatch = ({
    name,
    label,
    placeholder,
    options,
    disabled,
    mode,
    onValueChange,
}: TPHSelectProps) => {
    const { control } = useFormContext();
    const inputValue = useWatch({ control, name });

    useEffect(() => {
        onValueChange(inputValue);
    }, [inputValue, onValueChange]);

    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Select
                            mode={mode}
                            style={{ width: '100%' }}
                            {...field}
                            placeholder={placeholder}
                            options={options}
                            disabled={disabled}
                        />
                        {error && (
                            <small style={{ color: 'red' }}>
                                {error.message}
                            </small>
                        )}
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PHSelectWithWatch;
