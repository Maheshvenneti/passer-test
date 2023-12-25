import React, { useEffect, useState,useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { Button, TextField,MenuItem,FormControl, InputLabel, Select   } from '@mui/material';
import Context from "../components/context"

const EditUser = ({open,handleClose, setData, data})=>{
    
  const { singleUserData, setsingleUserData } = useContext(Context)
  // console.log('singleUserData', singleUserData)


    const [formData, setFormData] = useState({
        name: singleUserData.name, 
        email: singleUserData.email,
        userName: singleUserData.userName,
        role: singleUserData.role,
      });
      
      useEffect(() => {
        setFormData(singleUserData);
      }, [singleUserData]);

      const [errors, setErrors] = useState({
        name: false,
        email: false,
        userName: false,
      });
    
      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        const validationErrors = {
          name: formData.name === '',
          email: !/^\S+@\S+\.\S+$/.test(formData.email),
          userName: formData.userName === '',
        };
    
        setErrors(validationErrors);
    
        if (!Object.values(validationErrors).some((error) => error)) {
          console.log(formData);
          const response = await axios.put(`https://658939e7324d417152589bdb.mockapi.io/users/users/${data.id}`,formData )
            if(response){
              await setData(response.data)
                handleClose()
            }
        }
      };
    return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{height:'450px'}}>
        <h2 style={{textAlign:'center'}}>Create a new user</h2>
        <div style={{display:'flex', justifyContent:'center'}}>
        <form style={{width:'85%'}}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={errors.name}
          helperText={errors.name ? 'Name is required' : ''}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={errors.email}
          helperText={errors.email ? 'Invalid email format' : ''}
        />
        <TextField
          label="UserName"
          variant="outlined"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={errors.userName}
          helperText={errors.userName ? 'UserName is required' : ''}
        />
        <FormControl style={{display:'flex', marginTop:'2%', marginBottom:'2%'}} variant="outlined" >
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={formData.role}
            onChange={handleInputChange}
            label="Role"
            name="role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
        </div>
        </div>
        

      </Dialog>
    )
}

export default EditUser