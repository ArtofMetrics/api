// External Deps
import { Schema } from 'mongoose';

// Our Deps
import { questionKinds } from '../../../../shared/enums/gateway';


export interface Drip {
  content: {
    text?: string;
    visual?: { kind: string; url: string}
    gateway?: {
      kind: string;
      
    }[]
  }[];
}

const data = {
  content: [{
    text: String,
    visual: { kind: String, url: String },
    gateway: [{
      kind: { type: String, enum: questionKinds }
    }]
  }]
}

export const dripSchema = new Schema(data);