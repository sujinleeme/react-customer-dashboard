import { Checkbox, FormControlLabel, FormGroup, IconButton, Menu, MenuItem } from '@material-ui/core';
import React, { MouseEvent } from 'react';

import { FilterList } from '@material-ui/icons';

type Props = { options: string[]}

const CheckBoxDropDownMenu: React.FC<Props> = ({ options, onChange }: Props) => {

  const [anchorEl,setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick} >
        <FilterList />
      </IconButton>
      <Menu
        id="long-menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose} >
        <FormGroup>
          {options && Object.keys(options).map(optionKey => (
            <MenuItem key={optionKey} onClick={handleClose}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={options[optionKey]}
                    onChange={onChange(optionKey)}
                    value={optionKey}
                    color="primary"
                    />
                )}
                label={optionKey}
                />
            </MenuItem>
          ))}
        </FormGroup>
      </Menu>
    </>
  );
};

export default CheckBoxDropDownMenu;
