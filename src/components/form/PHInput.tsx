import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TPHInputProps = {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
};

const PHInput = ({ type, name, label, placeholder }: TPHInputProps) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item label={label}>
                        <Input
                            {...field}
                            type={type}
                            id={name}
                            placeholder={placeholder}
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PHInput;
