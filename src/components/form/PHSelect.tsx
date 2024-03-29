import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TPHSelectProps = {
    name: string;
    label: string;
    placeholder?: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: 'multiple' | undefined;
};

const PHSelect = ({
    name,
    label,
    placeholder,
    options,
    disabled,
    mode,
}: TPHSelectProps) => {
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

export default PHSelect;
