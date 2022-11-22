const oracledb = require("oracledb");

try {
  oracledb.initOracleClient({
    libDir:
      "C:\\Users\\Usuario\\Documents\\Arquitectura\\Proyecto\\instantclient_21_7",
  });
} catch (err) {
  console.error("Error on init oracle client");
  console.error(err);
  process.exit(1);
}

config = {
  user: "cuentas_cobrar_dev",
  password: "123456",
  connectString: "localhost/orcl",
};

async function Open(sql, binds, autoCommit) {
  try {
    let connection = await oracledb.getConnection(config);
    let result = await connection.execute(sql, binds, { autoCommit });
  } catch (error) {
    return err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {}
    }
  }

  cnn.release();
  return result;
}

exports.Open = Open;
