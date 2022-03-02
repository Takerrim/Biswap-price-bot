import { collection, addDoc, getDocs } from 'firebase/firestore'

import { db } from './init.js'

export default class Database {
  static collectionName = 'members'

  static members = []

  static async addMemberId(memberId) {
    try {
      const hasMember = Database.members.includes(memberId)

      if (!hasMember) {
        await addDoc(collection(db, Database.collectionName), { memberId });
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  static async getMembers() {
    try {      
      const querySnapshot = await getDocs(collection(db, Database.collectionName))
      if (!querySnapshot.empty) {
        const members = []

        querySnapshot.forEach((doc) => {
          members.push(doc.data().memberId)
        })

        Database.members = members
        return members
      }

      return Database.members
    } catch (error) {
      console.error('Cannot get members: ', error)
      return []
    }
  }
}
