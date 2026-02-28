type Editing = {
  isEditing: boolean;
  title: string;
  text: string;
  handleSave: (e: React.SubmitEvent | React.FocusEvent) => void;
  inputTitle: string;
  setInputTitle: React.Dispatch<string>;
  refTextArea: React.RefObject<HTMLTextAreaElement | null>;
  inputText: string;
  setInputText: React.Dispatch<string>;
  errors: string;
};

const Editing = ({
  isEditing,
  title,
  text,
  handleSave,
  inputTitle,
  setInputTitle,
  refTextArea,
  inputText,
  setInputText,
  errors,
}: Editing) => {
  return (
    <>
      {!isEditing ? (
        <>
          <h1 className="text-center lg:text-left">{title}</h1>
          <p className="whitespace-pre-wrap wrap-break-words">{text}</p>
        </>
      ) : (
        <>
          <form
            onSubmit={(e) => handleSave(e)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                handleSave(e);
              }
            }}
            className="flex flex-col w-full gap-1 min-w-0"
          >
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              className="font-bold text-3xl w-full min-w-0 truncate"
              autoFocus
            />
            <textarea
              rows={1}
              ref={refTextArea}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="resize-none w-full min-w-0 "
            />
          </form>
          {errors && <p>{errors}</p>}
        </>
      )}
    </>
  );
};

export default Editing;
