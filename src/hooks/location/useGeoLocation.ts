import { useEffect, useState, useRef } from "react";

type TPositionError = {
  code: number;
  message: string;
};

type TUseLocationReturn = {
  loading: boolean;
  error: TPositionError | null;
  coords: GeolocationCoordinates | null;
};

type GeoLocationOptions = {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
  retryLimit?: number; // Maximum retry attempts
  retryDelay?: number; // Delay (ms) between retries
};

/**
 * Custom hook to track the user's geolocation with retry functionality.
 *
 * @param options - Configuration for geolocation tracking.
 * @returns {Object} An object containing:
 * - `loading`: Indicates whether location data is being fetched.
 * - `error`: Contains error details if location retrieval fails.
 * - `coords`: The user's latest coordinates (latitude, longitude, accuracy, etc.).
 *
 * @example
 * import { useGeoLocation } from "hookify-react";
 *
 * export default function UseGeoLocation() {
 *  const { loading, error, coords } = useGeoLocation({ enableHighAccuracy: true });
 *  if (loading) return <p>Fetching location...</p>;
 *  if (error) return <p>Error: {error.message}</p>;
 *  return <p>Latitude: {coords?.latitude}, Longitude: {coords?.longitude}</p>;
 * }
 * ```
 */
export function useGeoLocation(
  options?: GeoLocationOptions,
): TUseLocationReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<TPositionError | null>(null);
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const retriesRef = useRef(0);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: "Geolocation is not supported by this browser.",
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

    const fetchLocation = () => {
      setLoading(true);

      const successCallback = (position: GeolocationPosition) => {
        setCoords(position.coords);
        setError(null);
        setLoading(false);
        retriesRef.current = 0; // Reset retry count on success
      };

      const errorCallback = (positionError: GeolocationPositionError) => {
        setError({ code: positionError.code, message: positionError.message });

        if (retriesRef.current < retryLimit) {
          retriesRef.current += 1;
          setTimeout(fetchLocation, retryDelay); // Retry with delay
        } else {
          setLoading(false);
        }
      };

      watchIdRef.current = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        {
          enableHighAccuracy,
          maximumAge,
          timeout,
        },
      );
    };

    fetchLocation();

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [options]);

  return { loading, error, coords };
}
