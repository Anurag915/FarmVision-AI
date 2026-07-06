import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import useMetadata from "../../hooks/useMetadata";

const MONTHS = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

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
  
  // We don't necessarily need selectedDistrict for crops, but useMetadata takes it
  const { states, crops, loading: metaLoading } = useMetadata(selectedState, "");

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
        <h2 className="text-xl font-semibold text-gray-900">Price Prediction</h2>
        <p className="text-sm text-gray-500 mt-1">Select crop details to forecast future prices.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-end [&>div]:!mb-0">
        <Select
          label="State"
          disabled={metaLoading || states.length === 0}
          options={states.map(s => ({ label: s, value: s }))}
          {...register("state", { required: true })}
        />

        <Select
          label="Crop"
          disabled={metaLoading || crops.length === 0}
          options={crops.map(c => ({ label: c, value: c }))}
          {...register("crop", { required: true })}
        />

        <Input
          label="Start Year"
          type="number"
          {...register("start_year", { required: true, valueAsNumber: true })}
        />

        <Select
          label="Start Month"
          options={MONTHS}
          {...register("start_month", { required: true, valueAsNumber: true })}
        />

        <Input
          label="Forecast Months"
          type="number"
          min="1"
          max="60"
          {...register("months", { required: true, valueAsNumber: true })}
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

export default PriceForecastForm;
