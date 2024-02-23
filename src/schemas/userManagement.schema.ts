import { z } from 'zod';

export const semesterRegistrationSchema = z.object({
    academicSemester: z.string({
        required_error: 'Academic Semester is required',
    }),
    status: z.string({
        required_error: 'Status is required',
    }),
    startDate: z.any({
        required_error: 'Start Date is required',
    }),
    endDate: z.any({
        required_error: 'End Date is required',
    }),
    minCredit: z
        .string({
            required_error: 'Minimum Credit is required',
        })
        .min(1, 'Minimum Credit must be at least 1')
        .refine(
            (data) => {
                return Number(data) >= 1;
            },
            {
                message: 'Minimum Credit must be at least 1',
            }
        ),
    maxCredit: z
        .string({
            required_error: 'Maximum Credit is required',
        })
        .min(1, 'Maximum Credit must be at least 1')
        .refine(
            (data) => {
                return Number(data) >= 1 && Number(data) <= 23;
            },
            {
                message: 'Maximum Credit must be between 1 and 23',
            }
        ),
});

export const courseSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }),
    prefix: z.string({
        required_error: 'Prefix is required',
    }),
    code: z.string({
        required_error: 'Code is required',
    }),
    credits: z
        .string({
            required_error: 'Credits is required',
        })
        .min(1, 'Credits must be at least 1')
        .refine(
            (data) => {
                return Number(data) >= 1 && Number(data) <= 23;
            },
            {
                message: 'Credits must be between 1 and 23',
            }
        ),
    course: z
        .array(
            z.string({
                required_error: 'Course is required',
            })
        )
        .optional(),
});
