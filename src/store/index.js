import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';

const sagaMiddle = createSagaMiddleware();
export default createStore(rootReducer, applyMiddleware(sagaMiddle));
sagaMiddle.run(rootSaga);
