// lib/rate-limit.ts
//
// Jednoduchý in-memory rate limiter per IP.
// Drží dva buckety: hodinový a denní.

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const LIMITS = {
  perHour: 10,
  perDay: 30,
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  scope: "hour" | "day" | "none";
};

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  if (Math.random() < 0.01) {
    cleanup(now);
  }

  const hourKey = `${ip}:h`;
  const dayKey = `${ip}:d`;

  const hour = getOrCreateBucket(hourKey, now, HOUR_MS);
  const day = getOrCreateBucket(dayKey, now, DAY_MS);

  if (hour.count >= LIMITS.perHour) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: hour.resetAt,
      scope: "hour",
    };
  }
  if (day.count >= LIMITS.perDay) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: day.resetAt,
      scope: "day",
    };
  }

  hour.count++;
  day.count++;

  return {
    allowed: true,
    remaining: Math.min(
      LIMITS.perHour - hour.count,
      LIMITS.perDay - day.count,
    ),
    resetAt: Math.min(hour.resetAt, day.resetAt),
    scope: "none",
  };
}

function getOrCreateBucket(
  key: string,
  now: number,
  windowMs: number,
): Bucket {
  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  return bucket;
}

function cleanup(now: number) {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();

  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();

  return "local";
}

export function formatRetryAfter(resetAt: number, now = Date.now()): string {
  const sec = Math.max(1, Math.ceil((resetAt - now) / 1000));
  if (sec < 60) return `${sec} s`;
  const min = Math.ceil(sec / 60);
  if (min < 60) return `${min} min`;
  const hr = Math.ceil(min / 60);
  return `${hr} h`;
}