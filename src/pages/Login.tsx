import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/feature/auth/authApi';
import { TUser, setUser } from '../redux/feature/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const { register, handleSubmit } = useForm({
    //     defaultValues: { id: 'A-0001', password: 'Admin1234' },
    // });

    const [login, { isError }] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in');
        try {
            const userInfo = {
                id: data.id,
                password: data.password,
            };
            console.log(userInfo);
            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser;
            dispatch(
                setUser({
                    user: user,
                    token: res.data.accessToken,
                })
            );
            toast.success('Logged in', { id: toastId, duration: 2000 });
            if (isError === false) {
                navigate(`/${user.role}/dashboard`);
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId, duration: 2000 });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <PHForm onSubmit={onSubmit}>
                <PHInput type="text" name="id" label="Id" />
                <PHInput type="password" name="password" label="Password" />
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </PHForm>
        </Row>
    );
};

export default Login;
