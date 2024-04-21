import * as React from 'react';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material';
import { Snackbar, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import './UploadArea.css';

import { lowLevelPrediction } from '../../services/api/prediction-results';

const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled('div')`
  background-color: white;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  width: 50%;
`;

const FlexFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
`;

function UploadArea() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [songData, setSongData] = React.useState({
    firstName: '',
    songImage: null,
    songMp3: null,
    explicit: '',
  });
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImagesChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    setSongData((prevData) => ({
      ...prevData,
      songImage: e.target.files[0],
    }));
  };

  const handleMp3Change = (e) => {
    console.log('File selected:', e.target.files[0]);
    setSongData((prevData) => ({
      ...prevData,
      songMp3: e.target.files[0],
    }));
  };
  const handleNotificationOpen = (message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };
  
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log('Song MP3:', songData.songMp3);
    console.log('Song Image:', songData.songImage);

    formData.append('song_file', songData.songMp3);
    formData.append('song_name', songData.firstName);
    formData.append('song_art_cover', songData.songImage);
    formData.append('explicit', songData.explicit === 'Yes' ? '1' : '0');

    try {
      console.log(songData);
      console.log(...formData); // Check formData before sending
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found.');
      }

      const response = await lowLevelPrediction(accessToken, formData);
      console.log(response);
      handleNotificationOpen('Check results page to see the status of the song you uploaded');
    } catch (error) {
      console.error('Error predicting low level:', error);
    }

    handleCloseModal();
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        Upload a Song
      </Button>
      <ModalContainer open={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <h2 className="TitleUpload">Upload Song</h2>
          <form className="songUploadForm" onSubmit={handleSubmit}>
            <div>
              <FlexFormControl fullWidth error={songData.firstName.trim() === ''}>
                <h6>First Name</h6>
                <TextField
                  name="firstName"
                  value={songData.firstName}
                  onChange={handleChange}
                  required // Set as required
                  helperText={songData.firstName.trim() === '' ? 'Name is required' : ''}
                />
              </FlexFormControl>
            </div>
            <div>
              <FlexFormControl fullWidth>
                <h6>Song Image</h6>
                <label htmlFor="song-image-input">
                  <input id="song-image-input" type="file" accept="image/*" onChange={handleImagesChange} />
                </label>
              </FlexFormControl>
            </div>
            <div>
              <FlexFormControl fullWidth error={songData.songMp3 === null}>
                <h6>Song MP3</h6>
                <input
                  type="file"
                  accept="audio/mp3"
                  onChange={handleMp3Change}
                  required // Set as required
                />
                {songData.songMp3 === null && <FormHelperText error>Please select a MP3 file</FormHelperText>}
              </FlexFormControl>
            </div>
            <div>
              <FlexFormControl fullWidth error={songData.explicit.trim() === ''}>
                <h6>Explicit</h6>
                <Select
                  value={songData.explicit}
                  onChange={handleChange}
                  inputProps={{
                    name: 'explicit',
                    required: true, // Set as required
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Select...</em>
                  </MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                {songData.explicit.trim() === '' && <FormHelperText error>Please select explicitness</FormHelperText>}
              </FlexFormControl>
            </div>
            <div className="buttonUploadModal">
              <Button type="submit" variant="contained" color="primary">
                Upload
              </Button>
              <Button onClick={handleCloseModal} variant="contained" color="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </ModalContent>
      </ModalContainer>
      {/* Notification snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={notificationOpen}
        autoHideDuration={6000} // Adjust duration as needed
        onClose={handleNotificationClose}
        message={notificationMessage}
        ContentProps={{
          style: {
            backgroundColor: 'lightgreen',
            color: 'black',
          },
        }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleNotificationClose}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

export default UploadArea;
