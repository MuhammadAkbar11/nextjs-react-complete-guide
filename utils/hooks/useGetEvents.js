import { useQuery } from "react-query";
import { getAllEventsService } from "../services/event.service";

const useGetEvents = ({ queryKey = "events", filter = { limit: 15 } }) =>
  useQuery(queryKey, {
    queryFn: () => getAllEventsService("/api", filter),
    staleTime: 15 * 1000,
  });

export default useGetEvents;
