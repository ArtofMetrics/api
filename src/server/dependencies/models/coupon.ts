// External Dependencies
import { Schema, Document, Model } from 'mongoose';

// AOM Dependencies

// AOM Types

export interface Coupon extends Document {
  code: string;
  startDate: Date;
  endDate?: Date;
  forever: boolean;
  discount: number;
}


export const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  startDate: { type: Date, required: function() { return !this.forever } },
  endDate: { type: Date, required: function() { return !this.forever } },
  forever: { type: Boolean, default: false },
  discount: { type: Number, required: true }
});

export interface CouponModel extends Model<Coupon> {}