import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';

import Workstation from './item'


class WorkstationList extends Component {

    state = {
        workstations: [
            {
                name: "fin",
                token: "blah",
                status: "active",
                fqdn: "localhost"
            }
        ]
    }

    render() {
        return (
            <ListGroup variant="flush">
                {
                    this.state.workstations.map(
                        workstation => <Workstation {...workstation}/>
                    )
                }
            </ListGroup>
        )
    }
}

export default WorkstationList;



