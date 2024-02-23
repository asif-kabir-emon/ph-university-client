import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import PHInput from '../../../components/form/PHInput';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import {
    bloodGroupOptions,
    genderOptions,
    occupationOptions,
} from '../../../constants/global';
import PHDatePicker from '../../../components/form/PHDatePicker';
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllSemestersQuery,
} from '../../../redux/feature/admin/academicManagement.api';
import { useAddStudentMutation } from '../../../redux/feature/admin/userManagement.api';
import { toast } from 'sonner';

const studentDefaultData = {
    name: {
        firstName: 'Md Sagur Khan',
        lastName: 'Khan',
    },
    gender: 'male',
    bloodGroup: 'B-',

    email: 'abcdef@gmail.com',
    contactNumber: '01116212631',
    emergencyContactNumber: '555-987-6543',
    presentAddress: '321 Oak St, Town',
    permanentAddress: '654 Pine Ave, City',

    guardian: {
        fatherName: 'David Johnson',
        fatherOccupation: 'Architect',
        fatherContactNumber: '777-111-22223',
        motherName: 'Sophia Johnson',
        motherOccupation: 'Lawyer',
        motherContactNumber: '999-333-4444',
    },

    localGuardian: {
        name: 'Oliver Brown',
        occupation: 'Business Owner',
        contactNumber: '888-444-5555',
        address: '456 Maple Ln, Suburb',
    },

    admissionSemester: '65d42eac3b03402a5a82f680',
    academicDepartment: '65d42c8d359997e1c800661f',
};

const CreateStudent = () => {
    const [addStudent] = useAddStudentMutation();

    const {
        data: academicSemesterData,
        isLoading: isLoadingAcademicSemesterData,
    } = useGetAllSemestersQuery(undefined);

    const {
        data: academicDepartmentData,
        isLoading: isLoadingAcademicDepartmentData,
    } = useGetAllAcademicDepartmentsQuery(undefined);

    const semesterOptions = academicSemesterData?.data?.map((semester) => ({
        value: semester._id,
        label: `${semester.name} - ${semester.year}`,
    }));

    const departmentOptions = academicDepartmentData?.data?.map(
        (department: { _id: any; name: any }) => ({
            value: department._id,
            label: department.name,
        })
    );

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating student...');
        const studentDataWithoutImage = { ...data };
        delete studentDataWithoutImage.image;
        const studentData = {
            password: 'Student123456',
            student: studentDataWithoutImage,
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(studentData));
        formData.append('file', data.image);

        try {
            const response = await addStudent(formData).unwrap();

            if (response.success) {
                toast.success('Student created successfully', { id: toastId });
            } else {
                toast.error(response.message || 'Failed to create student', {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || 'Failed to create student', {
                id: toastId,
            });
        }
    };

    return (
        <div>
            <Row>
                <Col span={24}>
                    <PHForm
                        onSubmit={onSubmit}
                        defaultValues={studentDefaultData}
                    >
                        <Divider>Personal Information</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="name.firstName"
                                    label="First Name"
                                    placeholder="First name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="name.middleName"
                                    label="Middle Name"
                                    placeholder="Middle name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="name.lastName"
                                    label="Last Name"
                                    placeholder="Last name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="gender"
                                    label="Gender"
                                    placeholder="Select gender"
                                    options={genderOptions}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHDatePicker
                                    name="dateOfBirth"
                                    label="Date of Birth"
                                    placeholder="Enter date of birth"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="bloodGroup"
                                    label="Blood Group"
                                    placeholder="Select blood group"
                                    options={bloodGroupOptions}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <Controller
                                    name="image"
                                    render={({
                                        field: { onChange, value, ...field },
                                    }) => (
                                        <Form.Item label="Picture">
                                            <Input
                                                type="file"
                                                value={value?.fileName}
                                                {...field}
                                                onChange={(e) => {
                                                    onChange(
                                                        e.target.files?.[0]
                                                    );
                                                }}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Divider>Contact Information</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="email"
                                    label="Email"
                                    placeholder="Enter email"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="contactNumber"
                                    label="Contact Number"
                                    placeholder="Enter contact number"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="emergencyContactNumber"
                                    label="Emergency Contact Number"
                                    placeholder="Enter emergency contact number"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="presentAddress"
                                    label="Present Address"
                                    placeholder="Enter present address"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="permanentAddress"
                                    label="Permanent Address"
                                    placeholder="Enter permanent address"
                                />
                            </Col>
                        </Row>
                        <Divider>Guardian Information</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.fatherName"
                                    label="Father's Name"
                                    placeholder="Enter father's name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="guardian.fatherOccupation"
                                    label="Father's Occupation"
                                    placeholder="Enter father's occupation"
                                    options={occupationOptions}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.fatherContactNumber"
                                    label="Father's Contact Number"
                                    placeholder="Enter father's contact number"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.motherName"
                                    label="Mother's Name"
                                    placeholder="Enter mother's name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="guardian.motherOccupation"
                                    label="Mother's Occupation"
                                    placeholder="Enter mother's occupation"
                                    options={occupationOptions}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.motherContactNumber"
                                    label="Mother's Contact Number"
                                    placeholder="Enter mother's contact number"
                                />
                            </Col>
                        </Row>
                        <Divider>Local Guardian Information</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.name"
                                    label="Local Guardian's Name"
                                    placeholder="Enter local guardian's name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="localGuardian.occupation"
                                    label="Local Guardian's Occupation"
                                    placeholder="Enter local guardian's occupation"
                                    options={occupationOptions}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.contactNumber"
                                    label="Local Guardian's Contact Number"
                                    placeholder="Enter local guardian's contact number"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.address"
                                    label="Local Guardian's Address"
                                    placeholder="Enter local guardian's address"
                                />
                            </Col>
                        </Row>
                        <Divider>Academic Information</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="admissionSemester"
                                    label="Admission Semester"
                                    placeholder="Enter admission semester"
                                    disabled={isLoadingAcademicSemesterData}
                                    options={semesterOptions}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="academicDepartment"
                                    label="Academic Department"
                                    placeholder="Enter academic department"
                                    disabled={isLoadingAcademicDepartmentData}
                                    options={departmentOptions}
                                />
                            </Col>
                        </Row>
                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateStudent;
