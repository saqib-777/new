import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(20, 'Please provide more details'),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'emergency']),
  messageType: z.enum(['general', 'adoption', 'volunteer', 'donation', 'rescue', 'complaint'])
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      urgencyLevel: 'medium',
      messageType: 'general'
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <div
        className="relative bg-cover bg-center h-[400px]"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700/70 to-secondary-700/70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg max-w-2xl"
          >
            Have questions about adoption, volunteering, or need help with a rescue? We’re here to help and would love to hear from you.
          </motion.p>
        </div>
      </div>

      {/* CONTACT CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Your Name *" {...register('name')} error={errors.name?.message} />
                  <Input label="Email Address *" type="email" {...register('email')} error={errors.email?.message} />
                </div>

                <Input label="Phone Number (Optional)" {...register('phone')} />

                {/* Message Type & Urgency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Message Type</label>
                    <select
                      {...register('messageType')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="adoption">Adoption Question</option>
                      <option value="volunteer">Volunteer Inquiry</option>
                      <option value="donation">Donation Question</option>
                      <option value="rescue">Rescue Related</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Urgency Level</label>
                    <select
                      {...register('urgencyLevel')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>

                <Input label="Subject *" {...register('subject')} error={errors.subject?.message} />

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    placeholder="Please provide details about your inquiry..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                </div>

                <Button type="submit" size="lg" loading={isSubmitting} icon={<MessageCircle className="w-5 h-5" />} className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Office Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Mon - Fri: 9 AM - 6 PM</p>
                  <p className="text-sm">Saturday: 10 AM - 4 PM</p>
                </div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-sm text-red-700 font-medium">
                Emergency Rescue 24/7: 11 22 RESCUE
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+92 339 6063777</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>RescueTheVoiceless07@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p>UVAS, Outfall Rd, Data Gunj Buksh Town, Lahore, 54000 , Punjab, Pakistan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-primary-600 text-white py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
        <p className="text-lg mb-6">Our team is ready to respond to emergencies 24/7.</p>
        <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
          Call Now: 11 22 RESCUE
        </Button>
      </div>
    </div>
  );
};
