import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {IconButton, Typography} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import {Link as RouterLink} from "react-router-dom"
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export const MainPage = () => {

    return (
        <div style={{ width: '90%', margin: '30px' }} >
            <Box
                sx={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                }}
            >
                <Item>
                    <Typography>
                        Schedule appointment
                    </Typography>
                    <IconButton
                        aria-label="doctors"
                        component={RouterLink}
                        to={'admin/schedule'}>
                        <PersonAddIcon/>
                    </IconButton>
                </Item>
            </Box>
        </div>
    );
}
