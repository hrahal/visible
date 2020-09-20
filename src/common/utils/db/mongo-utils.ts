import { Collection, MongoClient, ObjectId } from 'mongodb';

export interface MongoResMany<T> {
  data: Array<T>,
  total: number
}

export class MongoUtils {

  constructor(private mongoClient: MongoClient, private DATABASE_NAME: string) {
  }

  mongoIdQuery(id: string): { _id: ObjectId } {
    return { _id: new ObjectId(id) };
  }

  collection<T>(collectionName: string): Collection<T> {
    return this.mongoClient.db(this.DATABASE_NAME).collection(collectionName);
  }
}
