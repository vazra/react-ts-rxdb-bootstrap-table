import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { get, MyDatabaseCollections, HeroDocType } from "./rxdb/db";
import { RxDatabase, RxDocument } from "rxdb";
import { addUserstoDB, timeStart, timeEnd } from "./rxdb/helper";
import {
  Container,
  Jumbotron,
  Button,
  Row,
  Col,
  Form,
  ProgressBar,
  Card,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
// import {
//   createRxDatabase,
//   RxDatabase,
//   RxDocument,
//   /* ... */
// } from "rxdb";
// import { createDB, addUserstoDB, getUsers, getUserCount } from "./helper";

// type IUser = {
// string
// }

function App() {
  const [users, setUsers] = useState<HeroDocType[]>();
  const [db, setDB] = useState<RxDatabase<MyDatabaseCollections>>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [addCount, setAddCount] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const columns = [
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "phone",
      text: "Phone No",
    },
    {
      dataField: "address",
      text: "Address",
    },
    {
      dataField: "area",
      text: "Area",
    },
  ];

  useEffect(() => {
    // create the databse
    async function anyNameFunction() {
      const theDB = await get();

      setDB(theDB);
      await addUserstoDB(200, setProgress);

      const users = await theDB.heroes.getDocs(30);
      setUsers(users);
    }
    anyNameFunction();
  }, []);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      db &&
        (await db.heroes.getCount().then((count) => {
          setTotalCount(count);
        }));

      db &&
        (await db.heroes.getCountPouch().then((count) => {
          setTotalCount(count);
        }));

      db &&
        (await db.heroes.getCountWithInfo().then((count) => {
          setTotalCount(count);
        }));
    }
    // Execute the created function directly
    anyNameFunction();
  }, [db, users]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAddCount(+e.target.value);
    setProgress(0);
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProgress(0);
    await addUserstoDB(addCount, setProgress);
    setAddCount(0);
    const users = await db?.heroes.getDocs(30);
    setUsers(users);
  };

  const progressInstance = (
    <ProgressBar now={progress} label={`${progress}%`} />
  );

  // fetchCount();
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">
          Welcome To React-Bootstrap TypeScript Example
        </h1>
      </Jumbotron>
      <Row>
        <Col>
          <Form onSubmit={handleAddSubmit}>
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Control
                  className="mb-1"
                  id="inlineFormInput"
                  placeholder="Enter No"
                  value={addCount}
                  onChange={handleChangeInput}
                />
              </Col>

              <Col xs="auto">
                <Button variant="success" type="submit" className="mb-2">
                  Add {addCount} Users
                </Button>
                <br />
                {progressInstance}
              </Col>
              <Col> </Col>
            </Form.Row>
          </Form>
        </Col>
        <Col xs="auto">
          <p>
            ({users?.length}/{totalCount}) Fetched
          </p>
          <Button variant="primary" className="mb-2">
            Reload
          </Button>{" "}
          <Button variant="outline-danger" className="mb-2">
            Delete DB
          </Button>{" "}
        </Col>
        <Col xs="auto"></Col>
      </Row>

      <Row>
        <Col>
          <Card style={{ marginTop: "16px" }}>
            <Card.Body>
              {" "}
              First Doc : {JSON.stringify(users && users[0])}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "16px" }}>
          <BootstrapTable
            keyField="phone"
            data={users || []}
            columns={columns}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

/* <div className="App">
<header className="App-header">
  
</header>
</div> */
