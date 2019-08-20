import { all, fork } from 'redux-saga/effects';

import usersSaga from './users';

const sagas = [
  usersSaga,
];

function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)));
}

export default rootSaga;
