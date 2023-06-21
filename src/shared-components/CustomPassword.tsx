import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { ErrorMessage, useField } from 'formik';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  name: string;
  type: string;
  placeholder?: string;
  [x: string]: any;
}

export const CustomPassword = (props: Props) => {
  const [field] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleMouseDownPassword(event: any) {
    event.preventDefault();
  }

  return (
    <>
      <Grid xs={12} sm={6} sx={{ my: 4 }}>
        <FormControl variant="outlined" sx={{ width: '100%' }}>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>
    </>
  );
};
