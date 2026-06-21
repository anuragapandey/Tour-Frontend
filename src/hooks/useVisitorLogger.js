import { useEffect, useRef } from "react";
import { createVisitorLog } from "../api/visitorLogApi";

const VISITOR_ID_KEY = "seven_hills_visitor_id";
const SESSION_ID_KEY = "seven_hills_session_id";

const createId = (prefix) => {
  if (window.crypto?.randomUUID) {
    return `${prefix}_${window.crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

const getStoredId = (key, prefix, storage) => {
  try {
    const existingId = storage.getItem(key);

    if (existingId) {
      return existingId;
    }

    const newId = createId(prefix);
    storage.setItem(key, newId);
    return newId;
  } catch {
    return createId(prefix);
  }
};

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
    utmContent: params.get("utm_content"),
  };
};

const buildPayload = () => {
  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  return {
    visitorId: getStoredId(VISITOR_ID_KEY, "visitor", window.localStorage),
    sessionId: getStoredId(SESSION_ID_KEY, "session", window.sessionStorage),
    referrer: document.referrer || null,
    pageUrl: window.location.href,
    pagePath: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    pageTitle: document.title,
    screenWidth: window.screen?.width,
    screenHeight: window.screen?.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
    deviceMemory: navigator.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    connectionType: connection?.type,
    effectiveConnectionType: connection?.effectiveType,
    doNotTrack: navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack,
    consentSource: "site_notice",
    ...getUtmParams(),
  };
};

export const useVisitorLogger = () => {
  const lastLoggedPathRef = useRef("");

  useEffect(() => {
    const logVisit = () => {
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (lastLoggedPathRef.current === currentPath) {
        return;
      }

      lastLoggedPathRef.current = currentPath;
      createVisitorLog(buildPayload()).catch(() => {});
    };

    logVisit();
    window.addEventListener("hashchange", logVisit);
    window.addEventListener("popstate", logVisit);

    return () => {
      window.removeEventListener("hashchange", logVisit);
      window.removeEventListener("popstate", logVisit);
    };
  }, []);
};
