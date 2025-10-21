-- Add is_admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Set the first user as admin (update with your user ID)
-- UPDATE profiles SET is_admin = TRUE WHERE email = 'your-email@example.com';
