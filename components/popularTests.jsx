import React from 'react';
import reqwest from 'reqwest';

class PopularTests extends React.Component {
    constructor(props){
		super(props);
        this.state={
            popularTests:[]
        }
    }
    loadPopularTests(){
        var popTests=[
                {
                    "testname": "25 Hydroxy Vitamin D (25-OH Vitamin D)",
                    "price": 1710,
                    "listPrice": 1800,
                    "quantity": 2,
                    "isHomeCollectible": "true",
                    "labtestid": "XhOUOxPN8y"
                },
                {
                    "testname": "Absolute Lymphocyte Count ",
                    "price": 114,
                    "listPrice": 120,
                    "quantity": 1,
                    "isHomeCollectible": "true",
                    "labtestid": "JMIlMxGZ2x"
                },
                {
                    "testname": "5 - Amino Levulinic acid (5 - ALA)Quantitative,Urine 24h",
                    "price": 3800,
                    "listPrice": 4000,
                    "quantity": 1,
                    "isHomeCollectible": "true",
                    "labtestid": "bXBe6VOoYe"
                },
                {
                    "testname": "5 Hydroxy Tryptamine (5- OH Tryptamine) (Seratonine), Serum",
                    "price": 6175,
                    "listPrice": 6500,
                    "quantity": 1,
                    "isHomeCollectible": "true",
                    "labtestid": "XhAhXu8G8j"
                },
                {
                    "testname": "ADA, Ascitic fluid",
                    "price": 475,
                    "listPrice": 500,
                    "quantity": 1,
                    "isHomeCollectible": "true",
                    "labtestid": "TcU0o5CtQh"
                }
                ];
                this.setState({
                    popularTests:popTests
                })
    }
    componentDidMount(){
        this.loadPopularTests.bind(this)()
	}
    render(){
        var popTestUI=[];
        popTestUI = this.state.popularTests.map(function(item,index){
            return <div key={index} className="pop-item"><a className={"pop-test poptest"+index} href={"/listlabsfortest?testId="+item.labtestid}>
            <label>{item.testname}</label>
            </a></div>;
        });
        return (<div className="popular-main">
            <div className="banner-main">
                <h1>Popular tests</h1>
                <p className="descrition-area">We know how it feels when you are not in the pink of your health. So, to make things easier for you we had our advisory team of doctors carefully curate a list of tests that are frequently prescribed for the urban junta. This list also takes into account the data that we have gathered from various labs across the city. We will make sure that the list stays updated to always show you the most relevant tests.</p>

            </div>
            <div className="content-main pop-test-main">
                <div className="clearfic col3">
                        {popTestUI}
                </div>
            </div>
        </div>);
    }
}
export default PopularTests;