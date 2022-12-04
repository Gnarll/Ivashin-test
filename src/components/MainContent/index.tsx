import { useState } from "react";
import { INote, Note } from "../Note";
import { NoteCreator } from "../NoteCreator";
import "./main-content.scss";

export const MainContent = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  const addNote = (note: INote) => {
    setNotes((state) => {
      return [...state, note];
    });
  };

  const deleteNote = (id: string) => {
    setNotes((state) => {
      return state.filter((item) => id !== item.id);
    });
  };

  return (
    <div className="main-content">
      {notes.map((note) => {
        return (
          <Note
            note={note}
            key={note.id}
            deleteNote={deleteNote}
            notes={notes}
            setNotes={setNotes}
          />
        );
      })}
      <NoteCreator addNote={addNote} />
    </div>
  );
};
