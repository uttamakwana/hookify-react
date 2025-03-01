import { useEffect, useState } from "react";

type TPositionError = {
  code: number;
  message: string;
  PERMISSION_DENIED: 1;
  POSITION_UNAVAILABLE: 2;
  TIMEOUT: 3;
};

type TUseLocationReturn = {
  loading: boolean;
  error: TPositionError | null;
  coords: GeolocationCoordinates | undefined;
};

/**
 * Custom hook to track user's geolocation continuously with retry mechanism.
 *
 * @param options - Geolocation API options and additional retry configurations.
 * @returns An object with loading state, error, and coordinates.
 */
export function useGeoLocation(options?: {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
  retryLimit?: number; // Maximum number of retries
  retryDelay?: number; // Delay between retries in milliseconds
}): TUseLocationReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<TPositionError | null>(null);
  const [coords, setCoords] = useState<GeolocationCoordinates>();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: "Geolocation API is not supported by this browser.",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      });
      setLoading(false);
      return;
    }

    const {
      enableHighAccuracy = false,
      maximumAge = 0,
      timeout = 10000,
      retryLimit = 3,
      retryDelay = 2000,
    } = options || {};

    let retries = 0;
    let watchId: number;

    const attemptGeoLocation = () => {
      if (retries > retryLimit) {
        setError({
          code: 0,
          message: "Failed to retrieve location after multiple attempts.",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        });
        setLoading(false);
        return;
      }

      setLoading(true);

      const successCallback = (position: GeolocationPosition) => {
        setCoords(position.coords);
        setError(null);
        setLoading(false);
        retries = 0; // Reset retries on success
      };

      const errorCallback = (positionError: GeolocationPositionError) => {
        setError({
          code: positionError.code,
          message: positionError.message,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        });

        if (retries < retryLimit) {
          retries += 1;
          setTimeout(attemptGeoLocation, retryDelay); // Retry after delay
        } else {
          setLoading(false);
        }
      };

      // Use watchPosition for continuous updates
      watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        { enableHighAccuracy, maximumAge, timeout },
      );
    };

    attemptGeoLocation();

    // Cleanup the watcher on unmount
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [options]);

  return { loading, error, coords };
}
