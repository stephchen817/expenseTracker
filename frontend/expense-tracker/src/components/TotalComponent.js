import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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
        <Container>
            <Card>
                <Container>
                    <Card.Body>
                        <Card.Title> Total of Expenses: </Card.Title>
                        <Card.Subtitle> { sum } </Card.Subtitle>
                    </Card.Body>
                </Container>
            </Card>
        </Container>
    )
};

export default TotalComponent;