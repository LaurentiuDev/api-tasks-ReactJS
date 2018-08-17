import React, { Component } from "react";
import '../../css/Footer.css';
export default class Footer extends Component {
  render() {
    return (
      <div className={"footer"}>
        <footer className="main-footer">
          <div className="pull-right hidden-xs">
            <b>Version</b> 2.4.0
          </div>
          <strong>
            Copyright &copy; 2014-2018{" "}
            <a href="https://adminlte.io">Almsaeed Studio</a>.
          </strong>{" "}
          All rights reserved.
        </footer>
      </div>
    );
  }
}
