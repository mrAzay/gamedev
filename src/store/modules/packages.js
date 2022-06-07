import prettyDate from '@/tools/prettyDate';

const axios = require('axios');
const NPM_SEARCH_API = 'https://api.npms.io/v2/'

const state = () => ({
    packages: [],
    totalPackages: 0,
    packageInfo: {}
});

const actions = {
    addPackages({commit}, {data, from}) {
        return axios({
            url: NPM_SEARCH_API + 'search',
            method: 'GET',
            params: {
                q: data,
                from,
                size: 10
            }
        }).then((response) => {
            commit('addPackages', response.data.results);
            commit('addTotalPackages', response.data.total);
        })
    },
};

const getters = {
    packages: (state) => {
        return state.packages.map(item =>{
            item.package.date = prettyDate(item.package.date)
            return item
        })
    },
    totalPackages: (state) => state.totalPackages,
};

const mutations = {
    addPackages(state, packages) {
        state.packages = packages
    },
    addTotalPackages(state, totalPackages) {
        state.totalPackages = totalPackages
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
