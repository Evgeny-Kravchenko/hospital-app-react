import React, { Component } from "react";

import { map } from "underscore";

import "./Home.scss";

import { ReactComponent as User } from "../../images/user.svg";
import { ReactComponent as Star } from "../../images/stars.svg";
import { ReactComponent as Nurse } from "../../images/nurse.svg";
import { ReactComponent as House } from "../../images/home-run.svg";
import { ReactComponent as Clients } from "../../images/clients.svg";
import { ReactComponent as Messages } from "../../images/messages.svg";
import { ReactComponent as Broadcast } from "../../images/broadcast.svg";
import { ReactComponent as Employees } from "../../images/employees.svg";
import { ReactComponent as Appointment } from "../../images/medical-appointment.svg";

const TITLE = "Домашняя";

const SECTIONS = [
  { title: "Приёмы", href: "/appointments", Icon: Appointment },
  { title: "События", href: "/events", Icon: Star },
  { title: "Оповещения", href: "/notifications", Icon: Broadcast },
  { title: "Сообщения", href: "/messages", Icon: Messages },
  { title: "Клиенты", href: "/clients", Icon: Clients },
  { title: "Сотрудники", href: "/employees", Icon: Employees },
];

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <p className="header">Header</p>
        <div className="Home-Body">
          <div className="SectionNavigation">
            {SECTIONS.map(({ title, href, Icon }, index) => (
              <a key={index} className="SectionNavigation-Item Section" href="#">
                <Icon className="Section-Icon" />
                <span className="Section-Title">{title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}