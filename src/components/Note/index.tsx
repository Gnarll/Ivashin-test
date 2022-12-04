import { KeyboardEventHandler, useState } from "react";
import "./note.scss";

export interface INote {
  id: string;
  title: string;
  noteText: string;
}

interface NoteProps {
  note: INote;
  deleteNote: (id: string) => void;
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

export const Note = ({ note, deleteNote, notes, setNotes }: NoteProps) => {
  const [noteText, setNoteText] = useState(note.noteText);

  const handleNoteTextChange = (event: any) => setNoteText(event.target.value);

  const [inputIsDisabled, setInputIsDisabled] = useState(true);

  const editHandler = () => {
    if (!inputIsDisabled) {
      const updatedNotes = notes.map((item) => {
        if (item.id === note.id) item.noteText = noteText;
        return item;
      });
      setNotes(updatedNotes);
    }
    setInputIsDisabled((state) => !state);
  };

  return (
    <div className="note-wrapper">
      <h3>{note.title}</h3>
      <textarea
        disabled={inputIsDisabled}
        value={noteText}
        onInput={handleNoteTextChange}
      />
      <div className="buttonsWrapper">
        <button type="button" onClick={editHandler}>
          Edit
        </button>
        <button
          type="button"
          onClick={() => {
            deleteNote(note.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
