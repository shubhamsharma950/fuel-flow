import { db } from "./db";
import bcrypt from "bcryptjs";
import * as schema from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const [admin] = await db.insert(schema.users).values({
      username: "admin",
      password: adminPassword,
      email: "admin@fuelflow.com",
      fullName: "System Administrator",
      phone: "+1234567890",
      role: "admin",
      companyName: "Fuel Flow Admin",
      isActive: true,
    }).returning();
    console.log("✅ Admin user created:", admin.username);

    // Create sample transporter
    const transporterPassword = await bcrypt.hash("transporter123", 10);
    const [transporter] = await db.insert(schema.users).values({
      username: "transporter1",
      password: transporterPassword,
      email: "transporter@example.com",
      fullName: "John Doe Transport",
      phone: "+1234567891",
      role: "transporter",
      companyName: "Doe Transport Inc",
      gstNumber: "GST123456789",
      address: "123 Transport Street, City, State",
      isActive: true,
    }).returning();
    console.log("✅ Transporter user created:", transporter.username);

    // Create sample driver user
    const driverPassword = await bcrypt.hash("driver123", 10);
    const [driverUser] = await db.insert(schema.users).values({
      username: "driver1",
      password: driverPassword,
      email: "driver@example.com",
      fullName: "Mike Driver",
      phone: "+1234567892",
      role: "driver",
      isActive: true,
    }).returning();
    console.log("✅ Driver user created:", driverUser.username);

    // Create sample vehicles
    const [vehicle1] = await db.insert(schema.vehicles).values({
      transporterId: transporter.id,
      registrationNumber: "MH12AB1234",
      vehicleType: "Truck",
      make: "Tata",
      model: "Prima",
      fuelType: "Diesel",
      tankCapacity: "500",
      status: "active",
    }).returning();

    const [vehicle2] = await db.insert(schema.vehicles).values({
      transporterId: transporter.id,
      registrationNumber: "MH14CD5678",
      vehicleType: "Truck",
      make: "Ashok Leyland",
      model: "Partner",
      fuelType: "Diesel",
      tankCapacity: "400",
      status: "active",
    }).returning();
    console.log("✅ Sample vehicles created");

    // Create sample driver
    const [driver] = await db.insert(schema.drivers).values({
      userId: driverUser.id,
      transporterId: transporter.id,
      licenseNumber: "DL1234567890",
      licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      assignedVehicleId: vehicle1.id,
      isAvailable: true,
    }).returning();
    console.log("✅ Sample driver created");

    // Create sample pump partners
    const [pump1] = await db.insert(schema.pumpPartners).values({
      name: "Shell Fuel Station",
      location: "Mumbai",
      address: "456 Highway Road, Mumbai, Maharashtra",
      contactPerson: "Raj Kumar",
      phone: "+919876543210",
      email: "shell@example.com",
      gstNumber: "GST987654321",
      fuelTypes: ["Diesel", "Petrol"],
      pricePerLiter: "95.50",
      isActive: true,
    }).returning();

    const [pump2] = await db.insert(schema.pumpPartners).values({
      name: "HP Petrol Pump",
      location: "Delhi",
      address: "789 Main Street, Delhi",
      contactPerson: "Amit Sharma",
      phone: "+919876543211",
      email: "hp@example.com",
      gstNumber: "GST987654322",
      fuelTypes: ["Diesel", "Petrol", "CNG"],
      pricePerLiter: "94.75",
      isActive: true,
    }).returning();

    const [pump3] = await db.insert(schema.pumpPartners).values({
      name: "Indian Oil Pump",
      location: "Bangalore",
      address: "321 Industrial Area, Bangalore",
      contactPerson: "Priya Patel",
      phone: "+919876543212",
      email: "ioc@example.com",
      gstNumber: "GST987654323",
      fuelTypes: ["Diesel", "Petrol"],
      pricePerLiter: "96.00",
      isActive: true,
    }).returning();
    console.log("✅ Sample pump partners created");

    // Create sample fuel orders
    const [order1] = await db.insert(schema.fuelOrders).values({
      orderNumber: "ORD" + Date.now(),
      transporterId: transporter.id,
      vehicleId: vehicle1.id,
      driverId: driver.id,
      pumpPartnerId: pump1.id,
      fuelType: "Diesel",
      quantity: "200",
      pricePerLiter: "95.50",
      totalAmount: "19100",
      status: "pending",
      deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      otp: "123456",
      notes: "Regular fuel delivery",
    }).returning();

    const [order2] = await db.insert(schema.fuelOrders).values({
      orderNumber: "ORD" + (Date.now() + 1),
      transporterId: transporter.id,
      vehicleId: vehicle2.id,
      driverId: driver.id,
      pumpPartnerId: pump2.id,
      fuelType: "Diesel",
      quantity: "150",
      pricePerLiter: "94.75",
      totalAmount: "14212.50",
      status: "confirmed",
      deliveryDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
      otp: "654321",
    }).returning();

    const [order3] = await db.insert(schema.fuelOrders).values({
      orderNumber: "ORD" + (Date.now() + 2),
      transporterId: transporter.id,
      vehicleId: vehicle1.id,
      pumpPartnerId: pump3.id,
      fuelType: "Diesel",
      quantity: "300",
      pricePerLiter: "96.00",
      totalAmount: "28800",
      status: "completed",
      deliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      otp: "789012",
      otpVerifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    }).returning();
    console.log("✅ Sample fuel orders created");

    // Create sample payments
    await db.insert(schema.payments).values({
      orderId: order3.id,
      transactionId: "TXN" + Date.now(),
      amount: "28800",
      paymentMethod: "Credit Card",
      status: "completed",
      paidAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    });

    await db.insert(schema.payments).values({
      orderId: order2.id,
      transactionId: "TXN" + (Date.now() + 1),
      amount: "14212.50",
      paymentMethod: "Bank Transfer",
      status: "pending",
    });
    console.log("✅ Sample payments created");

    console.log("\n✨ Database seeded successfully!");
    console.log("\n📝 Login Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Admin:");
    console.log("  Username: admin");
    console.log("  Password: admin123");
    console.log("\nTransporter:");
    console.log("  Username: transporter1");
    console.log("  Password: transporter123");
    console.log("\nDriver:");
    console.log("  Username: driver1");
    console.log("  Password: driver123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("✅ Seed completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  });
