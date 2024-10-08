import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import ExpensesTable from '../components/ExpensesTable';
import TotalComponent from '../components/TotalComponent';
import Header from '../components/Header';

function LandingPage () {
    const [sum, setSum] = useState(0);

    const fetchSum = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/getSum');
                setSum(response.data.data);
            } catch (error) {
                console.error('Error fetching sum:', error);
            }
        };

    useEffect(()=> {
        fetchSum();
    }, []);

    return(
        <Container>
            <Header />
            <ExpensesTable onTotalUpdate={fetchSum} />
            <TotalComponent total={sum} />
        </Container>
    );
}

export default LandingPage;