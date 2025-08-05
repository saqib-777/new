import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const adoptionSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Address is required"),
  reason: z.string().min(10, "Please tell us why you want to adopt"),
});

type AdoptionFormData = z.infer<typeof adoptionSchema>;

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: {
    name: string;
    image: string;
    breed: string;
  };
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({
  isOpen,
  onClose,
  animal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      reason: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: AdoptionFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate API call
      toast.success(`Your adoption request for ${animal.name} was submitted!`);
      reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            Adopt {animal.name} ({animal.breed})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name *"
              {...register("fullName")}
              error={errors.fullName?.message}
            />
            <Input
              label="Email *"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Phone *"
              {...register("phone")}
              error={errors.phone?.message}
            />
            <Input
              label="Address *"
              {...register("address")}
              error={errors.address?.message}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Adoption *
              </label>
              <textarea
                {...register("reason")}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Tell us why you want to adopt..."
              />
              {errors.reason && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white"
            >
              Submit Application
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
