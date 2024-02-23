import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TPHInputProps = {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
};

const PHInput = ({
    type,
    name,
    label,
    placeholder,
    disabled,
}: TPHInputProps) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Input
                            {...field}
                            type={type}
                            id={name}
                            placeholder={placeholder}
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

export default PHInput;
