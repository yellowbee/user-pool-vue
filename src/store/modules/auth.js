import router from '../../router';

const state = {
    token: window.localStorage.getItem('token'),
    uuid: window.localStorage.getItem('uuid'),
    activated: window.localStorage.getItem('activated')
};

const getters = {
    isLoggedIn: state => !!state.token,
    getUuid: state => state.uuid,
    getToken: state => state.token,
    isActivated: state => state.activated
};

const actions = {
    // Both signin and signup use this method
    login: ({ commit }, { token, uuid, activated }) => {
        commit('setToken', token);
        commit('setUuid', uuid);
        commit('setActivated', activated);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('uuid', uuid);
        window.localStorage.setItem('activated', activated);
        router.push('/me');
    },
    logout: ({ commit }) => {
        commit('setToken', null);
        commit('setUuid', null);
        commit('activated', null);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('uuid');
        window.localStorage.removeItem('activated');
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUuid: (state, uuid) => {
        state.uuid = uuid;
    },
    setActivated: (state, activated) => {
        state.activated = activated;
    }
};

export default  {
    state,
    getters,
    actions,
    mutations
};