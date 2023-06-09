import React from 'react';
import { Grid } from '@mui/material';
import { FormControl, OutlinedInput } from '@mui/material';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

interface Props {
  label: string;
  name: string;
  type: string;
  value?: string | number | Date | Dayjs;
  placeholder?: string;
}

export const CustomPassword = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <>
      <Grid xs={12} sm={6} sx={{ my: 4 }}>
        <FormControl variant="outlined" sx={{ width: '100%' }}>
          <OutlinedInput
            id="outlined-adornment-password"
            value={props.value}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          ></OutlinedInput>
        </FormControl>
      </Grid>
    </>
  );
};
