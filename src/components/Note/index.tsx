import { useState } from "react";
import HighlightWithinTextarea from "react-highlight-within-textarea";
import "./note.scss";

export interface INote {
  id: string;
  title: string;
  noteText: string;
  tags?: any;
}

interface NoteProps {
  note: INote;
  deleteNote: (id: string) => void;
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

export const TAG = /(?<=#)([\S]+?)(?= |$|\n)/g;

export const Note = ({ note, deleteNote, notes, setNotes }: NoteProps) => {
  const [noteText, setNoteText] = useState(note.noteText);

  const handleNoteTextChange = (value: string) => setNoteText(value);

  const [inputIsDisabled, setInputIsDisabled] = useState(true);

  const editHandler = () => {
    if (!inputIsDisabled) {
      const updatedNotes = notes.map((item) => {
        if (item.id === note.id) {
          item.noteText = noteText;
          note.tags = item.noteText.match(TAG);
        }
        localStorage.setItem(item.id, JSON.stringify(item));
        return item;
      });
      setNotes(updatedNotes);
    }
    setInputIsDisabled((state) => !state);
  };

  return (
    <div className="note-wrapper">
      <h3>{note.title}</h3>
      <HighlightWithinTextarea
        highlight={TAG}
        readOnly={inputIsDisabled}
        value={noteText}
        onChange={handleNoteTextChange}
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
      {note.tags && note.tags.length > 0 ? (
        <div className="tags">
          <p>Tags</p>
          {note.tags.map((tag: any, index: number) => {
            return (
              <div className="tag">
                <p>#{tag}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
