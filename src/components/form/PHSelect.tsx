import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TPHSelectProps = {
    name: string;
    label: string;
    placeholder?: string;
    options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelect = ({ name, label, placeholder, options }: TPHSelectProps) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Select
                            style={{ width: '100%' }}
                            {...field}
                            placeholder={placeholder}
                            options={options}
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
