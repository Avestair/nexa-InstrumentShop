// Import UAParser (make sure to include it in your build)
import UAParser from "ua-parser-js";

// Track current route and timestamps
let currentRoute = window.location.pathname;
let routeEnterTime = performance.now();

// Function to get geolocation data
const getLocationData = () => {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            coordinates: {
              x: position.coords.latitude.toString(),
              y: position.coords.longitude.toString(),
            },
          });
        },
        () => {
          resolve({ coordinates: null });
        },
      );
    } else {
      resolve({ coordinates: null });
    }
  });
};

// Function to get timezone
const getTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return "Unknown";
  }
};

// Function to collect all analytics data
const collectAnalyticsData = async () => {
  const parser = new UAParser();
  const uaResult = parser.getResult();

  // Get location data
  const locationData = await getLocationData();

  // Get IP address
  let ipAddress = "Unknown";
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    ipAddress = data.ip;
  } catch (e) {
    console.error("Could not fetch IP address:", e);
  }

  // Get visit status from storage
  const firstVisit =
    sessionStorage.getItem("firstVisit") || new Date().toISOString();
  const lastVisit = new Date().toISOString();
  const isReturning = localStorage.getItem("analyticsUserId") !== null;

  if (!localStorage.getItem("analyticsUserId")) {
    localStorage.setItem("analyticsUserId", `user_${Date.now()}`);
  }

  // Prepare the data structure
  const analyticsData = {
    userId: localStorage.getItem("analyticsUserId"),
    ipAddress,
    userAgent: {
      fullData: navigator.userAgent,
      browser: {
        name: uaResult.browser.name || "Unknown",
        version: uaResult.browser.version || "Unknown",
        major: uaResult.browser.major || "Unknown",
      },
      cpu: {
        architecture: uaResult.cpu.architecture || "Unknown",
      },
      device: {
        type: uaResult.device.type || "Unknown",
        vendor: uaResult.device.vendor || "Unknown",
        model: uaResult.device.model || "Unknown",
      },
      engine: {
        name: uaResult.engine.name || "Unknown",
        version: uaResult.engine.version || "Unknown",
      },
      os: {
        name: uaResult.os.name || "Unknown",
        version: uaResult.os.version || "Unknown",
      },
    },
    visitStatus: {
      firstVisit,
      lastVisit,
      isReturning,
      totalTimeSpent: calculateTotalSessionTime(),
    },
    pageViews: getPageViewsWithTimeSpent(),
    location: {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      timeZone: getTimezone(),
      coordinates: locationData.coordinates || { x: "Unknown", y: "Unknown" },
    },
    productsViewed: JSON.parse(
      sessionStorage.getItem("productsViewed") || "[]",
    ),
    shoppingCart: JSON.parse(
      sessionStorage.getItem("shoppingCart") || '{ "items": [] }',
    ),
  };

  return analyticsData;
};

// Calculate time spent on each page view
const getPageViewsWithTimeSpent = () => {
  const pageViews = JSON.parse(sessionStorage.getItem("pageViews") || []);

  // Calculate time spent for each page view
  for (let i = 0; i < pageViews.length; i++) {
    if (i < pageViews.length - 1) {
      // Time spent is the difference between this page's timestamp and the next one
      const currentTime = new Date(pageViews[i].timeStamp).getTime();
      const nextTime = new Date(pageViews[i + 1].timeStamp).getTime();
      pageViews[i].timeSpent = (nextTime - currentTime) / 1000; // Convert to seconds
    } else {
      // For the last page view, use the current time
      const currentTime = new Date(pageViews[i].timeStamp).getTime();
      const now = Date.now();
      pageViews[i].timeSpent = (now - currentTime) / 1000;
    }
  }

  return pageViews;
};

// Calculate total session time
const calculateTotalSessionTime = () => {
  const pageViews = JSON.parse(sessionStorage.getItem("pageViews") || []);
  if (pageViews.length === 0) return "0";

  const firstPageTime = new Date(pageViews[0].timeStamp).getTime();
  const lastPageTime = Date.now();
  return ((lastPageTime - firstPageTime) / 1000).toString();
};

