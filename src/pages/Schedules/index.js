import React, { Component } from 'react';
import { Card, Button, Form, FormGroup, FormLabel, InputGroup, FormControl, Col } from 'react-bootstrap';
import ReactDatatable from '@ashvin27/react-datatable';
import Select from 'react-select';
import { toast } from 'react-toastify';
import axios from '../../axios-common';

const columns = [
  {
    key: 'boat_id',
    text: 'Barco',
    align: 'left',
    width: 100,
    sortable: true
  },
  {
    key: 'marine_id',
    text: 'Marina',
    align: 'left',
    width: 100,
    sortable: true
  },
  {
    key: 'sailor_id',
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
  },
  {
    key: 'observation',
    text: 'Barco',
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
    text: '',
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

  loadSchedules = async (e) => {
    e.preventDefault();
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
      this.setState({ schedules: schedules.data });
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
      <Card>
        <Card.Header>Agendamentos</Card.Header>
        <Card.Body>
          <Form onSubmit={this.loadSchedules}>
            <Form.Row>
              <FormGroup as={Col} md="2">
                <FormLabel>De:</FormLabel>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fa fa-calendar" />
                  </InputGroup.Text>
                  <FormControl
                    type="date"
                    name="initialDate"
                    value={initialDate}
                    onChange={this.handleFieldChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup as={Col} md="2">
                <FormLabel>Até</FormLabel>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fa fa-calendar" />
                  </InputGroup.Text>
                  <FormControl
                    type="date"
                    min={initialDate}
                    name="finalDate"
                    value={finalDate}
                    onChange={this.handleFieldChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup as={Col} md="2">
                <FormLabel>Embarcação</FormLabel>
                <Select
                  isClearable
                  options={boats}
                  value={boat}
                  getOptionLabel={o => o.name}
                  getOptionValue={o => o.id}
                  noOptionsMessage={() => 'Barco não encontrado.'}
                  placeholder="Embarcação..."
                  onChange={o => this.handleSelectChange('boat', o)}
                />
              </FormGroup>
              <FormGroup as={Col} md="2">
                <FormLabel>Marina</FormLabel>
                <Select
                  isClearable
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
          <br />
          <br />
          <ReactDatatable
            config={tableConfig}
            records={schedules}
            columns={columns}
          />
        </Card.Body>
      </Card>
    )
  }
}

export default Sailors;
