import { createRxDatabase, RxDatabase, addRxPlugin } from "rxdb";
import React, { useMemo } from "react";
import faker from "faker";
import { get, HeroDocType } from "./db";

const userSchema = {
  title: "User schema",
  version: 0,
  description: "describes a simple hero",
  type: "object",
  properties: {
    name: {
      type: "string",
      primary: true,
    },
    age: {
      type: "number",
    },
  },
};

// export const createDB = async () => {
//   // addRxPlugin(require("pouchdb-adapter-memory"));
//   addRxPlugin(require("pouchdb-adapter-idb"));

//   console.log("Setting up db.. ");
//   const db = await createRxDatabase({
//     name: "heroesdb", // <- name
//     adapter: "idb", // <- storage-adapter
//     password: "myPassword", // <- password (optional)
//     multiInstance: false, // <- multiInstance (optional, default: true)
//     eventReduce: false, // <- eventReduce (optional, default: true)
//   });
//   console.log("created db");
//   console.dir(db);
//   await db.collection({
//     name: "users",
//     schema: userSchema,
//   });
//   console.log("created users coll..");
//   console.dir(db.users.name);

//   return db;
// };

export const createAUser = (): HeroDocType => {
  var name = faker.name.findName();
  var phone = faker.phone.phoneNumber();
  var address = faker.address.streetAddress();
  var area = faker.address.countryCode();
  return { name, phone, address, area };
};

export const addUserstoDB = async (
  total: number,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  chunk: number = 100
) => {
  const db = await get();
  const t0 = performance.now();
  const timeTaken = [];
  const totalPass = Math.floor(total / chunk);

  for (let pass = 0; pass < totalPass; pass++) {
    setProgress(+(((pass + 1) / totalPass) * 100).toFixed(2));

    const userArry = [];
    for (let i = 0; i < chunk; i++) {
      userArry.push(createAUser());
    }
    const ta0 = performance.now();
    const result = await db.heroes.bulkInsert(userArry);
    const ta1 = performance.now();
    timeTaken.push(ta1 - ta0);
    console.log(
      `inserted ${result.success.length} docs & dailed ${result.error.length} docs`
    );
  }
  const t1 = performance.now();
  console.log(
    `${db.adapter}: Time Taken to add ${total} users : ${(t1 - t0).toFixed(
      1
    )}ms`
  );
  console.log(
    `Pass: ${timeTaken.length}, time: ${timeTaken
      .reduce((a, b) => a + b, 0)
      .toFixed(1)},min: ${Math.min(...timeTaken).toFixed(1)},max: ${Math.max(
      ...timeTaken
    ).toFixed(1)},avg: ${(
      timeTaken.reduce((a, b) => a + b, 0) / timeTaken.length
    ).toFixed(1)},  `
  );
  // console.log(db);
};

// export const getUsers = async (count: number, page: number = 0) => {
//   const db = await get();
//   const userDocs = await db.heroes.getDocs
//     .find()
//     .skip(count * page)
//     .limit(count)
//     .exec();
//   return userDocs;
// };

// export const getUserCount = async (db: RxDatabase) => {
//   const userDocs = await db.users.find().exec();
//   console.log("Total users Count: ", userDocs.length);
//   return userDocs.length;
// };

export const printDBInfo = (db: RxDatabase) => {
  // db.collections.usrs info().then(function (info) {
  //   console.log(info);
  // });
  console.log(db);
};

export const timeStart = () => {
  return performance.now();
};

export const timeEnd = (timeStart: number, funName: string) => {
  var t1 = performance.now();
  console.log(`fun: ${funName} took ${(t1 - timeStart).toFixed(4)}ms`);
};
export const kkk = "";
