/*
  # Create rescue requests table

  1. New Tables
    - `rescue_requests`
      - `id` (uuid, primary key)
      - `reference_number` (text, unique) - human-readable reference
      - `animal_type` (text) - type of animal being rescued
      - `emergency_level` (text) - critical, urgent, standard
      - `location_address` (text) - rescue location
      - `location_coordinates` (point) - GPS coordinates
      - `contact_name` (text) - reporter name
      - `contact_phone` (text) - contact phone
      - `contact_email` (text) - contact email
      - `contact_preference` (text) - preferred contact method
      - `description` (text) - situation description
      - `images` (jsonb) - array of image URLs
      - `status` (text) - submitted, reviewing, assigned, in_progress, rescued, completed, cancelled
      - `assigned_to` (uuid) - assigned staff member
      - `priority_score` (integer) - calculated priority
      - `public_id` (text) - public tracking ID
      - `created_by` (uuid) - user who created request
      - `created_at` (timestamp) - creation time
      - `updated_at` (timestamp) - last update

  2. Security
    - Enable RLS on `rescue_requests` table
    - Add policy for users to view their own requests
    - Add policy for anyone to create requests
    - Add policy for staff to view all requests
*/

CREATE TABLE IF NOT EXISTS rescue_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number text UNIQUE NOT NULL,
  animal_type text CHECK (animal_type IN ('dog', 'cat', 'bird', 'livestock', 'wildlife', 'other')) NOT NULL,
  emergency_level text CHECK (emergency_level IN ('critical', 'urgent', 'standard')) NOT NULL,
  location_address text NOT NULL,
  location_coordinates point,
  contact_name text NOT NULL,
  contact_phone text NOT NULL,
  contact_email text NOT NULL,
  contact_preference text CHECK (contact_preference IN ('phone', 'email', 'whatsapp')) DEFAULT 'phone',
  description text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  status text CHECK (status IN ('submitted', 'reviewing', 'assigned', 'in_progress', 'rescued', 'completed', 'cancelled')) DEFAULT 'submitted',
  assigned_to uuid REFERENCES profiles(id),
  priority_score integer DEFAULT 0,
  public_id text UNIQUE,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rescue_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rescue requests"
  ON rescue_requests
  FOR SELECT
  TO authenticated
  USING (
    created_by = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND user_type IN ('admin', 'staff')
    )
  );

CREATE POLICY "Anyone can create rescue requests"
  ON rescue_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Staff can update rescue requests"
  ON rescue_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND user_type IN ('admin', 'staff')
    )
  );</parameter>