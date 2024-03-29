import { Button, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/feature/auth/authSlice';
const { Header, Content } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <Layout style={{ height: '100%', minHeight: '100vh' }}>
            <SideBar />
            <Layout>
                <Header>
                    <Button type="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
