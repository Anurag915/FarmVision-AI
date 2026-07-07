import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import Select from "../common/Select";
import Input from "../common/Input";
import Button from "../common/Button";
import useMetadata from "../../hooks/useMetadata";

function PriceForecastForm({ onSubmit, loading: predictLoading }) {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      state: "",
      crop: "",
      start_year: new Date().getFullYear(),
      start_month: new Date().getMonth() + 1,
      months: 12,
    },
  });

  const selectedState = useWatch({ control, name: "state" });
  const selectedCrop = useWatch({ control, name: "crop" });

  const { states, crops, loading: metaLoading, error: metaError, retry } = useMetadata('price', selectedState);

  // Reset crop when state changes
  useEffect(() => {
    setValue("crop", "");
  }, [selectedState, setValue]);

  // Set default state if none selected and options loaded
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
        <h2 className="text-xl font-semibold text-gray-900">Price Forecast Parameters</h2>
        <p className="text-sm text-gray-500 mt-1">Select location and crop details to generate market predictions.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 items-end [&>div]:!mb-0 ${metaLoading ? 'opacity-60 pointer-events-none' : ''}`}>
        <Select
          label="State"
          disabled={states.length === 0}
          options={states.map(s => ({ label: s, value: s }))}
          {...register("state", { required: true })}
        />

        <Select
          label="Crop"
          disabled={!selectedState || crops.length === 0}
          options={crops.map(c => ({ label: c, value: c }))}
          {...register("crop", { required: true })}
        />

        <Input
          label="Start Year"
          type="number"
          {...register("start_year", { required: true, valueAsNumber: true })}
        />
        
        <Input
          label="Start Month"
          type="number"
          min="1"
          max="12"
          {...register("start_month", { required: true, valueAsNumber: true })}
        />
        
        <Input
          label="Fore. Months"
          type="number"
          min="1"
          max="60"
          {...register("months", { required: true, valueAsNumber: true })}
        />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
          <Button disabled={predictLoading || !selectedState || !selectedCrop} loading={predictLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 py-3 text-base rounded-xl transition-all">
            {metaLoading ? 'Loading...' : 'Predict'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default PriceForecastForm;
