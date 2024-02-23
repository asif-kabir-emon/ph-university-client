import { DatePicker, Form } from 'antd';
import { Controller } from 'react-hook-form';

type TPHInputDatePickerProps = {
    name: string;
    label: string;
    placeholder?: string;
};

const PHDatePicker = ({
    name,
    label,
    placeholder,
}: TPHInputDatePickerProps) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <DatePicker
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            style={{ width: '100%' }}
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

export default PHDatePicker;
