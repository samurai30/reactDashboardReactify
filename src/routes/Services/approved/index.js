import React ,{Component} from 'react';
import {Helmet} from "react-helmet";
import PageTitleBar from "Routes/crm/dashboard";
import IntlMessages from "Util/IntlMessages";



export default class ApprovedTask extends Component{
    render(){
        const{match} = this.props;
        return(
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Task Approved</title>
                    <meta name="description" content="Task Approved" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.approved" />} match={match} />
            </div>
        );
    }
}



