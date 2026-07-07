import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Select from "../common/Select";
import Input from "../common/Input";
import Button from "../common/Button";
import useMetadata from "../../hooks/useMetadata";

function AnalyticsFilters({ onApply, loading }) {
  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      state: "",
      district: "",
      season: "",
      crop: "",
      year: new Date().getFullYear(),
    }
  });

  const selectedState = useWatch({ control, name: "state" });
  const selectedDistrict = useWatch({ control, name: "district" });
  const selectedSeason = useWatch({ control, name: "season" });

  const { states, districts, seasons, crops, loading: metaLoading, error: metaError, retry } = useMetadata('recommendation', selectedState, selectedDistrict, selectedSeason);

  // Reset district when state changes
  useEffect(() => {
    setValue("district", "");
    setValue("season", "");
    setValue("crop", "");
  }, [selectedState, setValue]);

  // Reset season when district changes
  useEffect(() => {
    setValue("season", "");
    setValue("crop", "");
  }, [selectedDistrict, setValue]);

  // Reset crop when season changes
  useEffect(() => {
    setValue("crop", "");
  }, [selectedSeason, setValue]);

  const handleReset = () => {
    reset({
      state: "",
      district: "",
      season: "",
      crop: "",
      year: new Date().getFullYear(),
    });
    onApply({});
  };

  if (metaError) {
    return (
      <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col items-center justify-center min-h-[150px] mb-8">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to load metadata.</h3>
        <p className="text-sm text-red-600 mb-4">Please check your connection and try again.</p>
        <Button onClick={retry} className="bg-red-600 hover:bg-red-700 text-white">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-8 relative">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Dashboard Filters</h3>
      </div>
      <form onSubmit={handleSubmit(onApply)} className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 items-end [&>div]:!mb-0 ${metaLoading ? 'opacity-60 pointer-events-none' : ''}`}>
        <Select
          label="State"
          disabled={states.length === 0}
          options={states.map(s => ({ label: s, value: s }))}
          {...register("state")}
        />
        <Select
          label="District"
          disabled={!selectedState || districts.length === 0}
          options={districts.map(d => ({ label: d, value: d }))}
          {...register("district")}
        />
        <Select
          label="Season"
          disabled={!selectedDistrict || seasons.length === 0}
          options={seasons.map(s => ({ label: s, value: s }))}
          {...register("season")}
        />
        <Select
          label="Crop"
          disabled={!selectedSeason || crops.length === 0}
          options={crops.map(c => ({ label: c, value: c }))}
          {...register("crop")}
        />
        <Input
          label="Forecast Year"
          type="number"
          {...register("year", { valueAsNumber: true })}
        />
        
        <div className="flex gap-2 w-full h-full pb-0.5">
          <Button 
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2"
            disabled={loading}
          >
            Reset
          </Button>
          <Button 
            type="submit"
            loading={loading || metaLoading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 py-2"
          >
            {metaLoading ? 'Loading...' : 'Apply'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AnalyticsFilters;
