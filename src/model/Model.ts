import {DB} from "../Database";

export module UserMod {
  export type User = {
    UID:        number,
    Name:       string,
    Phone:      string,
    Email:	    string,
    Address:    string,
    Loyalty:    number,
    Points:     number,
  }
  export function blankUser(): User {
    return {
      Name: "", Phone: "", Email: "", Address: "", Loyalty: 0, Points: 0, UID: 0,
    }
  }
  export async function readUsers(): Promise<User> {
    const promise: Promise<User> = new Promise<User>(async (resolve, reject) => {
      DB.transaction(
        tx => {
          tx.executeSql("SELECT * FROM User;", [],
            (_, {rows: {_array}}) => {
              resolve(_array[0] as User);
            }
          )
        },
        error => {
          reject(error)
        }
      )
    })
    return promise.then(user => {return user});
  }
  export async function updateUser(user: User) {
    const updateStatement = `UPDATE "User" SET "name" = ?, "Phone" = ?, "Email" = ?, "Address" = ? WHERE "UID"=1;`
    DB.transaction(
      tx => {tx.executeSql(updateStatement,[user.Name, user.Phone, user.Email, user.Address])}
    )
  }
  export async function addPoints() {
    const updateStatement = `UPDATE "User" SET "Points" = "Points" + 12 WHERE "UID"=1;`
    DB.transaction(
      tx => {tx.executeSql(updateStatement,[])}
    )
  }
  export async function addLoyalty() {
    const updateStatement = `UPDATE "User" SET "Loyalty" = "Loyalty" + 1 WHERE "UID"=1;`
    DB.transaction(
      tx => {tx.executeSql(updateStatement,[])}
    )
  }
  export async function cleanLoyalty() {
    const updateStatement = `UPDATE "User" SET "Loyalty" = 0 WHERE "UID"=1;`
    DB.transaction(
      tx => {tx.executeSql(updateStatement,[])}
    )
  }
  export async function redeemCoffee(type: string) {
    const updateStatement = `UPDATE "User" SET "Points" = "Points" - 120 WHERE "UID"=1;`
    const insertRedeemed = `INSERT INTO "Cart"("Note", "Type", "Number", "Status") VALUES("0000", ?, 1, "Redeemed")`;
    DB.transaction(
      tx => {
        tx.executeSql(updateStatement,[]);
        tx.executeSql(insertRedeemed, [type]);
      }
    )
  }
}

export module CoffeeMod {
  export type Coffee = {
    Type:   string,
    Price:  string,
  }
  export async function readCoffees(): Promise<Coffee[]> {
    const promise = new Promise<Coffee[]>(async (resolve, reject) => {
      DB.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM Coffee;`, [],
            (_, {rows: {_array}}) => {
              resolve(_array)
            }
          )
        },
        error => { reject(error) }
      )
    })
    return promise.then(coffee_list => coffee_list);
  }
  export async function readCoffeesByName(t: string): Promise<Coffee> {
    const promise = new Promise<Coffee[]>(async (resolve, reject) => {
      DB.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM Coffee WHERE Type = ?`, [t.replace(" ", '')],
            (_, {rows: {_array}}) => {
              resolve(_array)
            }
          )
        },
        error => { reject(error) }
      )
    })
    return promise.then(coffee_list => coffee_list[0]);
  }
}

export module CartMod {
  export type CartItem = {
    ID:     number,
    Note:   string,
    Status: string,
    Type:   string,
    Number: number
  }
  export async function readCart(): Promise<CartItem[]> {
    const promise = new Promise<CartItem[]>(async (resolve, reject) => {
      DB.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM "Cart" WHERE "Status"="In progress"`, [],
            (_, {rows: {_array}}) => {
              resolve(_array)
            }
          )
        },
        error => { reject(error) }
      )
    })
    return promise.then(cart_list => {return cart_list});
  }
  export async function addToCart(cart: CartItem) {
    DB.transaction(
      tx => {
        tx.executeSql(
          `INSERT INTO "Cart"("Note", "Type", "Number", "Status") VALUES(?, ?, ?, "In progress")`,
          [cart.Note, cart.Type, cart.Number]
        )
      }
    )
    return;
  }
  export async function deleteCart(cart: CartItem) {
    DB.transaction(
      tx => {
        tx.executeSql(
          `DELETE FROM "Cart" WHERE "ID" = ?`, [cart.ID]
        )
      }
    )
    return;
  }
  export async function submitOrder() {
    DB.transaction(tx => {
        tx.executeSql(`UPDATE "Cart" SET "Status" = "Waiting" WHERE "Status" = "In progress"`)
    })
    return;
  }
  export async function readOrder(): Promise<CartItem[]> {
    const promise = new Promise<CartItem[]>(async (resolve, reject) => {
      DB.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM "Cart" WHERE "Status"<>"In progress" AND "Status"<>"Redeemed"`, [],
            (_, {rows: {_array}}) => {
              resolve(_array)
            }
          )
        },
        error => { reject(error) }
      )
    })
    return promise.then(cart_list => {return cart_list});
  }
  export async function completeOrder() {
    DB.transaction(tx => {
      tx.executeSql(`UPDATE "Cart" SET "Status" = "Complete" WHERE "Status" = "Waiting"`)
    })
    return;
  }
  export async function readRedeemed() {
    const promise = new Promise<CartItem[]>(async (resolve, reject) => {
      DB.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM "Cart" WHERE "Status"="Redeemed"`, [],
            (_, {rows: {_array}}) => {
              resolve(_array)
            }
          )
        },
        error => { reject(error) }
      )
    })
    return promise.then(cart_list => {return cart_list});
  }
}
