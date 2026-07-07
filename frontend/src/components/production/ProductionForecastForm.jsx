import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import useMetadata from "../../hooks/useMetadata";

function ProductionForecastForm({ onSubmit, loading: predictLoading }) {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      state: "",
      district: "",
      season: "",
      crop: "",
      area: 100,
      start_year: new Date().getFullYear(),
      years: 3,
    },
  });

  const selectedState = useWatch({ control, name: "state" });
  const selectedDistrict = useWatch({ control, name: "district" });
  const selectedSeason = useWatch({ control, name: "season" });
  const selectedCrop = useWatch({ control, name: "crop" });

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

  useEffect(() => {
    if (states.length > 0 && !selectedState) {
      setValue("state", states[0]);
    }
  }, [states, selectedState, setValue]);

  if (metaError) {
    return (
      <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col items-center justify-center min-h-[200px]">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to load metadata.</h3>
        <p className="text-sm text-red-600 mb-4">Please check your connection and try again.</p>
        <Button onClick={retry} className="bg-red-600 hover:bg-red-700 text-white">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Production Forecast</h2>
        <p className="text-sm text-gray-500 mt-1">Enter production parameters to forecast future crop yields.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-end [&>div]:!mb-0 ${metaLoading ? 'opacity-60 pointer-events-none' : ''}`}>
        <Select
          label="State"
          disabled={states.length === 0}
          options={states.map(s => ({ label: s, value: s }))}
          {...register("state", { required: true })}
        />

        <Select
          label="District"
          disabled={!selectedState || districts.length === 0}
          options={districts.map(d => ({ label: d, value: d }))}
          {...register("district", { required: true })}
        />

        <Select
          label="Season"
          disabled={!selectedDistrict || seasons.length === 0}
          options={seasons.map(s => ({ label: s, value: s }))}
          {...register("season", { required: true })}
        />

        <Select
          label="Crop"
          disabled={!selectedSeason || crops.length === 0}
          options={crops.map(c => ({ label: c, value: c }))}
          {...register("crop", { required: true })}
        />

        <Input
          label="Cultivated Area (Hect)"
          type="number"
          min="1"
          {...register("area", { required: true, valueAsNumber: true })}
        />

        <Input
          label="Start Year"
          type="number"
          {...register("start_year", { required: true, valueAsNumber: true })}
        />

        <Input
          label="Forecast Years"
          type="number"
          min="1"
          max="20"
          {...register("years", { required: true, valueAsNumber: true })}
        />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
          <Button disabled={predictLoading || !selectedCrop} loading={predictLoading} className="w-full bg-green-500 hover:bg-green-600 text-white shadow-md shadow-green-500/20 py-3 text-base rounded-xl transition-all">
            {metaLoading ? 'Loading...' : 'Predict'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default ProductionForecastForm;
