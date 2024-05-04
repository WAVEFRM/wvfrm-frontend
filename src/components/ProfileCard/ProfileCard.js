import * as React from 'react';
import {Avatar, Box, Container, Grid, TextField, Button } from '@mui/material';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



//Edit htese initial states
const initialState = {
  name: '',
  dob: null, // Use null to represent initial state for DatePicker
  isEditing: false, // Flag to track edit mode
};

const ProfileCard = () => {
  const [formData, setFormData] = React.useState(initialState);
  const fileInputRef = React.useRef(null);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleEditClick = () => {
    setFormData({ ...formData, isEditing: !formData.isEditing });
  };

  const handleSaveClick = () => {
    // Implement logic to save changes (e.g., send data to backend)
    console.log('Saving changes:', formData);
    setFormData({ ...formData, isEditing: false }); // Exit edit mode after save
  };

  const handleUndoClick = () => {
    setFormData(initialState); // Reset to initial state
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };


  return (
    <Container component="main" maxWidth="xs" style={{minHeight:'90vh'}}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="Profile Image"
          src={formData.profileImage}
          sx={{ width: 200, height: 200, mx: 'auto', mt: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          id="upload-photo"
          style={{ display: 'none' }}
          ref={fileInputRef}
          disabled={!formData.isEditing}
          onChange={handleFileInputChange}
        />
       <label htmlFor="upload-photo">
          <Button 
          color="primary" 
          variant="contained"
           component="span"
            style={{marginTop:'2rem'}}  
            disabled={!formData.isEditing}
            onClick={() => formData.isEditing && fileInputRef.current.click()}
            > 
            Upload Profile Photo
          </Button>
        </label>
        
        
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={formData.name}
                onChange={handleInputChange}
                disabled={!formData.isEditing} // Disable input if not in edit mode
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(newValue) => setFormData({ ...formData, dob: newValue })}
                    disableFuture
                    disabled={!formData.isEditing} // Disable DatePicker if not in edit mode
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleEditClick}>
                {formData.isEditing ? 'Save' : 'Edit Profile'}
              </Button>
              {formData.isEditing && (
                <>
                  <Button variant="outlined" color="error" sx={{ ml: 1 }} onClick={handleUndoClick}>
                    Undo
                  </Button>
                  <Button variant="contained" color="success" sx={{ ml: 1 }} onClick={handleSaveClick}>
                    Save Changes
                  </Button>
                </>
              )}
            </Grid>           
          </Grid>
        </Box>
      </Box>
    </Container>
    
  );
};

export default ProfileCard;