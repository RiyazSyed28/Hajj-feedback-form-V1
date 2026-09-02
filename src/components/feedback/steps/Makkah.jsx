import { Controller } from "react-hook-form";
import Rating from "../Rating";
import TextArea from "../TextArea";

export default function Makkah({
  register,
  control,
}) {
  return (
    <div className="space-y-10">

      <h2 className="text-3xl font-bold text-green-700">
        Stay at Makkah
      </h2>

      <div>
        <label className="font-semibold block mb-2">
          Accommodation
        </label>

        <Controller
          name="makkahAccommodation"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Rating
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div>
        <label className="font-semibold block mb-2">
          Food Quality
        </label>

        <Controller
          name="foodQuality"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Rating
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div>
        <label className="font-semibold block mb-2">
          Lift Availability
        </label>

        <Controller
          name="lift"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Rating
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div>
        <label className="font-semibold block mb-2">
          Cleanliness
        </label>

        <Controller
          name="cleanliness"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Rating
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <TextArea
        label="Remarks"
        register={register}
        name="makkahRemarks"
      />

    </div>
  );
}