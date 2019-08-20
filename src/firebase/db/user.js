import { db } from '../firebase';

export const doCreateUser = (id, name, email) => db.collection('users').doc(id).set({
  name,
  email,
});

export const onceGetUsers = () => db.collection('users').get();

export const onceGetUser = (id) => db.collection('users').doc(id).get();

export const saveSettings = (userId, settings) => {
  const collection = db.collection('users').doc(userId);

  return collection.update('settings', {
    ...settings,
  });
}