// Function to send data to API
const sendAnalyticsData = async (data) => {
  try {
    // Use Beacon API if available for more reliable sending during page unload
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      navigator.sendBeacon("YOUR_API_ENDPOINT", blob);
    } else {
      // Fallback to fetch
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        keepalive: true, // Important for unload scenarios
      });

      if (!response.ok) {
        throw new Error("Failed to send analytics data");
      }
    }

    console.log("Analytics data sent successfully");
  } catch (error) {
    console.error("Error sending analytics data:", error);
    // Store data for later retry if needed
    localStorage.setItem("pendingAnalyticsData", JSON.stringify(data));
  }
};

// Track a new page view
const trackPageView = (route) => {
  // First, record time spent on previous route
  const pageViews = JSON.parse(sessionStorage.getItem("pageViews") || []);
  if (pageViews.length > 0) {
    const lastPageView = pageViews[pageViews.length - 1];
    const timeSpent = (performance.now() - routeEnterTime) / 1000; // Convert to seconds
    lastPageView.timeSpent = timeSpent;
  }

  // Then add new page view
  const newPageView = {
    url: route || window.location.href,
    timeStamp: new Date().toISOString(),
    timeSpent: 0, // Will be calculated on next route change or unload
  };

  pageViews.push(newPageView);
  sessionStorage.setItem("pageViews", JSON.stringify(pageViews));

  // Update current route tracking
  currentRoute = route || window.location.pathname;
  routeEnterTime = performance.now();
};

// Initialize route tracking
const initRouteTracking = () => {
  // Track initial page view
  trackPageView();

  // Monkey-patch history API to track route changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function () {
    originalPushState.apply(this, arguments);
    trackPageView(window.location.pathname);
  };

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    trackPageView(window.location.pathname);
  };

  // Also track popstate events (back/forward navigation)
  window.addEventListener("popstate", () => {
    trackPageView(window.location.pathname);
  });
};

// Initialize
self.onmessage = async (e) => {
  if (e.data.type === "init") {
    // Initialize session
    if (!sessionStorage.getItem("firstVisit")) {
      sessionStorage.setItem("firstVisit", new Date().toISOString());
    }

    // Initialize route tracking
    initRouteTracking();

    // Send ack back to main thread
    self.postMessage({ type: "initialized" });
  }

  if (e.data.type === "productViewed") {
    // Track product view
    const productData = e.data.product;
    const productsViewed = JSON.parse(
      sessionStorage.getItem("productsViewed") || "[]",
    );

    const existingProduct = productsViewed.find(
      (p) => p.productId === productData.productId,
    );
    if (existingProduct) {
      existingProduct.timeStamps.push(new Date().toISOString());
    } else {
      productsViewed.push({
        productId: productData.productId,
        timeStamps: [new Date().toISOString()],
      });
    }

    sessionStorage.setItem("productsViewed", JSON.stringify(productsViewed));
  }

  if (e.data.type === "cartUpdate") {
    // Update cart data
    sessionStorage.setItem("shoppingCart", JSON.stringify(e.data.cart));
  }
};

// Handle visibility change and page unload
const handleVisibilityChange = async () => {
  if (document.visibilityState === "hidden") {
    // Update time spent on current route before sending
    const pageViews = JSON.parse(sessionStorage.getItem("pageViews") || []);
    if (pageViews.length > 0) {
      const lastPageView = pageViews[pageViews.length - 1];
      lastPageView.timeSpent = (performance.now() - routeEnterTime) / 1000;
      sessionStorage.setItem("pageViews", JSON.stringify(pageViews));
    }

    // Collect and send data
    const analyticsData = await collectAnalyticsData();
    await sendAnalyticsData(analyticsData);
  }
};

// Register visibility change handler
self.addEventListener("visibilitychange", handleVisibilityChange);
self.addEventListener("pagehide", handleVisibilityChange);
self.addEventListener("beforeunload", handleVisibilityChange);

// Send any pending analytics data from previous sessions
const sendPendingAnalyticsData = async () => {
  const pendingData = localStorage.getItem("pendingAnalyticsData");
  if (pendingData) {
    try {
      await sendAnalyticsData(JSON.parse(pendingData));
      localStorage.removeItem("pendingAnalyticsData");
    } catch (error) {
      console.error("Failed to send pending analytics data:", error);
    }
  }
};

// Send pending data on initialization
sendPendingAnalyticsData();
