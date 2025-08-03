/*
  # Create donations table

  1. New Tables
    - `donations`
      - `id` (uuid, primary key)
      - `donor_id` (uuid) - references profiles, nullable for anonymous
      - `amount` (decimal) - donation amount
      - `currency` (text) - currency code
      - `donation_type` (text) - one-time, monthly
      - `purpose` (text) - general, medical, food, shelter, emergency
      - `donor_name` (text) - name for anonymous donations
      - `donor_email` (text) - email for anonymous donations
      - `donor_phone` (text) - phone for anonymous donations
      - `anonymous` (boolean) - is anonymous donation
      - `payment_method` (text) - payment gateway used
      - `payment_id` (text) - external payment ID
      - `transaction_id` (text, unique) - transaction reference
      - `status` (text) - pending, completed, failed, refunded
      - `processed_at` (timestamp) - processing completion time
      - `failure_reason` (text) - failure details
      - `public_recognition` (boolean) - show in public donor list
      - `receipt_sent` (boolean) - receipt email sent
      - `thank_you_sent` (boolean) - thank you email sent
      - `created_at` (timestamp) - creation time
      - `updated_at` (timestamp) - last update

  2. Security
    - Enable RLS on `donations` table
    - Add policy for donors to view their own donations
    - Add policy for staff to view all donations
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id uuid REFERENCES profiles(id),
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'PKR',
  donation_type text CHECK (donation_type IN ('one-time', 'monthly')) DEFAULT 'one-time',
  purpose text CHECK (purpose IN ('general', 'medical', 'food', 'shelter', 'emergency')) DEFAULT 'general',
  donor_name text,
  donor_email text,
  donor_phone text,
  anonymous boolean DEFAULT false,
  payment_method text CHECK (payment_method IN ('stripe', 'paypal', 'jazzcash', 'easypaisa', 'bank_transfer')),
  payment_id text,
  transaction_id text UNIQUE,
  status text CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  processed_at timestamptz,
  failure_reason text,
  public_recognition boolean DEFAULT false,
  receipt_sent boolean DEFAULT false,
  thank_you_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Donors can view own donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (donor_id = auth.uid());

CREATE POLICY "Staff can view all donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND user_type IN ('admin', 'staff')
    )
  );

CREATE POLICY "Anyone can create donations"
  ON donations
  FOR INSERT
  WITH CHECK (true);</parameter>