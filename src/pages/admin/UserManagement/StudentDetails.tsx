import { useParams } from 'react-router-dom';
import { useGetStudentQuery } from '../../../redux/feature/admin/userManagement.api';
import { Avatar, Col, Divider, Flex, Row, Spin } from 'antd';
import InformationBlock from '../../../components/ui/InformationBlock';
import { UserOutlined } from '@ant-design/icons';

const StudentDetails = () => {
    const params = useParams();
    const { data: studentData, isLoading } = useGetStudentQuery(params);
    console.log(studentData);

    if (isLoading) {
        return (
            <div className="my-20">
                <Flex justify="center" align="center">
                    <Spin tip="Loading" size="large" />
                </Flex>
            </div>
        );
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <div className="text-2xl font-bold mb-5 text-center">
                        <Avatar
                            size={{
                                xs: 24,
                                sm: 32,
                                md: 40,
                                lg: 64,
                                xl: 80,
                                xxl: 100,
                            }}
                            icon={
                                studentData?.data.profileImage ? (
                                    <img src={studentData?.data.profileImage} />
                                ) : (
                                    <UserOutlined />
                                )
                            }
                        />
                    </div>
                    <Divider
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        Personal Information
                    </Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="First Name"
                                text={studentData?.data.name.firstName}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Middle Name"
                                text={
                                    studentData?.data.name.middleName || 'N/A'
                                }
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Last Name"
                                text={studentData?.data.name.lastName}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Gender"
                                text={
                                    studentData?.data.gender
                                        .charAt(0)
                                        .toUpperCase() +
                                    studentData?.data.gender.slice(1)
                                }
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Date of Birth"
                                text={
                                    studentData?.data.dateOfBirth.split('T')[0]
                                }
                            />
                        </Col>
                    </Row>
                    <Divider
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        Contact Information
                    </Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Email"
                                text={studentData?.data.email}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Contact Number"
                                text={studentData?.data.contactNumber}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Present Address"
                                text={studentData?.data.presentAddress}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Permanent Address"
                                text={studentData?.data.permanentAddress}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="City"
                                text={studentData?.data.city}
                            />
                        </Col>
                    </Row>
                    <Divider
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        Guardian Information
                    </Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Father's Name"
                                text={studentData?.data.guardian.fatherName}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Father's Occupation"
                                text={
                                    studentData?.data.guardian.fatherOccupation
                                }
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Father's Contact Number"
                                text={
                                    studentData?.data.guardian
                                        .fatherContactNumber
                                }
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Mother's Name"
                                text={studentData?.data.guardian.motherName}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Mother's Occupation"
                                text={
                                    studentData?.data.guardian.motherOccupation
                                }
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Mother's Contact Number"
                                text={
                                    studentData?.data.guardian
                                        .motherContactNumber
                                }
                            />
                        </Col>
                    </Row>
                    <Divider
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        Local Guardian Information
                    </Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Local Guardian's Name"
                                text={studentData?.data.localGuardian.name}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Local Guardian's Occupation"
                                text={
                                    studentData?.data.localGuardian.occupation
                                }
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Local Guardian's Contact Number"
                                text={
                                    studentData?.data.localGuardian
                                        .contactNumber
                                }
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Local Guardian's Address"
                                text={studentData?.data.localGuardian.address}
                            />
                        </Col>
                    </Row>
                    <Divider
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        Academic Information
                    </Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Student ID"
                                text={studentData?.data.id}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Academic Semester"
                                text={`${studentData?.data.admissionSemester.name} - ${studentData?.data.admissionSemester.year}`}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Academic Department"
                                text={studentData?.data.academicDepartment.name}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <InformationBlock
                                header="Admission Faculty"
                                text={
                                    studentData?.data.academicDepartment
                                        .academicFaculty.name
                                }
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default StudentDetails;
