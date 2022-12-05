import { useEffect, useState } from "react";
import { INote, Note } from "../Note";
import { NoteCreator } from "../NoteCreator";
import "./main-content.scss";

export const MainContent = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  console.log(1111, notes);

  useEffect(() => {
    const items = { ...localStorage };
    for (let i in items) {
      addNote(JSON.parse(items[i]));
    }
  }, []);

  const addNote = (note: INote) => {
    setNotes((state) => {
      return [...state, note];
    });
  };

  const deleteNote = (id: string) => {
    localStorage.removeItem(id.toString());
    setNotes((state) => {
      return state.filter((item) => id !== item.id);
    });
  };

  const [findTagText, setFindTagText] = useState("");

  const tagInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFindTagText(event.target.value);
  };

  const [isAppliedFilter, setIsAppliedFilter] = useState(false);

  return (
    <div className="main-content">
      <div className="filter-wrapper">
        <input
          value={findTagText}
          onChange={tagInputHandler}
          placeholder="Find by tag"
        />
        <button
          disabled={isAppliedFilter}
          onClick={() => setIsAppliedFilter(true)}
        >
          Apply
        </button>
        <button
          disabled={!isAppliedFilter}
          onClick={() => setIsAppliedFilter(false)}
        >
          Reset
        </button>
      </div>
      {notes.map((note) => {
        if (!isAppliedFilter)
          return (
            <Note
              note={note}
              key={note.id}
              deleteNote={deleteNote}
              notes={notes}
              setNotes={setNotes}
            />
          );
        else {
          if (note.tags?.includes(findTagText))
            return (
              <Note
                note={note}
                key={note.id}
                deleteNote={deleteNote}
                notes={notes}
                setNotes={setNotes}
              />
            );
          return null;
        }
      })}
      <NoteCreator addNote={addNote} />
    </div>
  );
};
