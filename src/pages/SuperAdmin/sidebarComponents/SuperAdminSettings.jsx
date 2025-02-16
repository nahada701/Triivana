import React from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
function SuperAdminSettings() {
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  return (

    <div>
         <div className="container d-flex flex-column  w-75 mt-4">
      {/* Profile Settings */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Profile Settings</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control type="text" defaultValue="John Doe" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue="admin@example.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" className="w-100">Save Changes</Button>
          </Form>
        </Card.Body>
      </Card>
      
      {/* Platform Rules */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Platform Rules</Card.Title>
          <p className="text-muted">Keep the platform fair and safe for all users. Respect guidelines.</p>
        </Card.Body>
      </Card>

      {/* Logout Button */}
      <Button variant="danger" className="w-100" onClick={() => setIsLogoutOpen(true)}>
        Logout
      </Button>
      
      {/* Logout Confirmation Modal */}
      <Modal show={isLogoutOpen} onHide={() => setIsLogoutOpen(false)}>
     
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsLogoutOpen(false)}>Cancel</Button>
          <Button variant="danger">Logout</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  )
}

export default SuperAdminSettings