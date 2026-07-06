import { useState, useEffect } from "react";
import { getStates, getDistricts, getSeasons } from "../api/metadataApi";

function useMetadata(selectedState, selectedDistrict) {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSeasons, setLoadingSeasons] = useState(false);

  const [error, setError] = useState(null);

  // Load States on mount
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
    fetchStates();
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
    loading: loadingStates || loadingDistricts || loadingSeasons,
    error,
  };
}

export default useMetadata;
