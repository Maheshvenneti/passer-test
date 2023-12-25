import React, { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { TablePagination, Button, Paper,TextField,TableRow,TableHead,MenuItem,FormControl, InputLabel, Select   } from '@mui/material';
import axios from 'axios';
import "../components/styles/home.css"
import Context from "../components/context"
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import CreateUser from "../components/createUser"



const View = () => {

    

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { singleUserData, setsingleUserData } = useContext(Context)
    const { userId, setUserId } = useContext(Context)

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // console.log('singleUserData', singleUserData)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onUserClick = async(item) => {
        setUserId(item.id)
    //    await setsingleUserData(item)
        navigate("/user");

    }

    const fetchData = ()=>{
        setLoading(true)
        axios.get('https://658939e7324d417152589bdb.mockapi.io/users/users')
            .then((response) => {
                setData(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className='home'>
            <Button variant="contained" onClick={handleClickOpen} >Create User</Button>
            <div className='home-list'>
                {
                   loading?<div style={{height:'200px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} > <CircularProgress /></div>: (data.length > 0) ?

                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><h3>Photo</h3></TableCell>
                                            <TableCell align="center"><h3>Use Name</h3></TableCell>
                                            <TableCell align="center"><h3>Role</h3></TableCell>
                                            <TableCell align="center"><h3>Name</h3></TableCell>
                                            <TableCell align="center"><h3>Email</h3></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item) => {
                                                return (
                                                    <TableRow hover style={{ cursor: 'pointer' }} key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        onClick={() => onUserClick(item)} >
                                                        <TableCell align="center"><img style={{ width: '45px', borderRadius: '50%' }} src={item?.avatar} alt="" /></TableCell>
                                                        <TableCell align="center">{item?.userName}</TableCell>
                                                        <TableCell align="center">{item?.role}</TableCell>
                                                        <TableCell align="center">{item?.name}</TableCell>
                                                        <TableCell align="center">{item?.email}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <h3>No data</h3>
                        </div>
                }
            </div>
            <CreateUser open={open} handleClose={handleClose} fetchData={fetchData}/>
        </div>

    )
}

export default View

