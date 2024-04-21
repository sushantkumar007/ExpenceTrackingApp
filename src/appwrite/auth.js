import { Client, Account, ID } from "appwrite"
import conf from '../conf/conf'

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name)
            if (user) {
                return this.login({email, password})
            } else {
                return user
            }
        } catch (error) {
            console.log("appwrite :: authService :: createAccount ", error)
            return false
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("appwrite :: authService :: login ", error)
            return false
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
            return true;
        } catch (error) {
            console.log("appwrite :: authService :: logout ", error)
            return false
        }
    }

    async getCurrentUser() {
        try {
            return this.account.get()
        } catch (error) {
            console.log("appwrite :: authService :: getCurrentUser ", error)
        }
    }

}

const authService = new AuthService();

export default authService;