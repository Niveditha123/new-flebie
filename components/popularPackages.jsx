import React from 'react';
import reqwest from 'reqwest';

class PopularPackages extends React.Component {
    constructor(props){
		super(props);
        this.state={
            popPackages:[]
        }
    }
    loadPopPackages(){
        var packages = [
                {
                    "containedTest": [
                    "Homocysteine",
                    "Iron Profile : Serum Iron, TIBC, % Transferrin Saturation",
                    "Renal Profile : Blood Urea Nitrogen (BUN), Serum Creatinine, Uric Acid, Calcium, BUN/Serum Creatinine Ratio",
                    "Cardiac Profile : Total Cholesterol, HDL Cholesterol, LDL Cholesterol, VLDL Cholesterol, Triglycerides, Cholesterol/HDL Ratio, LDL/HDL Ratio, Non-HDL Cholesterol",
                    "Liver Profile : ALP, Bilirubin - Direct, Bilirubin - Total, Billirubin - Indirect, GGT, SGOT, SGPT, Protein - Total, Albumin - Serum, Serum GLobulin, Albumin/Globulin Ratio",
                    "Thyroid Profile : T3, T4, TSH",
                    "Vitamin Profile : 25-OH Vitamin D, Vitamin B - 12",
                    "Diabetes Screening : HbA1C",
                    "Anaemia Profile : Complete Blood Count (28 parameters)"
                    ],
                    "cost": 900,
                    "createdAt": "2016-09-26T07:23:36.878Z",
                    "drive": true,
                    "isPopularpkg": true,
                    "labId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "address": "#5/3/1, 24th Main, Parangipalya, HSR Layout, Sector-2, Bangalore - 560102.",
                    "avgWaitingTime": "15 - 20 mins",
                    "contactNumber": "9902023602",
                    "coordinates": "12.914106,77.6489233",
                    "createdAt": "2016-05-31T10:19:41.045Z",
                    "inHouseConsultation": "N/A",
                    "isAvailableForHC": true,
                    "isAvailableForOB": false,
                    "isCAP": false,
                    "isISO": false,
                    "isNABL": true,
                    "isPopular": true,
                    "location": "HSR Layout",
                    "name": "Thyrocare",
                    "operatingHours": "7 am - 9 pm (Mon through Sat) 7am - 2 pm (Sun)",
                    "parkingFacility": "Roadside Parking",
                    "updatedAt": "2016-09-28T11:51:21.521Z",
                    "objectId": "DhdJqyTrhg",
                    "__type": "Object",
                    "className": "Lab"
                    },
                    "labname": "Thyrocare",
                    "listPrice": 3200,
                    "price": 1399,
                    "testId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "createdAt": "2016-05-31T18:11:56.591Z",
                    "description": "Aarogyam Monsoon includes an extensive battery of tests. This packages has been designed keeping in mind the hectic and stressful urban life. It includes a unique diagnostic profile of tests for a comprehensive health evaluation. It screens the most common diseases related to the thyroid, heart, liver, kidney, bones and anaemia. Almost 64 parameters will be covered in this package.",
                    "isFastingRequired": true,
                    "isHomeCollectible": true,
                    "name": "Whole Body Checkup",
                    "sample": "Serum",
                    "type": "PKG",
                    "updatedAt": "2016-10-15T13:01:57.684Z",
                    "objectId": "QXYCo2rJyX",
                    "__type": "Object",
                    "className": "Test"
                    },
                    "testname": "Aarogyam Monsoon Package",
                    "tests": [
                    "Homocysteine",
                    "Iron Profile : Serum Iron, TIBC, % Transferrin Saturation",
                    "Renal Profile : Blood Urea Nitrogen (BUN), Serum Creatinine, Uric Acid, Calcium, BUN/Serum Creatinine Ratio",
                    "Cardiac Profile : Total Cholesterol, HDL Cholesterol, LDL Cholesterol, VLDL Cholesterol, Triglycerides, Cholesterol/HDL Ratio, LDL/HDL Ratio, Non-HDL Cholesterol",
                    "Liver Profile : ALP, Bilirubin - Direct, Bilirubin - Total, Billirubin - Indirect, GGT, SGOT, SGPT, Protein - Total, Albumin - Serum, Serum GLobulin, Albumin/Globulin Ratio",
                    "Thyroid Profile : T3, T4, TSH",
                    "Vitamin Profile : 25-OH Vitamin D, Vitamin B - 12",
                    "Diabetes Screening : HbA1C",
                    "Anaemia Profile : Complete Blood Count (28 parameters)"
                    ],
                    "updatedAt": "2016-10-19T06:44:15.106Z",
                    "objectId": "0PExZ0D3La"
                },
                {
                    "containedTest": [
                    "HbA1C",
                    "Fasting  Glucose",
                    "Post Prandial Glucose"
                    ],
                    "cost": 259,
                    "createdAt": "2016-12-16T11:50:14.562Z",
                    "drive": true,
                    "isPopularpkg": true,
                    "labId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "address": "1012 / 22 , 26th Main Road, Jayanagar 4 T block, Bengaluru, Karnataka 560041",
                    "avgWaitingTime": "15 - 20 mins",
                    "contactNumber": "080 4091 7809",
                    "coordinates": "12.9217186,77.5930499",
                    "createdAt": "2016-11-23T07:23:33.489Z",
                    "inHouseConsultation": "No",
                    "isAvailableForHC": true,
                    "isAvailableForOB": true,
                    "isCAP": true,
                    "isISO": false,
                    "isNABL": true,
                    "isPopular": true,
                    "location": "Jayanagar",
                    "name": "Oncquest Labs",
                    "operatingHours": "8 am - 6 pm (All Days)",
                    "parkingFacility": "Roadside Parking",
                    "updatedAt": "2016-11-23T07:29:05.427Z",
                    "objectId": "Oe6LSU1dvT",
                    "__type": "Object",
                    "className": "Lab"
                    },
                    "labname": "Oncquest Labs",
                    "listPrice": 480,
                    "price": 440,
                    "testId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "createdAt": "2016-12-16T11:51:52.064Z",
                    "description": "World Health Organisation (WHO) estimates that the number of diabetes patients is likely to rise to 101 million in India by 2030. Diabetes is dangerous as about one third of the people with diabetes do not know they have the disease. Type-2 Diabetes for example, often does not show any symptoms. These facts, makes it crucial for all of us to keep a check on our blood sugar levels periodically. This basic package contains tests that help you assess the blood sugar levels before and after food. And also measure ‘Glycated hemoglobin (HbA1c)’ which is a form of hemoglobin that is measured primarily to identify the three-month average plasma glucose concentration.",
                    "isFastingRequired": true,
                    "isHomeCollectible": true,
                    "name": "Basic Diabetes Profile",
                    "sample": "Serum",
                    "type": "PKG",
                    "updatedAt": "2016-12-16T11:52:32.391Z",
                    "objectId": "LzFPityzNb",
                    "__type": "Object",
                    "className": "Test"
                    },
                    "testname": "Basic Diabetes Profile",
                    "updatedAt": "2016-12-16T11:57:05.078Z",
                    "objectId": "iYL8b0Ojt6"
                },
                {
                    "containedTest": [
                    "Cardiac Profile : Total Cholesterol, HDL Cholesterol, LDL Cholesterol, VLDL Cholesterol, Triglycerides, Cholesterol/HDL Ratio, LDL/HDL Ratio, Non-HDL Cholesterol",
                    "Renal Profile : Blood Urea,Creatinine,Random Blood Sugar (RBS),Serum Electrolytes,Uric Acid",
                    "Diabetes Screening : Random Blood Sugar (RBS)",
                    "Thyroid Profile : Total Triodothyronine (T3), Total Thyroxine (T4), Thyroid Stimulating Horomone (TSH)"
                    ],
                    "cost": 780,
                    "createdAt": "2016-10-15T12:36:45.083Z",
                    "drive": true,
                    "isPopularpkg": true,
                    "labId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "address": "Flat No. 94/1, 16th Main Road, BTM Layout, IInd Stage, Near Udupi Garden Hotel, Bengaluru, Karnataka 560076",
                    "avgWaitingTime": "15 - 20 mins",
                    "contactNumber": "080 2668 3415",
                    "coordinates": "12.91489, 77.61026",
                    "createdAt": "2016-09-22T08:21:57.327Z",
                    "inHouseConsultation": "N/A",
                    "isAvailableForHC": true,
                    "isAvailableForOB": false,
                    "isCAP": true,
                    "isISO": true,
                    "isNABL": true,
                    "isPopular": true,
                    "location": "BTM Layout",
                    "name": "Anand Diagnostics",
                    "operatingHours": "8 am - 5:30 pm",
                    "parkingFacility": "Roadside Parking",
                    "updatedAt": "2016-11-23T07:26:30.983Z",
                    "objectId": "eyuImbwp53",
                    "__type": "Object",
                    "className": "Lab"
                    },
                    "labname": "Anand Dianostic Laboratory",
                    "listPrice": 1598,
                    "price": 999,
                    "testId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "createdAt": "2016-10-15T10:54:50.511Z",
                    "description": "Basic Health Checkup Package has been designed keeping in mind the hectic and stressful urban life. It includes a unique diagnostic profile of tests for basic health evaluation. It screens the most common diseases related to the thyroid, heart, and kidneys.\n\n",
                    "isHomeCollectible": true,
                    "name": "Basic Health Checkup",
                    "sample": "Serum",
                    "type": "PKG",
                    "updatedAt": "2016-10-21T07:42:52.066Z",
                    "objectId": "NDvd0RZ8u0",
                    "__type": "Object",
                    "className": "Test"
                    },
                    "testname": "Basic Health Checkup",
                    "tests": [
                    "Cardiac Profile : Total Cholesterol, HDL Cholesterol, LDL Cholesterol, VLDL Cholesterol, Triglycerides, Cholesterol/HDL Ratio, LDL/HDL Ratio, Non-HDL Cholesterol",
                    "Renal Profile : Blood Urea,Creatinine,Random Blood Sugar (RBS),Serum Electrolytes,Uric Acid",
                    "Diabetes Screening : HbA1C, Random Blood Sugar (RBS)",
                    "Thyroid Profile : Total Triodothyronine (T3), Total Thyroxine (T4), Thyroid Stimulating Horomone (TSH)"
                    ],
                    "updatedAt": "2016-10-19T06:42:51.572Z",
                    "objectId": "eg75yvBbRl"
                },
                {
                    "containedTest": [
                    "Total Cholesterol",
                    "HDL Cholesterol",
                    "LDL Cholesterol",
                    "VLDL Cholesterol",
                    "Triglycerides",
                    "Cholesterol/HDL Ratio"
                    ],
                    "cost": 160,
                    "createdAt": "2016-12-09T07:42:00.078Z",
                    "drive": true,
                    "isPopularpkg": true,
                    "labId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "address": "68/150/3, Sri Lakshmi Towers, 9th Main, 3rd Block, Jaya Nagar, Bengaluru, Karnataka 560011",
                    "avgWaitingTime": "15 - 20 mins",
                    "contactNumber": "080 4121 4545",
                    "coordinates": "12.9301739,77.5794737",
                    "createdAt": "2016-11-07T12:46:15.130Z",
                    "inHouseConsultation": "Yes",
                    "isAvailableForHC": true,
                    "isAvailableForOB": false,
                    "isCAP": true,
                    "isISO": true,
                    "isNABL": true,
                    "isPopular": true,
                    "location": "Jayanagar",
                    "name": "Clumax Diagnostics",
                    "operatingHours": "7 am - 9pm",
                    "parkingFacility": "Roadside Parking",
                    "updatedAt": "2016-11-08T13:06:18.629Z",
                    "objectId": "QtaCQMhm88",
                    "__type": "Object",
                    "className": "Lab"
                    },
                    "labname": "Clumax Diagnostics",
                    "listPrice": 600,
                    "price": 570,
                    "testId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "createdAt": "2016-12-09T07:49:09.061Z",
                    "description": "A complete cholesterol test is also called a lipid panel or lipid profile. Your doctor can use it to measure the amount of “good” and “bad” cholesterol and triglycerides, a type of fat, in your blood. If you’re a man, you should get your cholesterol levels checked regularly, starting by age 35 or younger. If you’re a woman, you should begin routine cholesterol screening by age 45 or younger. To be on the safe side, you may want to get your cholesterol tested every five years beginning as early as age 20. If you’ve been diagnosed with diabetes, heart disease, stroke, or high blood pressure, or if you’re taking medication to control your cholesterol levels, you should check your cholesterol every year.",
                    "isFastingRequired": true,
                    "isHomeCollectible": true,
                    "name": "Cholesterol Profile",
                    "sample": "Serum",
                    "type": "PKG",
                    "updatedAt": "2016-12-16T11:52:24.924Z",
                    "objectId": "Ei4PMiEsAj",
                    "__type": "Object",
                    "className": "Test"
                    },
                    "testname": "Cholesterol Profile",
                    "updatedAt": "2016-12-09T07:50:23.366Z",
                    "objectId": "QNbwxLGqMS"
                },
                {
                    "containedTest": [
                    "Blood Urea",
                    "Creatinine",
                    "Random Blood Sugar (RBS)",
                    "Serum Electrolytes",
                    "Uric Acid"
                    ],
                    "cost": 400,
                    "createdAt": "2016-10-15T11:59:40.781Z",
                    "drive": true,
                    "isPopularpkg": true,
                    "labId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "address": "Flat No. 94/1, 16th Main Road, BTM Layout, IInd Stage, Near Udupi Garden Hotel, Bengaluru, Karnataka 560076",
                    "avgWaitingTime": "15 - 20 mins",
                    "contactNumber": "080 2668 3415",
                    "coordinates": "12.91489, 77.61026",
                    "createdAt": "2016-09-22T08:21:57.327Z",
                    "inHouseConsultation": "N/A",
                    "isAvailableForHC": true,
                    "isAvailableForOB": false,
                    "isCAP": true,
                    "isISO": true,
                    "isNABL": true,
                    "isPopular": true,
                    "location": "BTM Layout",
                    "name": "Anand Diagnostics",
                    "operatingHours": "8 am - 5:30 pm",
                    "parkingFacility": "Roadside Parking",
                    "updatedAt": "2016-11-23T07:26:30.983Z",
                    "objectId": "eyuImbwp53",
                    "__type": "Object",
                    "className": "Lab"
                    },
                    "labname": "Anand Diagnostic Laboratory",
                    "listPrice": 840,
                    "price": 714,
                    "testId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "createdAt": "2016-10-15T10:48:17.054Z",
                    "description": "Almost 17% of urban Indians are prone to Kidney related diseases. Kidney diseases usually have no associated symptoms untill they reach a serious stage.  \nPeople with diabetes or high blood pressure (hypertension) are the most prone to develop renal issues. Renal Function Tests is a suite of tests that measures the level of urea, creatinine, and certain dissolved salts to determine the general health and filtering capabilities of the  kidneys.",
                    "isHomeCollectible": true,
                    "name": "Kidney Function Tests",
                    "sample": "Serum",
                    "type": "PKG",
                    "updatedAt": "2016-10-20T09:27:49.137Z",
                    "objectId": "6cIIJdnftm",
                    "__type": "Object",
                    "className": "Test"
                    },
                    "testname": "Kidney Function Tests",
                    "tests": [
                    "Blood Urea",
                    "Creatinine",
                    "Random Blood Sugar (RBS)",
                    "Serum Electrolytes",
                    "Uric Acid"
                    ],
                    "updatedAt": "2016-10-19T06:33:04.110Z",
                    "objectId": "kq3GnbjFg5"
                },
                {
                    "containedTest": [
                    "Alkaline Phosphatase (ALP)",
                    "Bilirubin - Direct",
                    "Bilirubin - Total",
                    "Bilirubin - Indirect",
                    "Gamma Glutamyl Transferase (GGT)",
                    "Aspartate Aminotransferase (SGOT)",
                    "Alanine Transaminase (SGPT)",
                    "Protein - Total",
                    "Albumin - Serum",
                    "Serum Globulin",
                    "Serum  Albumin/Globulin Ratio"
                    ],
                    "cost": 200,
                    "createdAt": "2016-10-15T12:18:15.791Z",
                    "drive": true,
                    "isPopularpkg": true,
                    "labId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "address": "#5/3/1, 24th Main, Parangipalya, HSR Layout, Sector-2, Bangalore - 560102.",
                    "avgWaitingTime": "15 - 20 mins",
                    "contactNumber": "9902023602",
                    "coordinates": "12.914106,77.6489233",
                    "createdAt": "2016-05-31T10:19:41.045Z",
                    "inHouseConsultation": "N/A",
                    "isAvailableForHC": true,
                    "isAvailableForOB": false,
                    "isCAP": false,
                    "isISO": false,
                    "isNABL": true,
                    "isPopular": true,
                    "location": "HSR Layout",
                    "name": "Thyrocare",
                    "operatingHours": "7 am - 9 pm (Mon through Sat) 7am - 2 pm (Sun)",
                    "parkingFacility": "Roadside Parking",
                    "updatedAt": "2016-09-28T11:51:21.521Z",
                    "objectId": "DhdJqyTrhg",
                    "__type": "Object",
                    "className": "Lab"
                    },
                    "labname": "Thyrocare",
                    "listPrice": 400,
                    "price": 297,
                    "testId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "createdAt": "2016-10-15T10:46:22.247Z",
                    "description": "Liver function tests help determine the health of your liver by measuring the levels of proteins, liver enzymes, or bilirubin in your blood. Many tests can be performed on the liver, but most of them don’t measure the overall function of the liver. Commonly used tests to check liver function are the alanine transaminase (ALT), aspartate aminotransferase (AST), albumin, and bilirubin tests. The ALT and AST tests measure enzymes that your liver releases in response to damage or disease. The albumin and bilirubin tests measure how well the liver creates albumin, a protein, and how well it disposes of bilirubin, a waste product of the blood. Abnormal results on any of the liver function tests don’t necessarily mean you have liver disease or damage. Talk to your doctor about the results of your liver function test.",
                    "isHomeCollectible": true,
                    "name": "Liver Function Tests",
                    "sample": "Serum",
                    "type": "PKG",
                    "updatedAt": "2016-10-21T07:36:36.974Z",
                    "objectId": "nm3wt1grIa",
                    "__type": "Object",
                    "className": "Test"
                    },
                    "testname": "Liver Function Tests",
                    "tests": [
                    "Alkaline Phosphatase (ALP)",
                    "Bilirubin - Direct",
                    "Bilirubin - Total",
                    "Bilirubin - Indirect",
                    "Gamma Glutamyl Transferase (GGT)",
                    "Aspartate Aminotransferase (SGOT)",
                    "Alanine Transaminase (SGPT)",
                    "Protein - Total",
                    "Albumin - Serum",
                    "Serum Globulin",
                    "Serum  Albumin/Globulin Ratio"
                    ],
                    "updatedAt": "2016-10-19T05:14:58.439Z",
                    "objectId": "AMGrbfi5uK"
                },
                {
                    "containedTest": [
                    "Total Triodothyronine (T3)",
                    "Total Thyroxine (T4)",
                    "Thyroid Stimulating Horomone (TSH)"
                    ],
                    "cost": 90,
                    "createdAt": "2016-12-09T07:38:29.512Z",
                    "drive": true,
                    "isPopularpkg": true,
                    "labId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "address": "68/150/3, Sri Lakshmi Towers, 9th Main, 3rd Block, Jaya Nagar, Bengaluru, Karnataka 560011",
                    "avgWaitingTime": "15 - 20 mins",
                    "contactNumber": "080 4121 4545",
                    "coordinates": "12.9301739,77.5794737",
                    "createdAt": "2016-11-07T12:46:15.130Z",
                    "inHouseConsultation": "Yes",
                    "isAvailableForHC": true,
                    "isAvailableForOB": false,
                    "isCAP": true,
                    "isISO": true,
                    "isNABL": true,
                    "isPopular": true,
                    "location": "Jayanagar",
                    "name": "Clumax Diagnostics",
                    "operatingHours": "7 am - 9pm",
                    "parkingFacility": "Roadside Parking",
                    "updatedAt": "2016-11-08T13:06:18.629Z",
                    "objectId": "QtaCQMhm88",
                    "__type": "Object",
                    "className": "Lab"
                    },
                    "labname": "Clumax Diagnostics",
                    "listPrice": 600,
                    "price": 570,
                    "testId": {
                    "ACL": {
                        "*": {
                        "read": true
                        }
                    },
                    "createdAt": "2016-12-09T08:00:20.746Z",
                    "description": "The thyroid is a small gland located in the lower-front part of your neck. It helps in regulating many bodily processes such as metabolism, energy generation, and mood.\nThyroid stimulating hormone (TSH) causes the thyroid gland produces two major hormones: triiodothyronine (T3) and thyroxine (T4). A recent study published in Indian Journal Of Endocrinology mentions about the alarming increase the in the rates of ‘Hypothyroidism’ in urban women. This profile, measures the level of T3, T4 as well as TSH and helps in screening any underlying cases of ‘Hyperthyroidism’ or ‘Hypothyroidism’ after correlating with symptoms.",
                    "isHomeCollectible": true,
                    "name": "Thyroid Function Tests",
                    "sample": "Serum",
                    "type": "PKG",
                    "updatedAt": "2016-12-16T11:52:29.035Z",
                    "objectId": "4F1LEhaXvV",
                    "__type": "Object",
                    "className": "Test"
                    },
                    "testname": "Thyroid Function Tests",
                    "updatedAt": "2016-12-13T01:24:03.163Z",
                    "objectId": "JyAduWDCEL"
                }
                ];
                this.setState({
                    popPackages:packages
                })
	}
    componentDidMount(){
        this.loadPopPackages.bind(this)();
    }
    findAnItem(item,list,prop){
		var found={
			data:{},
			pos:0,
			in:false
		};
		for(var i=0;i<list.length;i++){
				if(item == list[i][prop]){
					found.data=list[i];
					found.in=true;
					found.pos=i;
					break;
				}
			}
        return found;
    }
    createNewCart(data){
        var cart={
            labAddress:data.labId.address,
            labId:data.labId.objectId,
            labname:data.labname,
            totalItems:1,
            totalListPrice:data.listPrice,
            totalPrice:data.price,
            userEmail:"",
            homeCollectible:data.testId.isHomeCollectible,
            items:[{
                isHomeCollectible:data.testId.isHomeCollectible,
                labtestid:data.objectId,
                listPrice:data.listPrice,
                price:data.price,
                quantity:1,
                testname:data.testId.name
            }]
        };
        return cart;
    }
    openKart(e){
        var id= e.target.getAttribute("data-lab");
        var test = e.target.getAttribute("data-test");
        var localData = localStorage.getItem("cartInfo");
        if(localData){
            var cartInfo = JSON.parse(localData);
            if(cartInfo.labname == id){
                var item = this.findAnItem(id,this.state.popPackages,"labname");
                var localItem = this.findAnItem(test,cartInfo.items,"testname");
                if(localItem.in){
                    cartInfo.items[localItem.pos].quantity+=1;
                    cartInfo.totalItems+=1;
                    cartInfo.totalListPrice +=item.data.listPrice;
                    cartInfo.totalPrice +=item.data.price;
                }else{
                    var newItem ={
                        "testname":item.data.testId.name,
                        "price":item.data.price,
                        "listPrice":item.data.listPrice,
                        "quantity":1,
                        "isHomeCollectible":item.data.testId.isHomeCollectible,
                        "labtestid":item.data.objectId
                    }
                    cartInfo.items.push(newItem);
                    cartInfo.totalItems+=1;
                    cartInfo.totalListPrice+=item.data.listPrice;
                    cartInfo.totalPrice+=item.data.price;
                }
                Fleb.eventDispatcher("updateCart",cartInfo);
            }else{
                var item = this.findAnItem(id,this.state.popPackages,"labname");
                var cartData= this.createNewCart.bind(this)(item.data);
                Fleb.eventDispatcher("updateCart",cartData);
            }

        }else{
            var item = this.findAnItem(id,this.state.popPackages,"labname");
            var cartData= this.createNewCart.bind(this)(item.data);
            Fleb.eventDispatcher("updateCart",cartData);
        }
        Fleb.eventDispatcher("toggleCartModal",{flag:true});
    }
    render(){
            var popPackagesUI=[];
            var _this=this;
            popPackagesUI= this.state.popPackages.map(function(item,index){
                var test = item.testId;
                return <div key={index} className="list-item">
					<div><div className="item-head">
						<div className="fr price-block">
							<div className="striked-price"><span className="icon icon-rupee"/>{item.listPrice}</div>
							<div className="actual-price"><span className="icon icon-rupee"/>{item.price}</div>
						</div>
					</div>
					<div className="lab-img img-block">
                        <img src={"https://www.flebie.com/img/"+test.name+"_pkg.jpg"}/>
					</div>
					<div className="lab-footer">
						<h3>{test.name}</h3>
						<h6>{item.labname}</h6>
						<div className="clearfix">
							<button data-id={index} data-lab={item.labname} data-test={test.name} onClick={_this.openKart.bind(_this)} className="fr btn-btn-success bookme flebie-btn">BOOK ME</button>
						</div>
					</div>
				</div>
			</div>
            })
        return (
            <div className="clearfix content-main pop-package">
                <div className="banner-main">
                    <h1>Popular Packages</h1>
                    <p className="descrition-area">No matter how cliched it might sound, we are staunch believers in the adage "Prevention Is Better Than Cure". How many times have you chosen a meeting over a breakfast, binged on those fries and boozed late into the night and skipped those morning jogs? More often that not, our health ends up taking a backseat. Keep a tab on your health by getting yourself checked regularly. These packages have been handpicked keeping in mind various factors like your age, lifestyle and eating habits.</p>
                </div>

                <div className="clearfix lab-lists col3-main">
                    {popPackagesUI}
                </div>

            </div>
        );
    }
}
export default PopularPackages;