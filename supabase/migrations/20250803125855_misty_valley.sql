/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text) - sender name
      - `email` (text) - sender email
      - `phone` (text) - sender phone
      - `subject` (text) - message subject
      - `message` (text) - message content
      - `urgency_level` (text) - low, medium, high, emergency
      - `message_type` (text) - general, adoption, volunteer, donation, rescue, complaint
      - `status` (text) - new, in_progress, responded, closed
      - `assigned_to` (uuid) - assigned staff member
      - `response` (text) - staff response
      - `responded_at` (timestamp) - response time
      - `responded_by` (uuid) - staff who responded
      - `created_at` (timestamp) - creation time
      - `updated_at` (timestamp) - last update

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for staff to view all messages
    - Add policy for anyone to create messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  urgency_level text CHECK (urgency_level IN ('low', 'medium', 'high', 'emergency')) DEFAULT 'medium',
  message_type text CHECK (message_type IN ('general', 'adoption', 'volunteer', 'donation', 'rescue', 'complaint')) DEFAULT 'general',
  status text CHECK (status IN ('new', 'in_progress', 'responded', 'closed')) DEFAULT 'new',
  assigned_to uuid REFERENCES profiles(id),
  response text,
  responded_at timestamptz,
  responded_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view all contact messages"
  ON contact_messages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND user_type IN ('admin', 'staff')
    )
  );

CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  WITH CHECK (true);