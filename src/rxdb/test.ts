import { checkAdapter, addRxPlugin } from "rxdb";

addRxPlugin(require("pouchdb-adapter-idb"));
addRxPlugin(require("pouchdb-adapter-memory"));
// addRxPlugin(require("pouchdb-adapter-leveldb"));

export const checkDB = () => {
  checkAdapter("localstorage").then((val) => {
    console.log("RXJS -> Adapter -> localstorage status :", val);
  });
  checkAdapter("idb").then((val) => {
    console.log("RXJS -> Adapter -> idb status :", val);
  });
  checkAdapter("memory").then((val) => {
    console.log("RXJS -> Adapter -> memory status :", val);
  });
  checkAdapter("leveldb").then((val) => {
    console.log("RXJS -> Adapter -> leveldb status :", val);
  });
};
