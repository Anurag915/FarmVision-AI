import api from "../api/axios";

// In-memory cache to prevent duplicate API requests
const cache = {
  states: null,
  districts: {},   // key: state
  seasons: {},     // key: state_district
  recCrops: {},    // key: state_district_season
  priceCrops: {}   // key: state
};

// In-flight request promises to prevent simultaneous duplicate requests
const inFlight = {
  states: null,
  districts: {},
  seasons: {},
  recCrops: {},
  priceCrops: {}
};

export const getStates = async (force = false) => {
  if (cache.states && !force) return cache.states;
  if (inFlight.states && !force) return inFlight.states;

  inFlight.states = api.get("/metadata/states").then(res => {
    cache.states = res.data.states;
    return cache.states;
  }).catch(err => {
    inFlight.states = null;
    throw err;
  });

  return inFlight.states;
};

export const getDistricts = async (state, force = false) => {
  if (!state) return [];
  if (cache.districts[state] && !force) return cache.districts[state];
  if (inFlight.districts[state] && !force) return inFlight.districts[state];

  inFlight.districts[state] = api.get("/metadata/districts", { params: { state } }).then(res => {
    cache.districts[state] = res.data.districts;
    return cache.districts[state];
  }).catch(err => {
    inFlight.districts[state] = null;
    throw err;
  });

  return inFlight.districts[state];
};

export const getSeasons = async (state, district, force = false) => {
  if (!state || !district) return [];
  const key = `${state}_${district}`;
  
  if (cache.seasons[key] && !force) return cache.seasons[key];
  if (inFlight.seasons[key] && !force) return inFlight.seasons[key];

  inFlight.seasons[key] = api.get("/metadata/seasons", { params: { state, district } }).then(res => {
    cache.seasons[key] = res.data.seasons;
    return cache.seasons[key];
  }).catch(err => {
    inFlight.seasons[key] = null;
    throw err;
  });

  return inFlight.seasons[key];
};

export const getRecommendationCrops = async (state, district, season, force = false) => {
  if (!state || !district || !season) return [];
  const key = `${state}_${district}_${season}`;
  
  if (cache.recCrops[key] && !force) return cache.recCrops[key];
  if (inFlight.recCrops[key] && !force) return inFlight.recCrops[key];

  inFlight.recCrops[key] = api.get("/metadata/recommendation/crops", { params: { state, district, season } }).then(res => {
    cache.recCrops[key] = res.data.crops;
    return cache.recCrops[key];
  }).catch(err => {
    inFlight.recCrops[key] = null;
    throw err;
  });

  return inFlight.recCrops[key];
};

export const getPriceCrops = async (state, force = false) => {
  if (!state) return [];
  if (cache.priceCrops[state] && !force) return cache.priceCrops[state];
  if (inFlight.priceCrops[state] && !force) return inFlight.priceCrops[state];

  inFlight.priceCrops[state] = api.get("/metadata/price/crops", { params: { state } }).then(res => {
    cache.priceCrops[state] = res.data.crops;
    return cache.priceCrops[state];
  }).catch(err => {
    inFlight.priceCrops[state] = null;
    throw err;
  });

  return inFlight.priceCrops[state];
};
