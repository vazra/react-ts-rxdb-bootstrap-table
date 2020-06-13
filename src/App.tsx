import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { get, MyDatabaseCollections, HeroDocType, IAdapter } from "./rxdb/db";
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
  ButtonGroup,
} from "react-bootstrap";
import BootstrapTable, {
  TableChangeType,
  TableChangeState,
} from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import RemoteTable from "./RemoteTable";

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
  const [addCount, setAddCount] = useState<number>(100);
  const [progress, setProgress] = useState<number>(0);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [adapter, setAdapter] = useState<IAdapter>("memory");
  const [availabeAdapters, setAvailabeAdapters] = useState<IAdapter[]>([
    "idb",
    "memory",
    "websql",
  ]);

  useEffect(() => {});

  useEffect(() => {
    // create the databse
    async function anyNameFunction() {
      const theDB = await get(adapter);

      setDB(theDB);
      await addUserstoDB(theDB, 25, setProgress);

      const users = await theDB.heroes.getDocs(sizePerPage, page);
      setUsers(users);
    }
    anyNameFunction();
  }, [adapter, db, page, sizePerPage]);

  const getDocs = async () => {
    const users = (await db?.heroes.getDocs(sizePerPage, page)) || [];
    setUsers(users);
  };

  const reloadUI = async () => {
    setProgress(0);
    setPage(1);
    setSizePerPage(10);
    setUsers([]);
    setTotalCount(0);

    const theDB = await get(adapter);
    setDB(theDB);

    await getDocs();
  };

  useEffect(() => {
    db?.heroes
      .getDocs(sizePerPage, page)
      .then((docs) => {
        setUsers(docs);
      })
      .catch((err) => {
        console.error("Failed to get users", err);
      });
  }, [db, page, sizePerPage]);

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
  const adapterLabel = {
    idb: "IndexedDB",
    memory: "In Memmory",
    websql: "Web SQL",
    leveldb: "Level DB",
    localstorage: "Local Storage",
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProgress(0);
    db && (await addUserstoDB(db, addCount, setProgress));
    setAddCount(100);
    getDocs();
  };

  const progressInstance = (
    <ProgressBar now={progress} label={`${progress}%`} />
  );

  const handleTableChange = (
    type: TableChangeType,
    { page, sizePerPage }: TableChangeState<any>
  ) => {
    // if (type === "pagination")
    setPage(page);
    setSizePerPage(sizePerPage);
  };

  // fetchCount();
  return (
    <Container className="p-3">
      <Jumbotron style={{ textAlign: "center" }}>
        <h1 className="header">RxDB ({adapterLabel[adapter]}) with React</h1>
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
        <Col>
          <ButtonGroup aria-label="Adapters">
            {availabeAdapters.map((anAdapter) => (
              <Button
                key={anAdapter}
                onClick={() => {
                  setAdapter(anAdapter);
                }}
                variant={anAdapter === adapter ? "info" : "outline-info"}
              >
                {adapterLabel[anAdapter]}
              </Button>
            ))}
          </ButtonGroup>
        </Col>

        <Col xs="auto">
          <p>
            ({users?.length}/{totalCount}) Fetched
          </p>
          <Button
            variant="primary"
            className="mb-2"
            onClick={() => {
              reloadUI();
            }}
          >
            Reload
          </Button>{" "}
          <Button
            variant="outline-danger"
            className="mb-2"
            onClick={() => {
              reloadUI();
            }}
          >
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
          <RemoteTable
            data={users || []}
            page={page}
            sizePerPage={sizePerPage}
            totalSize={totalCount}
            onTableChange={handleTableChange}
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
