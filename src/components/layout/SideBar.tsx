import { Layout, Menu } from 'antd';
import { adminPaths } from '../../routes/admin.routes';
import { sideBarItemsGenerator } from '../../utils/sideBarItemsGenerator';
import studentPaths from '../../routes/student.routes';
import facultyPaths from '../../routes/faculty.routes';
import { useAppSelector } from '../../redux/hooks';
import { TUser, useCurrentToken } from '../../redux/feature/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
const { Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
};

const SideBar = () => {
    const token = useAppSelector(useCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token);
    }
    let sideBarItems;

    switch ((user as TUser)?.role) {
        case userRole.ADMIN:
            sideBarItems = sideBarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.FACULTY:
            sideBarItems = sideBarItemsGenerator(
                facultyPaths,
                userRole.FACULTY
            );
            break;
        case userRole.STUDENT:
            sideBarItems = sideBarItemsGenerator(
                studentPaths,
                userRole.STUDENT
            );
            break;
        default:
            break;
    }

    return (
        <Sider breakpoint="lg" collapsedWidth="0">
            <div
                className="demo-logo-vertical"
                style={{
                    color: 'white',
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>PH University</h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={sideBarItems}
            />
        </Sider>
    );
};

export default SideBar;
