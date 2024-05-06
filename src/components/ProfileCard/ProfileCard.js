import * as React from 'react';
import { Avatar, Box, Container, Grid, TextField, Button } from '@mui/material';
import {Alert}  from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { viewProfile, editProfile } from '../../services/api/auth-profile';
import dayjs from 'dayjs';

const initialState = {
  name: '',
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  dob: null,
  profileImage: null, // Updated to store the uploaded file
  isEditing: false,
};

const ProfileCard = () => {
  const [formData, setFormData] = React.useState(initialState);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [error, setError] = React.useState('');

  const fetchProfileData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await viewProfile(accessToken);
      console.log(response)
      const profileData = response;

      initialState.name = `${profileData.user.first_name} ${profileData.user.last_name}`;
      initialState.email = profileData.user.email;
      initialState.firstName = profileData.user.first_name;
      initialState.lastName = profileData.user.last_name;
      initialState.username = profileData.user.username;
      initialState.dob = dayjs(profileData.dob).format('YYYY-MM-DD'); // Format dob
      initialState.profileImage = profileData.profile_pic_url;
      initialState.isEditing = false;

      setFormData({ ...initialState });
    } catch (error) {
      setError('Error fetching profile data');
    }
  };

  React.useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (event) => {
    // Only allow changes to dob and profileImage fields
    if (event.target.name === 'dob') {
      setFormData({ ...formData, [event.target.name]: dayjs(event.target.value).format('YYYY-MM-DD') });
    }
  };

  const handleEditClick = () => {
    setFormData({ ...formData, isEditing: !formData.isEditing });
  };
  const handleUndoClick = () => {
    setFormData({ ...initialState });
    setError('');
  }
  const handleSaveClick = async () => {
    // Validate age (user must be 13 or older)
    const thirteenYearsAgo = dayjs().subtract(13, 'year');
    if (formData.dob && dayjs(formData.dob, 'YYYY-MM-DD').isBefore(thirteenYearsAgo)) {
      // Prepare data to send
      const dobFormatted = dayjs(formData.dob).format('YYYY-MM-DD'); 
      console.log(dobFormatted);
      const profileData = {
        dob: dobFormatted,
      };
      if (uploadedFile) {
        profileData.profile_pic = uploadedFile; // Include uploaded file directly
      }
      console.log(profileData);
      // Call API to save changes 
      const accessToken = localStorage.getItem('accessToken');
      try {
        await editProfile(accessToken, profileData);
        setFormData({ ...formData, isEditing: false });
        setError('');
      } catch (error) {
        setError('Error saving profile changes');
      }
    } else {
      setError('User must be 13 or older.');
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      const profileImageUrl = URL.createObjectURL(file); // Create object URL for the uploaded file
      setFormData({ ...formData, profileImage: profileImageUrl }); // Store the URL of the uploaded file
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ minHeight: '90vh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar alt="Profile Image" src={formData.profileImage} sx={{ width: 200, height: 200, mx: 'auto', mt: 2 }} />
        <input
          type="file"
          accept="image/*"
          id="upload-photo"
          style={{ display: 'none' }}
          disabled={!formData.isEditing}
          onChange={handleFileInputChange}
        />
        <label htmlFor="upload-photo">
          <Button
            color="primary"
            variant="contained"
            component="span"
            style={{ marginTop: '2rem' }}
            disabled={!formData.isEditing}
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
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                value={formData.username}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Date of Birth" 
                    value={formData.dob ? dayjs(formData.dob) : null}
                    onChange={(newValue) => setFormData({ ...formData, dob: newValue })}
                    disableFuture
                    disabled={!formData.isEditing}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {error!==''&&<Alert severity="error" sx={{ mt: 2 }}>
              You must be at least 13 years old to create an account.
            </Alert>}
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={formData.isEditing ? handleSaveClick : handleEditClick}
                sx={{ my: 2, mx: 4 }}
              >
                {formData.isEditing ? 'Save' : 'Edit Profile'}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleUndoClick}
                sx={{ my: 2, mx: 4 }}
              >
                Undo
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>

  );
};

export default ProfileCard;
