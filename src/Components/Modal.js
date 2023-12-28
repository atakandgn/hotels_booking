// Modal.js
import React from "react";
import PropTypes from 'prop-types';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

export function Modal({ header, body, isOpen, onClickFunction }) {
    return (
        <Dialog open={isOpen} handler={onClickFunction}>
            <DialogHeader>{header}</DialogHeader>
            <DialogBody>{body}</DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={onClickFunction} className="mr-1">
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={onClickFunction}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

Modal.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClickFunction: PropTypes.func.isRequired,
};