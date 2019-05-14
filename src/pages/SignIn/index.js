import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../axios-common';

class Login extends Component {

  handleLogin = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;
    const { history } = this.props;
    try {
      const { data } = await axios.post('/sign_in', {
        email, password
      });
      localStorage.setItem('app.authToken', data.jwt);
      toast.success('Login efetuado com sucesso!');
      history.push('/');
    } catch (err) {
      toast.error(err.message);
    }
  }

  handleEmail = ({ target: { value: email }}) => this.setState({ email });

  handlePassword = ({ target: { value: password }}) => this.setState({ password });

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Card className="p-4">
              <Card.Body>
                <Form onSubmit={this.handleLogin}>
                  <h1>Login</h1>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="icon-user"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      onChange={this.handleEmail}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="icon-lock"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handlePassword}
                    />
                  </InputGroup>
                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        variant="primary"
                        className="px-4"
                      >
                        <i className="fa fa-sign-in" />
                        {' '}
                        Login
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="link">
                        Forgot password?
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
