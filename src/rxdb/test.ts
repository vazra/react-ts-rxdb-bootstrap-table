import { RxDBAdapterCheckPlugin } from "rxdb/plugins/adapter-check";
import { RxDBEncryptionPlugin } from "rxdb/plugins/encryption";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { checkAdapter, addRxPlugin } from "rxdb";
import { RxDBValidatePlugin } from "rxdb/plugins/validate";

addRxPlugin(RxDBAdapterCheckPlugin);
addRxPlugin(RxDBEncryptionPlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBValidatePlugin);

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
