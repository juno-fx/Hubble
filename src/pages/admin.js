import {Component} from "react";
import {Button, Modal, Form, Row, Col, ProgressBar} from "react-bootstrap";
import axios from "axios";
import Keycloak from 'keycloak-js';


class Admin extends Component {

    state = {
        username: "",
        password: "",
        registry: null,

        repo: "",
        tag: "",
        message: "",

        dry: false,

        imaging: false,
        show: false,
        connected: true
    }

    componentDidMount() {
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
        })
    }

    handleVisible = () => {
        this.setState({...this.state, show: !this.state.show})
    }

    formHandler = (key, value) => {
        this.state[key] = value;
        this.setState(this.state);
        console.log(this.state)
    }

    snapshot = () => {
        this.setState({
            ...this.state,
            imaging: true
        });

        axios.post(
            'http://luna:3030/snapshot',
            {
                tag: this.state.tag,
                repository: this.state.repo,
                message: this.state.message,
                dry: this.state.dry,
                user: this.state.username,
                password: this.state.password,
                registry: this.state.registry === "" ? null : this.state.registry
            }
        ).then(
            () => {
                this.handleVisible()
                this.setState({
                    ...this.state,
                    imaging: false
                });
            }
        ).catch(
            rsp => {
                console.error(rsp)
                this.handleVisible()
                this.setState({
                    ...this.state,
                    imaging: false
                });
            }
        )
    }

    render() {
        return (
            <>
                <Modal
                    show={this.state.show}
                    onHide={this.handleVisible}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Snapshot</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {
                            this.state.imaging ?
                                <div style={{textAlign: "center"}}>
                                    Imaging...
                                    <ProgressBar animated now={100}/>
                                </div>
                                :
                                <Form>
                                    <Row>
                                        <Col sm={8}>
                                            <Form.Group controlId="imageRepo">
                                                <Form.Label>Repository</Form.Label>
                                                <Form.Control
                                                    placeholder="your/repository"
                                                    onChange={
                                                        value => this.formHandler("repo", value.target.value)
                                                    }
                                                    value={this.state.repo}
                                                />
                                                <Form.Text className="text-muted">
                                                    Specify the repository to push your image to
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>

                                        <Col sm={4}>
                                            <Form.Group controlId="imageVersion">
                                                <Form.Label>Version</Form.Label>
                                                <Form.Control
                                                    placeholder="latest"
                                                    onChange={
                                                        value => this.formHandler("tag", value.target.value)
                                                    }
                                                    value={this.state.tag}
                                                />
                                                <Form.Text className="text-muted">
                                                    Repository image version
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="imageMessage">
                                                <Form.Label>Message</Form.Label>
                                                <Form.Control
                                                    placeholder="Image message"
                                                    onChange={
                                                        value => this.formHandler("message", value.target.value)
                                                    }
                                                    value={this.state.message}
                                                    as="textarea"
                                                    row={3}
                                                />
                                                <Form.Text className="text-muted">
                                                    Message about your new image
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="dryRun">
                                        <Form.Check
                                            type="checkbox"
                                            label="Dry Run"
                                            onChange={
                                                value => this.formHandler("dry", value.target.checked)
                                            }
                                        />
                                    </Form.Group>
                                    <hr/>
                                    <Row>
                                        <Col sm={6}>
                                            <Form.Group controlId="username">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    placeholder="username"
                                                    onChange={
                                                        value => this.formHandler("username", value.target.value)
                                                    }
                                                    value={this.state.username}
                                                />
                                                <Form.Text className="text-muted">
                                                    Docker username
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>

                                        <Col sm={6}>
                                            <Form.Group controlId="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="password"
                                                    onChange={
                                                        value => this.formHandler("password", value.target.value)
                                                    }
                                                    value={this.state.password}
                                                />
                                                <Form.Text className="text-muted">
                                                    Docker password
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="registry">
                                                <Form.Label>Registry</Form.Label>
                                                <Form.Control
                                                    placeholder="https://private-registry"
                                                    onChange={
                                                        value => this.formHandler("registry", value.target.value)
                                                    }
                                                    value={this.state.registry}
                                                />
                                                <Form.Text className="text-muted">
                                                    Docker registry to push to. Defaults to Docker Hub if empty.
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.handleVisible}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={this.snapshot}
                        >
                            Run
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button
                    disabled={!this.state.connected}
                    onClick={this.handleVisible}
                >
                    Snapshot
                </Button>
            </>
        )
    }
}

export default Admin;
