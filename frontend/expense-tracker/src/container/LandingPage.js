import React from 'react';
import ExpensesTable from '../components/ExpensesTable';
import TotalComponent from '../components/TotalComponent';

function LandingPage(){
    return(
        <div>
            <ExpensesTable />
            <TotalComponent />
        </div>
    );
}

export default LandingPage;