import React, { Component } from 'react';
import { Card, Button, Form, FormGroup, FormLabel, InputGroup, FormControl, Col } from 'react-bootstrap';
import ReactDatatable from '@ashvin27/react-datatable';
import Select from 'react-select';
import { toast } from 'react-toastify';
import axios from '../../axios-common';

const columns = [
  {
    key: 'boat_name',
    text: 'Barco',
    align: 'left',
    width: 100,
    sortable: true
  },
  {
    key: 'marine_name',
    text: 'Marina',
    align: 'left',
    width: 100,
    sortable: true
  },
  {
    key: 'sailor_name',
    text: 'Marinheiro',
    align: 'left',
    width: 100,
    sortable: true
  },
  {
    key: 'schedule_date',
    text: 'Data/Hora',
    align: 'left',
    width: 100,
    sortable: true,
    cell: (record) => {
      return (
        <span>{new Date(record.start_date).toLocaleString()}</span>
      );
    }
  },
  {
    key: 'observation',
    text: 'Observação',
    align: 'left',
    width: 100,
    sortable: true
  },
  {
    key: 'email',
    text: 'Enviar para',
    align: 'left',
    width: 100,
    sortable: true
  },
  {
    key: 'actions',
    text: 'Ações',
    align: 'left',
    width: 100,
    sortable: false,
    cell: ScheduleActions
  },
];

const tableConfig = {
  page_size: 10,
  length_menu: [ 10, 20, 50 ],
};

function ScheduleActions(record) {
  return (
    <>
      <Button variant="info">
        <i className="fa fa-edit" />{' '}Editar
      </Button>
      <Button variant="danger">
        <i className="fa fa-danger" />{' '}Excluir
      </Button>
    </>
  );
}

class Sailors extends Component {

  state = {
    boats: [],
    marines: [],
    schedules: [],
    marine: null,
    boat: null,
    initialDate: '',
    finalDate: ''
  }

  componentDidMount() {
    this.handleLoadDependencies();
    this.loadSchedules();
  }

  handleLoadDependencies = async () => {
    const { data: marines } = await axios.get('/secure/marines');
    this.setState({ marines: marines.data });
    const { data: boats } = await axios.get('/secure/boats');
    this.setState({ boats: boats.data });
  }

  handleSelectChange = (name, o) => this.setState({ [name]: o })

  handleFieldChange = ({ target: { name, value } }) => this.setState({
    [name]: value
  })

  handleSubmit = (e) => {
    e.preventDefault();
    this.loadSchedules();
  }

  loadSchedules = async () => {
    const {
      initialDate,
      finalDate,
      marine,
      boat
    } = this.state;
    try {
      const { data: schedules } = await axios.get('/secure/schedules', {
        params: {
          from: initialDate,
          to: finalDate,
          marine_id: marine && marine.id,
          boat_id: boat && boat.id
        }
      });
      const data = schedules.data.map(({
        email,
        observation,
        start_date,
        marine,
        boat,
        sailor,
      }) => ({
        email,
        start_date,
        marine_name: marine.name,
        boat_name: boat.name,
        sailor_name: sailor.name,
        observation,
      }));
      this.setState({ schedules: data });
    } catch (error) {
      toast.error(error.message);
    }
  }

  render() {
    const {
      boats,
      marines,
      schedules,
      initialDate,
      finalDate,
      marine,
      boat
    } = this.state;
    return (
      <>
        <Card>
          <Card.Header>Agendamentos</Card.Header>
          <Card.Body>
          <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <FormGroup as={Col} md="3">
                  <FormLabel>De:</FormLabel>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="fa fa-calendar" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type="date"
                      name="initialDate"
                      value={initialDate}
                      onChange={this.handleFieldChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup as={Col} md="3">
                  <FormLabel>Até</FormLabel>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="fa fa-calendar" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type="date"
                      min={initialDate}
                      name="finalDate"
                      value={finalDate}
                      onChange={this.handleFieldChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup as={Col} md="3">
                  <FormLabel>Embarcação</FormLabel>
                  <Select
                    isClearable
                    isLoading={boats.length === 0}
                    options={boats}
                    value={boat}
                    getOptionLabel={o => o.name}
                    getOptionValue={o => o.id}
                    noOptionsMessage={() => 'Barco não encontrado.'}
                    placeholder="Embarcação..."
                    onChange={o => this.handleSelectChange('boat', o)}
                  />
                </FormGroup>
                <FormGroup as={Col} md="3">
                  <FormLabel>Marina</FormLabel>
                  <Select
                    isClearable
                    isLoading={marines.length === 0}
                    options={marines}
                    value={marine}
                    getOptionLabel={o => o.name}
                    getOptionValue={o => o.id}
                    noOptionsMessage={() => 'Marina não encontrada.'}
                    placeholder="Marina...."
                    onChange={o => this.handleSelectChange('marine', o)}
                  />
                </FormGroup>
              </Form.Row>
              <Button type="submit" variant="primary">
                <i className="fa fa-search" />
                {' '}
                Consultar
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <ReactDatatable
              config={tableConfig}
              records={schedules}
              columns={columns}
            />
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Sailors;
