import React from "react";
import CommentItem from "./CommentItem";
import NewCommentForm from "./NewCommentForm";
import Loader from "../ui/Loader";
import { Alert } from "react-bootstrap";
import useGetEventComments from "../../utils/hooks/useGetEventComments";
import { useMutation, useQueryClient } from "react-query";
import { postEventCommentService } from "../../utils/services/event";

function ListComment(props) {
  const { eventId } = props;
  const queryClient = useQueryClient();
  const mutation = useMutation(values => {
    return postEventCommentService(eventId, values);
  });

  const { data, isLoading, error, isFetched } = useGetEventComments({
    eventId: eventId,
  });

  const addNewCommentHandler = data => {
    mutation.mutate(data, {
      onSuccess: data => {
        queryClient.invalidateQueries(["event-comments", { eventId }]);
      },
    });
  };
  isFetched && console.log("Refresh comments...");
  return (
    <>
      <NewCommentForm
        onAddNewComment={addNewCommentHandler}
        isLoading={mutation.isLoading}
      />
      {error ? (
        <div className="d-flex justify-content-center py-3 ">
          <Alert variant={"primary"} className="w-100 text-center ">
            Failed to load comments!
          </Alert>
        </div>
      ) : null}
      {isLoading && !error ? (
        <div className="d-flex justify-content-centent py-4 ">
          <Loader />
        </div>
      ) : (
        data?.map(cm => {
          return <CommentItem key={cm.id} {...cm} />;
        })
      )}
    </>
  );
}

export default ListComment;
