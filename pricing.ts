export const pricingPlans = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    credits: 1,
    maxDuration: 30,
    quality: "Basic",
    features: [
      "1 video per day",
      "30-second videos",
      "Basic quality",
      "Watermarked output",
      "Community support"
    ]
  },
  {
    id: "pro",
    name: "Creator",
    price: 19,
    credits: 10,
    maxDuration: 60,
    quality: "HD (1080p)",
    stripePriceId: "price_pro_monthly",
    features: [
      "10 videos per day",
      "60-second videos",
      "HD quality (1080p)",
      "No watermarks",
      "Priority generation",
      "Email support"
    ]
  },
  {
    id: "business",
    name: "Business",
    price: 49,
    credits: 1000,
    maxDuration: 120,
    quality: "4K",
    stripePriceId: "price_business_monthly",
    features: [
      "Unlimited videos",
      "2-minute videos",
      "4K quality",
      "No watermarks",
      "Fastest generation",
      "Custom branding",
      "Dedicated support",
      "API access"
    ]
  }
];

export const getModelCapabilities = (planId: string) => {
  switch (planId) {
    case "free":
      return {
        models: ["sora-basic"],
        maxResolution: "720p",
        maxDuration: 30,
        watermark: true
      };
    case "pro":
      return {
        models: ["sora-basic", "sora-enhanced"],
        maxResolution: "1080p",
        maxDuration: 60,
        watermark: false
      };
    case "business":
      return {
        models: ["sora-basic", "sora-enhanced", "sora-premium"],
        maxResolution: "4K",
        maxDuration: 120,
        watermark: false
      };
    default:
      return {
        models: ["sora-basic"],
        maxResolution: "720p",
        maxDuration: 30,
        watermark: true
      };
  }
};