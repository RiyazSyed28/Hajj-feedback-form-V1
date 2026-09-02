import { Controller, useFormContext } from "react-hook-form";
import Rating from "./Rating";

export default function RatingQuestion({
    name,
    label,
    required = false
}) {

    const {
        control,
        formState: { errors }
    } = useFormContext();

    return (

        <div className="space-y-2"  id={`field-${name}`}
    className="space-y-2">

            <label className="font-semibold block">

                {label}

                {required && (
                    <span className="text-red-500 ml-1">*</span>
                )}

            </label>

            <Controller
                name={name}
                control={control}
                defaultValue={0}
                rules={
                    required
                        ? {
                              validate: (value) =>
                                  value > 0 || "Please give a rating",
                          }
                        : {}
                }
                render={({ field }) => (
                    <Rating
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            {errors[name] && (
                <p className="text-red-500 text-sm">
                    {errors[name].message}
                </p>
            )}

        </div>

    );

}