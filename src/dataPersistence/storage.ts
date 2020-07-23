import { Db, MongoClient } from "mongodb";
import { Collections } from "./types/collections";

function initializeDatabase(db: Db): Promise<Db> {
  return db
    .collection(Collections.AUTHOR)
    .createIndex({ email: 1 }, { unique: true })
    .then(() => db);
}

function createDatabase(
  { connectionUrl, dbName }: { connectionUrl: string; dbName: string },
  handleSuccess: (db: Db, closeDb: () => void) => void,
  handleFailure: () => void
): void {
  MongoClient.connect(
    connectionUrl,
    { useUnifiedTopology: true, connectTimeoutMS: 5000 },
    (err, client) =>
      err
        ? handleFailure()
        : initializeDatabase(client.db(dbName)).then((db) =>
            handleSuccess(db, () => client.close())
          )
  );
}

export { createDatabase };
