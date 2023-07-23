import * as SQLite from "expo-sqlite";

const DB: SQLite.Database = SQLite.openDatabase('coffeeshop.db')

const deleteCart: string = `DROP TABLE IF EXISTS "Cart";`
const deleteUser: string = `DROP TABLE IF EXISTS "User";`
const deleteCoffee: string = `DROP TABLE IF EXISTS "Coffee";`

const createUser: string = `CREATE TABLE IF NOT EXISTS "User" (
	"UID" INTEGER,
	"Name"	TEXT NOT NULL,
	"Phone"	TEXT NOT NULL,
	"Email"	TEXT NOT NULL,
	"Address"	TEXT NOT NULL,
	"Loyalty"	INTEGER NOT NULL CHECK("Loyalty" <= 8 AND "Loyalty" >= 0),
	"Points"	INTEGER NOT NULL CHECK("Points" > 0),
	PRIMARY KEY("UID")
);`

const createCoffee: string = `CREATE TABLE IF NOT EXISTS "Coffee" (
	"Type"	TEXT,
	"Price"	INTEGER NOT NULL,
	PRIMARY KEY("Type")
);`

const createCart: string = `CREATE TABLE IF NOT EXISTS "Cart" (
	"ID"	INTEGER,
	"Note"	TEXT NOT NULL,
	"Type"	TEXT NOT NULL,
	"Number"	INTEGER NOT NULL,
	"Status"	TEXT NOT NULL CHECK("Status" IN ("In progress", "Waiting", "Complete")),
	PRIMARY KEY("ID" AUTOINCREMENT),
	FOREIGN KEY("Type") REFERENCES "Coffee"("Type")
);`

const populateUser: string = `INSERT OR IGNORE INTO "User" VALUES(1, "Dang Minh Triet", "0917550612", "triet0612@gmail.com", "123 ABC, Phuong 1, Quan 5, TPHCM", 2, 10);`
const createBlackCoffee: string = `INSERT OR IGNORE INTO "Coffee" VALUES("BlackCoffee", 20000);`
const createWhiteCoffee: string = `INSERT OR IGNORE INTO "Coffee" VALUES("WhiteCoffee", 30000);`
const createCappucino: string = `INSERT OR IGNORE INTO "Coffee" VALUES("Cappucino", 35000);`
const createLatte: string = `INSERT OR IGNORE INTO "Coffee" VALUES("Latte", 40000);`

export async function openDB() {
	// const promise = new Promise<void>(async (resolve) => {
	// })
	DB.transaction((tx) => {
		// tx.executeSql(deleteCart);
		// tx.executeSql(deleteUser);
		// tx.executeSql(deleteCoffee);
		tx.executeSql(createUser);
		tx.executeSql(createCoffee);
		tx.executeSql(createCart);
		tx.executeSql(createBlackCoffee);
		tx.executeSql(createWhiteCoffee);
		tx.executeSql(createCappucino);
		tx.executeSql(createLatte);
		tx.executeSql(populateUser);
	})
	// return promise.then(() => {})
}

export {DB}
