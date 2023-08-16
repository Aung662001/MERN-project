import { useSelector } from "react-redux/es/hooks/useSelector";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();
  const {
    data: notes,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetNotesQuery("NoteList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  } else if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (userId) => entities[userId].username === username
      );
    }
    const tableContent = filteredIds?.length
      ? filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;
    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Status
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__owner">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default NotesList;
