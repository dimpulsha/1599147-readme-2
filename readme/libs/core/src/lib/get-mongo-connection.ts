export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  const connectionString = `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
  console.log(connectionString);


   return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
 }
