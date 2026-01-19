import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, requireAuth, requireRole } from "./auth";
import passport from "passport";
import bcrypt from "bcryptjs";
import { insertUserSchema, insertVehicleSchema, insertDriverSchema, insertPumpPartnerSchema, insertFuelOrderSchema, insertPaymentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // ============ AUTH ROUTES ============
  
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      next(error);
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Login failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const { password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, (req, res) => {
    const { password, ...userWithoutPassword } = req.user as any;
    res.json(userWithoutPassword);
  });

  // ============ USER ROUTES ============
  
  app.get("/api/users", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/users/:id", requireAuth, async (req, res, next) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/users/:id", requireAuth, async (req, res, next) => {
    try {
      const { password, ...updates } = req.body;
      
      // If updating password, hash it
      if (password) {
        updates.password = await bcrypt.hash(password, 10);
      }

      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/users/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  // ============ VEHICLE ROUTES ============
  
  app.get("/api/vehicles", requireAuth, async (req, res, next) => {
    try {
      const user = req.user as any;
      let vehicles;
      
      if (user.role === "admin") {
        vehicles = await storage.getAllVehicles();
      } else {
        vehicles = await storage.getVehiclesByTransporter(user.id);
      }
      res.json(vehicles);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/vehicles/:id", requireAuth, async (req, res, next) => {
    try {
      const vehicle = await storage.getVehicle(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/vehicles", requireAuth, requireRole("admin", "transporter"), async (req, res, next) => {
    try {
      const validatedData = insertVehicleSchema.parse(req.body);
      const vehicle = await storage.createVehicle(validatedData);
      res.status(201).json(vehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      next(error);
    }
  });

  app.put("/api/vehicles/:id", requireAuth, async (req, res, next) => {
    try {
      const vehicle = await storage.updateVehicle(req.params.id, req.body);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/vehicles/:id", requireAuth, async (req, res, next) => {
    try {
      await storage.deleteVehicle(req.params.id);
      res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  // ============ DRIVER ROUTES ============
  
  app.get("/api/drivers", requireAuth, async (req, res, next) => {
    try {
      const user = req.user as any;
      let drivers;
      
      if (user.role === "admin") {
        drivers = await storage.getAllDrivers();
      } else {
        drivers = await storage.getDriversByTransporter(user.id);
      }
      res.json(drivers);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/drivers/:id", requireAuth, async (req, res, next) => {
    try {
      const driver = await storage.getDriver(req.params.id);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      res.json(driver);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/drivers", requireAuth, requireRole("admin", "transporter"), async (req, res, next) => {
    try {
      const validatedData = insertDriverSchema.parse(req.body);
      const driver = await storage.createDriver(validatedData);
      res.status(201).json(driver);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      next(error);
    }
  });

  app.put("/api/drivers/:id", requireAuth, async (req, res, next) => {
    try {
      const driver = await storage.updateDriver(req.params.id, req.body);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      res.json(driver);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/drivers/:id", requireAuth, async (req, res, next) => {
    try {
      await storage.deleteDriver(req.params.id);
      res.json({ message: "Driver deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  // ============ PUMP PARTNER ROUTES ============
  
  app.get("/api/pumps", requireAuth, async (req, res, next) => {
    try {
      const pumps = await storage.getAllPumpPartners();
      res.json(pumps);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/pumps/:id", requireAuth, async (req, res, next) => {
    try {
      const pump = await storage.getPumpPartner(req.params.id);
      if (!pump) {
        return res.status(404).json({ message: "Pump partner not found" });
      }
      res.json(pump);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/pumps", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const validatedData = insertPumpPartnerSchema.parse(req.body);
      const pump = await storage.createPumpPartner(validatedData);
      res.status(201).json(pump);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      next(error);
    }
  });

  app.put("/api/pumps/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const pump = await storage.updatePumpPartner(req.params.id, req.body);
      if (!pump) {
        return res.status(404).json({ message: "Pump partner not found" });
      }
      res.json(pump);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/pumps/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      await storage.deletePumpPartner(req.params.id);
      res.json({ message: "Pump partner deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  // ============ FUEL ORDER ROUTES ============
  
  app.get("/api/orders", requireAuth, async (req, res, next) => {
    try {
      const user = req.user as any;
      let orders;
      
      if (user.role === "admin") {
        orders = await storage.getAllFuelOrders();
      } else {
        orders = await storage.getOrdersByTransporter(user.id);
      }
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/orders/:id", requireAuth, async (req, res, next) => {
    try {
      const order = await storage.getFuelOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/orders", requireAuth, requireRole("admin", "transporter"), async (req, res, next) => {
    try {
      const validatedData = insertFuelOrderSchema.parse(req.body);
      
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      const order = await storage.createFuelOrder({
        ...validatedData,
        otp,
      });
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      next(error);
    }
  });

  app.put("/api/orders/:id", requireAuth, async (req, res, next) => {
    try {
      const order = await storage.updateFuelOrder(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/orders/:id/verify-otp", requireAuth, async (req, res, next) => {
    try {
      const { otp } = req.body;
      const isValid = await storage.verifyOTP(req.params.id, otp);
      
      if (!isValid) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      // Update order status to in_progress
      await storage.updateFuelOrder(req.params.id, { status: "in_progress" });
      
      res.json({ message: "OTP verified successfully" });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/orders/:id", requireAuth, async (req, res, next) => {
    try {
      await storage.deleteFuelOrder(req.params.id);
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  // ============ PAYMENT ROUTES ============
  
  app.get("/api/payments", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/payments/:id", requireAuth, async (req, res, next) => {
    try {
      const payment = await storage.getPayment(req.params.id);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/orders/:orderId/payments", requireAuth, async (req, res, next) => {
    try {
      const payments = await storage.getPaymentsByOrder(req.params.orderId);
      res.json(payments);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/payments", requireAuth, async (req, res, next) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      next(error);
    }
  });

  app.put("/api/payments/:id", requireAuth, async (req, res, next) => {
    try {
      const payment = await storage.updatePayment(req.params.id, req.body);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      next(error);
    }
  });

  // ============ DASHBOARD STATS ============
  
  app.get("/api/stats/dashboard", requireAuth, async (req, res, next) => {
    try {
      const user = req.user as any;
      
      if (user.role === "admin") {
        const [users, vehicles, orders, pumps] = await Promise.all([
          storage.getAllUsers(),
          storage.getAllVehicles(),
          storage.getAllFuelOrders(),
          storage.getAllPumpPartners(),
        ]);

        res.json({
          totalUsers: users.length,
          totalVehicles: vehicles.length,
          totalOrders: orders.length,
          totalPumps: pumps.length,
          activeTransporters: users.filter(u => u.role === "transporter" && u.isActive).length,
          pendingOrders: orders.filter(o => o.status === "pending").length,
        });
      } else {
        const [vehicles, drivers, orders] = await Promise.all([
          storage.getVehiclesByTransporter(user.id),
          storage.getDriversByTransporter(user.id),
          storage.getOrdersByTransporter(user.id),
        ]);

        res.json({
          totalVehicles: vehicles.length,
          totalDrivers: drivers.length,
          totalOrders: orders.length,
          activeVehicles: vehicles.filter(v => v.status === "active").length,
          pendingOrders: orders.filter(o => o.status === "pending").length,
          completedOrders: orders.filter(o => o.status === "completed").length,
        });
      }
    } catch (error) {
      next(error);
    }
  });

  return httpServer;
}
