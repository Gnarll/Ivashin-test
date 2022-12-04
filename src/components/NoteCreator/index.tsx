import { useState } from "react";
import { INote } from "../Note";
import uuid from "react-uuid";
import "./note-creator.scss";

export const NoteCreator = ({
  addNote,
}: {
  addNote: (note: INote) => void;
}) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const [noteText, setNoteText] = useState("");
  const handleNoteTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNoteText(event.target.value);

  const createNote = () => {
    let note: INote = {
      id: uuid(),
      title,
      noteText,
    };

    addNote(note);

    setNoteText("");
    setTitle("");
  };

  return (
    <div className="note-creator">
      <form>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          id="title"
          name="lname"
          placeholder="Note text"
          value={noteText}
          onChange={handleNoteTextChange}
        />
        <button type="button" onClick={createNote}>
          Add note
        </button>
      </form>
    </div>
  );
};
