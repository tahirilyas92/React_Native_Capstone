import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);"
        );
      },
      reject,
      resolve
    );
    console.log("DB: createTable");
    console.log(
      "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);"
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems;", [], (_, { rows }) => {
        resolve(rows._array);
        // const customers = rows._array.map((item) => ({
        //   uid: item.uid,
        //   name: item.name,
      });
    });
    console.log("DB: getMenuItems");
    console.log("select * from menuitems;");
  });
}

export async function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `insert into menuitems (name, price, description, image, category) values ('${
            menuItems.name
          }', '${menuItems.price}', '${menuItems.description.replace(
            "'",
            "''"
          )}', '${menuItems.image}', '${menuItems.category}');`
        );
      },
      reject,
      resolve
    );
    console.log("DB: saveMenuItems");
    console.log(
      `insert into menuitems (name, price, description, image, category) values ('${
        menuItems.name
      }', '${menuItems.price}', '${menuItems.description.replace(
        "'",
        "''"
      )}', '${menuItems.image}', '${menuItems.category}');`
    );
  });
}

// Template
export async function updateMenuItems(menuItems) {
  return new Promise((resolve, reject) =>
    db.transaction(
      (tx) => {
        tx.executeSql(
          `update menuitems set uid=?, name=? where uid=${updatedCustomer.uid};`,
          [updatedCustomer.uid, updatedCustomer.name]
        );
      },
      reject,
      resolve
    )
  );
}

// Template
export async function deleteMenuItems(menuItems) {
  return new Promise((resolve, reject) =>
    db.transaction(
      (tx) => {
        tx.executeSql("delete from menuitems where uid = ?;", [customer.uid]);
      },
      reject,
      resolve
    )
  );
}

export async function deleteAllMenuItems() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from menuitems;");
      },
      reject,
      resolve
    );
    console.log("DB: deleteAllMenuItems");
    console.log("delete from menuitems;");
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  const categoriesString = activeCategories
    .map((c) => `'${c.toLowerCase()}'`)
    .join(", ");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from menuitems where name like '%${query}%' and category in (${categoriesString})`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
}
