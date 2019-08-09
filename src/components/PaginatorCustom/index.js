import React from 'react'
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import classNames from 'classnames';

class PaginatorCustom extends React.Component{
    constructor(props){
        super(props)
        const {pageCount} = this.props;
        this.range = [];
        for(let i =1; i<= pageCount; i++){
            this.range.push(i);
        }
    }

    render() {
        const {currentPage} = this.props;
        return(<div>
            <Pagination className="mb-0 py-10 px-10">
                <PaginationItem>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                {
                    this.range.map(page => {
                        return(
                            <PaginationItem key={page} className={classNames({active: currentPage === page})}>
                                    <PaginationLink href="javascript:void(0)">{page}</PaginationLink>
                             </PaginationItem>
                        )
                    })
                }

                <PaginationItem>
                    <PaginationLink next href="javascript:void(0)" />
                </PaginationItem>
            </Pagination>
        </div>);
    }
}

export default PaginatorCustom;