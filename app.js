const yargs = require("yargs");
const contacts = require("./contacts.js");

yargs
  .command({
    command: "add",
    describe: "menambahkan contact baru",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email",
        demandOption: false,
        type: "string",
      },
      nohp: {
        describe: "no hp",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const contact = {
        nama: argv.nama,
        email: argv.email,
        nohp: argv.nohp,
      };
      contacts.addData(contact);
    },
  })
  .demandCommand();

//menampilkan daftar
yargs.command({
  command: "list",
  describe: "menampilkan contacts",
  handler() {
    console.log(contacts.listData());
  },
});

//menampilkan detail
yargs.command({
  command: "detail",
  describe: "menampilkan detail contact berdasarkan nama",
  builder: {
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detaildata(argv.nama);
  },
});

//menghapus data
yargs.command({
  command: "remove",
  describe: "menghapus contact berdasarkan nama",
  builder: {
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.removedata(argv.nama);
  },
});

yargs.parse();
