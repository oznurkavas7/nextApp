import React, { useContext, useState } from "react";
import { GlobalContext } from "./TodoPanel";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { SketchPicker } from "react-color";
import {
   Modal, Box, Typography, Tooltip
} from '@mui/material';

const ChangeColorSett = () => {
    const { changeBgColor } = useContext(GlobalContext);
    const [openColorSett, setOpenColorSett] = useState(false);
    const [color, setColor] = useState({ r: "204", g: "204", b: "255", a: "0" });
  
    function colorSetting() {
      setOpenColorSett(!openColorSett);
    }
  
    function onCloseMethod  () {
      setOpenColorSett(false);
    };

    function changeContainerColor (color) {
      const selectColor = color.hex;
      changeBgColor(selectColor);
      setColor({ ...color.rgb });
    }

    const settingBox = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 320,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
      };

    return (
        <div className='cardStyle'>
        <Tooltip title="Change Color">
          <IconButton aria-label="edit" onClick={colorSetting}>
            <SettingsIcon style={{ fill: "gray" }} />
            <Modal
              open={openColorSett}
              onClose={onCloseMethod}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={settingBox}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Background Change Color
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'} variant={'body2'}>
                  {openColorSett ? (
                    <div>
                      <div onClick={onCloseMethod} />
                      <SketchPicker color={color} onChange={(e) => changeContainerColor(e)} />
                    </div>
                  ) : null}
                </Typography>
              </Box>
            </Modal>
          </IconButton>
        </Tooltip>
      </div>
    );
}

export default ChangeColorSett;