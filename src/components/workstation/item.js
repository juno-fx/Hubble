import React from 'react';
import {useHistory} from 'react-router-dom';
import {ListGroup, Row, Col, ButtonGroup, Button} from 'react-bootstrap';
import { CpuFill } from 'react-bootstrap-icons';


export default (props) => {
    const history = useHistory();

    return (
        <ListGroup.Item>
            <Row>
                <Col>
                    <CpuFill style={{color: "teal"}}/>
                    {props.name}
                </Col>
                <Col style={{textAlign: "center"}}>
                    {props.fqdn}
                </Col>
                <Col style={{textAlign: "right"}}>
                    <ButtonGroup size="sm">
                        <Button variant="info">
                            Information
                        </Button>
                        <Button
                            variant="success"
                            onClick={
                                () => history.push(`/connect?workstation=${props.fqdn}`)
                            }
                        >
                            Connect
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}



