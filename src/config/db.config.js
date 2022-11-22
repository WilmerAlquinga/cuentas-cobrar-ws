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
  console.log(sql);
  let cnn = await oracledb.getConnection({
    user: "cuentas_cobrar_dev",
    password: "123456",
    connectString: "localhost/orcl",
  });
  let result = await cnn.execute(`select * from cobrador`);
  console.log(result);
  cnn.release();
  console.log(result);
  return result;
}

exports.Open = Open;
