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

  const { states, districts, seasons, crops, loading: metaLoading } = useMetadata(selectedState, selectedDistrict);

  // Reset district when state changes
  useEffect(() => {
    setValue("district", "");
  }, [selectedState, setValue]);

  // Reset season when district changes
  useEffect(() => {
    setValue("season", "");
  }, [selectedDistrict, setValue]);

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

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Dashboard Filters</h3>
      </div>
      <form onSubmit={handleSubmit(onApply)} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 items-end [&>div]:!mb-0">
        <Select
          label="State"
          disabled={metaLoading || states.length === 0}
          options={states.map(s => ({ label: s, value: s }))}
          {...register("state")}
        />
        <Select
          label="District"
          disabled={metaLoading || !selectedState || districts.length === 0}
          options={districts.map(d => ({ label: d, value: d }))}
          {...register("district")}
        />
        <Select
          label="Season"
          disabled={metaLoading || !selectedDistrict || seasons.length === 0}
          options={seasons.map(s => ({ label: s, value: s }))}
          {...register("season")}
        />
        <Select
          label="Crop"
          disabled={metaLoading || crops.length === 0}
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
            loading={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 py-2"
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AnalyticsFilters;
