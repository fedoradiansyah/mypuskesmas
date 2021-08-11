import {createStore} from 'redux';

// const [profile, setProfile] = useState("tambakajifpn");

// setProfile("Ferdiansyah")

const initialState = {
  loading: false,
  name: 'Ferdiansyah Permana Ninditha',
  address: 'Boja',
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === 'SET_NAME') {
    return {
      ...state,
      name: 'Anita',
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
