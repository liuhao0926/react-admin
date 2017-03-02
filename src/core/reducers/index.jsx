import { combineReducers } from 'redux';
import cityStore from './citys';
import userAccount from './userAccount';
// import navigationState from './navigation';
// import stationStore from './stations';
// import contactStore from './contact';
// import travelsStore from './travels';
// import { newOrderStore, orderDetails, priceDetails } from './order';

export default combineReducers({
    cityStore,
    userAccount
    // navigationState,
    // stationStore,
    // contactStore,
    // newOrderStore,
    // orderDetails,
    // priceDetails,
    // travelsStore
});