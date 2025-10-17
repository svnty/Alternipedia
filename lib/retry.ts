
export async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (i === retries - 1) throw err;
      console.warn(`Retry ${i + 1} after Prisma connection error`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error("Prisma retry failed");
}
