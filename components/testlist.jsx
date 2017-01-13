import React from 'react';
import reqwest from 'reqwest';

class TestList extends React.Component {
    constructor(props){
		super(props);
        this.state={
            testList:{
                items:[]
            }
        }
    }
    loadAllTests(){
        var tests ={
	        "items": [{
	          "testname": "Total Iron Binding Capacity (TIBC)",
	          "price": 189,
	          "listPrice": 210,
	          "isHomeCollectible": true,
	          "labtestid": "QH9hPLiNmH"
	        }, {
	          "testname": "Thyroxine Binding Globulin (TBG), Serum",
	          "price": 540,
	          "listPrice": 600,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        },
            {
	          "testname": "Vitamin B6 (Pyridoxin), Serum",
	          "price": 840,
	          "listPrice": 900,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        },
            {
	          "testname": "1,25 Dihydroxy Vitamin D (Calcitriol)",
	          "price": 240,
	          "listPrice": 400,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        },
            {
	          "testname": "17 - Hydroxy Corticosteroids, Urine 24H (17 O",
	          "price": 140,
	          "listPrice": 240,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        },
            {
	          "testname": "17 - OH Progesterone, Serum (17 - Hydroxy Pro",
	          "price": 1040,
	          "listPrice": 1234,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        }
            ],
	        "userEmail": "",
	        "homeCollectible": true,
	        "labname": "Thyrocare",
	        "labId": "DhdJqyTrhg",
            "location": "Jayanagar",
            "operatingHours": "7 am - 10 pm (All Days)",
            "phoneNumber": 2147483647,
	        "labAddress": "#5/3/1, 24th Main, Parangipalya, HSR Layout, Sector-2, Bangalore - 560102.",
            "inHouseConsultationAvailable": false,
            "isAvailableForHC": false,
            "isAvailableForOB": false,
            "isCap": false,
            "isDisplayable": true,
            "isISOCertified": false,
            "isNABLAccredited": false,
	      };
          this.setState({
              testList:tests
          })
    }
    componentDidMount(){
        this.loadAllTests.bind(this);
	}
    render(){
        return (
            <div>
                <h1>TestList tests</h1>
            </div>
        );
    }
}
export default TestList;