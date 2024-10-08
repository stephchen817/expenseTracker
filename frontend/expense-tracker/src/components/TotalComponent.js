import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TotalComponent() {
    const [sum, setSum] = useState(0);

    useEffect(() => {
        const fetchSum = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/getSum');
                setSum(response.data.data);
            } catch (error) {
                console.error('Error fetching sum:', error);
            }
        };

        fetchSum();
    }, []);

    return (
        <Container className="totalContainer">
            <Card className="totalCard">
                <Container>
                    <Row>
                        <Card.Body>
                            <Col>
                                <Container>
                                    <Card.Title className='totalExpense'> Total of Expenses: {sum}</Card.Title>
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