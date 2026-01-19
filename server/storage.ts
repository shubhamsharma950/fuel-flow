import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";
import * as schema from "@shared/schema";
import type {
  User,
  InsertUser,
  Vehicle,
  InsertVehicle,
  Driver,
  InsertDriver,
  PumpPartner,
  InsertPumpPartner,
  FuelOrder,
  InsertFuelOrder,
  Payment,
  InsertPayment,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  getUsersByRole(role: string): Promise<User[]>;

  // Vehicles
  getVehicle(id: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined>;
  deleteVehicle(id: string): Promise<void>;
  getVehiclesByTransporter(transporterId: string): Promise<Vehicle[]>;
  getAllVehicles(): Promise<Vehicle[]>;

  // Drivers
  getDriver(id: string): Promise<Driver | undefined>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriver(id: string, driver: Partial<InsertDriver>): Promise<Driver | undefined>;
  deleteDriver(id: string): Promise<void>;
  getDriversByTransporter(transporterId: string): Promise<Driver[]>;
  getAllDrivers(): Promise<Driver[]>;

  // Pump Partners
  getPumpPartner(id: string): Promise<PumpPartner | undefined>;
  createPumpPartner(pump: InsertPumpPartner): Promise<PumpPartner>;
  updatePumpPartner(id: string, pump: Partial<InsertPumpPartner>): Promise<PumpPartner | undefined>;
  deletePumpPartner(id: string): Promise<void>;
  getAllPumpPartners(): Promise<PumpPartner[]>;

  // Fuel Orders
  getFuelOrder(id: string): Promise<FuelOrder | undefined>;
  createFuelOrder(order: InsertFuelOrder): Promise<FuelOrder>;
  updateFuelOrder(id: string, order: Partial<InsertFuelOrder>): Promise<FuelOrder | undefined>;
  deleteFuelOrder(id: string): Promise<void>;
  getOrdersByTransporter(transporterId: string): Promise<FuelOrder[]>;
  getAllFuelOrders(): Promise<FuelOrder[]>;
  verifyOTP(orderId: string, otp: string): Promise<boolean>;

  // Payments
  getPayment(id: string): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment | undefined>;
  getPaymentsByOrder(orderId: string): Promise<Payment[]>;
  getAllPayments(): Promise<Payment[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(schema.users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(schema.users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(schema.users).where(eq(schema.users.id, id));
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(schema.users).orderBy(desc(schema.users.createdAt));
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return db.select().from(schema.users).where(eq(schema.users.role, role as any));
  }

  // Vehicles
  async getVehicle(id: string): Promise<Vehicle | undefined> {
    const [vehicle] = await db.select().from(schema.vehicles).where(eq(schema.vehicles.id, id));
    return vehicle;
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const [vehicle] = await db.insert(schema.vehicles).values(insertVehicle).returning();
    return vehicle;
  }

  async updateVehicle(id: string, updates: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const [vehicle] = await db
      .update(schema.vehicles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.vehicles.id, id))
      .returning();
    return vehicle;
  }

  async deleteVehicle(id: string): Promise<void> {
    await db.delete(schema.vehicles).where(eq(schema.vehicles.id, id));
  }

  async getVehiclesByTransporter(transporterId: string): Promise<Vehicle[]> {
    return db.select().from(schema.vehicles).where(eq(schema.vehicles.transporterId, transporterId));
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return db.select().from(schema.vehicles).orderBy(desc(schema.vehicles.createdAt));
  }

  // Drivers
  async getDriver(id: string): Promise<Driver | undefined> {
    const [driver] = await db.select().from(schema.drivers).where(eq(schema.drivers.id, id));
    return driver;
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const [driver] = await db.insert(schema.drivers).values(insertDriver).returning();
    return driver;
  }

  async updateDriver(id: string, updates: Partial<InsertDriver>): Promise<Driver | undefined> {
    const [driver] = await db
      .update(schema.drivers)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.drivers.id, id))
      .returning();
    return driver;
  }

  async deleteDriver(id: string): Promise<void> {
    await db.delete(schema.drivers).where(eq(schema.drivers.id, id));
  }

  async getDriversByTransporter(transporterId: string): Promise<Driver[]> {
    return db.select().from(schema.drivers).where(eq(schema.drivers.transporterId, transporterId));
  }

  async getAllDrivers(): Promise<Driver[]> {
    return db.select().from(schema.drivers).orderBy(desc(schema.drivers.createdAt));
  }

  // Pump Partners
  async getPumpPartner(id: string): Promise<PumpPartner | undefined> {
    const [pump] = await db.select().from(schema.pumpPartners).where(eq(schema.pumpPartners.id, id));
    return pump;
  }

  async createPumpPartner(insertPump: InsertPumpPartner): Promise<PumpPartner> {
    const [pump] = await db.insert(schema.pumpPartners).values(insertPump).returning();
    return pump;
  }

  async updatePumpPartner(id: string, updates: Partial<InsertPumpPartner>): Promise<PumpPartner | undefined> {
    const [pump] = await db
      .update(schema.pumpPartners)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.pumpPartners.id, id))
      .returning();
    return pump;
  }

  async deletePumpPartner(id: string): Promise<void> {
    await db.delete(schema.pumpPartners).where(eq(schema.pumpPartners.id, id));
  }

  async getAllPumpPartners(): Promise<PumpPartner[]> {
    return db.select().from(schema.pumpPartners).orderBy(desc(schema.pumpPartners.createdAt));
  }

  // Fuel Orders
  async getFuelOrder(id: string): Promise<FuelOrder | undefined> {
    const [order] = await db.select().from(schema.fuelOrders).where(eq(schema.fuelOrders.id, id));
    return order;
  }

  async createFuelOrder(insertOrder: InsertFuelOrder): Promise<FuelOrder> {
    // Generate order number
    const orderNumber = `ORD${Date.now()}`;
    const [order] = await db
      .insert(schema.fuelOrders)
      .values({ ...insertOrder, orderNumber })
      .returning();
    return order;
  }

  async updateFuelOrder(id: string, updates: Partial<InsertFuelOrder>): Promise<FuelOrder | undefined> {
    const [order] = await db
      .update(schema.fuelOrders)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.fuelOrders.id, id))
      .returning();
    return order;
  }

  async deleteFuelOrder(id: string): Promise<void> {
    await db.delete(schema.fuelOrders).where(eq(schema.fuelOrders.id, id));
  }

  async getOrdersByTransporter(transporterId: string): Promise<FuelOrder[]> {
    return db.select().from(schema.fuelOrders).where(eq(schema.fuelOrders.transporterId, transporterId)).orderBy(desc(schema.fuelOrders.createdAt));
  }

  async getAllFuelOrders(): Promise<FuelOrder[]> {
    return db.select().from(schema.fuelOrders).orderBy(desc(schema.fuelOrders.createdAt));
  }

  async verifyOTP(orderId: string, otp: string): Promise<boolean> {
    const [order] = await db
      .select()
      .from(schema.fuelOrders)
      .where(and(eq(schema.fuelOrders.id, orderId), eq(schema.fuelOrders.otp, otp)));
    
    if (order) {
      await db
        .update(schema.fuelOrders)
        .set({ otpVerifiedAt: new Date() })
        .where(eq(schema.fuelOrders.id, orderId));
      return true;
    }
    return false;
  }

  // Payments
  async getPayment(id: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(schema.payments).where(eq(schema.payments.id, id));
    return payment;
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db.insert(schema.payments).values(insertPayment).returning();
    return payment;
  }

  async updatePayment(id: string, updates: Partial<InsertPayment>): Promise<Payment | undefined> {
    const [payment] = await db
      .update(schema.payments)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.payments.id, id))
      .returning();
    return payment;
  }

  async getPaymentsByOrder(orderId: string): Promise<Payment[]> {
    return db.select().from(schema.payments).where(eq(schema.payments.orderId, orderId));
  }

  async getAllPayments(): Promise<Payment[]> {
    return db.select().from(schema.payments).orderBy(desc(schema.payments.createdAt));
  }
}

export const storage = new DatabaseStorage();
