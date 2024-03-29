import {useEffect, useState} from "react";
import classes from "./styles.module.css";
import {
    Button, FormControl, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import { DoctorApi } from "../../client/backend-api/doctor"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export const ScheduleList = () => {
    const[query, setQuery] = useState("")
    const [schedules, setSchedule] = useState([])
    const [selectedDay, setSelectedDay] = useState('')

    const handleChange = (event) => {
        setSelectedDay(event.target.value)
    }

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [openModal, setOpenModal] = useState(false)
    const [activeScheduleId, setActiveScheduleId] = useState("")
    const [doctors, setDoctors] = useState([])
    const [loading,setloading] = useState()
    const [error,setError] = useState()

    const fetchDoctors = async () => {
        const doctors = await DoctorApi.getAllDoctors()
        setDoctors(doctors)

        setSchedule(doctors.map(doctor =>({
            "id": doctor.id,
            "name": doctor.name + doctor.surname,
            "specialization": doctor.specialization
        })))

    }

    useEffect(() => {
        fetchDoctors().catch(console.error)

    }, [])



    // const fetchSchedule = async () => {
    //     const schedules = await ScheduleApi.getAllTimeSlots()
    //     setSchedule(schedules)
    // }


    // useEffect(() => {
    //   fetchSchedule().catch(console.error)
    // }, [])

    const deleteSchedule = (scheduleId) => {
        // if (schedule.length) {
        //     ScheduleApi.deleteDoctor(scheduleId).then(({ success }) => {
        //         fetchSchedule().catch(console.error)
        //         setOpenModal(false)
        //         setActiveScheduleId("")
        //     })
        // }
    }



    return(
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5"> Schedule appointment with Doctor</Typography>
                <input type = "text"
                       placeholder="Search"
                       className="search"
                       onChange={(e)=> setQuery(e.target.value.toLowerCase())}/>

            </div>

            {schedules.length > 0 ? (

                <>


                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Specialization</TableCell>
                                        <TableCell align="right">Appointment Day</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {((rowsPerPage > 0
                                            ? schedules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : schedules) &&  ((schedules.filter(schedule=>schedule.name.toLowerCase().includes(query) || schedule.specialization.toLowerCase().includes(query))) )
                                    ).map((schedule) => (
                                        <TableRow key={schedule.id}>
                                            <TableCell component="th" scope="row">
                                                {schedule.name}
                                            </TableCell>
                                            <TableCell align="right">{schedule.specialization}</TableCell>
                                            <TableCell align="right">
                                                <FormControl fullWidth required={true}>
                                                    <InputLabel id="demo-simple-select-label">Day</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedDay}
                                                        label="Age"
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={1}>Monday</MenuItem>
                                                        <MenuItem value={2}>Tuesday</MenuItem>
                                                        <MenuItem value={3}>Wednesday</MenuItem>
                                                        <MenuItem value={4}>Thursday</MenuItem>
                                                        <MenuItem value={5}>Friday</MenuItem>

                                                    </Select>
                                                </FormControl>

                                            </TableCell>
                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                    <Button
                                                        variant="contained"
                                                        component={RouterLink}
                                                        size="small"
                                                        to={`/admin/confirmation/${schedule.id}/${selectedDay}`}
                                                    >
                                                        Get Appointment
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={schedules.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />

                        {loading ? (<h1>Details about doctors</h1>) :error ? (<h1>Something went wrong</h1>) : (doctors.map(doctor=>{
                            return (

                                <div className="wrapper">
                                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                                        <Card className="card" sx={{ maxWidth: 345 }}>
                                            <div className={classes.imageContainer}>
                                                <img
                                                    width="100%"
                                                    height="100%"
                                                    className={classes.imageContainer}
                                                    src={doctor.photo}/>
                                            </div>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {doctor.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <b>  <p > Specialization:    {doctor.name}</p>
                                                        <p> Contact Number:    {doctor.contactNum}</p>
                                                        <p> Schedule:    {doctor.schedule}</p>
                                                        <p> Price:    {doctor.price}</p>
                                                        <p> Rating:     {doctor.rating}</p>   </b>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            );
                        })) }
                    </div>
                </>
            ) : (
                <Typography variant="h5">No appointment exists!</Typography>
            )}
        </>
    )

}