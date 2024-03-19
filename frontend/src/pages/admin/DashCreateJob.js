import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { registerAjobAction, uploadFileAction } from '../../redux/actions/jobAction';


const validationSchema = yup.object({
    title: yup
        .string('Enter a job title')
        .required('title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
    salary: yup
        .number('Enter a salary')
        .required('Salary is required'),
    location: yup
        .string('Enter a location')
        .required('Location is required'),
    jobType: yup
        .string('Enter a Category')
        .required('Category is required'),
    // pdfFile: Yup.mixed() // Validate the file
    // .required('PDF file is required')
    // .test('fileSize', 'File size is too large', value => {
    //     if (!value) return true; // Allow empty values (e.g., when no file is selected)
    //     return value && value.size <= FILE_SIZE_LIMIT; // Define FILE_SIZE_LIMIT constant
    // })
    // .test('fileType', 'Invalid file type', value => {
    //     if (!value) return true; // Allow empty values (e.g., when no file is selected)
    //     return value && SUPPORTED_FORMATS.includes(value.type); // Define SUPPORTED_FORMATS constant
    // }),

});


const DashCreateJob = () => {
    const dispatch = useDispatch();

    //job type
    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, []);

    const { jobType } = useSelector(state => state.jobTypeAll);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            salary: '',
            location: '',
            jobType: '',
            pdf: "",
            image: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {

            const formData_pdf = new FormData();
            const formData_image = new FormData();
            formData_pdf.append('file', values.pdf_file); // Add the file to the FormData object
            formData_image.append('file', values.image_file);
            dispatch(registerAjobAction(values, formData_pdf, formData_image))
            // dispatch(uploadFileAction(formData))
            // alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });

    // Function to handle file input change
    const handleFileChange = event => {
        formik.setFieldValue('pdf', event.currentTarget.files[0].name);
        console.log(event.currentTarget.files[0])
        formik.setFieldValue('pdf_file', event.currentTarget.files[0]);
    };

    const handleFileChange_image = event => {
        formik.setFieldValue('image', event.currentTarget.files[0].name);
        console.log(event.currentTarget.files[0])
        formik.setFieldValue('image_file', event.currentTarget.files[0]);
    };



    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Register a Job
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="title"
                            label="Title"
                            name='title'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="salary"
                            name="salary"
                            label="Salary"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Salary"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.salary && Boolean(formik.errors.salary)}
                            helperText={formik.touched.salary && formik.errors.salary}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="jobType"
                            id="jobType"
                            select
                            label="Category"
                            value={formik.values.jobType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                            helperText={formik.touched.jobType && formik.errors.jobType}
                        >

                            <MenuItem key={""} value={""}>

                            </MenuItem>

                            {jobType && jobType.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.jobTypeName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="pdf_file"
                            name="pdf_file"
                            type="file" // Use type="file" for file input
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleFileChange} // Handle file input change
                            error={formik.touched.pdfFile && Boolean(formik.errors.pdfFile)}
                            helperText={formik.touched.pdfFile && formik.errors.pdfFile}
                        />

                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="image_file"
                            name="image_file"
                            type="file" // Use type="file" for file input
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleFileChange_image} // Handle file input change
                            error={formik.touched.pdfFile && Boolean(formik.errors.pdfFile)}
                            helperText={formik.touched.pdfFile && formik.errors.pdfFile}
                        />

                        <Button fullWidth variant="contained" type='submit' >Create job</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashCreateJob