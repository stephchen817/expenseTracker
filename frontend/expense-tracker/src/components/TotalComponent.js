import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TotalComponent({ total }) {
    return (
        <Container className="totalContainer">
            <Card className="totalCard">
                <Container>
                    <Row>
                        <Card.Body>
                            <Col>
                                <Container>
                                    <Card.Title className='totalExpense'> Total of Expenses: { total }</Card.Title>
                                </Container>
                            </Col>
                        </Card.Body>
                    </Row>
                </Container>
            </Card>
        </Container>
    )
};

export default TotalComponent;