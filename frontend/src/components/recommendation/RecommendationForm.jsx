import { useForm } from "react-hook-form";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

function RecommendationForm({
  onSubmit,
  loading,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      state: "Andhra Pradesh",
      district: "Anantapur",
      season: "Kharif",
      area: 100,
      start_year: 2016,
      years: 3,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Select
        label="State"
        options={[
          {
            label: "Andhra Pradesh",
            value: "Andhra Pradesh",
          },
        ]}
        {...register("state")}
      />

      <Select
        label="District"
        options={[
          {
            label: "Anantapur",
            value: "Anantapur",
          },
        ]}
        {...register("district")}
      />

      <Select
        label="Season"
        options={[
          {
            label: "Kharif",
            value: "Kharif",
          },
          {
            label: "Rabi",
            value: "Rabi",
          },
        ]}
        {...register("season")}
      />

      <Input
        label="Area"
        type="number"
        {...register("area")}
      />

      <Input
        label="Start Year"
        type="number"
        {...register("start_year")}
      />

      <Input
        label="Forecast Years"
        type="number"
        {...register("years")}
      />

      <Button loading={loading}>
        Predict Crops
      </Button>

    </form>
  );
}

export default RecommendationForm;