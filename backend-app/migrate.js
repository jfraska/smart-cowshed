const fs = require("fs");
const path = require("path");
const { sequelize } = require("./models"); // Sesuaikan dengan path model Sequelize Anda

async function runMigrations() {
  try {
    // Jalankan migrasi Sequelize
    await sequelize.sync();

    // Baca dan jalankan file SQL
    const sqlFilePath = path.join(__dirname, "cow_db.sql"); // Sesuaikan dengan path file SQL Anda
    const sqlFileContent = fs.readFileSync(sqlFilePath, "utf8");

    await sequelize.query(sqlFileContent);

    console.log("Migrasi selesai.");
  } catch (error) {
    console.error("Terjadi kesalahan saat migrasi:", error);
  }
}

runMigrations();
