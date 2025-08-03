/*
  # Create volunteer applications table

  1. New Tables
    - `volunteer_applications`
      - `id` (uuid, primary key)
      - `applicant_id` (uuid) - references profiles
      - `application_number` (text, unique) - human-readable reference
      - `age` (integer) - applicant age
      - `occupation` (text) - job/profession
      - `emergency_contact` (jsonb) - emergency contact details
      - `interests` (jsonb) - array of volunteer interests
      - `skills` (jsonb) - array of special skills
      - `availability_days` (jsonb) - array of available days
      - `availability_hours` (text) - available time range
      - `frequency_preference` (text) - weekly, bi-weekly, monthly, event-based
      - `animal_experience` (text) - previous animal experience
      - `volunteer_experience` (text) - previous volunteer work
      - `physical_limitations` (text) - any physical constraints
      - `references` (jsonb) - array of reference contacts
      - `background_check_consent` (boolean) - consent to background check
      - `background_check_completed` (boolean) - check completion status
      - `status` (text) - application status
      - `reviewer_id` (uuid) - reviewing staff member
      - `interview_date` (timestamp) - scheduled interview
      - `approval_date` (timestamp) - approval date
      - `training_completed` (boolean) - training status
      - `created_at` (timestamp) - creation time
      - `updated_at` (timestamp) - last update

  2. Security
    - Enable RLS on `volunteer_applications` table
    - Add policy for applicants to view their own applications
    - Add policy for staff to view all applications
*/

CREATE TABLE IF NOT EXISTS volunteer_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  applicant_id uuid REFERENCES profiles(id) NOT NULL,
  application_number text UNIQUE NOT NULL,
  age integer NOT NULL,
  occupation text,
  emergency_contact jsonb NOT NULL,
  interests jsonb NOT NULL DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  availability_days jsonb NOT NULL DEFAULT '[]'::jsonb,
  availability_hours text NOT NULL,
  frequency_preference text CHECK (frequency_preference IN ('weekly', 'bi-weekly', 'monthly', 'event-based')) NOT NULL,
  animal_experience text,
  volunteer_experience text,
  physical_limitations text,
  references jsonb NOT NULL DEFAULT '[]'::jsonb,
  background_check_consent boolean DEFAULT false,
  background_check_completed boolean DEFAULT false,
  status text CHECK (status IN ('submitted', 'under_review', 'interview_scheduled', 'background_check', 'approved', 'rejected', 'inactive')) DEFAULT 'submitted',
  reviewer_id uuid REFERENCES profiles(id),
  interview_date timestamptz,
  approval_date timestamptz,
  training_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Applicants can view own applications"
  ON volunteer_applications
  FOR SELECT
  TO authenticated
  USING (applicant_id = auth.uid());

CREATE POLICY "Staff can view all volunteer applications"
  ON volunteer_applications
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND user_type IN ('admin', 'staff')
    )
  );

CREATE POLICY "Anyone can create volunteer applications"
  ON volunteer_applications
  FOR INSERT
  WITH CHECK (true);</parameter>