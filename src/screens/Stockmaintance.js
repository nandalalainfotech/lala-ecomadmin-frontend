import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from '@mui/material/Box';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from "react-router-dom";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Stockmaintance() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Stock</Typography>
            <Box sx={{ display: "flex", flexDerection: "row", mt: 0 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link
                        to="/"
                        style={{
                            color: "rgba(0, 0, 0, 0.6)",
                            fontSize: "13px",
                        }}
                    >
                        <Typography sx={{ fontSize: "13px" }}>Home</Typography>
                    </Link>
                    <Typography sx={{ fontSize: "13px" }}> Stock</Typography>
                </Breadcrumbs>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Stockmaintance" {...a11yProps(0)} />
                    <Tab label="Sales" {...a11yProps(1)} />
                    <Tab label="Return" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                Stock
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Sales
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Return
            </CustomTabPanel>
        </Box>
    );
}

