import { db } from "../server/db";
import { users, vehicles, drivers, pumpPartners, fuelOrders, payments } from "../shared/schema";
import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(payments);
    await db.delete(fuelOrders);
    await db.delete(drivers);
    await db.delete(vehicles);
    await db.delete(pumpPartners);
    await db.delete(users);

    // Create users
    console.log("Creating users...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const [admin] = await db
      .insert(users)
      .values({
        username: "admin",
        email: "admin@fuelflow.com",
        password: hashedPassword,
        fullName: "Admin User",
        phone: "1234567890",
        role: "admin",
        isActive: true,
      })
      .returning();

    const [transporter1] = await db
      .insert(users)
      .values({
        username: "transporter1",
        email: "transporter1@example.com",
        password: hashedPassword,
        fullName: "ABC Transport Company",
        phone: "9876543210",
        role: "transporter",
        companyName: "ABC Transport Pvt Ltd",
        gstNumber: "27AABCU9603R1ZM",
        address: "123 Transport Street, Mumbai, MH 400001",
        isActive: true,
      })
      .returning();

    const [transporter2] = await db
      .insert(users)
      .values({
        username: "transporter2",
        email: "transporter2@example.com",
        password: hashedPassword,
        fullName: "XYZ Logistics",
        phone: "9876543211",
        role: "transporter",
        companyName: "XYZ Logistics Ltd",
        gstNumber: "27AABCU9603R1ZN",
        address: "456 Logistics Road, Delhi, DL 110001",
        isActive: true,
      })
      .returning();

    const [driver1User] = await db
      .insert(users)
      .values({
        username: "driver1",
        email: "driver1@example.com",
        password: hashedPassword,
        fullName: "Rajesh Kumar",
        phone: "9876543212",
        role: "driver",
        isActive: true,
      })
      .returning();

    const [driver2User] = await db
      .insert(users)
      .values({
        username: "driver2",
        email: "driver2@example.com",
        password: hashedPassword,
        fullName: "Suresh Sharma",
        phone: "9876543213",
        role: "driver",
        isActive: true,
      })
      .returning();

    // Create vehicles
    console.log("Creating vehicles...");
    const [vehicle1] = await db
      .insert(vehicles)
      .values({
        transporterId: transporter1.id,
        registrationNumber: "MH12AB1234",
        vehicleType: "Truck",
        make: "Tata",
        model: "LPT 1613",
        fuelType: "Diesel",
        tankCapacity: "300",
        status: "active",
      })
      .returning();

    const [vehicle2] = await db
      .insert(vehicles)
      .values({
        transporterId: transporter1.id,
        registrationNumber: "MH12CD5678",
        vehicleType: "Truck",
        make: "Ashok Leyland",
        model: "Partner",
        fuelType: "Diesel",
        tankCapacity: "250",
        status: "active",
      })
      .returning();

    const [vehicle3] = await db
      .insert(vehicles)
      .values({
        transporterId: transporter2.id,
        registrationNumber: "DL8CAF1234",
        vehicleType: "Truck",
        make: "Eicher",
        model: "Pro 2049",
        fuelType: "Diesel",
        tankCapacity: "200",
        status: "active",
      })
      .returning();

    // Create drivers
    console.log("Creating drivers...");
    const [driver1] = await db
      .insert(drivers)
      .values({
        userId: driver1User.id,
        transporterId: transporter1.id,
        licenseNumber: "MH1220230001234",
        licenseExpiry: new Date("2027-12-31"),
        assignedVehicleId: vehicle1.id,
        isAvailable: true,
      })
      .returning();

    const [driver2] = await db
      .insert(drivers)
      .values({
        userId: driver2User.id,
        transporterId: transporter2.id,
        licenseNumber: "DL0820230005678",
        licenseExpiry: new Date("2028-06-30"),
        assignedVehicleId: vehicle3.id,
        isAvailable: true,
      })
      .returning();

    // Create pump partners
    console.log("Creating pump partners...");
    const [pump1] = await db
      .insert(pumpPartners)
      .values({
        name: "Reliance Petrol Pump",
        location: "Mumbai Highway",
        address: "NH-8, Andheri East, Mumbai, MH 400069",
        contactPerson: "Amit Patel",
        phone: "9876543214",
        email: "reliance.mumbai@example.com",
        gstNumber: "27AABCU9603R1ZP",
        fuelTypes: ["Diesel", "Petrol"],
        pricePerLiter: "95.50",
        isActive: true,
      })
      .returning();

    const [pump2] = await db
      .insert(pumpPartners)
      .values({
        name: "Indian Oil Pump",
        location: "Delhi Expressway",
        address: "DND Flyway, Noida, UP 201301",
        contactPerson: "Ravi Verma",
        phone: "9876543215",
        email: "iocl.delhi@example.com",
        gstNumber: "09AABCU9603R1ZQ",
        fuelTypes: ["Diesel", "Petrol", "CNG"],
        pricePerLiter: "94.75",
        isActive: true,
      })
      .returning();

    const [pump3] = await db
      .insert(pumpPartners)
      .values({
        name: "HP Fuel Station",
        location: "Bangalore Ring Road",
        address: "Outer Ring Road, Marathahalli, Bangalore, KA 560037",
        contactPerson: "Karthik Reddy",
        phone: "9876543216",
        email: "hp.bangalore@example.com",
        gstNumber: "29AABCU9603R1ZR",
        fuelTypes: ["Diesel", "Petrol"],
        pricePerLiter: "96.20",
        isActive: true,
      })
      .returning();

    // Create fuel orders
    console.log("Creating fuel orders...");
    const [order1] = await db
      .insert(fuelOrders)
      .values({
        orderNumber: `ORD${Date.now()}001`,
        transporterId: transporter1.id,
        vehicleId: vehicle1.id,
        driverId: driver1.id,
        pumpPartnerId: pump1.id,
        fuelType: "Diesel",
        quantity: "200",
        pricePerLiter: "95.50",
        totalAmount: "19100.00",
        status: "completed",
        deliveryDate: new Date("2026-01-15"),
        otp: "123456",
        otpVerifiedAt: new Date("2026-01-15T10:30:00"),
        notes: "Completed successfully",
      })
      .returning();

    const [order2] = await db
      .insert(fuelOrders)
      .values({
        orderNumber: `ORD${Date.now()}002`,
        transporterId: transporter1.id,
        vehicleId: vehicle2.id,
        driverId: driver1.id,
        pumpPartnerId: pump2.id,
        fuelType: "Diesel",
        quantity: "150",
        pricePerLiter: "94.75",
        totalAmount: "14212.50",
        status: "in_progress",
        deliveryDate: new Date("2026-01-19"),
        otp: "234567",
      })
      .returning();

    const [order3] = await db
      .insert(fuelOrders)
      .values({
        orderNumber: `ORD${Date.now()}003`,
        transporterId: transporter2.id,
        vehicleId: vehicle3.id,
        driverId: driver2.id,
        pumpPartnerId: pump3.id,
        fuelType: "Diesel",
        quantity: "180",
        pricePerLiter: "96.20",
        totalAmount: "17316.00",
        status: "pending",
        deliveryDate: new Date("2026-01-20"),
        otp: "345678",
      })
      .returning();

    // Create payments
    console.log("Creating payments...");
    await db.insert(payments).values({
      orderId: order1.id,
      transactionId: `TXN${Date.now()}001`,
      amount: "19100.00",
      paymentMethod: "UPI",
      status: "completed",
      paidAt: new Date("2026-01-15T11:00:00"),
    });

    await db.insert(payments).values({
      orderId: order2.id,
      transactionId: `TXN${Date.now()}002`,
      amount: "14212.50",
      paymentMethod: "Credit Card",
      status: "pending",
    });

    console.log("✅ Database seeded successfully!");
    console.log("\n📝 Login credentials:");
    console.log("Admin: admin / password123");
    console.log("Transporter 1: transporter1 / password123");
    console.log("Transporter 2: transporter2 / password123");
    console.log("Driver 1: driver1 / password123");
    console.log("Driver 2: driver2 / password123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    process.exit(0);
  }
}

seed();
