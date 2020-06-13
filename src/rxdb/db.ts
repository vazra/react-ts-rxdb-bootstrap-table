/* eslint-disable no-console */
import {
  createRxDatabase,
  addRxPlugin,
  RxDocument,
  RxCollection,
  RxDatabase,
  RxJsonSchema,
} from "rxdb";
import { checkDB } from "./test";
import { timeStart, timeEnd } from "./helper";

// eslint-disable-next-line import/no-unresolved
addRxPlugin(require("pouchdb-adapter-memory"));
addRxPlugin(require("pouchdb-adapter-idb"));
addRxPlugin(require("pouchdb-adapter-websql"));

export type HeroDocType = {
  name: string;
  phone: string;
  address: string;
  area?: string; // optional
};

type HeroDocMethods = {
  scream: (v: string) => string;
};

type HeroDocument = RxDocument<HeroDocType, HeroDocMethods>;

// we declare one static ORM-method for the collection
type HeroCollectionMethods = {
  getCount: (this: HeroCollection) => Promise<number>;
  getCountPouch: (this: HeroCollection) => Promise<number>;
  getCountWithInfo: (this: HeroCollection) => Promise<number>;
  addDocs: (this: HeroCollection, docs: HeroDocType[]) => void;
  getDocs: (
    this: HeroCollection,
    count: number,
    page?: number
  ) => Promise<HeroDocType[]>;
  getDocsPouch: (
    this: HeroCollection,
    count: number,
    page: number
  ) => Promise<HeroDocType[]>;
};

// and then merge all our types
type HeroCollection = RxCollection<
  HeroDocType,
  HeroDocMethods,
  HeroCollectionMethods
>;

export type MyDatabaseCollections = {
  heroes: HeroCollection;
};
checkDB();

type MyDatabase = RxDatabase<MyDatabaseCollections>;

const heroSchema: RxJsonSchema<HeroDocType> = {
  title: "vendor schema",
  description: "describes a vendor",
  version: 0,
  keyCompression: false,
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    phone: {
      type: "string",
      primary: true,
    },
    address: {
      type: "string",
    },
    area: {
      type: "string",
    },
  },
  required: ["name", "phone", "address"],
};

const heroDocMethods: HeroDocMethods = {
  scream(this: HeroDocument, what: string) {
    return `${this.name} screams: ${what.toUpperCase()}`;
  },
};

const heroCollectionMethods: HeroCollectionMethods = {
  async getCount(this: HeroCollection) {
    const t0 = timeStart();
    const allDocs = await this.find().exec();
    console.log("Total users Count: ", allDocs.length);
    timeEnd(t0, `getCount - ${allDocs.length}`);
    return allDocs.length;
  },
  async getCountPouch(this: HeroCollection) {
    const t0 = timeStart();

    const entries = await this.pouch.allDocs().catch((err) => {
      console.log("failed alldocs", err);
    });
    console.log("Total users Count: ", entries.rows.length);
    timeEnd(t0, `getCountPouch - ${entries.rows.length}`);

    return entries.rows.length;
  },

  async getCountWithInfo(this: HeroCollection) {
    const t0 = timeStart();
    const info = await this.pouch.info();
    console.log("Total users Count: ", info.doc_count);
    timeEnd(t0, `getCountWithInfo - ${info.doc_count}`);
    return info.doc_count;
  },

  async getDocs(this: HeroCollection, count: number, page: number = 0) {
    const t0 = timeStart();

    const allDocs = await this.find()
      .skip(count * page)
      .limit(count)
      .exec();
    console.log(
      `retrived ${allDocs.length} docs from users (skipped : ${page * count})`
    );
    timeEnd(t0, `getDocs - ${allDocs.length} items`);
    return allDocs;
  },

  async getDocsPouch(this: HeroCollection, count: number, page: number = 0) {
    const t0 = timeStart();
    const allDocs = await this.pouch.allDocs({ include_docs: true });
    timeEnd(t0, `getDocsPouch - ${allDocs.length} items`);
    return allDocs;
  },

  async addDocs(this: HeroCollection, docs: HeroDocType[]) {
    const t0 = timeStart();
    const res = await this.bulkInsert(docs);
    timeEnd(t0, `addDocs - ${docs.length} items`);
    return res;
  },
};

const collections = [
  {
    name: "heroes",
    schema: heroSchema,
    methods: heroDocMethods,
    statics: heroCollectionMethods,
  },
  // {
  //   name: 'heroes',
  //   schema: heroSchema,
  //   methods: {
  //     hpPercent() {
  //       return (this.hp / this.maxHP) * 100;
  //     }
  //   },
  //   sync: true
  // }
];

// const syncURL = `http://${window.location.hostname}:10102/`;
// console.log(`host: ${syncURL}`);

let dbPromise: Promise<RxDatabase<MyDatabaseCollections>>;
export type IAdapter = "idb" | "memory" | "websql" | "leveldb";
const createDB = async (adapter: IAdapter) => {
  console.log("DatabaseService: creating database..");
  const db: MyDatabase = await createRxDatabase<MyDatabaseCollections>({
    name: "testdb", // <- name
    adapter: adapter, // <- storage-adapter
    password: "passpasspass", // <- password (optional)
    multiInstance: false, // This should be set to false when you have single-instances like a single-window electron-app
    eventReduce: true, // <- eventReduce (optional, default: true)
  });

  console.dir(db);
  console.log("DatabaseService: created database");
  // window.db = db; // write to window for debugging

  // create collections
  // console.log("DatabaseService: create collections");
  await Promise.all(collections.map((colData) => db.collection(colData)));

  // hooks
  // console.log("DatabaseService: add hooks");
  // db.heroes.postInsert(
  //   function myPostInsertHook(
  //     this: HeroCollection, // own collection is bound to the scope
  //     _docData: HeroDocType, // documents data
  //     doc: HeroDocument // RxDocument
  //   ) {
  //     console.log(`insert to ${this.name}-collection: ${doc.name}`);
  //   },
  //   false // not async
  // );

  // TODO   : A function to input collectionId, and sync it with firestore db
  // db.$.subscribe((changeEvent) => console.dir(changeEvent));

  return db;
};

const deleteDB = async () => {
  if (!dbPromise) return false;
  const db = await dbPromise;
  await db.destroy();
  await db.remove();
  return true;
};

const get = async (adpater: IAdapter) => {
  if (!dbPromise) dbPromise = createDB(adpater);
  const db = await dbPromise;
  if (db.adapter !== adpater) {
    console.warn(
      `The current adapter is '${db.adapter}', re-creating with '${adpater}'`
    );
    await deleteDB();
    dbPromise = createDB(adpater);
  }
  return dbPromise;
};

// eslint-disable-next-line import/prefer-default-export
export { get };
