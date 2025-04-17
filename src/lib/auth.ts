import prisma from "@/lib/prisma";

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");
  // Note: In production, use proper password hashing comparison
  if (user.password !== password) throw new Error("Invalid credentials");

  return user;
};

export const registerUser = async (email: string, password: string, name: string) => {
  return prisma.user.create({
    data: {
      email,
      password, // Remember to hash passwords in production!
      name,
      approved: false // Default to false for admin approval
    }
  });
};