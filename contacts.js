const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
const { table } = require("console");

// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const dirpath = "./data";
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

const datapath = "./data/contacts.json";
if (!fs.existsSync(datapath)) {
  fs.writeFileSync(datapath, "[]", "utf-8");
}

// const pertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (result) => {
//       resolve(result);
//     });
//   });
// };

// rl.question("nama = ", (nama) => {
//   rl.question("nohp = ", (nohp) => {
//     const data = { nama, nohp };
//     const contacts = JSON.parse(fs.readFileSync(datapath, "utf-8"));
//     contacts.push(data);
//     fs.writeFileSync(datapath, JSON.stringify(contacts));
//     rl.close();
//   });
// });

module.exports.addData = async (data) => {
  // const nama = await pertanyaan("masukkan nama kamu:");
  // const email = await pertanyaan("masukkan email kamu:");
  // const nohp = await pertanyaan("masukkan nomor hp kamu:");

  // const data = { nama, email, nohp };
  var contacts = JSON.parse(fs.readFileSync(datapath, "utf-8"));
  ////cek nohp
  if (!validator.isMobilePhone(data.nohp, "id-ID")) {
    console.log(chalk`{bgRed.black no hp tidak valid}`);
    return false;
  }

  ////cek email
  if (data.email) {
    if (!validator.isEmail(data.email)) {
      console.log(chalk`{bgRed.black email tidak valid}`);
      return false;
    }
  }
  ////duplicate
  const duplicate = contacts.find((contact) => contact.nama === data.nama);
  if (duplicate) {
    console.log(chalk.bgRed.black("nomor sudah terdaftar"));
    return false;
  }

  contacts.push(data);
  fs.writeFileSync(datapath, JSON.stringify(contacts));
  console.log(chalk`{bgGreen.white Berhasil Ditambah}`);
  // rl.close();
};

module.exports.listData = () => {
  return JSON.parse(fs.readFileSync(datapath, "utf-8"));
};

module.exports.detaildata = (nama) => {
  const contacts = JSON.parse(fs.readFileSync(datapath, "utf-8"));
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  if (!contact) {
    console.log(chalk`{bgRed.black nama tidak ditemukan}`);
    return false;
  }
  console.log(chalk`{bgGreen.white data ditemukan}`);
  console.log(contact.nama);
  console.log(contact.nohp);
  console.log(contact.email);
};

module.exports.removedata = (nama) => {
  const contacts = JSON.parse(fs.readFileSync(datapath, "utf-8"));
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk`{bgRed.black nama tidak ditemukan}`);
    return false;
  }
  fs.writeFileSync(datapath, JSON.stringify(newContacts));
  console.log(chalk`{bgGreen.white ${nama} Berhasil Dihapus}`);
};
