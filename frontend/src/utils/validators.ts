import { z } from 'zod';

export const nigerianPhoneRegex = /^(?:(?:\+?234(?:\h|-)?|0)\d{9}|(?:070|080|081|090|091)\d{8})$/;

export const phoneValidator = z.string()
  .regex(nigerianPhoneRegex, "Invalid Nigerian phone number format");
