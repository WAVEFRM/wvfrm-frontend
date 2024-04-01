import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import personIcon from '../../assets/personIcon.png';
import { useAuth } from '../../hooks/AuthProvider';
import { createProfile } from '../../services/api/auth-profile';

function ProfilePhoto() {
  return (
    <Box
      component="img"
      sx={{
        height: 150,
        width: 150,
        maxHeight: { xs: 250, md: 160 },
        maxWidth: { xs: 350, md: 250 },
        borderRadius: '50%',
      }}
      alt="Profile Photo"
      src={personIcon}
    />
  );
}

function GenderRadioGroup({ value, onChange }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="male"
        name="radio-buttons-group"
        row
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}

export default function Signup() {
  const { logout, accessToken, setHasProfile, setIsLoggedIn } = useAuth(); // Assuming you have accessToken from useAuth
  const currentDate = dayjs();
  const [dob, setDob] = useState(currentDate);
  const [gender, setGender] = useState('male');
  const [ageError, setAgeError] = useState(false);
  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    setDob(newDate);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dobDate = dayjs(dob);
    const today = dayjs();
    const age = today.diff(dobDate, 'year');
    if (age < 13) {
      setAgeError(true);
      setTimeout(() => {
        setAgeError(false);
      }, 5000); // Dismiss after 5 seconds
      return;
    }

    const profileData = {
      dob: dob.format('YYYY-MM-DD'),
      gender: gender,
    };

    console.log('Profile data:', profileData);

    try {
      const response = await createProfile(accessToken, profileData); // Call createProfile function
      console.log('Profile created:', response);
      // Handle success, e.g., redirect user or show success message
      setHasProfile(true);
      setIsLoggedIn(true); // Set isLoggedIn to true [was already true tho]
      navigate('/');
    } catch (error) {
      console.error('Error creating profile:', error);
      // Handle error, e.g., show error message to user
      navigate('/signup');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ProfilePhoto />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} justifyContent="center" display="flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date of Birth" value={dob} onChange={handleDateChange} disableFuture />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <GenderRadioGroup value={gender} onChange={handleGenderChange} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create Account
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/landing" onClick={logout}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
          {ageError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              You must be at least 13 years old to create an account.
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}
