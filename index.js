import { stdin, stdout } from "process";
import readline from 'readline/promises';
import { sql } from "./constants/db.js";

const rl = readline.createInterface({
	input: stdin,
	output: stdout
})

async function readVal(p){
	let res = await rl.question(p)
	return res;
}

async function showMenu(){
	const res = await readVal("1. Show available users\n2. Create a new user\n3. Delete user\n4. Edit user\n5. Search user\n6. Exit\nChoose an option: ");
	return res;
}

async function createUser(){
	const name = await readVal("Enter name: ");
	const username = await readVal("Enter username: ");
	const email = await readVal("Enter email: ");
	const day = Number(await readVal("Enter day in dob: "))
	const month = Number(await readVal("Enter month in dob(1 - 12): "));
	const year = Number(await readVal("Enter year in dob: "));
	const dob = new Date(year, month - 1, day + 1); //month is 0 indexed in JS Date object
	return {name, username, email, dob: dob.toDateString()}
}


async function main(){
	let loop = true;

	do{
		const option = Number(await showMenu());
		try{
			switch(option){
				case 1:{
					//get all users and display
					const users = await sql`SELECT * FROM users;`;
					console.log("\nAvailable users:");

					if(users.length === 0){
						console.log("No users found.\n");
						break;
					}

					users.forEach((user, index)=>{
						console.log(`${index + 1} : ${JSON.stringify(user)}`);
					});
					console.log("\n");
					break;
				}
				case 2:{
					//create new user
					console.log("Create new user");
					const user = await createUser();
					await sql`INSERT INTO users (name, dob, username, email)
					VALUES(${user.name}, ${user.dob}, ${user.username},
						   ${user.email})`;
						   console.log("User added successfully!\n")
						   break;
				}
				case 3:{
					//Delete user
					console.log("Delete user");
					const username = await readVal("Enter username of user to delete: ");
					await sql`DELETE FROM users WHERE username = ${username};`;
					console.log("User successfully deleted.\n");
					break;
				}
				case 4: {
				  //edit user
          console.log("Edit user");
          const username = await readVal("Enter username of user to edit: ");

          const field = await readVal("What do you want to update? (name/email/dob): ");

          let value;
          if (field === "dob") {
              const day = Number(await readVal("Enter day in dob: "));
              const month = Number(await readVal("Enter month in dob (1-12): "));
              const year = Number(await readVal("Enter year in dob: "));
              value = new Date(year, month - 1, day + 1).toDateString();
          } else {
              value = await readVal(`Enter new ${field}: `);
          }

          await sql`UPDATE users SET ${sql(field)} = ${value} WHERE username = ${username};`;
          console.log("User updated successfully!\n");
          break;
        }
        case 5: {
            //search users
            console.log("Search users");
            const username = await readVal("Enter username to search: ");
            const users = await sql`SELECT * FROM users WHERE username = ${username};`;

            if (users.length === 0) {
                console.log("No user found.\n");
            } else {
                console.log("User found:");
                users.forEach(user => console.log(JSON.stringify(user)));
            }
            console.log("\n");
            break;
        }

				case 6:{
					//Exit
					loop = false;
					console.log("Exiting...\n");
					break;
				}
				default:{
					//Invalid option
					console.log("Invalid option\n");
				}
			}}
			catch(err){
				console.error("An error occured: ", err);
				console.log("\n");
			}
}while(loop)
process.exit(0)
}

await main()
