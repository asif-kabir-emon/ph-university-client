import { Input } from 'antd';
import { Controller } from 'react-hook-form';

type TPHInputProps = {
    type: string;
    name: string;
    label: string;
};

const PHInput = ({ type, name, label }: TPHInputProps) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            {label && (
                <label
                    htmlFor={name}
                    style={{
                        display: 'blocK',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    {label}
                </label>
            )}
            <Controller
                name={name}
                render={({ field }) => (
                    <Input {...field} type={type} id={name} />
                )}
            />
        </div>
    );
};

export default PHInput;
