/**
 * Ecommerce Dashboard
 */

import React, { Component } from 'react'

// intl messages
import IntlMessages from 'Util/IntlMessages';
import {Helmet} from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';


export default class EcommerceDashboard extends Component {
   render() {
      const { match } = this.props;

      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet>
               <title>Polucon | Home</title>
               <meta name="description" content="Polucon Home Page" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.home" />} match={match} />


         </div>
      )
   }
}
