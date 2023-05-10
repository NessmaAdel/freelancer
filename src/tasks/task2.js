import React, { useEffect, useState, useRef } from "react";
import { Header, Image, Table, Button, Modal, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../_app.scss";
import Axios from "axios";
export default function CustomTable() {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [Phone, setPhone] = useState("");
  const [next, setNext] = useState(0);
  const buttonRef = useRef(null);
  const PerPage = 0;
  let arrayForHolding = [];
  const tableHeader = ["Name", "Gender", "Phone", "Action"];
  const getTableData = () => {
    Axios.get("https://randomuser.me/api/?seed=dexi-interview")
      .then((response) => {
        setTableData(response.data.results);
      })
      .catch((error) => {
        // alert(error);
      });
  };
  const loopWithSlice = (start, end) => {
    const sliced = tableData.slice(start, end);
    arrayForHolding = [...arrayForHolding, ...sliced];
    setTableData(arrayForHolding);
  };

  const handleShowMore = () => {
    loopWithSlice(next, next + PerPage);
    setNext(next + PerPage);
  };
  useEffect(() => {
    getTableData();
    loopWithSlice(0, PerPage);
  }, []);
  const buttonRefe = buttonRef.current;

  return (
    <>
      <Table stackable>
        <Table.Header key={Math.random()}>
          <Table.Row>
            {tableHeader.map((title) => (
              <Table.HeaderCell>{title}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData.length > 0 &&
            tableData.map((ele) => (
              <Table.Row key={ele.login.uuid + Math.random()}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image src={ele.picture.thumbnail} rounded size="mini" />
                    <Header.Content>
                      {ele.name.title + " "}
                      {firstName !== "" ? firstName : ele.name.first}{" "}
                      {lastName !== "" ? lastName : ele.name.last}
                      <Header.Subheader>
                        {email !== "" ? email : ele.email}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{gender !== "" ? gender : ele.gender}</Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      {Phone !== "" ? Phone : ele.phone}
                      <Header.Subheader>{ele.cell}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <Modal
                      centered={false}
                      open={open}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      trigger={
                        <Button basic color="blue" ref={buttonRefe}>
                          Edit
                        </Button>
                      }
                    >
                      <Modal.Header>Edit Data</Modal.Header>
                      <Modal.Content>
                        <Form unstackable>
                          <Form.Group widths={2}>
                            <Form.Input
                              label="First name"
                              placeholder="First name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Form.Input
                              label="Last name"
                              placeholder="Last name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                            <Form.Input
                              label="email"
                              placeholder="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Input
                              label="gender"
                              placeholder="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <Form.Input
                              label="Phone"
                              placeholder="Phone"
                              value={Phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={() => setOpen(false)} ref={buttonRefe}>
                          Edit
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <span
        onClick={handleShowMore}
        style={{ textAlign: "center", cursor: "Pointer", display: "block" }}
      >
        load more
      </span>
    </>
  );
}
