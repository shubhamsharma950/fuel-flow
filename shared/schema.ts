import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userRoleEnum = pgEnum("user_role", ["admin", "transporter", "driver"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "confirmed", "in_progress", "completed", "cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "completed", "failed", "refunded"]);
export const vehicleStatusEnum = pgEnum("vehicle_status", ["active", "maintenance", "inactive"]);

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  role: userRoleEnum("role").notNull().default("transporter"),
  companyName: text("company_name"),
  gstNumber: text("gst_number"),
  address: text("address"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  transporterId: varchar("transporter_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  registrationNumber: text("registration_number").notNull().unique(),
  vehicleType: text("vehicle_type").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  fuelType: text("fuel_type").notNull(),
  tankCapacity: decimal("tank_capacity", { precision: 10, scale: 2 }).notNull(),
  status: vehicleStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Drivers table
export const drivers = pgTable("drivers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  transporterId: varchar("transporter_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  licenseNumber: text("license_number").notNull().unique(),
  licenseExpiry: timestamp("license_expiry").notNull(),
  assignedVehicleId: varchar("assigned_vehicle_id").references(() => vehicles.id, { onDelete: "set null" }),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Pump Partners table
export const pumpPartners = pgTable("pump_partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  address: text("address").notNull(),
  contactPerson: text("contact_person").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  gstNumber: text("gst_number"),
  fuelTypes: text("fuel_types").array().notNull(),
  pricePerLiter: decimal("price_per_liter", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Fuel Orders table
export const fuelOrders = pgTable("fuel_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  transporterId: varchar("transporter_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  vehicleId: varchar("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
  driverId: varchar("driver_id").references(() => drivers.id, { onDelete: "set null" }),
  pumpPartnerId: varchar("pump_partner_id").notNull().references(() => pumpPartners.id, { onDelete: "cascade" }),
  fuelType: text("fuel_type").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  pricePerLiter: decimal("price_per_liter", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  deliveryDate: timestamp("delivery_date").notNull(),
  otp: text("otp"),
  otpVerifiedAt: timestamp("otp_verified_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Payments table
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => fuelOrders.id, { onDelete: "cascade" }),
  transactionId: text("transaction_id").notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  status: paymentStatusEnum("status").notNull().default("pending"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Zod Schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
  fullName: z.string().min(1),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertVehicleSchema = createInsertSchema(vehicles, {
  registrationNumber: z.string().min(1),
  tankCapacity: z.string().regex(/^\d+(\.\d{1,2})?$/),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertDriverSchema = createInsertSchema(drivers, {
  licenseNumber: z.string().min(1),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertPumpPartnerSchema = createInsertSchema(pumpPartners, {
  name: z.string().min(1),
  phone: z.string().min(10),
  pricePerLiter: z.string().regex(/^\d+(\.\d{1,2})?$/),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertFuelOrderSchema = createInsertSchema(fuelOrders, {
  quantity: z.string().regex(/^\d+(\.\d{1,2})?$/),
  pricePerLiter: z.string().regex(/^\d+(\.\d{1,2})?$/),
  totalAmount: z.string().regex(/^\d+(\.\d{1,2})?$/),
}).omit({ id: true, createdAt: true, updatedAt: true, orderNumber: true });

export const insertPaymentSchema = createInsertSchema(payments, {
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
}).omit({ id: true, createdAt: true, updatedAt: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Driver = typeof drivers.$inferSelect;
export type InsertDriver = z.infer<typeof insertDriverSchema>;
export type PumpPartner = typeof pumpPartners.$inferSelect;
export type InsertPumpPartner = z.infer<typeof insertPumpPartnerSchema>;
export type FuelOrder = typeof fuelOrders.$inferSelect;
export type InsertFuelOrder = z.infer<typeof insertFuelOrderSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
