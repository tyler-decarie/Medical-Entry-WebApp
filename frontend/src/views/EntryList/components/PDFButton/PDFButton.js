import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
    }
}));

const PDFButton = () => {

    const classes = useStyles();

    {/*
SOURCE: https://stackoverflow.com/a/45017234
*/}
    const print = () => {
        const input = document.getElementById('print');
        html2canvas(input).then(canvas => {
            document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("download.pdf");
        })
    }
    return (
        <Button
            color="primary"
            onClick={print}
            variant="outlined"
            className={classes.button}
        >
            Print
        </Button>
    )

};

export default PDFButton;