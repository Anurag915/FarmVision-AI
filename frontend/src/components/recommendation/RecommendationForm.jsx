import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import useMetadata from "../../hooks/useMetadata";

function RecommendationForm({ onSubmit, loading: predictLoading }) {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      state: "",
      district: "",
      season: "",
      area: 100,
      start_year: 2016,
      years: 3,
    },
  });

  const selectedState = useWatch({ control, name: "state" });
  const selectedDistrict = useWatch({ control, name: "district" });

  const { states, districts, seasons, loading: metaLoading } = useMetadata(selectedState, selectedDistrict);

  // Reset district when state changes
  useEffect(() => {
    setValue("district", "");
  }, [selectedState, setValue]);

  // Reset season when district changes
  useEffect(() => {
    setValue("season", "");
  }, [selectedDistrict, setValue]);

  // Set default state if none selected and options loaded
  useEffect(() => {
    if (states.length > 0 && !selectedState) {
      setValue("state", states[0]);
    }
  }, [states, selectedState, setValue]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Crop Prediction</h2>
        <p className="text-sm text-gray-500 mt-1">Enter details to get AI recommendations.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-end [&>div]:!mb-0">
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

        <Input
          label="Area (Hect)"
          type="number"
          {...register("area")}
        />
        
        <Input
          label="Fore. Years"
          type="number"
          {...register("years")}
        />
        
        <Input
          label="Start Year"
          type="number"
          {...register("start_year")}
        />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
          <Button disabled={predictLoading || metaLoading} loading={predictLoading} className="w-full bg-green-500 hover:bg-green-600 text-white shadow-md shadow-green-500/20 py-3 text-base rounded-xl transition-all">
            Predict
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default RecommendationForm;