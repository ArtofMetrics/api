// External Dependencies
import { Schema, Document, Model } from 'mongoose';

// AOM Dependencies

// AOM Types

export interface Coupon extends Document {
  code: string;
  startDate: Date;
  endDate?: Date;
  forever: boolean;
}


export const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: function() { return !this.forever } },
  forever: { type: Boolean, default: false }
});

export interface CouponModel extends Model<Coupon> {}