import { useQuery } from "react-query";
import { getAllEventsService } from "../services/event";

const useGetEvents = () =>
  useQuery("events", getAllEventsService, { staleTime: 15 * 1000 });

export default useGetEvents;
