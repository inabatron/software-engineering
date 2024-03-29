import {useEffect, useState} from "react"
import {Link, Route, Routes, useNavigate} from "react-router-dom"
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material"
import {useUser} from "../../context/user-context"
import AdbIcon from "@mui/icons-material/Adb"
import {PatientsList} from "../list/patients-list";
import {DoctorsList} from "../list/doctors-list";
import {LoginDialog} from "../login/login-dialog";
import {WithLoginProtector} from "../access-control/login-protector"
import {PatientForm} from "../register-form/patient-form"
import {MainPage} from "../../main_page";
import {DoctorForm} from "../register-form/doctor-form";
import {PatientsDetails} from "../details/patients_details";
import {DoctorsDetails} from "../details/doctors_details";
import {ScheduleList} from "../list/schedule-list";
import {Confirmation} from "../details/confirmation";
import {MainPageForPatient} from "../main-pages/mainpage-for-patient";
import { RecordsOfAllDocs } from "../list/records-list"
import { ConfirmList } from "../list/confirm-list"
import {MainPageForAdmin} from "../main-pages/mainpage-for-admin";
import {alignProperty} from "@mui/material/styles/cssUtils";
import {MainPageForDoctors} from "../main-pages/mainpage-for-doctor";


export  const AppLayout = () => {
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const { user, loginUser, logoutUser} = useUser()
    const [index, setIndex] = useState(null)
    const [response, setResponse] = useState("")
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
        if(index === 0) {
            navigate(`/patient/${response}`)
        } else if(index === 1) {
            navigate(`/doctors/${response}`)
        } else if(index === 2){
            navigate("/admin/")
        } else {
            navigate('/')
        }
    }

    const navigateToPersonalPage = () => {
        //vremenno
        setAnchorElUser(null)
        console.log(index)
        if(index === 0) {
            navigate(`/admin/patients/${response}`)
        } else if(index === 1) {
            navigate(`/admin/doctors/${response}`)
        } else if(index === 2){
            navigate("/admin/")
        }
    }

    const handleLoginSubmit = async (username, password, index) => {
        setIndex(index)
        const response = await loginUser(username, password, index)
        setResponse(response)
        setOpenLoginDialog(false)
    }

    const handleLoginClose = () => {
        setOpenLoginDialog(false)
    }

    const handleLogout = () => {
        logoutUser()
        setIndex(null)
        handleCloseUserMenu()
    }

    useEffect(() => {
        console.log(index)
        if(index === 0) {
            navigate(`/patient/${response}`)
        } else if(index === 1) {
            navigate(`/doctor/${response}`)
        } else if(index === 2){
            navigate(`/doctor/${response}`)
        } else {
            console.log("for ")
            navigate('/')
        }
    }, [user])

    return(
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: "flex", mr: 1 }} />
                        <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 1,
                                    display: "flex",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "white",
                                }}
                            >
                                DenSys.me
                            </Typography>
                        </Link>


                        <Box
                            sx={{
                                display: "flex",
                                flexGrow: 0,
                                flexDirection: "row",
                                p: 1,
                                m: 1
                            }}
                        >
                            <Button
                                    onClick={() => {
                                        navigate("/")
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Home
                            </Button>
                            <Button href="#about"
                                    sx={{ my: 2, mr: 3, color: "white", display: "block", whiteSpace: "nowrap" }}
                            >
                                About us
                            </Button>


                            {user ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar> {"T"} </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={navigateToPersonalPage}>
                                            <Typography textAlign="center">Personal page</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setOpenLoginDialog(true)
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route path="/" exact element={<MainPage/>}/>
                <Route path="admin/patients" element={
                    <WithLoginProtector>
                        <PatientsList/>
                    </WithLoginProtector>}
                       exact/>
                <Route path="admin/doctors" element={
                    <WithLoginProtector>
                        <DoctorsList/>
                    </WithLoginProtector>}
                       exact
                />
                <Route path="admin/confirmlist" element={
                    <WithLoginProtector>
                        <ConfirmList/>
                    </WithLoginProtector>}
                       exact
                />
                <Route path="admin/schedule" element={
                    <ScheduleList/>}
                />
                <Route 
                   path='/admin/confirmation/:doctorId/:appointmentDay'
                   element={<Confirmation/>}
                />
                <Route
                    path="/admin/patients/:patientId"
                    element={<PatientsDetails />}
                />
                <Route
                    path="/admin/doctors/:doctorId"
                    element={<DoctorsDetails />}
                />
                <Route
                    path="/admin/patients/add"
                    exact element={<PatientForm/>}
                />
                <Route
                    path="/admin/doctors/add"
                    exact element={<DoctorForm/>}
                />
                <Route
                    path="/admin/patients/:patientId/edit"
                    element={<PatientForm />}
                />
                <Route
                    path="/admin/doctors/:doctorId/edit"
                    element={<DoctorForm />}
                />
                <Route
                    path="/patient/:patientId"
                    element={<MainPageForPatient/>}
                />
                <Route
                    path="/admin/records"
                    element={<RecordsOfAllDocs/>}
                />
                <Route
                    path="/admin"
                    element={<MainPageForAdmin/>}
                />

                <Route
                    path="/doctor/:docId"
                    element={<MainPageForDoctors/>}
                />


            </Routes>
            <LoginDialog
                open={openLoginDialog}
                handleSubmit={handleLoginSubmit}
                handleClose={handleLoginClose}
            />
        </>
    )
}