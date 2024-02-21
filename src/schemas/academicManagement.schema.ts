import { z } from 'zod';

export const academicSemesterSchema = z.object({
    name: z.string({
        required_error: 'Please select a Name',
    }),
    year: z.string({
        required_error: 'Please select a Year',
    }),
    startMonth: z.string({
        required_error: 'Please select a Start Month',
    }),
    endMonth: z.string({
        required_error: 'Please select a End Month',
    }),
});

export const createAcademicFacultySchema = z.object({
    name: z
        .string({
            required_error: 'Please enter a Faculty Name',
        })
        .min(3, 'Faculty Name must be at least 3 characters')
        .refine((value) => value.trim() !== '', 'Please enter a Faculty Name'),
});

export const createAcademicDepartmentSchema = z.object({
    name: z
        .string({
            required_error: 'Please enter a Department Name',
        })
        .min(3, 'Department Name must be at least 3 characters')
        .refine(
            (value) => value.trim() !== '',
            'Please enter a Department Name'
        ),
    academicFaculty: z.string({
        required_error: 'Please select a Faculty',
    }),
});
