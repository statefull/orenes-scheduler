export default class Database {
  constructor(firebase) {
    this.firebase = firebase;
    this.database = firebase.firestore();
  }

  getConfigurationsbyUser(user) {
    const doc = this.database.collection('configurations').doc(user);

    return new Promise((resolve, reject) => {
      doc
        .get()
        .then((configs) => (configs.exists ? resolve(configs.data()) : reject()))
        .catch(reject);
    });
  }

  setConfigurationsToUser(user, configs) {
    const doc = this.database.collection('configurations').doc(user);

    doc.set({ configs });
  }
}
