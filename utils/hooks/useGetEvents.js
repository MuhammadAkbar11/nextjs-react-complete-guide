import { useQuery } from "react-query";
import { getAllEventsService } from "../services/event.service";

const useGetEvents = (filter = { limit: 15 }) =>
  useQuery("events", {
    queryFn: () => getAllEventsService("/api", filter),
    staleTime: 15 * 1000,
  });

export default useGetEvents;
