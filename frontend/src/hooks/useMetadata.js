import { useState, useEffect, useCallback } from "react";
import { 
  getStates, 
  getDistricts, 
  getSeasons, 
  getRecommendationCrops, 
  getPriceCrops 
} from "../services/metadataService";

/**
 * useMetadata
 * @param {string} moduleType - 'recommendation' or 'price'
 * @param {string} selectedState
 * @param {string} selectedDistrict
 * @param {string} selectedSeason
 */
function useMetadata(moduleType = 'recommendation', selectedState = "", selectedDistrict = "", selectedSeason = "") {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [crops, setCrops] = useState([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSeasons, setLoadingSeasons] = useState(false);
  const [loadingCrops, setLoadingCrops] = useState(false);

  const [error, setError] = useState(null);

  const fetchStates = useCallback(async (force = false) => {
    setLoadingStates(true);
    setError(null);
    try {
      const data = await getStates(force);
      setStates(data || []);
    } catch (err) {
      console.error("Failed to fetch states:", err);
      setError("Unable to load states.");
    } finally {
      setLoadingStates(false);
    }
  }, []);

  // 1. Fetch States on Mount
  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  // 2. Fetch Districts (and Price Crops if applicable) when State changes
  useEffect(() => {
    let mounted = true;

    if (!selectedState) {
      setDistricts([]);
      if (moduleType === 'price') setCrops([]);
      return;
    }

    const fetchStateDependencies = async () => {
      setError(null);

      // Fetch Districts for Recommendation/Production modules
      if (moduleType !== 'price') {
        setLoadingDistricts(true);
        try {
          const data = await getDistricts(selectedState);
          if (mounted) setDistricts(data || []);
        } catch (err) {
          if (mounted) setError("Unable to load districts.");
        } finally {
          if (mounted) setLoadingDistricts(false);
        }
      }

      // Fetch Price Crops for Price module
      if (moduleType === 'price') {
        setLoadingCrops(true);
        try {
          const data = await getPriceCrops(selectedState);
          if (mounted) setCrops(data || []);
        } catch (err) {
          if (mounted) setError("Unable to load crops.");
        } finally {
          if (mounted) setLoadingCrops(false);
        }
      }
    };

    fetchStateDependencies();

    return () => { mounted = false; };
  }, [selectedState, moduleType]);

  // 3. Fetch Seasons when District changes (Only for non-price modules)
  useEffect(() => {
    let mounted = true;
    if (moduleType === 'price') return;

    if (!selectedState || !selectedDistrict) {
      setSeasons([]);
      return;
    }

    const fetchSeasonData = async () => {
      setLoadingSeasons(true);
      setError(null);
      try {
        const data = await getSeasons(selectedState, selectedDistrict);
        if (mounted) setSeasons(data || []);
      } catch (err) {
        if (mounted) setError("Unable to load seasons.");
      } finally {
        if (mounted) setLoadingSeasons(false);
      }
    };

    fetchSeasonData();

    return () => { mounted = false; };
  }, [selectedState, selectedDistrict, moduleType]);

  // 4. Fetch Recommendation Crops when Season changes
  useEffect(() => {
    let mounted = true;
    if (moduleType === 'price') return;

    if (!selectedState || !selectedDistrict || !selectedSeason) {
      setCrops([]);
      return;
    }

    const fetchCropData = async () => {
      setLoadingCrops(true);
      setError(null);
      try {
        const data = await getRecommendationCrops(selectedState, selectedDistrict, selectedSeason);
        if (mounted) setCrops(data || []);
      } catch (err) {
        if (mounted) setError("Unable to load crops.");
      } finally {
        if (mounted) setLoadingCrops(false);
      }
    };

    fetchCropData();

    return () => { mounted = false; };
  }, [selectedState, selectedDistrict, selectedSeason, moduleType]);

  // Aggregate loading state
  const loading = loadingStates || loadingDistricts || loadingSeasons || loadingCrops;

  const retry = () => {
    if (states.length === 0) {
      fetchStates(true);
    }
  };

  return {
    states,
    districts,
    seasons,
    crops,
    loading,
    error,
    retry,
  };
}

export default useMetadata;
