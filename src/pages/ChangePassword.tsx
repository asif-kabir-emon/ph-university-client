import { Button, Row } from 'antd';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useChangePasswordMutation } from '../redux/feature/admin/userManagement.api';
import { toast } from 'sonner';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/feature/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Changing password...');

        const changePasswordData = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };

        try {
            const response = await changePassword(changePasswordData).unwrap();

            if (response.success) {
                toast.success(response.message, {
                    id: toastId,
                    duration: 2000,
                });
                dispatch(logout());
                navigate('/login', { replace: true });
            } else {
                toast.error(response.message, {
                    id: toastId,
                    duration: 2000,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId, duration: 2000 });
        }
    };

    return (
        <div>
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <PHForm onSubmit={onSubmit}>
                    <PHInput
                        type="text"
                        name="oldPassword"
                        label="Old Password"
                        placeholder="Enter your old password"
                    />
                    <PHInput
                        type="text"
                        name="newPassword"
                        label="New Password"
                        placeholder="Enter your new password"
                    />
                    <Button htmlType="submit">Change Password</Button>
                </PHForm>
            </Row>
        </div>
    );
};

export default ChangePassword;
