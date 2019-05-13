import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactDatatable from '@ashvin27/react-datatable';
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
    schedules: []
  }

  componentDidMount() {
    this.loadSchedules();
  }

  loadSchedules = async () => {
    try {
      const { data: schedules } = await axios.get('/secure/schedules');
      this.setState({ schedules: schedules.data });
    } catch (error) {
      toast.error(error.message);
    }
  }

  render() {
    const { schedules } = this.state;
    return (
      <Card>
        <Card.Header>Agendamentos</Card.Header>
        <Card.Body>
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
