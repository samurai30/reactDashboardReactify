/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";



export default class AssignTask extends Component{
    render(){
        const{match} = this.props;
        return(
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Polucon | Assign Task</title>
                    <meta name="description" content="Assign Tasks" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.assignTask" />} match={match} />
                <RctCollapsibleCard
                    heading={<IntlMessages id="assignment.assignTask" />}
                    collapsible
                    reloadable
                    fullBlock>

                </RctCollapsibleCard>
            </div>
        );
    }
}



