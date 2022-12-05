import { useState } from "react";
import { INote, TAG } from "../Note";
import uuid from "react-uuid";
import HighlightWithinTextarea from "react-highlight-within-textarea";
import "./note-creator.scss";

export const NoteCreator = ({
  addNote,
}: {
  addNote: (note: INote) => void;
}) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const [noteText, setNoteText] = useState("Note text");
  const handleNoteTextChange = (value: string) => setNoteText(value);

  const createNote = () => {
    let note: INote = {
      id: uuid(),
      title,
      noteText,
      tags: noteText.match(TAG),
    };
    addNote(note);

    setNoteText("Note text");
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
        <HighlightWithinTextarea
          highlight={TAG}
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
