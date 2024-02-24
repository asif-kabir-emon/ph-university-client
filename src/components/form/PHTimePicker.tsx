import { Controller, useFormContext } from 'react-hook-form';
import { Form, TimePicker } from 'antd';

type TPHDatePicker = {
    name: string;
    label: string;
    placeholder?: string;
};

const PHTimePicker = ({ name, label, placeholder }: TPHDatePicker) => {
    const { control } = useFormContext();

    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Form.Item label={label}>
                            <TimePicker
                                {...field}
                                size="large"
                                style={{ width: '100%' }}
                                placeholder={placeholder}
                                format="HH:mm"
                            />
                            {error && (
                                <small style={{ color: 'red' }}>
                                    {error.message}
                                </small>
                            )}
                        </Form.Item>
                    </>
                )}
            ></Controller>
        </div>
    );
};

export default PHTimePicker;
