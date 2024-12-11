// src/components/ProfileForm.js
import React, { useState, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { Modal, Button, Form } from "react-bootstrap";

const ProfileForm = ({ show, onHide }) => {
    const { addProfile } = useContext(ProfileContext);
    const [name, setName] = useState("");
    const [preferences, setPreferences] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addProfile(name, { categories: preferences });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Profile Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Preferences</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g., technology, business"
                            onChange={(e) => setPreferences(e.target.value.split(","))}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileForm;
