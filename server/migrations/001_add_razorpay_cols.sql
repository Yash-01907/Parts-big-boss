-- Add payment details to orders table
ALTER TABLE orders 
    ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
    ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR',
    ADD COLUMN IF NOT EXISTS error_message TEXT;

-- Add index for fast lookup by Razorpay Order ID
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON orders(razorpay_order_id);
-- Add index for user emails if not exists
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
