import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import ExpensesTable from '../components/ExpensesTable';
import TotalComponent from '../components/TotalComponent';
import Header from '../components/Header';

function LandingPage(){
    return(
        <Container>
            <Header />
            <ExpensesTable />
            <TotalComponent />
        </Container>
    );
}

export default LandingPage;