import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { TypeSettings } from "../../types";
export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery<TypeSettings>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
