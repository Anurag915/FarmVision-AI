import { useState, useEffect } from "react";
import { getStates, getDistricts, getSeasons, getCrops } from "../api/metadataApi";

function useMetadata(selectedState, selectedDistrict) {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [crops, setCrops] = useState([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSeasons, setLoadingSeasons] = useState(false);
  const [loadingCrops, setLoadingCrops] = useState(false);

  const [error, setError] = useState(null);

  // Load States and Crops on mount
  useEffect(() => {
    let mounted = true;
    
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const data = await getStates();
        if (mounted) setStates(data);
      } catch (err) {
        if (mounted) setError("Failed to load states");
      } finally {
        if (mounted) setLoadingStates(false);
      }
    };

    const fetchCrops = async () => {
      setLoadingCrops(true);
      try {
        const data = await getCrops();
        if (mounted) setCrops(data);
      } catch (err) {
        if (mounted) setError("Failed to load crops");
      } finally {
        if (mounted) setLoadingCrops(false);
      }
    };

    fetchStates();
    fetchCrops();
    
    return () => { mounted = false; };
  }, []);

  // Load Districts when state changes
  useEffect(() => {
    let mounted = true;
    if (!selectedState) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const data = await getDistricts(selectedState);
        if (mounted) setDistricts(data);
      } catch (err) {
        if (mounted) setError("Failed to load districts");
      } finally {
        if (mounted) setLoadingDistricts(false);
      }
    };
    fetchDistricts();
    return () => { mounted = false; };
  }, [selectedState]);

  // Load Seasons when district changes
  useEffect(() => {
    let mounted = true;
    if (!selectedState || !selectedDistrict) {
      setSeasons([]);
      return;
    }

    const fetchSeasons = async () => {
      setLoadingSeasons(true);
      try {
        const data = await getSeasons(selectedState, selectedDistrict);
        if (mounted) setSeasons(data);
      } catch (err) {
        if (mounted) setError("Failed to load seasons");
      } finally {
        if (mounted) setLoadingSeasons(false);
      }
    };
    fetchSeasons();
    return () => { mounted = false; };
  }, [selectedState, selectedDistrict]);

  return {
    states,
    districts,
    seasons,
    crops,
    loading: loadingStates || loadingDistricts || loadingSeasons || loadingCrops,
    error,
  };
}

export default useMetadata;
