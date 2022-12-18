import { useQuery } from "react-query";
import { getEventCommentsService } from "../services/event";

const useGetEventComments = filter =>
  useQuery(["event-comments", { ...filter }], {
    queryFn: () => {
      return getEventCommentsService(filter.eventId);
    },
    select: data => data.comments,
    staleTime: 10 * 1000,
  });

export default useGetEventComments;
