import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../component/Footer'
import LoadingBox from '../component/LoadingBox'
import Navbar from '../component/Navbar'
import { jobLoadSingleAction } from '../redux/actions/jobAction'
import Button from '@mui/material/Button'
import { userApplyJobAction } from '../redux/actions/userAction'
import { useTheme } from '@emotion/react'
import PdfComp from "./pdfComp";


const SingleJob = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { singleJob, loading } = useSelector(state => state.singleJob)
    const { id } = useParams();
    const [pdfFile, setPdfFile] = useState(null);
    useEffect(() => {
        dispatch(jobLoadSingleAction(id));
    }, [id]);

    // const applyForAJob = () => {
    //     dispatch(userApplyJobAction({
    //         title: singleJob && singleJob.title,
    //         description: singleJob && singleJob.description,
    //         salary: singleJob && singleJob.salary,
    //         location: singleJob && singleJob.location
    //     }))
    // }

    const applyForAJob = () => {
        window.open('https://www.facebook.com/profile.php?id=61555748623456', '_blank');
    };

    // setPdfFile(`http://localhost:9000/files/${singleJob.pdf}`)

    // console.log(singleJob.description)

    console.log(singleJob);

    return (
        <>

            <Box sx={{ bgcolor: "#fafafa" }}>

                <Navbar />
                <Box sx={{ height: 'calc(100vh - 140px)' }}>
                    <Container sx={{ pt: '30px' }}>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Box sx={{ flex: 4, p: 2 }}>

                                {
                                    loading ? <LoadingBox /> :

                                        <Card sx={{ bgcolor: palette.primary.white }} >
                                            <CardContent>
                                                <Typography variant="h5" component="h3">
                                                    {singleJob && singleJob.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Gaji Bersih Tedori</Box>: ${singleJob && singleJob.salary}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Kategori</Box>: {singleJob && singleJob.jobType ? singleJob.jobType.jobTypeName : "No category"}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Lokasi</Box>: {singleJob && singleJob.location}
                                                </Typography>
                                                <Typography variant="body2" sx={{ pt: 2 }}>
                                                    {/* <h3>Job description:</h3> */}
                                                    {singleJob && singleJob.description}
                                                </Typography>
                                                <Typography>
                                                    {/* <PdfComp pdfFile={`http://localhost:9000/files/${singleJob.pdf}`}/> */}
                                                    {singleJob && (
                                                        <PdfComp pdfFile={`http://localhost:9000/files/${singleJob.pdf}`} />
                                                    )}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                }
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                                    <Button onClick={applyForAJob} sx={{ fontSize: "13px" }} variant='contained'>DM Saya Untuk Daftar (Sebutkan No OP-...)</Button>
                                </Card>
                            </Box>

                        </Stack>

                    </Container>
                </Box>
                <Footer />
            </Box>
        </>
    )
}

export default SingleJob