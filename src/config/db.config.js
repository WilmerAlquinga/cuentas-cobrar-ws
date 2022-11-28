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
  let result;
  try {
    connection = await oracledb.getConnection(config);
    result = await connection.execute(sql, binds, { autoCommit });
    console.log(result);
  } catch (error) {
    return console.error(error);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }

    return result;
  }
}

exports.Open = Open;
