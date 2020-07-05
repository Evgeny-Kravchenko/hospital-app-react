import React, { Component } from "react";

import { Form } from "reactstrap";
import Moment from "react-moment";

import Table from "../Table/Table";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import TextField from "../TextField/TextField";
import DateField from "../DateField/DateField";
import CheckboxField from "../CheckboxField/CheckboxField";

import service from "../../services/AppointmentService";

import "./Appointments.scss";

import { ReactComponent as Appointment } from "../../images/medical-appointment.svg";

import { getAppointments } from "../../lib/mock/MockData";

const TITLE = "Приёмы";
const USER = "Иванов Иван Иванович";

export default class Appointments extends Component {
  state = {
    data: null,
    isLoading: false,
    filter: {
      startDate: null,
      endDate: null,
      clientName: "",
      onlyMe: false,
    },
  };

  componentDidMount() {
    this.load();
  }

  onChangeFilterField = (name, value) => {
    const { filter } = this.state;

    this.setState({
      filter: { ...filter, ...{ [name]: value } },
    });
  };

  onChangeFilterDateField = (name, value) => {
    const { filter } = this.state;

    this.setState({
      filter: { ...filter, ...{ [name]: value && value.getTime() } },
    });
  };

  load() {
    this.setState({ isLoading: true });
    service.find({ filter: this.state.filter }).then(({ success, data }) => {
      if (success) {
        this.setState({
          data,
          isLoading: false,
        });
      }
    });
  }

  render() {
    const {
      data,
      isLoading,
      filter: { startDate, endDate, clientName, onlyMe },
    } = this.state;
    let filtered = getAppointments({ startDate, endDate, clientName, onlyMe });

    return (
      <div className="Appointments">
        <Header
          title={TITLE}
          userName={USER}
          className="Appointments-Header"
          renderIcon={() => <Appointment className="Header-Icon" />}
        />
        <div className="Appointments-Body">
          <div className="Appointments-Filter">
            <Form className="Appointments-FilterForm">
              <DateField
                hasTime
                name="startDate"
                value={startDate}
                dateFormat="dd/MM/yyyy HH:mm"
                timeFormat="HH:mm"
                placeholder="С"
                className="Appointments-FilterField"
                onChange={this.onChangeFilterDateField}
              />
              <DateField
                hasTime
                name="endDate"
                value={endDate}
                dateFormat="dd/MM/yyyy HH:mm"
                timeFormat="HH:mm"
                placeholder="По"
                className="Appointments-FilterField"
                onChange={this.onChangeFilterDateField}
              />
              <TextField
                name="clientName"
                value={clientName}
                placeholder="Клиент"
                className="Appointments-FilterField"
                onChange={this.onChangeFilterField}
              />
              <CheckboxField
                name="onlyMe"
                label="Только я"
                value={onlyMe}
                className="Appointments-FilterField"
                onChange={this.onChangeFilterField}
              />
            </Form>
          </div>
          {isLoading ? (
            <Loader />
          ) : data ? (
            <Table
              data={filtered}
              className="AppointmentList"
              columns={[
                {
                  dataField: "date",
                  text: "Дата",
                  headerStyle: {
                    width: "150px",
                  },
                  formatter: (v) => {
                    return <Moment date={v} format="DD.MM.YYYY HH.mm" />;
                  },
                },
                {
                  dataField: "clientName",
                  text: "Клиент",
                  headerStyle: {
                    width: "300px",
                  },
                },
                {
                  dataField: "status",
                  text: "Статус",
                },
                {
                  dataField: "holderName",
                  text: "Принимающий",
                  headerStyle: {
                    width: "300px",
                  },
                },
                {
                  dataField: "compliences",
                  text: "Жалобы",
                  headerStyle: {
                    width: "200px",
                  },
                },
                {
                  dataField: "diagnosis",
                  text: "Диагноз",
                  headerStyle: {
                    width: "200px",
                  },
                },
              ]}
            />
          ) : (
            "Нет данных"
          )}
        </div>
      </div>
    );
  }
}
