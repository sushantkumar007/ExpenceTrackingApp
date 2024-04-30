import { Client, Databases, ID, Query } from 'appwrite'
import conf from '../conf/conf'

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
    }

    async createTransection({date, particular, amount, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    date,
                    particular,
                    amount,
                    status,
                    userId  
                }
            )            
        } catch (error) {
            console.log("appwrite :: databaseService :: createDocument ", error)
            return false
        }
    }

    async updateTransection({transectionId, date, particular, amount, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                transectionId,
                {
                    date,
                    particular,
                    amount,
                    status,
                }
            )
        } catch (error) {
            console.log("appwrite :: databaseService :: updateTransection ", error)
            return false;
        }
    }

    async deleteTransection(transectionId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                transectionId
            )
            return true
        } catch (error) {
            console.log("appwrite :: databaseService :: deleteTransection ", error)
            return false
        }
    }

    async getTransection(transectionId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                transectionId
            )
        } catch (error) {
            console.log("appwrite :: databaseService :: getTransection ", error)
            return false;
        }
    }

    async getStatement(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId", [userId]),
                    Query.limit(100),
                    Query.orderAsc("date")
                ]
            )
        } catch (error) {
            console.log("appwrite :: databaseService :: getStatement ", error)
        }
    }

}

const databaseService = new DatabaseService()

export default databaseService;