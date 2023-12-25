import React, { useContext, useState, useEffect } from 'react'
import { Card, Grid, Button } from '@mui/material';
import "../components/styles/singleUser.css"
import Context from "../components/context"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import EditUser from "../components/editUser"



const SingleUserView = () => {


    const { singleUserData, setsingleUserData } = useContext(Context)
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const { userId, setUserId } = useContext(Context)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = (userId) => {
        const response = axios.delete(`https://658939e7324d417152589bdb.mockapi.io/users/users/${userId}`)
        if (response) {
            navigate("/");
        }
    }
    const fetchData = () => {
        axios.get(`https://658939e7324d417152589bdb.mockapi.io/users/users/${userId}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        if (userId) {
            fetchData()
        }
    }, [])

    return (
        <>

            <div className='singleUserMain' >
                <div className='card'>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <img src={data?.avatar} alt='' />
                            </Grid>
                            <Grid className='content' item md={8}>
                                <h2>{data?.name}</h2>
                                <h3>{data?.userName}</h3>
                                <div className='actions'>
                                    <Button variant="outlined" onClick={handleClickOpen}>Edit</Button>
                                    <Button variant="outlined" onClick={() => handleDelete(data.id)} color="error">Delete</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </div>
            <EditUser open={open} setData={setData} data={data} handleClose={handleClose}/>
        </>

    )
}

export default SingleUserView